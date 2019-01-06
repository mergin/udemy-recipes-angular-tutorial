import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Recipe } from '@app/models/recipe.model';
import { Ingredient } from '@app/models/ingredient.model';
import { RecipeService } from '@app/services/recipe.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

    recipe: Recipe;
    recipeId: number;
    paramsSubscription: Subscription;

    constructor(
        private recipeService: RecipeService,
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

}
