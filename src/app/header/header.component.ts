import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { RecipeService } from '@app/services/recipe.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(private recipeService: RecipeService) { }

    ngOnInit() {
    }

    // save recipes in backend
    onSaveData(): void {
        this.recipeService.saveRecipes();
    }

    // fetch recipes from backend
    onFetchData(): void {
        this.recipeService.fetchRecipes();
    }
}
