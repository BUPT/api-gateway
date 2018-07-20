import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NavComponent } from '../dashboard/nav.component';
import { Location } from '@angular/common';
import { CreateAtomApiService } from './create-atom-api.service';
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';
declare var $: any;
//下拉框选中的值和文本的值
let val = "";
let array = [];
//单选框的值
let checkChange = "";
let arrayCheck = [];

@Component({
  selector: '',
  templateUrl: './createAtomAPI.component.html',
  styleUrls: ["./css/createAtomAPI.css"],
})

export class creatAtomAPIComponent implements OnInit {
  data = "";
  para = "";
  //地区的数据
  Areadatas: string[] = ['北京', '安徽', '重庆', '天津', '上海', '江苏', '福建', '广东', '广西', '甘肃', '贵州', '河北', '河南', '湖北', '湖南', '黑龙江', '海南', '吉林', '江西', '辽宁', '内蒙古', '宁夏', '青海', '四川', '山东'];
  Areadata: string = '';
  area: string = '';
  //API类型的数据
  APITypedatas: string[] = ['消息类', '呼叫控制类', '外呼类', '多方通话类', 'IVR类', 'QOS类'];
  APITypedata: string = '';
  APIType: string = '';
  //API方法的数据
  Methoddatas: string[] = ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'HEAD'];
  Methoddata: string = '';
  Method: string = '';
  //params请求数据
  Paramsdata: string = '';
  Para: string = '';
  //请求参数
  paramsName = "";
  paramsType = "";
  paramsMust = "";
  paramsDes = "";
  //packageid对应参数名称的id，paramsDesid对应参数描述的id,paraTypeid对应参数类型的ID
  paramsNameid = "";
  paramsDesid = "";
  paraTypeid = "";
  checkBoxid = "";
  //错误码定义
  errorCode = "";
  errorMessage = "";
  errorDes = "";
  //错误码字段的id
  errorCodeId = "";
  errorMessageId = "";
  errorDesId = "";


  constructor(
    private parent: NavComponent,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public CreateAtomApiService: CreateAtomApiService,
  ) { }

  ngOnInit() {
    $("input").on("input", function () {
      //实时监控

      var pattern = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/g;
      var apiname = $("#apiname").val();
      if (apiname == "" || apiname == null) {
        $("#tip1").text("*请输入API名称");
        $("#tip1").css("color", "red");
      } else if (pattern.test(apiname) == false) {
        $("#tip1").text("*只支持含有汉字、数字、字母、下划线且不能以下划线开头和结尾");
        $("#tip1").css("color", "red");
      } else {
        $("#tip1").text("");
      }
    });
    $("#address").on("input", function () {
      var address = $("#address").val();
      var ad = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g
      if (address == null || address == "") {
        $("#tip4").text("*请输入API服务地址");
        $("#tip4").css("color", "red");
      } else if (ad.test(address) == false) {
        $("#tip4").text("*请输入合法的API服务地址");
        $("#tip4").css("color", "red");
      } else {
        $("#tip4").text("");
      }
    });
    $("#port").on("input", function () {
      var port = $("#port").val();
      var po = /^[0-9]*$/g;
      if (port == null || port == "") {
        $("#tip5").text("*请输入端口号");
        $("#tip5").css("color", "red");
      } else if (po.test(port) == false) {
        $("#tip5").text("*请输入合法的端口号");
        $("#tip5").css("color", "red");
      } else {
        $("#tip5").text("");
      }
    });
    $("textarea").on("input", function () {
      // alert(1);
      var des = $("#des").val();
      if (des == "" || des == null) {
        $("#tip2").text("*请输入API名称");
        $("#tip2").css("color", "red");
      } else {
        $("#tip2").text("");
      }
    });
  };


  //选择API方法
  setMethod() {
    var apiname = $("#apiname").val();
    if (apiname == "" || apiname == null) {
      $("#tip1").text("*请输入API名称");
      $("#tip1").css("color", "red");
    } else {
      $("#tip1").text("");
    }
    this.Method = this.Methoddata;
  }
  //选择API类型
  setAPIType() {
    var apiname = $("#apiname").val();
    if (apiname == "" || apiname == null) {
      $("#tip1").text("*请输入API名称");
      $("#tip1").css("color", "red");
    } else {
      $("#tip1").text("");
    }
    this.APIType = this.APITypedata;
  }
  //选择地区
  setArea() {
    var apiname = $("#apiname").val();
    if (apiname == "" || apiname == null) {
      $("#tip1").text("*请输入API名称");
      $("#tip1").css("color", "red");
    } else {
      $("#tip1").text("");
    }
    this.area = this.Areadata;

  }
  createAPI(apiName, des, path, address, port, successResult, errorResult) {
    // alert($("#" + paraTypeid).find("option:selected").val());
    //字段的顺序要跟服务的字段相对应。
    var response = {
      'successResult': successResult,
      'errorResult': errorResult
    }
    var tableParam = document.getElementById('tableParam');
    var countchildren1 = tableParam.childElementCount;
    var trid = "";
    var paramsNameid = "";
    var paramsDesid = "";
    var paraTypeid = "";
    var checkBoxid = "";
    var paramsList = new Array();
    for (var i = 1; i < countchildren1; i++) {
      trid = tableParam.children[i].id;
      paramsNameid = trid + "paramsNameid";
      paramsDesid = trid + "paramsDesid";
      paraTypeid = trid + "paraTypeid";
      checkBoxid = trid + "checkBoxid";
      // alert(paraTypeid);
      console.log($("#" + paraTypeid).find("option:selected").text());
      var paramsMap = {
        "paramsName": $("#" + paramsNameid).val(),
        "paramsDes": $("#" + paramsDesid).val(),
        "paramsType": $("#" + paraTypeid).find("option:selected").text(),
        "checkBox": $("#" + checkBoxid).is(':checked'),
      }
      paramsList.push(paramsMap);
    }
    console.log("list:", paramsList);
    //错误码
    var tableGoBack = document.getElementById('tableGoBack');
    var countchildren2 = tableGoBack.childElementCount;
    var errorid = "";
    var errorCodeId = "";
    var errorMessageId = "";
    var errorDesId = "";
    var errorList = new Array();
    for (var i = 1; i < countchildren2; i++) {
      errorid = tableGoBack.children[i].id;
      errorCodeId = errorid + "errorCodeId";
      errorMessageId = errorid + "errorMessageId";
      errorDesId = errorid + "errorDesId";
      var errorMap = {
        "errorCodeId": $("#" + errorCodeId).val(),
        "errorMessageId": $("#" + errorMessageId).val(),
        "errorDesId": $("#" + errorDesId).val()
      }
      errorList.push(errorMap);
    }
    console.log("errorList:", errorList);

    this.CreateAtomApiService.addAPI(apiName, this.Method, this.APIType,
      this.area, path, address, port, response, des, paramsList, errorList)
      .subscribe(addApi => {
        this.data = addApi['_body'];
        alert(this.data);
        this.location.back();
      })
  }
  //返回
  goBack(): void {
    this.location.back();
  }
  nameNext() {
    var apiname = $("#apiname").val();
    var des = $("#des").val();
    if (apiname == null || apiname == "") {
      $("#tip1").text("*请输入API名称");
      $("#tip1").css("color", "red");
      return false;
    } else if (des == null || des == "") {
      $("#tip2").text("*请输入API描述");
      $("#tip2").css("color", "red");
      return false;
    } else {
      $("#nameDefinition").css("display", "none");
      $("#request").css("display", "inline");
    }
  }
  pre(): void {
    $("#nameDefinition").css("display", "inline");
    $("#request").css("display", "none");
  }
  add(): void {
    var trid = new Date().getTime();
    this.paramsNameid = trid + 'paramsNameid';
    this.paramsDesid = trid + 'paramsDesid';
    this.paraTypeid = trid + 'paraTypeid';
    this.checkBoxid = trid + 'checkBoxid';
    var objtr = document.createElement('tr');
    //删除所用的id
    let deleteid = (trid).toString() + 1;
    //序号用的id
    objtr.id = trid.toString();
    objtr.innerHTML = "<tr>" +
      "       <td ></td>" +
      "       <td><input id='" + this.paramsNameid + "' class='console-textbox' maxlength='99' type='text'></td> " +
      "       <td ><select id='" + this.paraTypeid + "' class='console-textbox console-with-4'>" +
      "       <option>Int</option>" +
      "       <option>String</option>" +
      "       <option>Long</option>" +
      "       <option>Boolean</option>" +
      "       <option>Float</option>" +
      "       <option>Double</option>" +
      "       </select></td>" +
      "       <td><input id = '" + this.checkBoxid + "' type = 'checkbox' value = ''></td>" +
      "       <td><input id='" + this.paramsDesid + "' type='text' class='console-textbox'></td> " +
      "       <td><button id = '" + deleteid + "' class='deleteCss' type='button'>删除</button></td>" +
      "</tr>";
    document.getElementById("tableParam").appendChild(objtr);
    var tableobj = document.getElementById('tableParam');
    var countchildren = tableobj.childElementCount;
    for (var i = 1; i < countchildren; i++) {
      tableobj.children[i].children[0].innerHTML = (i).toString();
    }
    console.log(this.paraTypeid);
    //删除一行
    $("#" + deleteid).click(function () {
      $("#" + deleteid).parent().parent().remove();
      var table = document.getElementById('tableParam');
      var countchildren = table.childElementCount;
      for (var i = 1; i < countchildren; i++) {
        table.children[i].children[0].innerHTML = (i).toString();
      }
    })
    var td = $("td");
    td.css({ "padding": "20px", "text-align": "center" });
    var tr = $("tr");
    tr.css("border-bottom", "1px solid #E1E6EB");
    var ts = $(".console-textbox");
    ts.css({
      "display": "inline-block", "vertical-align": "middle", "height": "32px", "padding": "6px",
      "transition": "none",
      "font-size": "12px",
      "line-height": "145%",
      "outline": "none",
      "border": "1px solid #CCC",
      "background": "#FFF",
      "color": " #555",
      "border-radius": "4px"
    });
    var deletes = $(".deleteCss");
    deletes.css({
      "display": "inline-block", "vertical-align": "middle", "height": "30px", "padding": "6px",
      "transition": "none",
      "font-size": "12px",
      "line-height": "145%",
      "outline": "none",
      "border": "1px solid #CCC",
      "background": "#00c1de",
      "color": " #fff",
      "border-radius": "4px"
    });
  }
  paramNext() {

    $("#path").on("input", function () {
      var path = $("#path").val();
      if (path == null || path == "") {
        $("#tip3").text("*请输入API请求路径");
        $("#tip3").css("color", "red");
      } else {
        $("#tip3").text("");
      }
    });
    $("#address").on("input", function () {
      var address = $("#address").val();
      var p = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g
      if (address == null || address == "") {
        $("#tip4").text("*请输入API服务地址");
        $("#tip4").css("color", "red");
      } else if (p.test(address) == false) {
        $("#tip4").text("*请输入合法的API服务地址");
        $("#tip4").css("color", "red");
      } else {
        $("#tip4").text("");
      }
    });
    $("#port").on("input", function () {
      var port = $("#port").val();
      var po = /^[0-9]*$/g;
      if (port == null || port == "") {
        $("#tip5").text("*请输入端口号");
        $("#tip5").css("color", "red");
      } else if (po.test(port) == false) {
        $("#tip5").text("*请输入合法的端口号");
        $("#tip5").css("color", "red");
      } else {
        $("#tip5").text("");
      }
    });
    var path = $("#path").val();
    var address = $("#address").val();
    var port = $("#port").val();
    if (path == null || path == "") {
      $("#tip3").text("*请输入API请求路径");
      $("#tip3").css("color", "red");
      return false;
    } else if (address == null || address == "") {
      $("#tip4").text("*请输入API服务地址");
      $("#tip4").css("color", "red");
      return false;
    } else if (port == null || port == "") {
      $("#tip5").text("*请输入端口号");
      $("#tip5").css("color", "red");
      return false;
    }
    else {
      $("#goBack").css("display", "inline");
      $("#request").css("display", "none");
    }
  }
  pres(): void {
    $("#request").css("display", "inline");
    $("#goBack").css("display", "none");

  }
  addBack(): void {
    var errorid = new Date().getTime();
    this.errorCodeId = errorid + 'errorCodeId';
    this.errorMessageId = errorid + 'errorMessageId';
    this.errorDesId = errorid + 'errorDesId';
    var objtr = document.createElement('tr');
    //删除所用的id
    let deleteid = (errorid).toString() + 1;
    //序号用的id
    objtr.id = errorid.toString();
    // alert(objtr.id);
    objtr.innerHTML = "<tr>" +
      "       <td></td>" +
      "       <td><input id='" + this.errorCodeId + "' class='console-textbox' maxlength='99' type='text' placeholder='例如：400'>" +
      "       <td><input id='" + this.errorMessageId + "' class='console-textbox' maxlength='99' type='text' placeholder='例如：page not found'></td>" +
      "       <td><input id='" + this.errorDesId + "' class='console-textbox text' maxlength='99' type='text' placeholder='必填，不超过2000个字符'></td> " +
      "       <td><button id = '" + deleteid + "' class='deleteCss' type='button'>删除</button></td>" +
      "</tr>";
    document.getElementById("tableGoBack").appendChild(objtr);
    var tableobj = document.getElementById('tableGoBack');
    var countchildren = tableobj.childElementCount;
    for (var i = 1; i < countchildren; i++) {
      tableobj.children[i].children[0].innerHTML = (i).toString();
    }
    $("#" + deleteid).click(function () {

      $("#" + deleteid).parent().parent().remove();
      var table = document.getElementById('tableGoBack');
      var countchildren = table.childElementCount;
      for (var i = 1; i < countchildren; i++) {
        table.children[i].children[0].innerHTML = (i).toString();
      }
    })
    var ts = $(".console-textbox");
    ts.css({
      "display": "inline-block", "vertical-align": "middle", "height": "32px", "padding": "6px",
      "transition": "none",
      "font-size": "12px",
      "line-height": "145%",
      "outline": "none",
      "border": "1px solid #CCC",
      "background": "#FFF",
      "color": " #555",
      "border-radius": "4px"
    });
    var text = $(".text");
    text.css("width", "100%");
    var td = $("td");
    td.css({ "padding": "20px", "text-align": "center" });
    var deletes = $(".deleteCss");
    deletes.css({
      "display": "inline-block", "vertical-align": "middle", "height": "30px", "padding": "6px",
      "transition": "none",
      "font-size": "12px",
      "line-height": "145%",
      "outline": "none",
      "border": "1px solid #CCC",
      "background": "#00c1de",
      "color": " #fff",
      "border-radius": "4px"
    });
    var tr = $("tr");
    tr.css("border-bottom", "1px solid #E1E6EB");
    $("tr").children().children().click(function () {
      $("tr td a").each(function (index, domEle) {
        $(domEle).click(function () {
          // alert($(domEle).parent().parent().children(":first").text());
          $(domEle).parent().parent().remove();
        });
      });
    });
  }

}
