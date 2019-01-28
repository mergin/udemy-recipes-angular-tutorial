import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { FormGroup, FormControl, FormArray, AbstractControl, Validators } from '@angular/forms';

import { RecipeService } from '@app/services/recipe.service';
import { Recipe } from '@app/models/recipe.model';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

    recipeId: number;
    editMode: boolean = false;
    recipeForm: FormGroup;
    private paramsSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private recipeService: RecipeService
    ) { }

    ngOnInit() {
        this.paramsSubscription = this.route.params.subscribe(
            (params: Params) => {
                this.recipeId = +params['id'];
                this.editMode = params['id'] != null;
                // this.recipe = this.recipeService.getRecipe(this.recipeId);
                this.initForm();
            }
        );
    }

    ngOnDestroy() {
        this.paramsSubscription.unsubscribe();
    }

    // form submit handler
    onSubmit(): void {
        // BUG: id collision
        const newRecipe = new Recipe(
            Math.floor(Math.random() * 1000) + 1,
            this.recipeForm.value['name'],
            this.recipeForm.value['description'],
            this.recipeForm.value['imagePath'],
            this.recipeForm.value['ingredients']
        );

        if (this.editMode) {
            newRecipe.id = this.recipeId;
            this.recipeService.updateRecipe(this.recipeId, newRecipe);
        } else {
            this.recipeService.addRecipe(newRecipe);
        }
    }

    // add ingredient handler
    onAddIngredient(): void {
        (<FormArray>this.recipeForm.get('ingredients')).push(
            new FormGroup({
                'name': new FormControl(null, Validators.required),
                'amount': new FormControl(null, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
            })
        );
    }

    // returns a list of ingredients form control from recipe
    getControls(): AbstractControl[] {
        return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }

    // initializes reactive form
    private initForm(): void {
        let recipeName = '';
        let recipeImagePath = '';
        let recipeDescription = '';
        let recipeIngredients = new FormArray([]);

        if (this.editMode) {
            const recipe = this.recipeService.getRecipe(this.recipeId);
            recipeName = recipe.name;
            recipeImagePath = recipe.imagePath;
            recipeDescription = recipe.description;

            // populate form array if there are ingredients
            if (recipe['ingredients']) {
                for (let ingredient of recipe.ingredients) {
                    recipeIngredients.push(
                        new FormGroup({
                            'name': new FormControl(ingredient.name, Validators.required),
                            'amount': new FormControl(ingredient.amount, [
                                Validators.required,
                                Validators.pattern(/^[1-9]+[0-9]*$/)
                            ])
                        })
                    );
                }
            }
        }

        // create recipe form
        this.recipeForm = new FormGroup({
            'name': new FormControl(recipeName, Validators.required),
            'imagePath': new FormControl(recipeImagePath, Validators.required),
            'description': new FormControl(recipeDescription, Validators.required),
            'ingredients': recipeIngredients,
        });
    }

}
