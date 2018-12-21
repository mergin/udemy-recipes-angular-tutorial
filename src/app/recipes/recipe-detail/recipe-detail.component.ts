import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '@app/models/recipe.model';
import { Ingredient } from '@app/models/ingredient.model';
import { RecipeService } from '@app/services/recipe.service';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

    @Input() recipe: Recipe;

    constructor(private recipeService: RecipeService) { }

    ngOnInit() {
    }

    addIngredientsToSpList(ingredients: Ingredient[]): void {
        this.recipeService.addIngredientsToSpList(ingredients);
    }

}
