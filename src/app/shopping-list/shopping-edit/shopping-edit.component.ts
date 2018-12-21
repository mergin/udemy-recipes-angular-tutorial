import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Ingredient } from '@app/models/ingredient.model';
import { ShoppingListService } from '@app/services/shopping-list.service';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

    @ViewChild('nameInput') nameInputRef: ElementRef;
    @ViewChild('amountInput') amountInputRef: ElementRef;

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit() {
    }

    addIngredient() {
        if (this.nameInputRef.nativeElement.value && this.amountInputRef.nativeElement.value) {
            this.shoppingListService.addIngredient(
                new Ingredient(
                    this.nameInputRef.nativeElement.value,
                    Number(this.amountInputRef.nativeElement.value)
            ));
            this.clearForm();
        }
    }

    private clearForm() {
        this.nameInputRef.nativeElement.value = '';
        this.amountInputRef.nativeElement.value = '';
    }

}
