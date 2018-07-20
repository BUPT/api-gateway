import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { BADRESP } from 'dns';

const httpOptions = {
  headers: new Headers({ 'Content-Type': 'application/json' })
};
@Injectable()
export class CreateAtomApiService {

  constructor(public http : Http) { }
  
  addAPI(apiname :string = null,method:string = null,
    APIType:string = null,area:string = null,path:string =null,
  address:string = null,port:string = null,response:any,
  des:string = null,paramslist:string[] = null,errorCode:string[] = null,tags?:string[],registerByJson?:string){
    let params = {}
    //前面是后台定义的数据库的字段，后面是前端自己定义的字段，进行相互匹配。
    if(apiname) params["name"] = apiname;
    if(APIType) params["APIType"] = APIType;
    if(area) params["area"] = area;
    if(method) params["method"] = method;
    if(des) params["des"] = des;
    if(path) params["path"] = path;
    if(address) params["address"] = address;
    if(port) params["port"] = port;
    if(response) params['response'] = response;
    if(paramslist) params["argument"] = paramslist;
    if(errorCode) params["errorCode"] = errorCode;
    var array = ["atom"];
    params["tags"] = array;
    params["registerByJson"] = "0";
    console.dir(params);
    //console.log(data);
    return this.http.post('/api/register', params, httpOptions)
      .map(res => {
        console.log(res);
        return res;
      });
  }
}
