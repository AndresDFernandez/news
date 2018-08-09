import { Component, OnInit } from '@angular/core';
import { Course } from "../model/course";
import { Observable } from "rxjs/Observable";
import { CoursesService } from "../services/courses.service";
import { map, tap, shareReplay, retryWhen, delayWhen } from 'rxjs/operators';
import { NewsletterService } from '../services/newsletter.service';
import { SwPush } from '@angular/service-worker';
import { environment } from '../../environments/environment';
import { createHttpObservable } from '../common/util';
import { timer } from '../../../node_modules/rxjs/internal/observable/timer';
import { Store } from '../common/store.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    courses$: Observable<Course[]>;

    sub: PushSubscription;

    readonly VAPID_PUBLIC_KEY = "BEOk30HU47bL1j_tREo16lVsOeTonuUBx7lYEM8xXdaGFt16Yo4vPS_9JM1ARlfceov2fWpNrIWueez2dJLw1_g";

    constructor(private coursesService: CoursesService,
        private swPush: SwPush,
        private store:Store,
        private newsletterService: NewsletterService) {

    }

    ngOnInit() {

            const courses$ = this.store.courses$;
    
            this.beginnerCourses$ = this.store.selectBeginnerCourses();
    
            this.advancedCourses$ = this.store.selectAdvancedCourses();
    
        }

    sendNewsletter() {


        console.log("Sending Newsletter to all Subscribers ...");

        this.newsletterService.send().subscribe();
    }

    subscribeToNotifications() {
          
        this.swPush.requestSubscription({
            serverPublicKey: this.VAPID_PUBLIC_KEY
        })
            .then(sub => {

                this.sub = sub;


                console.log("Notification Subscription: ", sub);

                this.newsletterService.addPushSubscriber(sub).subscribe(
                    () => console.log('Sent push subscription object to server.'),
                    err => console.log('Could not send subscription object to server, reason: ', err)
                );

            })
            .catch(err => console.error("Could not subscribe to notifications", err));

    }


}
