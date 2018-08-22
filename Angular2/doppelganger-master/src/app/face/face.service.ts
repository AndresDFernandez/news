import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
const CV_URL =
  // tslint:disable-next-line:max-line-length
  'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.1/Prediction/bbfb33b7-4e47-482c-b7b4-5a1a92f66180/image';
@Injectable()
export class FaceService {
  constructor(private http: Http) {}

  getTags(file): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/octet-stream',
      'Prediction-Key': '8016fb69d3ff4fc596753150556ce2f7'
    });
    const options = new RequestOptions({
      headers: headers
    });
    return this.http
      .post(CV_URL, file, options)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}
