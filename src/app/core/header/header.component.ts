import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataStorageService } from '@app/services/data-storage.service';
import { RecipeService } from '@app/services/recipe.service';
import { Recipe } from '@app/models/recipe.model';
import { AuthService } from '@app/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(
        private dataStorageService: DataStorageService,
        private recipeService: RecipeService,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
    }

    // logout user
    onLogout(): void {
        this.authService.logout();
        this.router.navigate(['/']);
    }

    // save recipes in backend
    onSaveData(): void {
        this.dataStorageService.saveRecipes()
            .subscribe(
                (response: Recipe[]) => {
                    console.log('PUT: ', response);
                }
            );
    }

    // fetch recipes from backend
    onFetchData(): void {
        this.dataStorageService.getRecipes()
            .subscribe(
                (recipes: Recipe[]) => {
                    console.log('GET: ', recipes);
                    this.recipeService.setRecipes(recipes);
                }
            );
    }

    isAuthenticated(): boolean {
        return this.authService.isAuthenticated();
    }
}
