import { Injectable, EventEmitter } from '@angular/core';

import { Ingredient } from '@app/models/ingredient.model';

@Injectable({
    providedIn: 'root'
})
export class ShoppingListService {

    ingredientsChanged = new EventEmitter<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient('Avocados', 5),
        new Ingredient('Harina P.A.N.', 10),
        new Ingredient('Olives', 15)
    ];

    constructor() { }

    getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient): void {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
}
