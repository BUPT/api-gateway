import { Component, OnInit, Output } from '@angular/core';
import { NavComponent } from '../dashboard/nav.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgClass } from '@angular/common';
import { Location } from '@angular/common';
import { PROVINCE } from '../provincedata';
import { Route } from './route';
//import { ROUTE } from './routedata';
import { Pagination } from '../pagination/pagination';
import { RouteService } from '../routeManagement/route.service';
declare var $: any;

@Component({
  selector: 'app-routes',
  templateUrl: './routeManagement.component.html',
  styleUrls: ['./routeManagement.component.css']
})
export class routeManagementComponent implements OnInit {
  provinces = PROVINCE;
  routes;//所有路由信息
  route_page;//当前页面路由信息
  clickroute: Route;

  constructor(
    private parent: NavComponent,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public RouteService: RouteService
  ) { }

  @Output()
  public pagination: Pagination = Pagination.defaultPagination;


  ngOnInit() {
    this.parent.setActiveByPath(this.parent.routeManagement, "");

    //得到所有的路由信息
    this.RouteService.getAllRoutes().subscribe(data => {
      //转换成对象，stringfy()转换成字符串
      this.routes = JSON.parse(data['_body']);

      //分页
      this.initList();
      this.pagination.changePage = (() => {
        this.initList();
      });
    });

  };

  private initList(): void {
    let url: string = 'your-url';
    let page = this.pagination.currentPage - 1;
    this.pagination.totalItems = this.routes.length;
    let head = page * this.pagination.pageItems;
    let end = head + this.pagination.pageItems - 1;
    this.route_page = this.routes.slice(head, end);
  }



  modify($event): void {
    $($event.target).parent().parent().children('td').eq(1).children('textarea').removeAttr("disabled");
  }

  yes($event, route): void {
    var newurl = $($event.target).parent().parent().children('td').eq(1).children('textarea').val();
    alert("修改成功！");
    this.clickroute = route;
    this.clickroute.service = newurl;
    $($event.target).parent().parent().children('td').eq(1).children('textarea').val(newurl);
    $($event.target).parent().parent().children('td').eq(1).children('textarea').attr("disabled", "disabled");
  }

  goBack(): void {
    this.location.back();
  }
}