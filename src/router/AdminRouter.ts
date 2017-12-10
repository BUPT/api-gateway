import express = require("express");
let router = express.Router();

import {AdminPlugin} from "../plugin/AdminPlugin";
import {UserPlugin} from "../plugin/UserPlugin";
import {RegisterPlugin} from "../plugin/RegisterPlugin";
import {CombinationPlugin} from "../plugin/CombinationPlugin";
import { Config } from "../config/config";

import {PerformanceMonitorPlugin} from "../plugin/PerformanceMonitorPlugin";

class AdminRouter{
    private _router = router;
    public getRouter(){
        this.setRouter();
        return this._router;
    }
    public setRouter(){
        let config: Config = new Config();
        let adminPlugin: AdminPlugin = new AdminPlugin();
        let userPlugin: UserPlugin = new UserPlugin();
        let registerPlugin: RegisterPlugin = new RegisterPlugin();
        let combinationPlugin: CombinationPlugin = new CombinationPlugin();

        let performanceMonitor:PerformanceMonitorPlugin = new PerformanceMonitorPlugin();

        // 允许跨域访问
        this._router.all('*', adminPlugin.allowCORSAccess)
        //性能监控
        this._router.all('*',performanceMonitor.logPerformanceMonitor)
        // 对管理员操作进行basic-auth身份认证
        this._router.all("/apis/*", adminPlugin.basicAuth);
        /**
         * @swagger
         * /apis/register:
         *     get:
         *       description: 重启服务并注册默认swagger配置文件下的API数据
         *       deprecated: false
         *       tags:
         *           - "API管理"
         */
        this._router.get("/apis/register", adminPlugin.APIRegister);

        /**
         * @swagger
         * /apis/uploads:
         *   get:
         *       description: 上传API的swagger配置文件完成API数据的添加注册
         *       deprecated: false
         *       tags:
         *           - "API管理"
         */
        this._router.get("/apis/uploads", adminPlugin.uploadFileView);

        // 上传文件接口
        this._router.post("/apis/uploads", adminPlugin.upload);
        /**
         * @swagger
         * /apis/viewAPIs:
         *   get:
         *       description: 可视化查看API
         *       deprecated: false
         *       tags:
         *           - "查看API"
         *       parameters:
         *         - name: fileName
         *           in: query
         *           description: swagger配置文件的名称 
         *           required: false
         *           type: string
         */
        this._router.get("/apis/viewAPIs", adminPlugin.viewAPIs);

        /**
         * @swagger
         * /user/doLogin:
         *   get:
         *       description: 用户登录
         *       deprecated: false
         *       tags:
         *           - "用户管理"
         *       parameters:
         *         - name: username
         *           in: query
         *           description: 用户名
         *           required: true
         *           type: string
         *         - name: pwd
         *           in: query
         *           description: 用户登录密码
         *           required: true
         *           type: string
         *       produces:
         *         - application/json
         *       responses:
         *         200:
         *           description:OK
         */
        this._router.get("/user/doLogin", userPlugin.doLogin);



        /**
         * @swagger
         * /user/register:
         *   get:
         *       description: 用户注册
         *       deprecated: false
         *       tags:
         *           - "用户管理"
         *       parameters:
         *         - name: username
         *           in: query
         *           description: 用户名
         *           required: true
         *           type: string
         *         - name: pwd
         *           in: query
         *           description: 用户登录密码
         *           required: true
         *           type: string
         *         - name: realname
         *           in: query
         *           description: 用户名真实姓名
         *           required: true
         *           type: string
         *         - name: email
         *           in: query
         *           description: 用户邮箱
         *           required: true
         *           type: string
         *         - name: role
         *           in: query
         *           description: 用户角色
         *           required: true
         *           type: string
         *       produces:
         *         - application/json
         *       responses:
         *         200:
         *           description:OK
         */
        this._router.get("/user/register", userPlugin.register);


        /**
         * @swagger
         * /user/getAllUser:
         *   get:
         *       description: 获取全部用户信息
         *       deprecated: false
         *       tags:
         *           - "用户管理"
         *       produces:
         *         - application/json
         *       responses:
         *         200:
         *           description:OK
         */
        this._router.get("/user/getAllUser", userPlugin.getAllUser);


        /**
         * @swagger
         * /user/getUserByName:
         *   get:
         *       description: 根据用户名获取用户信息
         *       deprecated: false
         *       tags:
         *           - "用户管理"
         *       parameters:
         *         - name: username
         *           in: query
         *           description: 用户名
         *           required: true
         *           type: string
         *       produces:
         *         - application/json
         *       responses:
         *         200:
         *           description:OK
         */
        this._router.get("/user/getUserByName", userPlugin.getUserByname);

        /**
         * @swagger
         * /user/removeUserByName:
         *   get:
         *       description: 根据用户名删除用户信息
         *       deprecated: false
         *       tags:
         *           - "用户管理"
         *       parameters:
         *         - name: username
         *           in: query
         *           description: 用户名
         *           required: true
         *           type: string
         *       produces:
         *         - application/json
         *       responses:
         *         200:
         *           description:OK
         */
        this._router.get("/user/removeUserByName", userPlugin.removeUserByName);

        /**
         * @swagger
         * /user/updateUser:
         *   get:
         *       description: 更改用户信息
         *       deprecated: false
         *       tags:
         *           - "用户管理"
         *       parameters:
         *         - name: username
         *           in: query
         *           description: 用户名
         *           required: true
         *           type: string
         *         - name: pwd
         *           in: query
         *           description: 用户登录密码
         *           required: true
         *           type: string
         *         - name: realname
         *           in: query
         *           description: 用户名真实姓名
         *           required: true
         *           type: string
         *         - name: email
         *           in: query
         *           description: 用户邮箱
         *           required: true
         *           type: string
         *         - name: role
         *           in: query
         *           description: 用户角色
         *           required: true
         *           type: string
         *       produces:
         *         - application/json
         *       responses:
         *         200:
         *           description:OK
         */
        this._router.get("/user/updateUser", userPlugin.updateUser);

        /**
         * @swagger
         * /apis/single:
         *   get:
         *       description: 获取单个API的界面
         *       deprecated: false
         *       tags:
         *           - "API管理"
         *       parameters:
         *         - name: id
         *           in: query
         *           description: API对应的ID
         *           required: true
         *           type: string
         *       produces:
         *         - application/json
         *       responses:
         *         200:
         *           description:OK
         */
        this._router.get("/apis/single", adminPlugin.viewSingleAPI);

        // 静态页面
        this._router.use("/static", express.static(config.getPath().static));

        // 组合API
        this._router.post("/combination/getFlowXML", combinationPlugin.getFloWXMLFile);
        /**
         * @swagger
         * /apis/getAllAPI:
         *   get:
         *       description: 获取全部API数据
         *       deprecated: false
         *       tags:
         *           - "API管理"
         *       produces:
         *         - application/json
         *       responses:
         *         200:
         *           description:OK
         */
        this._router.get("/apis/getAllAPI", adminPlugin.getAllAPI);


        /**
         * @swagger
         * /apis/getApiInfoByType:
         *   get:
         *       description: 根据API的类型获取API信息
         *       deprecated: false
         *       tags:
         *           - "API管理"
         *       parameters:
         *         - name: APIType
         *           in: query
         *           description: API的类型
         *           required: true
         *           type: string
         *       produces:
         *         - application/json
         *       responses:
         *         200:
         *           description:OK
         */
        this._router.get("/apis/getApiInfoByType", adminPlugin.getApiInfoByType);


        /**
         * @swagger
         * /apis/renameServiceName:
         *   get:
         *       description: 组合API重命名
         *       deprecated: false
         *       tags:
         *           - "API管理"
         *       parameters:
         *         - name: url
         *           in: query
         *           description: API对应的url
         *           required: true
         *           type: string
         *         - name: serviceName
         *           in: query
         *           description: 组合API的新名字
         *           required: true
         *           type: string
         *       produces:
         *         - application/json
         *       responses:
         *         200:
         *           description:OK
         */
        this._router.get("/apis/renameServiceName", adminPlugin.renameServiceName);

        /**
         * @swagger
         * /apis/debugAPI:
         *   get:
         *       description: 组合API测试
         *       deprecated: false
         *       tags:
         *           - "API管理"
         *       parameters:
         *         - name: url
         *           in: query
         *           description: API对应的ID
         *           required: true
         *           type: string
         *       produces:
         *         - application/json
         *       responses:
         *         200:
         *           description:OK
         */
        this._router.get("/apis/debugAPI", adminPlugin.debugAPI);

        /**
         * @swagger
         * /apis/getCombinationApiFlowXml:
         *   get:
         *       description: 获取组合API的流程xml文件
         *       deprecated: false
         *       tags:
         *           - "API管理"
         *       parameters:
         *         - name: url
         *           in: query
         *           description: 组合API对应的url
         *           required: true
         *           type: string
         *       produces:
         *         - application/json
         *       responses:
         *         200:
         *           description:OK
         */
        this._router.get("/apis/getCombinationApiFlowXml", combinationPlugin.getFlowData);



    }
}
export{AdminRouter};