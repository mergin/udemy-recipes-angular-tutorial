import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.mode';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

    ingredients: Ingredient[] = [
        new Ingredient('Avocados', 5),
        new Ingredient('Harina P.A.N.', 10),
        new Ingredient('Olives', 15)
    ];

    constructor() { }

    ngOnInit() {
    }

}
