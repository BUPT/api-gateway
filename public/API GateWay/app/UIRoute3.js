var routerApp = angular.module('routerApp', ['ui.router','ngDialog']);
routerApp.config(function($stateProvider, $urlRouterProvider) {//不再使用$routeProvider
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index', {
            url: '/index',//url
            views: {
                '': {//该模板将ui-view分成了两个ui-view部分
                    templateUrl: 'tpls3/index.html'
                },
                'topbar@index': {//上方导航栏
                    templateUrl: 'tpls3/topbar.html'
                },
                'main@index': {//主要部分
                    templateUrl: 'tpls3/home.html'
                }
            }
        })
        .state('index.usermng',{//用.来分隔子模块
            url:'/usermng',
            views:{
                'main@index':{
                    templateUrl:'tpls3/userlist.html',
                    controller:function ($scope,$http,$state) {
                        $http({
                            method:'GET',
                            url:'json/user.json'
                        }).then(function successCallback(response) {
                            $scope.names = response.data.datum;
                            console.log(response.data.datum);
                        },function errorCallback(response) {

                        });
                        $scope.edit = function () {
                            $state.go("index.edituser");
                        };
                        $scope.adduser=function () {
                            $state.go("index.adduser");
                        };
                       $scope.pluginmng1=function () {
                           $state.go("index.userpluginmng");
                       };
                        //错误弹窗

                        }

                }
                }
        })
        .state('index.edituser',{
            url:'/edituser',
            views:{
                'main@index':{
                    templateUrl:'tpls3/edituser.html',
                    controller:function ($scope,$http,$state) {
                        $scope.edituser=function () {
                            $http({
                                method:"GET",
                                url:"http://www.linyimin.club:8001/user/updateUser",
                                params:{
                                      username:$scope.username,
                                      realname:$scope.realname,
                                      pwd:$scope.pwd,
                                      email:$scope.email,
                                      role:$scope.role
                                }
                            }).success(function (data,status,headers,config) {
                                alert("success");
                            }).error(function (data,status,headers,config) {
                                alert("fail");
                            })
                        }
                    }

               }
            }
        })
        .state('index.adduser',{
            url:'/adduser',
            views:{
                'main@index':{
                    templateUrl:'tpls3/adduser.html'
                }
            }
        })
        .state('index.userpluginmng',{
            url:'/userpluginmng',
            views:{
                'main@index':{
                    templateUrl:'tpls3/pluginmng.html',
                    controller: function ($scope, $http, $state) {
                        $http({
                            method: 'GET',
                            url: 'json/user.json'
                        }).then(function successCallback(response) {
                            $scope.names = response.data.datum;
                            console.log(response.data.datum);
                        }, function errorCallback(response) {

                        });
                        $scope.edit = function () {
                            $state.go("index.editplugin");
                        };
                        $scope.addplugin=function () {
                            $state.go("index.addplugin");
                        };
                    }
                }
            }
        })
        .state('index.api', {
            url: '/api',
            views: {
                'main@index': {
                    templateUrl: 'tpls3/api.html',
                    controller: function ($scope, $http, $state) {//不用加控制器直接运行就可以加载出来。
                        $http({
                            method: 'GET',
                            url: 'http://www.linyimin.club:8001/apis/getAllAPIInfoWithKong'
                        }).then(function successCallback(response) {
                            // alert($scope.names);
                            $scope.names = response.data.datum;
                            console.log(response.data.datum);
                        }, function errorCallback(response) {
                            // 请求失败执行代码
                            //alert(response);
                        });
                        $scope.edit = function () {
                            $state.go("index.editapi");
                        }
                        $scope.delete = function () {

                        }
                        $scope.check = function (list) {
                            alert(list.upstreamUrl);
                            $http({
                                method: 'post',
                                url: 'http://www.linyimin.club:8001/viewSoursePerformance',
                                params: { "name": list.upstreamUrl}, // 传递数据作为字符串，从前台传到后台
                            }).then(function successCallback(response) { //这里的data，就是后台传递过来的数据jsonArray
                                alert(response.data._datum);
                                // alert($data);
                                // alert(data._totleVisit);
                                // $scope.data = [
                                //     data._serverName,data._totleVisit,data._concurrentVolume,data._averageResponseTime,data._unitTimeTotleVisit
                                // ]
                                // alert($scope.name);
                                api = response.data._datum;
                                alert(response.data._datum._serverName);
                                console.log(response.data._datum);
                                // $scope.apiname = data._serverName;
                                // $scope.totleVisit = data._totleVisit;
                                // $scope.concurrentVolume = data._concurrentVolume;
                                // $scope.averageResponseTime = data._averageResponseTime;
                                // $scope.unitTimeTotleVisit = data._unitTimeTotleVisit;
                            }, function errorCallback(response) {
                                alert("错误");
                                // $scope.information(data);
                            });
                        }
                        $scope.pluginmng1 = function () {
                            $state.go("index.userpluginmng");
                        };
                        // $scope.add = function () {
                        //     $state.go("index.addapi");
                        // }
                    }
                }
            }
        })
        .state('index.editapi',{
            url:'/editapi',
            views: {
                'main@index': {
                    templateUrl: 'tpls3/editapi1.html'
                }
            }
        })
        .state('index.report', {
            url: '/report',
            views: {
                'main@index': {
                    templateUrl: 'tpls3/pluginmng.html',
                    controller: function ($scope, $http, $state) {
                        $http({
                            method: 'GET',
                            url: 'json/user.json'
                        }).then(function successCallback(response) {
                            $scope.names = response.data.datum;
                            console.log(response.data.datum);
                        }, function errorCallback(response) {

                        });
                        $scope.edit = function () {
                            $state.go("index.editplugin");
                        };
                        $scope.addplugin=function () {
                            $state.go("index.addplugin");
                        };
                    }
                }
            }
        })
        .state('index.editplugin',{
            url:'/editplugin',
            views:{
                'main@index':{
                    templateUrl:'tpls3/editplugin.html'
                }
            }
        })
        .state('index.addplugin',{
            url:'/addplugin',
            views:{
                'main@index':{
                    templateUrl:'tpls3/addplugin.html'
                }
            }
        })
        .state('index.settings', {
            url: '/settings',
            views: {
                'main@index': {
                    template: '这里是系统设置'
                }
            }
        })
})
    .controller('popup',function ($scope,ngDialog) {
        $scope.clickToOpen = function () {
            ngDialog.open({
                template: '\
			                <p>确定要删除?</p>\
			                <div class="ngdialog-buttons">\
			                    <button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">No</button>\
			                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">Yes</button>\
			                </div>',
                plain:true,
                className:'ngdialog-theme-default',
                controller:function($scope){
                    $scope.show = function(){
                        $scope.closeThisDialog(); //关闭弹窗
                    }
                }
            });
        };
    })
    .controller("EngineeringController",["$scope",function($scope){
        $scope.engineer = {
            name: "Dani",
            currentActivity: "Fixing bugs"
        };

        $scope.activities =
            [
                "Writing code",
                "Testing code",
                "Fixing bugs",
                "Dancing"
            ];
    }])
