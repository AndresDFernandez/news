

import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Course} from "../model/course";
import {map} from "rxjs/operators";
import {Lesson} from "../model/lesson";

export class ResultType  {
    constructor(r){
        this.courses = r;
    }
    courses: Course[];
}

@Injectable()
export class CoursesService {

    static readonly API_URL = 'https://news-dfa66.firebaseio.com';
    
    constructor(private http:HttpClient) {

    }

    findCourseById(courseId: number): Observable<Course> {
        return this.http.get<Course>(`/api/courses/${courseId}`);
    }

    findAllCourses(): Observable<Course[]> {

        return this.http.get<Course[]>(`${CoursesService.API_URL}/products.json`)
        .pipe(
            map(res => Object.values(res))
        )
    }

    findAllCourseLessons(courseId:number): Observable<Lesson[]> {
        return this.http.get('/api/lessons', {
            params: new HttpParams()
                .set('courseId', courseId.toString())
                .set('pageNumber', "0")
                .set('pageSize', "1000")
        }).pipe(
            map(res =>  res["payload"])
        );
    }

    findLessons(
        courseId:number,
        pageNumber = 0, pageSize = 3):  Observable<Lesson[]> {

        return this.http.get<Lesson[]>(`${CoursesService.API_URL}/lesson.json`)
        .pipe(
            map(res => Object.values(res))
        );
        /*return this.http.get('/api/lessons', {
            params: new HttpParams()
                .set('courseId', courseId.toString())
                .set('filter', '')
                .set('sortOrder', 'asc')
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
        }).pipe(
            map(res =>  res["payload"])
        );*/
    }


    saveCourse(courseId: number, changes: Partial<Course>) {
        return this.http.put('/api/courses/' + courseId, changes);
    }


}