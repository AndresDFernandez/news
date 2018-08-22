import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../_core/authentication.service';
import { ConfigurationService } from '../_core/configuration.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            withCredentials: true
        });

        return next.handle(request);

        /*let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser! || currentUser.token!){
            this.authenticationService.login(this.configurationService.getUser(),this.configurationService.getPassword()).subscribe();
        }

        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }*/


       // return next.handle(request);
    }

    constructor() {
    }
}
