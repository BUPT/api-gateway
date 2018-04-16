import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../dashboard/nav.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgClass } from '@angular/common';
import { Location } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-routes',
  templateUrl: './routeManagement.component.html',
  styleUrls: ['./routeManagement.component.css']
})
export class routeManagementComponent implements OnInit {



  constructor(
    private parent: NavComponent,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.parent.setActiveByPath(this.parent.routeManagement, "");
    //this.para = this.parent.para;

  };

  modify($event): void {
    $($event.target).parent().parent().children('td').eq(1).children('textarea').removeAttr("disabled");
  }

  yes($event): void {
    var newurl = $($event.target).parent().parent().children('td').eq(1).children('textarea').val();
    alert("修改成功！");
    $($event.target).parent().parent().children('td').eq(1).children('textarea').val(newurl);
    $($event.target).parent().parent().children('td').eq(1).children('textarea').attr("disabled", "disabled");
  }

  goBack(): void {
    this.location.back();
  }
}