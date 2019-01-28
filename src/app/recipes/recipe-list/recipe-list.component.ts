import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Recipe } from '@app/models/recipe.model';
import { RecipeService } from '@app/services/recipe.service';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

    recipes: Recipe[];

    constructor(
        private recipeService: RecipeService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.recipeService.recipesChanged
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipes = recipes;
                }
            );
        this.recipes = this.recipeService.getRecipes();
    }

    ngOnDestroy() {
        this.recipeService.recipesChanged.unsubscribe();
    }

    onNewRecipe() {
        this.router.navigate(['new'], { relativeTo: this.route });
    }

}
