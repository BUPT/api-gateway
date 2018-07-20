import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

const httpOptions = {
  headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
};
const httpOption = {
  headers: new Headers({ 'Content-Type': 'application/json' })
};
@Injectable()
export class ModifyAtomApiService {
  data:Object;
  constructor(public http: Http) { }
  searchAPIByID(serviceID:string){
    let params = new URLSearchParams();
    if(serviceID) params.append("id", serviceID);
    let data = params.toString();
    console.log(data);
    return this.http.post('/api/queryServiceByID', data, httpOptions)
      .map(res => {
        // console.log(res);
        return res;
      });
  }
  modify(id:string, apiname :string,method:string,APIType:string,area:string,path:string,
    address:string,port:string,response:any,
    des:string,paramslist:string[],errorCode:string[],on:string = null,tags?:string[],registerByJson?:string){
      let params = {};
      if(id) params["id"] = id;
      if(apiname) params["name"] = apiname;
      if(APIType) params["APIType"] = APIType;
      if(area) params["area"] = area;
      if(method) params["method"] = method;
      if(des) params["des"] = des;
      if(path) params["path"] = path;
      if(address) params["address"] = address;
      if(port) params["port"] = port;
      if(response) params["response"] = response;
      if(paramslist) params["argument"] = paramslist;
      if(errorCode) params["errorCode"] = errorCode;
      if(on)params['on'] = on;
      var array = ["atom"];
      params["tags"] = array;
      params["registerByJson"] = "0";
      console.dir(params);
      return this.http.post('/api/updateService', params, httpOption)
        .map(res => {
          console.log(res);
          return res;
        });
    }
}
