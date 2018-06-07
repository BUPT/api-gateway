import { Injectable } from '@angular/core';
import { Http, Jsonp, Headers, URLSearchParams } from '@angular/http';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs';
//差错处理
import { catchError, map, tap } from 'rxjs/operators';
import { Options } from 'selenium-webdriver/edge';

const httpOptions = {
  headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

@Injectable()
export class LogService {

  constructor(public http: Http) { }

  getAllLog() {
    return this.http.get('http://112.74.173.198:8080/viewLogPerformance')
      .map(res => {
        console.log(JSON.stringify(res));
        return res;
      });
  }

  //错误处理
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      return Observable.of(result as T);
    };
  }

}
