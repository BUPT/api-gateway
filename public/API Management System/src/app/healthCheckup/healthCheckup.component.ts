import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../dashboard/nav.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgClass} from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-health',
  templateUrl: './healthCheckup.component.html',
  styleUrls:['./healthCheckup.component.css']
})
export class healthCheckupComponent implements OnInit {



  constructor (
                 private parent: NavComponent,
                 private route: ActivatedRoute,
                 private router: Router
    ) {}

    ngOnInit(){
        this.parent.setActiveByPath(this.parent.healthCheckup,"");

    };
    public doughnutChartLabels:string[] = ['内存使用率', '内存未使用率'];
  public doughnutChartData:number[] = [0.6,0.4];
  public doughnutChartType:string = 'doughnut';

  public pieChartLabels:string[] = ['CPU使用率', 'CPU未使用率'];
  public pieChartData:number[] = [0.3,0.7 ];
  public pieChartType:string = 'pie';

  public chartClicked(e:any):void{
    console.log(e);
  }

  public chartHovered(e:any):void{
    console.log(e);
  }
  public changeType():void{
    this.pieChartType=this.pieChartType==='pie'?'doughnut':'pie';
    this.doughnutChartType=this.doughnutChartType==='doughnut'?'pie':'doughnut';
  }
}