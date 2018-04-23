import { Component, OnInit, Output } from '@angular/core';
import { NavComponent } from '../../dashboard/nav.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgClass } from '@angular/common';
import { Api } from './atomAPI';
// import { API } from './dataAtomApi';
import { URLSearchParams, Headers } from '@angular/http';
import { ApiService } from '../api.service';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Pagination } from '../../pagination/pagination';
import { defaultIfEmpty } from 'rxjs/operator/defaultIfEmpty';

declare var $: any;
@Component({
  selector: '',
  templateUrl: './atomAPI.html',
  // styleUrls: ['./css/open.css'],
  providers: [ApiService]
})

export class atomAPIComponent implements OnInit {
  //前面的变量是赋值之后的数组，后面的变量是定义的各个字段。
  //查询所有API用的API；
  api = "";
  //分页用的API
  api_page;
  API: Api[];
  //改变状态的APi
  StatusApi: Api;
  status = "";
  selectedApi: Api;
  newStatus = "";
  offapi: Api;
  deleteApi: Api;
  modifyApi: Api;
  constructor(
    private parent: NavComponent,
    private route: ActivatedRoute,
    private router: Router,
    public ApiService: ApiService
  ) { }
  @Output()
  public pagination: Pagination = Pagination.defaultPagination;


  para = '';
  public createAtomAPI = "";
  public versionManagement = "";
  public performanceMonitoring = "";
  public routeManagement = "";
  // 初始化到哪的路径，当前活跃的路径是哪一个
  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.para = params['id'];
    });
    this.createAtomAPI = "/main/" + this.para + "/createAtomAPI";
    this.versionManagement = "/main/" + this.para + "/versionManagement";
    this.performanceMonitoring = "/main/" + this.para + "/performanceMonitoring";
    this.routeManagement = "/main/" + this.para + "/routeManagement";
    //得到所有的API
    this.ApiService.getAllAPI().subscribe(users => {
      //转换成对象，stringfy()转换成字符串
      this.api = JSON.parse(users['_body']);

      //分页
      this.initList();
      this.pagination.changePage = (() => {
        this.initList();
      });
    });;


  };
  //前面的api是传给onselect函数的值，也就是传给页面的值。后面的Api是上面定义的Api.
  onSelect(api: Api): void {
    this.selectedApi = api;
  }
  //分页
  private initList(): void {
    let url: string = 'your-url';
    let page = this.pagination.currentPage - 1;
    this.pagination.totalItems = this.api.length;
    //alert(this.api);
    let head = page * this.pagination.pageItems;
    let end = head + this.pagination.pageItems - 1;
    this.api_page = this.api.slice(head, end);
  }
  //根据名字查询一个API
  search(apiname: string) {
    if (apiname) {
      // alert(searchAPI);
      this.ApiService.searchAPI(apiname)
        .subscribe(res => {
          this.api = JSON.parse(res['_body']);
          // alert(this.api);
          //分页
          this.initList();
          this.pagination.changePage = (() => {
            this.initList();
          });
        });
    }
  }
  //删除按钮的提示
  onDeleteConfirm(event): void {
    console.log("delete function");
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  //下线传值
  off($event, api): void {
    // this.newStatus = api.id;
    this.offapi = api;
  }
  //下线操作
  offYes(): void {
    this.offapi.status = "已下线";
    alert("下线成功");
    $('#myModaloff').modal('toggle');
  }
  //删除传值
  delete($event, api) {
    this.deleteApi = api;
  }
  //删除操作
  deleteYes(): void {
    if (this.deleteApi.status == '已发布') {
      alert(' 请先将此API下线，然后在进行删除操作');
    }
    else {
      // alert(this.deleteApi.id);
      $("#" + this.deleteApi.apiname + "").parent().parent().remove();
    };
    $('#deleteModal').modal('hide');
  }
  //修改传值
  modify($event, api) {
    this.modifyApi = api;
    // alert(this.modifyApi);
  }
}