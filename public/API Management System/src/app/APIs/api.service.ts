import { Injectable } from '@angular/core';
import { Http, Jsonp, Headers, URLSearchParams } from '@angular/http';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs';
//差错处理

const httpOptions = {
  headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
};
const httpOption = {
  headers: new Headers({ 'Content-Type': 'text/plain' })
};

@Injectable()
export class ApiService {

  constructor(public http: Http) {
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
  getAllAPI(dc?:string) {
    let params = new URLSearchParams();
    params.append("dc","dc1");
    let data = params.toString();
    return this.http.post('/api/queryServicesInDataCenterWithDetail',data,httpOption)
      .map(res => {
        return res;
      });
  }
  serviceDown(serviceID:any,dc:string){
    let params = new URLSearchParams();
    params.append("dc",dc);
    params.append("serviceId",serviceID)
    let data = params.toString();
    return this.http.post('/api/serviceDown',data,httpOptions)
      .map(res => {
        return res;
      });
  }
  serviceUp(serviceID:any,dc:string){
    let params = new URLSearchParams();
    params.append("dc",dc);
    params.append("serviceId",serviceID)
    let data = params.toString();
    return this.http.post('/api/serviceUp',data,httpOptions)
      .map(res => {
        return res;
      });
  }
  // searchAPI(apiname: string = null,APIType:string = null,area:string = null) {
  //   // 
  //   let params = new URLSearchParams();
  //   if(apiname) params.append("apiname", apiname);
  //   if(APIType) params.append("APIType", APIType);
  //   if(area) params.append("area", area);
  //   // params.append("APIType", APIType);
  //   // params.append("area",area);
  //   let body = params.toString();
  //   console.log(body);
  //   return this.http.post('/api/user/queryUser', body, httpOptions)
  //     .map(res => {
  //       console.log(res);
  //       return res;
  //     });
  // }
  deleteAPI(serviceID:string,serviceName:string){
    let params = new URLSearchParams();
    if(serviceID) params.append("serviceId", serviceID);
    if(serviceName) params.append("serviceName", serviceName);
    let data = params.toString();
    console.log(data);
    return this.http.post('/api/deregister', data, httpOptions)
      .map(res => {
        // console.log(res);
        return res;
      });
  }

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
