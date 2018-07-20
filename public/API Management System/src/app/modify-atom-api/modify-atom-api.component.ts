import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Api } from '../APIs/atomAPI/atomAPI';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ModifyAtomApiService } from './modify-atom-api.service';
import { selectOrCreateRenderHostElement } from '@angular/core/src/linker/view_utils';
declare var $: any;
@Component({
  selector: 'app-childen',
  templateUrl: './modify-atom-api.component.html',
  styleUrls: ['./modify-atom-api.component.css']
})
export class ModifyAtomApiComponent implements OnInit {
  @Input() api: Api;
  modifyApi;
  APITypedatas: string[] = ['消息类', '呼叫控制类', '外呼类', '多方通话类', 'IVR类', 'QOS类'];
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
  //根据ID查询API信息
  serviceID;

  constructor(
    private location: Location,
    public route: ActivatedRoute,
    private modifyAtomAPIService: ModifyAtomApiService,
  ) {
    // console.log(this.modifyAtomAPIService.data)
    //通过这种形式来接收父级页面传过来的值
    // this.route.params.subscribe((params) => {
    //   console.log(params);
    // });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      this.serviceID = params['id'];
      console.log(this.serviceID) ;
      })
    // this.route.params.subscribe((params) => {

    //   this.serviceID = params["mid"];

    // });
    this.modifyAtomAPIService.searchAPIByID(this.serviceID).subscribe(apidata => {
      console.log(apidata["_body"]);
      //apiRes字符串数组
      var apiRes = apidata["_body"];
      //如果data是字符串，使用eval("("+data+")")可以将其转换为json对象，和JSON.parse的功能一样。
      //如果data是json对象，使用eval("("+data+")")会报错，eval一个json对象，没有什么作用，这个时候不需要使用eval方法，直接用data即可。
      //array是JSON对象
      var arrays = eval("(" + apiRes + ")");
      console.log(arrays.Value);
      this.modifyApi = arrays.Value;

      $("#apiname").val(this.modifyApi.name);
      $("#apiname").val(this.modifyApi.name);
      $("#apiDes").val(this.modifyApi.des);
      $("#path").val(this.modifyApi.path);
      $("#apiDes").val(this.modifyApi.des);
      $("#address").val(this.modifyApi.address);
      $("#port").val(this.modifyApi.port);
      $("#successResult").val(this.modifyApi.response.successResult);
      $("#errorResult").val(this.modifyApi.response.errorResult);
      var count = $("#areas option").length;
      //  alert(count);
      for (var i = 0; i < count; i++) {
        //  alert(this.modifyApi.area);
        if (this.modifyApi.area !== undefined && $("#areas").get(0).options[i].text == this.modifyApi.area) {
          $($("#areas").get(0).options[i]).attr('selected', true);
          break;
        }
        else {
          $("#areas").text == "请选择";
        }
      }
      var count1 = $("#methods option").length;
      for (var k = 0; k < count1; k++) {
        if (this.modifyApi.method !== undefined && $("#methods").get(0).options[k].text == this.modifyApi.method) {
          $($("#methods").get(0).options[k]).attr('selected', true);
          break;
        } else {
          $("#methods").text == "请选择";
        }
      }
      var count2 = $("#APITypes option").length;
      for (var i = 0; i < count2; i++) {
        if (this.modifyApi.APIType !== undefined && $("#APITypes").get(0).options[i].text == this.modifyApi.APIType) {
          $($("#APITypes").get(0).options[i]).attr('selected', true);
          break;
        } else {
          $("#APItypes").text == "请选择";
        }
      }
      let array = [];
      let arrayCheck = [];
      if (this.modifyApi.argument) {
        for (var i = 0; i < this.modifyApi.argument.length; i++) {
          // alert(i);
          var trid = new Date().getTime();
          var objtr = document.createElement('tr');
          // // //删除所用的id
          // var deleteid = (trid).toString() + 1;
          // //序号用的id
          objtr.id = trid.toString();
          objtr.innerHTML = "<tr>" +
            "       <td ></td>" +
            "       <td><input id = '" + i + "Name" + "' class='console-textbox' maxlength='99' type='text' value='" + this.modifyApi.argument[i].paramsName + "'></td> " +
            "       <td ><select id='" + i + "' class='console-textbox console-with-4 paramsType'>" +
            "       <option>Int</option>" +
            "       <option>String</option>" +
            "       <option>Long</option>" +
            "       <option>Boolean</option>" +
            "       <option>Float</option>" +
            "       <option>Double</option>" +
            "       </select></td>" +
            "       <td><input id = '" + i + "Check" + "' type = 'checkbox' value = ''></td>" +
            "       <td><input id = '" + i + "Des" + "' type='text' value='" + this.modifyApi.argument[i].paramsDes + "' class='console-textbox'></td> " +
            "       <td><button id = '" + i + "deleteid" + "' class='deleteCss' type='button'>删除</button></td>" +
            "</tr>";
          document.getElementById("tableParam").appendChild(objtr);
          array.push(this.modifyApi.argument[i].paramsType);
        }

        var deleteId = [];
        for (var a = 0; a < this.modifyApi.argument.length; a++) {
          $("#" + a + "deleteid").click(function () {
            $("#" + (a-1) + "deleteid").parent().parent().remove();
            var table = document.getElementById('tableParam');
            var countchildren = table.childElementCount;
            for (var i = 1; i < countchildren; i++) {
              table.children[i].children[0].innerHTML = (i).toString();
            }
          })
        }

        for (var i = 0; i < this.modifyApi.argument.length; i++) {
          var count = $("#" + i + " option").length;
          for (var j = 0; j < count; j++) {
            if ($("#" + i).get(0).options[j].text == array[i]) {
              $($("#" + i).get(0).options[j]).attr('selected', true);
              break;
            }
          }
        }
        for (var i = 0; i < this.modifyApi.argument.length; i++) {
          $($("#" + i + "Check")).attr('checked', this.modifyApi.argument[i].checkBox);
        }
        var tableParam = document.getElementById('tableParam');
        var countchildren = tableParam.childElementCount;
        for (var i = 1; i < countchildren; i++) {
          tableParam.children[i].children[0].innerHTML = (i).toString();
        }
      }

      if (this.modifyApi.errorCode) {
        for (var k = 0; k < this.modifyApi.errorCode.length; k++) {
          var errorid = new Date().getTime();
          var objtr1 = document.createElement('tr');
          // //序号用的id
          objtr1.id = errorid.toString();
          // alert(objtr.id);
          objtr1.innerHTML = "<tr>" +
            "       <td></td>" +
            "       <td><input id='" + k + "errorCode" + "' class='console-textbox' maxlength='99' type='text' value='" + this.modifyApi.errorCode[k].errorCodeId + "'>" +
            "       <td><input id='" + k + "errorDes" + "'  class='console-textbox' maxlength='99' type='text' value='" + this.modifyApi.errorCode[k].errorDesId + "'></td>" +
            "       <td><input id='" + k + "errorMessage" + "'  class='console-textbox text' maxlength='99' type='text' value='" + this.modifyApi.errorCode[k].errorMessageId + "'></td> " +
            "       <td><button id = '" + k + "deleteErrorId" + "' class='deleteCss' type='button'>删除</button></td>" +
            "</tr>";
          document.getElementById("tableGoBack").appendChild(objtr1);
        }
        var tableGoBack = document.getElementById('tableGoBack');
        var countchildren1 = tableGoBack.childElementCount;
        for (var i = 1; i < countchildren1; i++) {
          tableGoBack.children[i].children[0].innerHTML = (i).toString();
        }
        for (var k = -1; k < this.modifyApi.errorCode.length; k++) {
          $("#" + k + "deleteErrorId").click(function () {
            console.log($("#" + k + "deleteErrorId"));
            $("#" + k + "deleteErrorId").parent().parent().remove();
            var table = document.getElementById('tableGoBack');
            var countchildren = table.childElementCount;
            for (var i = 1; i < countchildren; i++) {
              table.children[i].children[0].innerHTML = (i).toString();
            }
          })
        }
      }
      var td = $("td");
      td.css({ "padding": "5px", "text-align": "center" });
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
      var text = $(".text");
      text.css("width", "100%");
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
    })
    // let id=this.route.params
    // .switchMap((params: Params) => params['id'])
    // .subscribe(x=>this.blog=this.bService.getSelectedBlog(+x))
    //  }
    // alert(this.data);
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
  //返回
  goBack(): void {
    this.location.back();
  }
  addParams(): void {
    this.flag = true;
    // alert(this.flag);
    var trid = new Date().getTime();
    this.paramsNameid = trid + 'paramsNameid';
    this.paramsDesid = trid + 'paramsDesid';
    this.paraTypeid = trid + 'paraTypeid';
    this.checkBoxid = trid + 'checkBoxid';
    var obj = document.createElement('tr');
    //删除所用的id
    let deleteid = (trid).toString() + 1;
    //序号用的id
    obj.id = trid.toString();
    obj.innerHTML = "<tr>" +
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
    document.getElementById("tableParam").appendChild(obj);
    var tableobj = document.getElementById('tableParam');
    var countchildren1 = tableobj.childElementCount;
    for (var i = 1; i < countchildren1; i++) {
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
    td.css({ "padding": "5px", "text-align": "center" });
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
  addBack(): void {
    this.flag = true;
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
      "       <td><button id = '" + deleteid + "' class='deleteCss' type button'>删除</button></td>" +
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
    td.css({ "padding": "5px", "text-align": "center" });
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
  save(des, path, address, port, successResult, errorResult) {
    console.log(this.modifyApi.on);
    var response = {
      'successResult':successResult,
      'errorResult':errorResult
    }
    var tableParam = document.getElementById('tableParam');
    var countchildren1 = tableParam.childElementCount;
    var trid = "";
    var paramsNameid = "";
    var paramsDesid = "";
    var paraTypeid = "";
    var checkBoxid = "";
    var paramsList = new Array();
    if(this.modifyApi.argument){
    for (var d = 0; d < this.modifyApi.argument.length; d++) {
      var paramsOldMap = {
        "paramsName": $("#" + d + "Name").val(),
        "paramsDes": $("#" + d + "Des").val(),
        "paramsType": $("#" + d).find("option:selected").text(),
        "checkBox": $("#" + d + "Check").is(':checked'),
      }
      paramsList.push(paramsOldMap);
    }
  }
    if (this.flag == true) {
      for (let i = this.modifyApi.argument.length + 1; i < countchildren1; i++) {
        trid = tableParam.children[i].id;
        // alert(trid);
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
    if(this.modifyApi.errorCode){
    for (var e = 0; e < this.modifyApi.errorCode.length; e++) {
      var errorOldMap = {
        "errorCodeId": $("#" + e + "errorCode").val(),
        "errorMessageId": $("#" + e + "errorMessage").val(),
        "errorDesId": $("#" + e + "errorDes").val()
      }
      errorList.push(errorOldMap);
    }
  }
    if (this.flag == true) {
      for (let i = this.modifyApi.errorCode.length + 1; i < countchildren2; i++) {
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
    }
  
    console.log("errorList:", errorList);

    var id = this.serviceID;
    // alert(id);
    var apiName = this.modifyApi.name;
    // alert(this.Method);
    var method = $("#methods").find("option:selected").text();
    var area = $("#areas").find("option:selected").text();
    var APIType = $("#APITypes").find("option:selected").text();
    // alert(APIType);
    this.modifyAtomAPIService.modify(id, apiName, method, APIType,
      area, path, address, port,response, des, paramsList, errorList,this.modifyApi.on)
      .subscribe(addApi => {
        console.log(this.modifyApi.on);
        alert(addApi['_body']);
        this.location.back();
      })
  }
}
