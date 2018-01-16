var apiGatewayCtrls = angular.module('apiGatewayCtrls', []);

apiGatewayCtrls.controller('StartCtrl', ['$scope', '$http', 'ngDialog',
    function($scope, $http, ngDialog) {
        $scope.title = "可视化API组合系统";

        $scope.file = "文件";
        $scope.file1 = "新建";
        $scope.file2 = "打开";
        $scope.file3 = "查看";
        $scope.file4 = "重命名";
        $scope.file5 = "用户管理";
        $scope.file6 = "退出";

        $scope.operate = "操作";
        $scope.operate1 = "生成json格式树";
        $scope.operate2 = "注册";
        $scope.operate3 = "撤销";
        $scope.operate4 = "调试";
        $scope.operate5 = "json格式树导出";

        $scope.tool = "工具";
        $scope.tool1 = "";
        $scope.tool2 = "";
        $scope.tool3 = "";

        $scope.window = "窗口";
        $scope.window1 = "";
        $scope.window2 = "";

        $scope.help = "帮助";
        $scope.help1 = "API帮助";
        $scope.help2 = "";

        $scope.show = function() { //生成JSON树结构
            console.log(JSON.stringify(SDT.returnTree()[0])); //返回树，接受一个参数，参数类型为值为 true 或 false 的变量，若值为 true 则返回精简树（元素只包含 id 、 name 、 foresideObjId 、 childEles 信息），不可用于重绘；若值为 false 则返回完整树，完整树可用于重绘 注: 重绘要求有页面有图标信息，即相应的 class = "sdt-drag-element-lis" 的 <div> 标签所包涵的图标列表
            console.log(JSON.stringify(SDT.returnTree()[1]));
            console.log(JSON.stringify(SDT.returnTree()[2]));
            document.getElementById("jsontext").innerHTML = JSON.stringify(SDT.returnTree()[0], null, 2);
        };

        $scope.outjson = function() { //json格式树导出
            var txtdata = JSON.stringify(SDT.returnTree()[0], null, 2);
            // alert(txtdata);
            var content = "" + txtdata;
            var blob = new Blob([content], { type: "text/plain;charset=utf-8" });
            saveAs(blob, "tree.json"); //saveAs(blob,filename) //仅限于chorme的下载目录里
        }

        // $scope.center = function() { //居中
        //     SDT.backCenter(); //返回画布中心，不接受参数
        // };

        $scope.goback = function() { //撤销
            SDT.removeELe(); //删除元素，接受一个参数，参数类型为数组，数组元素应为要删除的元素的 id 注: 若不传入参数则删除最近放置的元素            
        };

        $scope.save = function() { //存储设置
            var condition = $scope.condition;
            //alert(condition);
            var nodeid = $("#nodeid").val();
            var asn = $("#asn").val();
            //alert(asn);
            var type = $("#tp").val();
            var name = $("#name").find("option:selected").text();
            var id = $("#idid").val();
            var input = $("#inputt").val();
            var output = $("#output").val();
            var url = $("#url").val();

            var Json = SDT.returnTree()[0];

            function json(jsontree) { //根据id找到相应树节点
                if ((typeof jsontree == 'object') && (jsontree.constructor == Object.prototype.constructor)) {
                    var arrey = [];
                    arrey.push(jsontree);
                } else arrey = jsontree;
                for (var i = 0; i < arrey.length; i++) {
                    var node = arrey[i];
                    if (node.id == nodeid) {
                        if (condition == undefined) { node.condition = ""; } else { node.condition = condition; }
                        node.asntype = asn;
                        node.name = name;
                        $("#nodeid").children('text').html(node.name);
                        node.url = url;
                        node.isfirst = 0;
                        alert("设置成功！");
                        return;
                    }
                    if (node.childEles && node.childEles.length > 0) {
                        json(node.childEles);
                    }
                }
            }
            //json(Json);

            $http({
                method: 'get',
                url: 'http://www.linyimin.club:8001/apis/storeAtomApiInfo',
                params: {
                    "moduleId": nodeid,
                    "type": type,
                    "name": name,
                    "id": id,
                    "argument": input,
                    "response": output,
                    "URL":url,
                    "isAsync":asn,
                    "condition":condition
                }, // 传递数据作为字符串，从前台传到后台  
            }).success(function(data, status, headers, config) { //这里的data，就是后台传递过来的数据jsonArray  
                if (data.result == true) {
                    json(Json);
                } else {
                    alert(data.reason);
                }
            }).error(function(data, status, headers, config) {
                alert("错误");
            });
        };

        $scope.register = function() { //点击注册
            ngDialog.open({
                template: 'register.html',
                className: 'ngdialog-theme-default',
                controller: function($scope) {
                    $scope.show = function() {
                        $scope.closeThisDialog(); //关闭弹窗
                    };
                    $scope.registeryes = function() {
                        $http({
                            method: 'post',
                            url: 'http://www.linyimin.club:8001/apis/registerCombinationAPI',
                            params: {
                                "name": $scope.r_name,
                                "ID": $scope.r_id,
                                "argument": $scope.r_input,
                                "response": $scope.r_output,
                                "combinationUrl": $scope.r_url,
                                "flowJson": JSON.stringify(SDT.returnTree()[0], null, 2)
                            }, // 传递数据作为字符串，从前台传到后台  
                        }).success(function(data, status, headers, config) { //这里的data，就是后台传递过来的数据jsonArray  
                            if (data.result == true) {
                                alert("注册成功！");
                                $scope.closeThisDialog(); //关闭弹窗
                            } else {
                                alert(data.reason);
                            }
                        }).error(function(data, status, headers, config) {
                            alert("错误");
                        });
                    }
                }
            });
        };

        $scope.debug = function() { //点击调试
            ngDialog.open({
                template: 'debug.html',
                className: 'ngdialog-theme-default',
                controller: function($scope) {
                    $scope.show = function() {
                        $scope.closeThisDialog(); //关闭弹窗
                    };
                    $scope.debugyes = function() {
                        $http({
                            method: 'get',
                            url: 'http://www.linyimin.club:8001/apis/debugAPI',
                            params: {
                                "url": $scope.d_url
                            }, // 传递数据作为字符串，从前台传到后台  
                        }).success(function(data, status, headers, config) { //这里的data，就是后台传递过来的数据jsonArray  
                            // if (data.result == false) {
                            //     alert("见控制台处信息");
                            $scope.debuginformation = data.result;
                            // } else {
                            //     alert(data.reason);
                            // }
                        }).error(function(data, status, headers, config) {
                            alert("true");
                            $scope.debuginformation = data.result;
                        });
                    }
                }
            });
        };

    }
]);