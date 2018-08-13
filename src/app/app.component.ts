import {Component, OnInit} from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Observable } from '../../node_modules/rxjs/Observable';
import { Store, select } from '../../node_modules/@ngrx/store';
import { AppState } from './reducers';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';
import { Logout } from './auth/auth.actions';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;
    
    constructor(private swUpdate: SwUpdate, private store: Store<AppState>) {
    }

    ngOnInit() {

        if (this.swUpdate.isEnabled) {

            this.swUpdate.available.subscribe(() => {

                if(confirm("New version available. Load New Version?")) {

                    window.location.reload();
                }
            });
        }
        
       //  this.store.init();
        this.isLoggedIn$ = this.store
        .pipe(
          select(isLoggedIn)
        );

      this.isLoggedOut$ = this.store
        .pipe(
          select(isLoggedOut)
        );

    }

    logout() {

      this.store.dispatch(new Logout());

    }

    }
