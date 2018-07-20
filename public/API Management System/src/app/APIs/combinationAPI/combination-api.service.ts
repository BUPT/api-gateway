import { Injectable } from '@angular/core';
import { Http, Headers } from '../../../../node_modules/@angular/http';

const httpOptions = {
  headers: new Headers({ 'Content-Type': 'text/plain' })
};
@Injectable()
export class CombinationApiService {

  constructor(
    public http:Http
  ) { }
  getAllCombinationAPI() {
    return this.http.get('http://10.108.210.102:30000/apis/getAllAPI')
      .map(res => {
        return res;
      });
  }
 
}
