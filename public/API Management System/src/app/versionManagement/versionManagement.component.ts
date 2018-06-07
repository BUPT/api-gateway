import { Component, OnInit ,Output} from '@angular/core';
import { NavComponent } from '../dashboard/nav.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgClass } from '@angular/common';
import { Location } from '@angular/common';
import { VERSION } from '../testversiondata';
import { Version } from 'app/version';
import { Pagination } from '../pagination/pagination';
declare var $: any;

@Component({
  selector: 'app-versions',
  templateUrl: './versionManagement.component.html',
  styleUrls: ['./versionManagement.component.css']
})
export class versionManagementComponent implements OnInit {

  newversion = "";
  oldversion = "";
  APIname = "CallControl";
  notice = "";
  versions = VERSION;
  old: Version;
  new: Version;

  id = "";//查看弹窗的标题中版本号



  constructor(
    private parent: NavComponent,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  @Output()
  public pagination: Pagination = Pagination.defaultPagination;

  ngOnInit() {
    // this.parent.setActiveByPath("versionManagement",this.parent.versionManagement);
    this.check();
    this.initList();
    this.pagination.changePage = (() => {
      this.initList();
    });
  };

  private initList(): void {
    let url: string = 'your-url';
    let page = this.pagination.currentPage - 1;
    this.pagination.totalItems = VERSION.length;
    let head = page * this.pagination.pageItems;
    let end = head + this.pagination.pageItems;
    this.versions = VERSION.slice(head, end);
  }

  goBack(): void {
    this.location.back();
  }

  exchange($event, version): void {//切换传值
    this.newversion = version.id;
    this.new = version;
  }

  yes(): void {//确认切换
    if (this.notice == "") {
      alert("请填写备注！");
    }
    else {
      this.old.state = false;
      this.new.state = true;
      this.new.notice = this.notice;
      alert("切换成功！");
      $('#changeModal').modal('hide');
      this.check();
    }
  }

  look(version): void {//查看
    this.id = version.id;
  }

  check(): void {
    this.versions.forEach(element => {
      if (element.state == true) {
        this.oldversion = element.id;
        this.old = element;
      }
    });
    this.notice = "";
  }

}