import { Component, OnInit } from '@angular/core';
import { CombinationApiService } from './combination-api.service';
import { Http, URLSearchParams } from '../../../../node_modules/@angular/http';
import { Pagination } from '../../pagination/pagination';


declare var $: any;
@Component({
  selector: 'ng-table',
  templateUrl: './combinationAPI.html',
})

export class combinationAPIComponent implements OnInit {
  combinationAPI = [];//所有的组合API信息
  selectedApi;//点击选择的组合API
  ComAPI;//组合API的参数
  deleteComAPIMsg;//删除组合API传参
  constructor(
    public combinationService: CombinationApiService,
    public http: Http
  ) {
  }
  public pagination: Pagination = Pagination.defaultPagination;

  ngOnInit() {
    this.combinationService.getAllCombinationAPI().subscribe(res => {
      var data = eval('(' + res['_body'] + ')');
      if (data.result == true) {
        this.combinationAPI = data.datum;
         // 分页
      this.initList();
      this.pagination.changePage = (() => {
        this.initList();
      });
      }
    });


  };
  onSelect(api): void {
    this.selectedApi = api;
    console.log(JSON.parse(this.selectedApi["argument"]));
    this.ComAPI = JSON.parse(this.selectedApi["argument"]);
    var params = [];
    for (var c in this.ComAPI) {
      var param = {};
      param["paramsName"] = c;
      param["paramsType"] = this.ComAPI[c];
      params.push(param);
    }
    this.selectedApi["params"] = params;
    console.log(params);
  }
  deleteCombinationAPI(api) {
    this.deleteComAPIMsg = api;
    console.log(this.deleteComAPIMsg.name);
  }
  deleteYes() {
    let params = new URLSearchParams();
    params.append('name', this.deleteComAPIMsg.name);
    let datatosend = params.toString()
    this.http.get('http://10.108.213.206:30000/apis/delete', { search: datatosend }).map(res => res.json()).subscribe(res => {
      console.log(res);
      if (res.result == true) {
        alert('组合API已经成功删除！');
        $("#deleteModal").modal('hide');
        $("#" + this.deleteComAPIMsg.event).remove();
      }
      else {
        alert('删除出现错误！');
      }
    })
  }
   // 分页
   private initList(): void {
    let url: string = 'your-url';
    let page = this.pagination.currentPage - 1;
    this.pagination.totalItems = this.combinationAPI.length;
    // alert(this.api);
    let head = page * this.pagination.pageItems;
    let end = head + this.pagination.pageItems;
    this.combinationAPI = this.combinationAPI.slice(head, end);
  }
}