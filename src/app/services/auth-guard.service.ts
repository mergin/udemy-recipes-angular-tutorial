import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    CanLoad,
    Route,
    CanActivate
} from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

    // added by ts lint for correct interace implementation
    path: ActivatedRouteSnapshot[];
    route: ActivatedRouteSnapshot;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {

        if (this.authService.isAuthenticated()) {
            return true;
        } else {
            this.router.navigate(['/signin']);
        }
    }

    canLoad(route: Route) {

        if (this.authService.isAuthenticated()) {
            return true;
        } else {
            this.router.navigate(['/signin']);
        }
    }
}
