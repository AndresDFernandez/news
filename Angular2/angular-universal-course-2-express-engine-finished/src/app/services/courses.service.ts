

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Course} from "../model/course";
import {Lesson} from "../model/lesson";
import {map} from 'rxjs/operators';



@Injectable()
export class CoursesService {

    static readonly API_URL = 'https://angular-universal-course-ebcc3.firebaseio.com';

    static readonly API_URL = 'https://ps4.pubnub.com/v2/subscribe/sub-c-b0d14910-0601-11e4-b703-02ee2ddab7fe/pubnub-wikipedia/0?heartbeat=300&tt=15332395645080179&tr=12&uuid=pn-2335821c-015a-42b5-b589-493e3acc2324&pnsdk=PubNub-JS-Web%2F4.20.0&auth=sub-c-ad406888-968c-11e8-9a78-8ae329637954';
    constructor(private http: HttpClient) {

    }

    findCourseById(courseId: string): Observable<Course> {
        return this.http.get<Course>(this.API_URL);
    }

    findAllCourses(): Observable<Course[]> {
        return this.http.get<Course[]>(`${CoursesService.API_URL}/courses.json`);
    }

    findAllCourseLessons(courseId:string): Observable<Lesson[]> {
        return this.http.get<Lesson[]>(`${CoursesService.API_URL}/lessons/${courseId}.json`);
    }
}