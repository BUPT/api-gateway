import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../dashboard/nav.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgClass } from '@angular/common';
import {Http} from '@angular/http'
declare var $: any;
@Component({
  selector: 'app-health',
  templateUrl: './healthCheckup.component.html',
  styleUrls: ['./healthCheckup.component.css']
})
export class healthCheckupComponent implements OnInit {

  constructor(
    private parent: NavComponent,
    private route: ActivatedRoute,
    private router: Router,
    private http:Http,
  ) {}
  //点击请求接口  可以成功
  // url: string = 'http://112.74.173.198:8080/viewTopPerformance'; 
  // click() { 
  //   this.http.get(this.url).map(res => res.json()).subscribe(function (data) {//map方法转成正常的json格式的数据
  //   console.log(data);
  //   console.log(data._result);
  //   })   
  // } 

  ngOnInit() {
    this.parent.setActiveByPath(this.parent.healthCheckup, "");

  };
  public doughnutChartLabels: string[] = ['内存使用率', '内存未使用率'];
  public doughnutChartData: number[] = [0.6, 0.4];
  public doughnutChartType: string = 'doughnut';

  public pieChartLabels: string[] = ['CPU使用率', 'CPU未使用率'];
  public pieChartData: number[] = [0.3, 0.7];
  public pieChartType: string = 'pie';

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  public changeType(): void {
    this.pieChartType = this.pieChartType === 'pie' ? 'doughnut' : 'pie';
    this.doughnutChartType = this.doughnutChartType === 'doughnut' ? 'pie' : 'doughnut';
  }
}