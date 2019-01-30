import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Recipe } from '@app/models/recipe.model';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    private serverURL = 'https://udemy-recipes-angular-tutorial.firebaseio.com';

    constructor(protected http: HttpClient) { }

    // retrieve recipe list
    getRecipes(): Observable<Recipe[]> {
        return this.http.get<any>(`${this.serverURL}/recipes.json`)
            .pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    // save recipe list
    saveRecipes(recipes: Recipe[]): Observable<any> {
        return this.http.put<any>(`${this.serverURL}/recipes.json`, recipes)
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
