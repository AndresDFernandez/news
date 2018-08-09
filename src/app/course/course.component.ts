import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Course} from "../model/course";
import {
    debounceTime,
    distinctUntilChanged,
    startWith,
    map,
    switchMap,
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat} from 'rxjs';
import {Lesson} from '../model/lesson';
import {createHttpObservable} from '../common/util';
import { CoursesService } from '../services/courses.service';
import { debug, RxJsLoggingLevel } from '../common/debug';
import { Store } from '../common/store.service';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

    courseId: number;

    course$ : Observable<Course>;

    lessons$: Observable<Lesson[]>;


    @ViewChild('searchInput') input: ElementRef;

    constructor(private route: ActivatedRoute, private store: Store) {


    }

    ngOnInit() {

        this.courseId = this.route.snapshot.params['id'];

        this.course$ = this.store.selectCourseById(this.courseId);
    }

    ngAfterViewInit() {

        const searchLessons$ = fromEvent<any>(this.input.nativeElement, 'keyup')
            .pipe(
                map(event => event.target.value),
                startWith(''),
                debug( RxJsLoggingLevel.TRACE, "search "),
                debounceTime(400),
                distinctUntilChanged(),
                switchMap(search => this.loadLessons(search)),
                debug( RxJsLoggingLevel.DEBUG, "lessons value ")
            );

            this.lessons$ = searchLessons$;
    }

    //https://news-dfa66.firebaseio.com/lessons/01.json?orderBy=%22description%22&startAt=%22A%22&endAt=%22A\uf8ff%22&print=pretty

    loadLessons(search = ''): Observable<Lesson[]> {
        if (search !== '') {
            return createHttpObservable(
                `${CoursesService.API_URL}/lessons/${this.courseId}.json?orderBy="description"&startAt="${search}"&endAt="${search}\uf8ff"`)
                .pipe(
                    map(res => new Array(res[0]))
                );
        }

        return createHttpObservable(
            `${CoursesService.API_URL}/lessons/${this.courseId}/.json?orderBy="description"`)
            .pipe(
                map(res => res)
            );

    }


}




