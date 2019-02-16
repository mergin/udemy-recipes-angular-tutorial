import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '@app/services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.authService.getToken();
        const params = { params: req.params.set('auth', token) };
        const tokenReq = req.clone(params);

        return next.handle(tokenReq);
    }
}
