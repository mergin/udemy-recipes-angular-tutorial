import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
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

    @ViewChild('f', { static: true }) shoppingForm: NgForm;
    editMode = false;
    editedItemIndex: number;
    editedItem: Ingredient;
    private subscription: Subscription;

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit() {
        this.subscription = this.shoppingListService.startedEditing
            .subscribe(
                (index: number) => {
                    this.editedItemIndex = index;
                    this.editMode = true;
                    this.editedItem = this.shoppingListService.getIngredient(index);
                    this.shoppingForm.setValue({
                        name: this.editedItem.name,
                        amount: this.editedItem.amount
                    });
                }
            );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    // add item handler
    onSubmit(form: NgForm): void {

        const value = form.value;
        const newIngredient = new Ingredient(value.name, value.amount);

        if (this.editMode) {
            this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
        } else {
            this.shoppingListService.addIngredient(newIngredient);
        }

        this.onClear();
    }

    // delete element handler
    onDelete(): void {
        this.shoppingListService.deleteIngredient(this.editedItemIndex);
        this.onClear();
    }

    // clear button handler
    onClear(): void {
        this.editMode = false;
        this.shoppingForm.reset();
    }

    // private clearForm() {
    //     this.nameInputRef.nativeElement.value = '';
    //     this.amountInputRef.nativeElement.value = '';
    // }
}
