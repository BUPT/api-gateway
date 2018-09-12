import { Component, OnInit, Output } from '@angular/core';
import { NavComponent } from '../../dashboard/nav.component';
import { Router, ActivatedRoute, Params, RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';
import { Api } from './atomAPI';
import { URLSearchParams, Headers, RequestOptions, Http } from '@angular/http';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Pagination } from '../../pagination/pagination';

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
  apiReponse;
  api = [];
  //分页用的API
  api_page;
  //删除API用的返回数据
  data;
  API: Api[];
  //改变状态的APi
  StatusApi: Api;
  status = "";
  selectedApi: Api;
  newStatus = "";
  offapi;
  deleteApi;
  modifyApi;
  APITypedatas: string[] = ['消息API', '呼叫控制类', '外呼类API', '多方通话类API', 'IVR类API', 'QOS类API'];
  APITypedata: string = '';
  APIType: string = '';
  Areadatas: string[] = ['北京', '安徽', '重庆', '天津', '上海', '江苏', '福建', '广东', '广西', '甘肃', '贵州', '河北', '河南', '湖北', '湖南', '黑龙江', '海南', '吉林', '江西', '辽宁', '内蒙古', '宁夏', '青海', '四川', '山东'];
  Areadata: string = '';
  area: string = '';
  paramsNameid;
  paraTypeid;
  checkBoxid;
  paramsDesid;
  //API方法的数据
  Methoddatas: string[] = ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'HEAD'];
  Methoddata: string = '';
  Method: string = '';
  //错误码字段的id
  errorCodeId = "";
  errorMessageId = "";
  errorDesId = "";
  //判断执行增加函数的标志
  flag = false;
  // 
  yamlAPI;
  //发布传值
  publishApi;


  constructor(
    private parent: NavComponent,
    private route: ActivatedRoute,
    private router: Router,
    public ApiService: ApiService,
    public http: Http
  ) { }
  @Output() modifyData;
  public pagination: Pagination = Pagination.defaultPagination;


  para = '';
  public fileList;
  public createAtomAPI = "";
  public modifyAtomAPI = "";
  public versionManagement = "";
  public performanceMonitoring = "";
  public routeManagement = "";

  // 初始化到哪的路径，当前活跃的路径是哪一个
  ngOnInit() {
    this.route.params.subscribe((params) => {
      // console.log(params['id']);
      this.para = params['id'];
    });
    this.modifyAtomAPI = "/main/" + this.para + "/modifyAtomAPI";
    this.createAtomAPI = "/main/" + this.para + "/createAtomAPI";
    this.versionManagement = "/main/" + this.para + "/versionManagement";
    this.performanceMonitoring = "/main/" + this.para + "/performanceMonitoring";
    this.routeManagement = "/main/" + this.para + "/routeManagement";
    this.getAllAPI();

  };
  getAllAPI():void{
       //得到所有的API
       this.ApiService.getAllAPI().subscribe(apidata => {
        //转换成对象，stringfy()转换成字符串
        this.apiReponse = JSON.parse(apidata["_body"]);
        //apiRes字符串数组
        var apiRes = apidata["_body"];
        //如果data是字符串，使用eval("("+data+")")可以将其转换为json对象，和JSON.parse的功能一样。
        //如果data是json对象，使用eval("("+data+")")会报错，eval一个json对象，没有什么作用，这个时候不需要使用eval方法，直接用data即可。
        //array是JSON对象
        var array = eval("(" + apiRes + ")");
        console.log(array);
        var i = 0;
        for (i = 0; i < array.length; i++) {
          //取第i个值放在api里面
          // if(array[i].Value.tags[0] == "atom"){
          this.api.push(array[i].Value);
          //用来存放新数组的
          let newApi = [];
          // 这是需要插进去的id
          let key = {};
          for (var s in this.api) {
            //key是原来数组，循环加入
            key = this.api[s]
            //为key数组增加了一个id属性
            key['id'] = array[s].Key;
            //将整个key列表加入newApi这个数组里面【{}】
            newApi.push(key);
          }
  
        }
        for (var j = 0; j < this.api.length; j++) {
          // alert(this.api[j].on);
          if (this.api[j].on === "true") {
            this.api[j].status = "已发布";
          }
          else {
            this.api[j].status = "已创建";
          }
        }
        // 分页
        this.initList();
        this.pagination.changePage = (() => {
          this.initList();
        });
        // }
      });
  }
  public uploadFile(event) {
    this.fileList = event.target.files;
  }
  //上传 
  public submitUploadFile() {
    if (this.fileList.length > 0) {
      let file: File = this.fileList[0];
      // console.log(file);
      let formData = new FormData();
      formData.append('api_file', file, file.name);
      let headers = new Headers();
      headers.append('Accept', 'multipart/form-data');
      let options = new RequestOptions({ headers: headers });
      this.http.post("/api/registerByYaml", formData, options)
        .map(res => {
          alert(res['_body']); 
          // window.location.reload();
        })
        .catch(error => Observable.throw(error))
        .subscribe(

        )
    }
  }
  //前面的api是传给onselect函数的值，也就是传给页面的值。后面的Api是上面定义的Api.
  onSelect(api: Api): void {
    this.selectedApi = api;

    this.yamlAPI = this.selectedApi["argument"];
    console.log((this.selectedApi["argument"]));
    // if (this.selectedApi["params"] == undefined) {
    //   if (typeof (this.selectedApi["argument"]) == 'string') {
    //     this.yamlAPI = eval("(" + this.selectedApi["argument"] + ")");
    //     var params = [];
    //     for (var c in this.yamlAPI) {
    //       var param = {};
    //       param["paramsName"] = c;
    //       param["paramsType"] = this.yamlAPI[c];
    //       params.push(param);
    //     }
    //     this.selectedApi["params"] = params;
    //   } else {
    //     this.yamlAPI = this.selectedApi["argument"];
    //     var params = [];
    //     for (var c in this.yamlAPI) {
    //       var param = {};
    //       param["paramsName"] = c;
    //       param["paramsType"] = this.yamlAPI[c];
    //       params.push(param);
    //     }
    //     this.selectedApi["params"] = params;
    //   }

    // }
  }
  // 分页
  private initList(): void {
    let url: string = 'your-url';
    let page = this.pagination.currentPage - 1;
    this.pagination.totalItems = this.api.length;
    // alert(this.api);
    let head = page * this.pagination.pageItems;
    let end = head + this.pagination.pageItems;
    this.api_page = this.api.slice(head, end);
  }
  //修改API
  modify(data): void {
    if (data.status == '已发布') {
      alert(' 请先将此API下线，然后在进行修改操作');
    }
    else {
      this.router.navigate(["/main/" + 1 + "/atomAPI/modifyAtomAPI"], { queryParams: { 'id': data.id } })
    }
  }
  //根据名字查询一个API
  search(apiname: string) {
    console.log(this.api);
    // alert( this.APIType);
    var temp = [];
    for (var s = 0; s < this.api.length; s++) {
      if (this.api[s].name == apiname || this.api[s].APIType == this.APIType || this.api[s].area == this.area) {
        temp.push(this.api[s]);
      } else if (apiname == "" && this.APIType == "" && this.area == "") {
        temp.push(this.api[s]);
        // this.ApiService.getAllAPI().subscribe(apidata => {
        //   console.log(apidata["_body"]);
        // })
      }
      else if (this.api[s].name == apiname && this.api[s].APIType == this.APIType && this.api[s].area == this.area) {
        temp.push(this.api[s]);
      }
    }
    this.api = temp;
    //分页
    this.initList();
    this.pagination.changePage = (() => {
      this.initList();
    });
  }
  //下线传值
  off(api): void {
    this.offapi = api;
    console.log(this.offapi);
  }
  //下线操作
  offYes(): void {
    var serviceId = this.offapi.id;
    console.log(serviceId);
    var dc = "bupt";
    this.ApiService.serviceDown(serviceId, dc).subscribe(res => {
      this.offapi.status = '已创建';
    })
  }
  //删除传值
  delete(api) {
    this.deleteApi = api;
  }
  //删除操作
  deleteYes(): void {
    if (this.deleteApi.status == '已发布') {
      alert(' 请先将此API下线，然后在进行删除操作');
      $('#deleteModal').modal('hide');
    }
    else {
      this.ApiService.deleteAPI(this.deleteApi.id, this.deleteApi.name)
        .subscribe(res => {
          // this.data = res['_body'];
          console.log(res);
          $('#deleteModal').modal('hide');
          location.reload();
        });
    };
   
  }
  setAPIType() {
    this.APIType = this.APITypedata;
  }
  setArea() {
    this.area = this.Areadata;
  }
  //选择API方法
  setMethod() {
    this.Method = this.Methoddata;
  }
  cancel() {
    $("#modifyModal").modal("toggle");
    // location.reload();
  }
publishMsg(api){
  this.publishApi = api;
}
  publish(): void {
    var serviceId = this.publishApi.id;
    var dc = "bupt";
    this.ApiService.serviceUp(serviceId, dc).subscribe(res => {
      console.log(res);
      this.publishApi.status = '已发布';
    })
  }

}
