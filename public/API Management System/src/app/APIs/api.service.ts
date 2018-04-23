import { Injectable } from '@angular/core';
import { Http, Jsonp, Headers, URLSearchParams } from '@angular/http';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs';
//差错处理
import { catchError, map, tap } from 'rxjs/operators';
import { Api } from './atomAPI/atomAPI';
import { Options } from 'selenium-webdriver/edge';

const httpOptions = {
  headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
};
@Injectable()
export class ApiService {
  // private url: string = "http://10.108.208.51:8080/query/service?ServiceName=api1";
  // public params:{}

  constructor(public http: Http) {
    // this.http.get()
  }
  //get方法
  // httpGet(url, params,httpOptions) {
  //   return this.http.get(url, {search: params}).map(res=>res.json());
  // }
  // // post方法
  // httpPost(url, params,httpOptions) {
  //   return this.http.post(url, {search: params}).map(res=>res.json());
  // }
  // // 跨域请求
  // jsonpGet(url, params,httpOptions) {
  //   return this.jsonp.get(url, {search: params}).map(res=>res.json()
  //   .catchError(this.handleError));
  // }
  getAllAPI() {
    return this.http.get('/api/user/getAll')
      .map(res => {
        // alert(1);
        // login successful if there's a jwt token in the response
        // if (user && user.token) {
        //     // store user details and jwt token in local storage to keep user logged in between page refreshes
        //     localStorage.setItem('currentUser', JSON.stringify(user));
        // }
        console.log(JSON.stringify(res));
        return res;
      });
  }
  searchAPI(apiname: string) {
    // 
    let params = new URLSearchParams();
    params.append("apiname", apiname);
    // params.append("APIType", APIType);
    // params.append("area",area);
    let body = params.toString();
    console.log(body);
    return this.http.post('/api/user/queryUser', body, httpOptions)
      .map(res => {
        console.log(res);
        return res;
      });
  }
  // alert();
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return Observable.of(result as T);
    };
  }
}
