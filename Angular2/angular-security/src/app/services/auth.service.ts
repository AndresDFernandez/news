import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {User} from "../model/user";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import * as auth0 from "auth0-js";

export const ANONYMOUS_USER: User = {
    id: undefined,
    email: undefined,
    roles: []
}

const AUTH_CONFIG={
    clientID : '81967Ci5D6W1S1R5bRUPh4cuzWfJ7TkM',
    domain:'gaita.eu.auth0.com'
}

@Injectable()
export class AuthService {

    auth0 = new auth0.WebAuth({
        clientID: AUTH_CONFIG.clientID,
        domain: AUTH_CONFIG.domain,
        responseType: 'token id_token',
        redirectUri: 'https://localhost:4200/lessons'
    });

    private subject = new BehaviorSubject<User>(undefined);

    user$: Observable<User> = this.subject.asObservable().filter(user => !!user);

    isLoggedIn$: Observable<boolean> = this.user$.map(user => !!user.id);

    isLoggedOut$: Observable<boolean> = this.isLoggedIn$.map(isLoggedIn => !isLoggedIn);

   /* constructor(private http: HttpClient) {
        http.get<User>('/api/user')
            .do(console.log)
            .subscribe(user => this.subject.next(user ? user : ANONYMOUS_USER));
    }*/

    signUp(email:string, password:string ) {

        return this.http.post<User>('/api/signup', {email, password})
            .shareReplay()
            .do(user => this.subject.next(user));
    }

    login(email:string, password:string ) {
        return this.http.post<User>('/api/login', {email, password})
            .shareReplay()
            .do(user => this.subject.next(user));
    }
   /* public login() : void{
        this.auth0.authorize();
    }*/

    loginAsUser(email:string) {
        return this.http.post<User>('/api/admin', {email})
            .shareReplay()
            .do(user => this.subject.next(user));
    }

    logout() : Observable<any> {
        return this.http.post('/api/logout', null)
            .shareReplay()
            .do(user => this.subject.next(ANONYMOUS_USER));
    }
}








