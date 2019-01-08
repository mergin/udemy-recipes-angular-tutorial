import { Injectable } from '@angular/core';

import { Ingredient } from '@app/models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShoppingListService {

    ingredientsChanged = new Subject<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient('Avocado', 5),
        new Ingredient('Harina P.A.N.', 10),
        new Ingredient('Olives', 15)
    ];

    constructor() { }

    getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient): void {

        // check if ingredient already exists
        let found = false;
        for (let index = 0; index < this.ingredients.length; index++) {
            if (this.ingredients[index].name === ingredient.name) {
                this.ingredients[index].amount += ingredient.amount;
                found = true;
                break;
            }
        }

        // if doesn't exists add new one
        if (!found) {
            this.ingredients.push(ingredient);
        }

        this.ingredientsChanged.next(this.ingredients.slice());
    }

    // TODO: refactor to avoid adding multiple times in observable
    addIngredients(ingredients: Ingredient[]): void {
        ingredients.map((ingredient: Ingredient) => {
            this.addIngredient(ingredient);
        });
    }
}
