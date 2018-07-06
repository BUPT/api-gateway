import { Injectable } from '@angular/core';
import { Http,Headers,Jsonp,URLSearchParams} from '@angular/http';
import { Observable} from 'rxjs';

const httpOptions={
  headers:new Headers({'Content-Type':'application/x-www-form-urlencoded'})
};

@Injectable()
export class FlowcontrolService {

  constructor(
    public http:Http
  ) { }

  // getflowcontroldata(){
  //   return this.http.get('/chart/flowcontrol/finde').map(res=>res.json());
  // };
  getflowcontroldata(){
    return this.http.get('http://10.108.208.51:8080/getRateLimits').map(res=>res.json());
  };
}
