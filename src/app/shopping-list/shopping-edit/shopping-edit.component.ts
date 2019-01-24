import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '@app/models/ingredient.model';
import { ShoppingListService } from '@app/services/shopping-list.service';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    editMode = false;
    editedItemIndex: number;

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit() {
        this.subscription = this.shoppingListService.startedEditing
            .subscribe(
                (index: number) => {
                    this.editedItemIndex = index;
                    this.editMode = true;
                }
            );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
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
