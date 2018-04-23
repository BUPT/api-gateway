import { Injectable } from '@angular/core';
import { Http, Jsonp, Headers, URLSearchParams } from '@angular/http';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs';
//差错处理
import { catchError, map, tap } from 'rxjs/operators';
import { Options } from 'selenium-webdriver/edge';
import { Route } from '../routeManagement/route';

const httpOptions = {
  headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

@Injectable()
export class RouteService {

  constructor(public http: Http) { }

  getAllRoutes() {
    return this.http.get('/route/route/getAll')
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
