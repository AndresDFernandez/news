import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {Observable} from "rxjs";
import {CoursesService} from "../services/courses.service";
import {AppState} from '../../reducers';
import {select, Store} from '@ngrx/store';
import {selectAdvancedCourses, selectAllCourses, selectBeginnerCourses, selectPromoTotal} from '../course.selectors';
import {AllCoursesRequested} from '../course.actions';
import { SwPush } from '@angular/service-worker';
import { NewsletterService } from '../../services/newsletter.service';
import { ChangeDetectionStrategy } from '@angular/core';
@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

    promoTotal$: Observable<number>;

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    sub: PushSubscription;

    readonly VAPID_PUBLIC_KEY = "BEOk30HU47bL1j_tREo16lVsOeTonuUBx7lYEM8xXdaGFt16Yo4vPS_9JM1ARlfceov2fWpNrIWueez2dJLw1_g";

    constructor(private coursesService: CoursesService,
        private swPush: SwPush,
        private store: Store<AppState>,
        private newsletterService: NewsletterService) {

    }

    ngOnInit() {

        this.store.dispatch(new AllCoursesRequested());

        this.beginnerCourses$ = this.store.pipe(select(selectBeginnerCourses));

        this.advancedCourses$ = this.store.pipe(select(selectAdvancedCourses));

        this.promoTotal$ = this.store.pipe(select(selectPromoTotal));

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
