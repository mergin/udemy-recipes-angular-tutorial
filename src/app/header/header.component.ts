import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '@app/services/firebase.service';
import { RecipeService } from '@app/services/recipe.service';
import { Recipe } from '@app/models/recipe.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(
        private firebaseService: FirebaseService,
        private recipeService: RecipeService
    ) { }

    ngOnInit() {
    }

    // save recipes in backend
    onSaveData(): void {
        this.firebaseService.saveRecipes()
            .subscribe(
                (response: Recipe[]) => {
                    console.log('PUT: ', response);
                }
            );
    }

    // fetch recipes from backend
    onFetchData(): void {
        this.firebaseService.getRecipes()
            .subscribe(
                (recipes: Recipe[]) => {
                    console.log('GET: ', recipes);
                    this.recipeService.setRecipes(recipes);
                }
            );
    }
}
