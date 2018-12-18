import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

    recipes: Recipe[] = [
        new Recipe(
            'Hallaca',
            'This is simply a test',
            // tslint:disable-next-line:max-line-length
            'https://http2.mlstatic.com/corte-para-hallacas-produccion-nacional-60-unidades-para-60-D_NQ_NP_869908-MLA25589543992_052017-F.webp'
        ),
        new Recipe(
            'Empanada',
            'This is simply a test',
            // tslint:disable-next-line:max-line-length
            'https://4.bp.blogspot.com/-C-PxcAwhHXo/WlWDzAmHB7I/AAAAAAAAG8k/hblgAA_HrIIYW_VPzVNuXb7ZjFnxKpduwCLcBGAs/s1600/como-hacer-empanadas-venezolanas.jpg'
        ),
        new Recipe(
            'Arepa',
            'This is simply a test',
            // tslint:disable-next-line:max-line-length
            'https://images-gmi-pmc.edge-generalmills.com/e35e4572-73d3-4f88-8300-377b29e57c0f.jpg'
        )
    ];
    @Output() recipeWasSelected = new EventEmitter<Recipe>();

    constructor() { }

    ngOnInit() {
    }

    onRecipeSelected(recipe: Recipe) {
        this.recipeWasSelected.emit(recipe);
    }

}
