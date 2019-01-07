import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

import { Recipe } from '@app/models/recipe.model';
import { Ingredient } from '@app/models/ingredient.model';
import { RecipeService } from '@app/services/recipe.service';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

    recipe: Recipe;
    recipeId: number;
    private paramsSubscription: Subscription;

    constructor(
        private recipeService: RecipeService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.paramsSubscription = this.route.params.subscribe(
            (params: Params) => {
                this.recipeId = +params['id'];
                this.recipe = this.recipeService.getRecipe(this.recipeId);
            }
        );
    }

    ngOnDestroy() {
        this.paramsSubscription.unsubscribe();
    }

    addIngredientsToSpList(ingredients: Ingredient[]): void {
        this.recipeService.addIngredientsToSpList(ingredients);
    }

    // not used, is for demo purposes only
    onEditRecipe() {
        // this.router.navigate(['new'], { relativeTo: this.route });
        this.router.navigate(['../', this.recipeId, 'edit'], { relativeTo: this.route });
    }

}
