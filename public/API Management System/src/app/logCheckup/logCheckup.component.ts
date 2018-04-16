import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../dashboard/nav.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgClass } from '@angular/common';
import { Location } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-logs',
  templateUrl: './logCheckup.component.html',
})
export class logCheckupComponent implements OnInit {



  constructor(
    private parent: NavComponent,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }



  ngOnInit() {
    // this.parent.setActiveByPath("versionManagement",this.parent.versionManagement);
  };

  goBack(): void {
    this.location.back();
  }

  public totalItems: number = 64;
  public currentPage: number = 4;
  public smallnumPages: number = 0;

  public setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  public pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }


  settings = {
    columns: {
      api: {
        title: 'API',
        filter: true
      },
      type:{
        title:'类型',
        filter:true
      },
      time: {
        title: '被调用时间',
        filter: true
      },
      method: {
        title: 'HTTP方法',
        filter: true
      },
      requireBag:{
        title:'请求包大小',
        filter:true
      },
      ip:{
        title:'请求IP',
        filter: true
      },
      requestBag:{
        title:'返回包大小(字节)',
        filter:true
      },
      status:{
        title:'返回状态码(字节)',
        filter:true
      },
      length:{
        title:'响应时间(ms)',
        filter: true
      },
      XFF:{
        title:'XXF头',
        filter:true
      }
    },
    //mode: "inline",
    actions: false,
    noDataMessage: "没有符合条件的数据",
    pager:{
      perPage:15
    }
  };

  data = [
    {
      api: "/callControl",
      type:"组合API",
      time: "2018-03-22 13:32:22",
      method:"POST",
      requireBag:"300",
      ip:"13.24.78.78",
      requestBag:"435",
      status:"200",
      length: "20",
      XFF:"cbdjsougvnwl"     
    },
    {
      api: "/numberChange",
      type:"原子API",
      time: "2018-04-05 23:42:12",
      method:"GET",
      requestBag:"234",
      requireBag:"456",
      status:"404",
      length: "25",
      ip:"13.24.33.78",
      XFF:"caedcwevg"
    },
    {
      api: "/callControl",
      type:"组合API",
      time: "2018-03-22 13:32:22",
      method:"POST",
      requireBag:"300",
      ip:"13.24.78.78",
      requestBag:"435",
      status:"200",
      length: "20",
      XFF:"cbdjsougvnwl"     
    },
    {
      api: "/callControl",
      type:"组合API",
      time: "2018-03-22 13:32:22",
      method:"POST",
      requireBag:"300",
      ip:"13.24.78.78",
      requestBag:"435",
      status:"200",
      length: "20",
      XFF:"cbdjsougvnwl"     
    },
    {
      api: "/callControl",
      type:"组合API",
      time: "2018-03-22 13:32:22",
      method:"POST",
      requireBag:"300",
      ip:"13.24.78.78",
      requestBag:"435",
      status:"200",
      length: "20",
      XFF:"cbdjsougvnwl"     
    },
    {
      api: "/callControl",
      type:"组合API",
      time: "2018-03-22 13:32:22",
      method:"POST",
      requireBag:"300",
      ip:"13.24.78.78",
      requestBag:"435",
      status:"200",
      length: "20",
      XFF:"cbdjsougvnwl"     
    },
    {
      api: "/callControl",
      type:"组合API",
      time: "2018-03-22 13:32:22",
      method:"POST",
      requireBag:"300",
      ip:"13.24.78.78",
      requestBag:"435",
      status:"200",
      length: "20",
      XFF:"cbdjsougvnwl"     
    },
    {
      api: "/callControl",
      type:"组合API",
      time: "2018-03-22 13:32:22",
      method:"POST",
      requireBag:"300",
      ip:"13.24.78.78",
      requestBag:"435",
      status:"200",
      length: "20",
      XFF:"cbdjsougvnwl"     
    },
    {
      api: "/callControl",
      type:"组合API",
      time: "2018-03-22 13:32:22",
      method:"POST",
      requireBag:"300",
      ip:"13.24.78.78",
      requestBag:"435",
      status:"200",
      length: "20",
      XFF:"cbdjsougvnwl"     
    },
    {
      api: "/callControl",
      type:"组合API",
      time: "2018-03-22 13:32:22",
      method:"POST",
      requireBag:"300",
      ip:"13.24.78.78",
      requestBag:"435",
      status:"200",
      length: "20",
      XFF:"cbdjsougvnwl"     
    },
    {
      api: "/callControl",
      type:"组合API",
      time: "2018-03-22 13:32:22",
      method:"POST",
      requireBag:"300",
      ip:"13.24.78.78",
      requestBag:"435",
      status:"200",
      length: "20",
      XFF:"cbdjsougvnwl"     
    },
    {
      api: "/callControl",
      type:"组合API",
      time: "2018-03-22 13:32:22",
      method:"POST",
      requireBag:"300",
      ip:"13.24.78.78",
      requestBag:"435",
      status:"200",
      length: "20",
      XFF:"cbdjsougvnwl"     
    },
    {
      api: "/numberChange",
      type:"原子API",
      time: "2018-04-05 23:42:12",
      method:"GET",
      requestBag:"234",
      requireBag:"456",
      status:"404",
      length: "25",
      ip:"13.24.33.78",
      XFF:"caedcwevg"
    },
    {
      api: "/numberChange",
      type:"原子API",
      time: "2018-04-05 23:42:12",
      method:"GET",
      requestBag:"234",
      requireBag:"456",
      status:"404",
      length: "25",
      ip:"13.24.33.78",
      XFF:"caedcwevg"
    },
    {
      api: "/numberChange",
      type:"原子API",
      time: "2018-04-05 23:42:12",
      method:"GET",
      requestBag:"234",
      requireBag:"456",
      status:"404",
      length: "25",
      ip:"13.24.33.78",
      XFF:"caedcwevg"
    },
    {
      api: "/numberChange",
      type:"原子API",
      time: "2018-04-05 23:42:12",
      method:"GET",
      requestBag:"234",
      requireBag:"456",
      status:"404",
      length: "25",
      ip:"13.24.33.78",
      XFF:"caedcwevg"
    },
    {
      api: "/numberChange",
      type:"原子API",
      time: "2018-04-05 23:42:12",
      method:"GET",
      requestBag:"234",
      requireBag:"456",
      status:"404",
      length: "25",
      ip:"13.24.33.78",
      XFF:"caedcwevg"
    },
    {
      api: "/numberChange",
      type:"原子API",
      time: "2018-04-05 23:42:12",
      method:"GET",
      requestBag:"234",
      requireBag:"456",
      status:"404",
      length: "25",
      ip:"13.24.33.78",
      XFF:"caedcwevg"
    },
    {
      api: "/numberChange",
      type:"原子API",
      time: "2018-04-05 23:42:12",
      method:"GET",
      requestBag:"234",
      requireBag:"456",
      status:"404",
      length: "25",
      ip:"13.24.33.78",
      XFF:"caedcwevg"
    },
    {
      api: "/numberChange",
      type:"原子API",
      time: "2018-04-05 23:42:12",
      method:"GET",
      requestBag:"234",
      requireBag:"456",
      status:"404",
      length: "25",
      ip:"13.24.33.78",
      XFF:"caedcwevg"
    },
    {
      api: "/numberChange",
      type:"原子API",
      time: "2018-04-05 23:42:12",
      method:"GET",
      requestBag:"234",
      requireBag:"456",
      status:"404",
      length: "25",
      ip:"13.24.33.78",
      XFF:"caedcwevg"
    },
    {
      api: "/numberChange",
      type:"原子API",
      time: "2018-04-05 23:42:12",
      method:"GET",
      requestBag:"234",
      requireBag:"456",
      status:"404",
      length: "25",
      ip:"13.24.33.78",
      XFF:"caedcwevg"
    }
  ];
}