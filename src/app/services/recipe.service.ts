import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from '@app/models/recipe.model';
import { Ingredient } from '@app/models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            2,
            'Hallaca',
            'Best. Christmas. Food. Ever.',
            // tslint:disable-next-line:max-line-length
            'https://http2.mlstatic.com/corte-para-hallacas-produccion-nacional-60-unidades-para-60-D_NQ_NP_869908-MLA25589543992_052017-F.webp',
            [
                new Ingredient('Harina P.A.N.', 1),
                new Ingredient('Olives', 2),
                new Ingredient('Raisins', 5)
            ]
        ),
        new Recipe(
            3,
            'Empanada',
            'What heaven is made of',
            // tslint:disable-next-line:max-line-length
            'https://4.bp.blogspot.com/-C-PxcAwhHXo/WlWDzAmHB7I/AAAAAAAAG8k/hblgAA_HrIIYW_VPzVNuXb7ZjFnxKpduwCLcBGAs/s1600/como-hacer-empanadas-venezolanas.jpg',
            [
                new Ingredient('Harina P.A.N.', 1),
                new Ingredient('Meat', 1)
            ]
        ),
        new Recipe(
            5,
            'Arepa',
            'Not as good as empanadas',
            // tslint:disable-next-line:max-line-length
            'https://images-gmi-pmc.edge-generalmills.com/e35e4572-73d3-4f88-8300-377b29e57c0f.jpg',
            [
                new Ingredient('Harina P.A.N.', 1),
                new Ingredient('Avocado', 1),
                new Ingredient('Chicken', 1)
            ]
        ),
        new Recipe(
            7,
            'Piña Colada',
            'Awesome',
            // tslint:disable-next-line:max-line-length
            'https://www.elmejornido.com/sites/default/files/122175lrg.jpg',
            [
                new Ingredient('Pineapple', 1),
                new Ingredient('Coconut', 1),
                new Ingredient('Rum', 1)
            ]
        )
    ];

    constructor(private shoppingListService: ShoppingListService) { }

    getRecipes(): Recipe[] {
        return this.recipes.slice();
    }

    getRecipe(id: number): Recipe {
        // return this.recipes[id];
        // return this.recipes.filter((recipe: Recipe) => id === recipe.id )[0];
        return this.recipes.find((recipe: Recipe) => id === recipe.id );
    }

    addIngredientsToSpList(ingredients: Ingredient[]): void {
        this.shoppingListService.addIngredients(ingredients);
    }

    // add recipe to list
    addRecipe(recipe: Recipe): void {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    // update recipe on id
    updateRecipe(id: number, newRecipe: Recipe): void {
        const index = this.recipes.findIndex((recipe: Recipe) => id === recipe.id );
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    // delete recipe on id
    deleteRecipe(id: number): void {
        const index = this.recipes.findIndex((recipe: Recipe) => id === recipe.id );
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    // update recipe on index
    // updateRecipe(index: number, newRecipe: Recipe): void {
    //     this.recipes[index] = newRecipe;
    //     this.recipesChanged.next(this.recipes.slice());
    // }
}
