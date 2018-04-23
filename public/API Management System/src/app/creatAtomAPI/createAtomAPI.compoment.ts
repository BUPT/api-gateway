import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NavComponent } from '../dashboard/nav.component';
import { Location } from '@angular/common';
// import * as $ from 'jquery';
declare var $: any;
// var count = 0;
@Component({
  selector: '',
  templateUrl: './createAtomAPI.component.html',
  styleUrls: ["./css/createAtomAPI.css"],
})

export class creatAtomAPIComponent implements OnInit {

  para = "";

  constructor(
    private parent: NavComponent,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {

  };
  //返回
  goBack(): void {
    this.location.back();
  }
  nameNext(): void {
    $("#nameDefinition").css("display", "none");
    $("#request").css("display", "inline");
  }
  pre(): void {
    $("#nameDefinition").css("display", "inline");
    $("#request").css("display", "none");
  }
  // count = 1;
  add(): void {
    var len = $("#tableParam").length;
    // alert(len);     
    len++;
    // alert(len);  
    var table = $(".tableParam");
  var addtr = $("<tr>" +
      " <td><input class='console-textbox' maxlength='99' type='text'></td>" +
      "<td><select id='type' class='console-textbox console-with-4'>" +
      "<option>Int</option>" +
      "<option>String</option>" +
      "<option>Long</option>" +
      "<option>Boolean</option>" +
      "<option>Float</option>" +
      "<option>Double</option>" +
      "</select></td>" +
      "<td><input type='checkbox'></td>" +
      "<td><input id='ts1' type='text' class='console-textbox'></td>" +
      "<td> <a class='console-mr2'>移除</a></td>" +
      "</tr>");
    addtr.appendTo(table);
    // this.count++;
    var td = $("td");
    td.css({ "padding": "20px", "text-align": "center" });
    var tr = $("tr");
    tr.css("border-bottom", "1px solid #E1E6EB");
    var ts = $(".console-textbox");
    var deletes = $(".console-mr2");
    addtr.children().children().click(function () {
      $("tr td a").each(function (index, domEle) {
        $(domEle).click(function () {
          // alert($(domEle).parent().parent().children(":first").text());
          $(domEle).parent().parent().remove();
        });
      });
    });
    // deletes.click(function(index){
    //   alert(1);
    //   alert($("td").attr("id"));
    //   alert(index);
    //   $("tr[id='"+index+"']").remove();
    // })
    deletes.css("color", "rgb(86, 154, 221)");
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
  }
  remove(): void {
    $("#tableParam").children().children().children().click(function () {
      $("tr td a").each(function (index,domEle) {
        $(domEle).click(function () {
          $(domEle).parent().parent().remove();
        });
      });
    });
  }
  //  remove(index): void{
  //   alert(1);
  //   // var len = $("#tableParam").length;    
  //   // alert();
  //   $("tr[id='"+index+"']").remove();
  //   // var tr = btn.parentElement.parentElement;
  //   // var tbl = tr.parentElement;
  //   // $(tr).parent().parent().remove();
  // }
  paramNext(): void {
    $("#goBack").css("display", "inline");
    $("#request").css("display", "none");
  }
  pres(): void {
    $("#request").css("display", "inline");
    $("#goBack").css("display", "none");

  }
  addBack(): void {
    $("#tableGoBack").append("<tr>" +
      " <td><input class='console-textbox' maxlength='99' type='text' placeholder='例如：400'></td>" +
      "<td><input class='console-textbox' maxlength='99' type='text' placeholder='例如：page not found'></td>" +
      "<td><input class='console-textbox text' maxlength='99' type='text' placeholder='必填，不超过2000个字符'></td>" +
      "<td> <a class='console-mr2'>移除</a></td>" +
      "</tr>");
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
    text.css("width","100%");
    var td = $("td");
    td.css({ "padding": "20px", "text-align": "center" });
    var deletes = $(".console-mr2");
    deletes.css("color", "rgb(86, 154, 221)");
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
