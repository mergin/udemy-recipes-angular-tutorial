import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() { }

    // sign up
    signupUser(email: string, password: string): void {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(
                error => console.log(error)
            );
    }

    // sign in
    signinUser(email: string, password: string): void {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => console.log(response)
            )
            .catch(
                error => console.log(error)
            );
    }
}
