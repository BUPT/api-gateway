import { Component, OnInit ,Input} from '@angular/core';
import { NavComponent } from '../dashboard/nav.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgClass} from '@angular/common';
import {FlowcontrolService} from './flowcontrol.service';
import {Flow} from './flowitem';
import { Http } from '@angular/http/src/http';
import { Headers } from '@angular/http/src/headers';
import { URLSearchParams } from '@angular/http/src/url_search_params';

const httpOptions = {
  headers:new Headers({'Content-Type':'application/x-www-form-urlencoded'})
  };
  const httpOption = {
    headers:new Headers({'Content-Type':'application/json'})
    };
declare var $: any;

@Component({
  selector: 'app-health',
  templateUrl: './flowControl.component.html',
  styleUrls:['./flowControl.component.css']
})
export class flowControlComponent implements OnInit {

  public flowarray=[];

  constructor (
    public http:Http,
                 private parent: NavComponent,
                 private route: ActivatedRoute,
                 private router: Router,
                 public FlowcontrolService:FlowcontrolService    
    ) {}

    ngOnInit(){
        this.parent.setActiveByPath(this.parent.flowControl,"");

        this.FlowcontrolService.getflowcontroldata().subscribe((data)=>{
          //this.flowarray=data.data;
          if(data._result==true){
            data._datum.lastChangeTime=this.timestampToTime(data._datum.lastChangeTime)
            //alert(data._datum.lastChangeTime)
            this.flowarray.push(data._datum);
            //alert(data._datum.minuteLimitVisit);
          }
        })
    };
  //删除
  public deleteflow($index):void{ 
      this.flowarray.splice($index, 1);//跟上面说的一样在初始化的时候要用到this  
  }
  //点击系统级别编辑
  public editallflow($event,item):void{
    //alert($($event.target).parents("tr").children('td').eq(2).text());
    $("#allname").val($($event.target).parents("tr").children('td').eq(0).text());
      $("#allunit").val($($event.target).parents("tr").children('td').eq(1).text());
      $("#allflowcontrol11").val($($event.target).parents("tr").children('td').eq(2).text());
      $("#allcreatetime").val($($event.target).parents("tr").children('td').eq(3).text());
      $("#allregion").val($($event.target).parents("tr").children('td').eq(4).text());
      $("#alldescription").val($($event.target).parents("tr").children('td').eq(5).text()); 
  }
  //点击api编辑
  public editapiflow($event,items):void{

      $("#apiname").val($($event.target).parents("tr").children('td').eq(0).text());
      $("#apiunit").val($($event.target).parents("tr").children('td').eq(1).text());
      $("#apiflowcontrol1").val($($event.target).parents("tr").children('td').eq(2).text());
      $("#apiflowcontrol2").val($($event.target).parents("tr").children('td').eq(3).text());
      $("#apiflowcontrol3").val($($event.target).parents("tr").children('td').eq(4).text());
      $("#apicreatetime").val($($event.target).parents("tr").children('td').eq(5).text()); 
      // $("#apidescription").val($($event.target).parents("tr").children('td').eq(4).text());

    //$("#apiname").val(items._id);
  }
//编辑确定
 public updatesure(apiunit,apiflowcontrol1,apiflowcontrol2,apiflowcontrol3):void{
   //alert($("#apiname").val());
  let params = new URLSearchParams();
  // var apiunit = $("#apiunit").val();
  // var apiflowcontrol1 = $("#apiflowcontrol1").val();
  // var apiflowcontrol2 = $("#apiflowcontrol2").val();
  // var apiflowcontrol3 = $("#apiflowcontrol3").val();
  params.append('secondLimitVisit',apiunit);
  params.append('minuteLimitVisit',apiflowcontrol1);
  params.append('hourLimitVisit',apiflowcontrol2);
  params.append('dayLimitVisit',apiflowcontrol3);
  params.append('monthLimitVisit','99999999999');

  let datatosend = params.toString()
  this.http.get('http://10.108.208.51:8080/changeRateLimits',{search:datatosend}).map(res=>res.json()).subscribe(res =>{
      if(res["_result"]==true){
        this.FlowcontrolService.getflowcontroldata().subscribe((data)=>{
          //this.flowarray=data.data;
          if(data._result==true){
            data._datum.lastChangeTime=this.timestampToTime(data._datum.lastChangeTime)
            this.flowarray[0]=data._datum;

            //alert(data._datum.minuteLimitVisit);
          }
        })
      }
  })
 }
 timestampToTime(timestamp) {
  var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  return Y+M+D+h+m+s;
}
  //添加
  public addflow():void{
     
  }   
}