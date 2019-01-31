import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() { }

    signupUser(email: string, password: string): void {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(
                error => console.log(error)
            );
    }
}
