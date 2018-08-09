import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject, timer} from 'rxjs';
import {Course} from '../model/course';
import {delayWhen, filter, map, retryWhen, shareReplay, tap, withLatestFrom} from 'rxjs/operators';
import {createHttpObservable} from './util';
import {fromPromise} from 'rxjs/internal-compatibility';
import { CoursesService } from '../services/courses.service';


@Injectable({
    providedIn: 'root'
})


export class Store {

    private subject = new BehaviorSubject<Course[]>([]);

    courses$: Observable<Course[]> = this.subject.asObservable();


    init() {

        const http$ = createHttpObservable(`${CoursesService.API_URL}/products.json`);

        http$
            .pipe(
                tap(() => console.log('HTTP request executed')),
                map(res => Object.values(res))
            )
            .subscribe(
                courses => this.subject.next(courses)
            );
    }

    selectBeginnerCourses() {
        return this.filterByCategory('SHOE');
    }

    selectAdvancedCourses() {
        return this.filterByCategory('ADVANCED');
    }

    selectCourseById(courseId: any) {
        return this.courses$
            .pipe(
                map(courses => courses.find(course => course.id == courseId)),
                filter(course => !!course)

            );
    }

    filterByCategory(category: string) {
        return this.courses$
            .pipe(
                map(courses => courses
                    .filter(course => course.category == category))
            );
    }

    saveCourse(courseId:any, changes): Observable<any> {

        const courses = this.subject.getValue();

        const courseIndex = courses.findIndex(course => course.id == courseId);

        const newCourses = courses.slice(0);

        newCourses[courseIndex] = {
            ...courses[courseIndex],
            ...changes
        };

        this.subject.next(newCourses);

        return fromPromise(fetch(`/api/courses/${courseId}`, {
            method: 'PUT',
            body: JSON.stringify(changes),
            headers: {
                'content-type': 'application/json'
            }
        }));

    }





}