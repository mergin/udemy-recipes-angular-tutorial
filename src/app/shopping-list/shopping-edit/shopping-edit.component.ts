import { Component, OnInit } from '@angular/core';

import { Ingredient } from '@app/models/ingredient.model';
import { ShoppingListService } from '@app/services/shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit() {
    }

    // add item handler
    onAddItem(form: NgForm) {

        const value = form.value;

        this.shoppingListService.addIngredient(
            new Ingredient(
                value.name,
                value.amount
            ));
        // this.clearForm();
    }

    // private clearForm() {
    //     this.nameInputRef.nativeElement.value = '';
    //     this.amountInputRef.nativeElement.value = '';
    // }
}
