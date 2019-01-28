import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { FormGroup, FormControl, FormArray, AbstractControl } from '@angular/forms';

import { RecipeService } from '@app/services/recipe.service';

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
        console.log(this.recipeForm);
    }

    // add ingredient handler
    onAddIngredient(): void {
        (<FormArray>this.recipeForm.get('ingredients')).push(
            new FormGroup({
                'name': new FormControl(),
                'amount': new FormControl()
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
                            'name': new FormControl(ingredient.name),
                            'amount': new FormControl(ingredient.amount)
                        })
                    );
                }
            }
        }

        // create recipe form
        this.recipeForm = new FormGroup({
            'name': new FormControl(recipeName),
            'imagePath': new FormControl(recipeImagePath),
            'description': new FormControl(recipeDescription),
            'ingredients': recipeIngredients,
        });
    }

}
