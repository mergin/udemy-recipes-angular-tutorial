import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private token: string;

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
                response => {
                    firebase.auth().currentUser.getIdToken()
                        .then(
                            (token: string) => this.token = token
                        );
                }
            )
            .catch(
                error => console.log(error)
            );
    }

    // logout
    logout(): void {
        firebase.auth().signOut();
        this.token = null;
    }

    // returns user token
    // BUG: might return expired token
    getToken(): string {
        firebase.auth().currentUser.getIdToken()
            .then(
                (token: string) => this.token = token
            );
        return this.token;
    }

    // check authentication status
    isAuthenticated(): boolean {
        return this.token != null;
    }
}
