import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../dashboard/nav.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgClass } from '@angular/common';
import { Location } from '@angular/common';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { LogService } from './log.service';

declare var $: any;

@Component({
  selector: 'app-logs',
  templateUrl: './logCheckup.component.html',
})
export class logCheckupComponent implements OnInit {
  use=[];

  source: LocalDataSource;

  constructor(
    private parent: NavComponent,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public LogService: LogService
  ) {
    this.source = new LocalDataSource(this.data);
  }



  ngOnInit() {
    // this.parent.setActiveByPath("versionManagement",this.parent.versionManagement);

    //得到所有的日志信息
    this.LogService.getAllLog().subscribe(data => {
      //转换成对象，stringfy()转换成字符串
      var datas = JSON.parse(data['_body']);   
      if (datas._result == true) {
        for (let item of datas._datum){
          this.use.push(item);
        }
      }
      else {
        alert("error！" + datas.error);
      }
    });
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
      region: {
        title: '地区',
        filter: true
      },
      service: {
        title: 'API',
        filter: true
      },
      type: {
        title: '类型',
        filter: true
      },
      time: {
        title: '被调用时间',
        filter: true
      },
      method: {
        title: 'HTTP方法',
        filter: true
      },
      requireBag: {
        title: '请求包大小(字节)',
        filter: true
      },
      ip: {
        title: '请求IP',
        filter: true
      },
      requestBag: {
        title: '返回包大小(字节)',
        filter: true
      },
      status: {
        title: '返回状态码',
        filter: true
      },
      responseTime: {
        title: '响应时间(ms)',
        filter: true
      }
    },
    //mode: "inline",
    actions: false,
    noDataMessage: "没有符合条件的数据",
    pager: {
      perPage: 15
    }
  };

  data = this.use; 

}