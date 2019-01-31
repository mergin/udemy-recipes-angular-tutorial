import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

import { Recipe } from '@app/models/recipe.model';
import { RecipeService } from './recipe.service';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    private serverURL = 'https://udemy-recipes-angular-tutorial.firebaseio.com';

    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService
    ) { }

    // retrieve recipe list
    getRecipes(): Observable<Recipe[]> {

        const token = this.authService.getToken();
        const options = { params: new HttpParams().set('auth', token) };

        return this.http.get<Recipe[]>(`${this.serverURL}/recipes.json`, options)
            .pipe(
                map(
                    (recipes: Recipe[]) => {

                        // makes sure all recipes have the ingredients attribute
                        for (const recipe of recipes) {
                            if (!recipe['ingredients']) {
                                recipe['ingredients'] = [];
                            }
                        }
                        return recipes;
                    }
                ),
                retry(2),
                catchError(this.handleError)
            );
    }

    // save recipe list
    saveRecipes(): Observable<Recipe[]> {

        const token = this.authService.getToken();
        const options = { params: new HttpParams().set('auth', token) };

        return this.http.put<Recipe[]>(`${this.serverURL}/recipes.json`, this.recipeService.getRecipes(), options)
            .pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    // error handler
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }
}
