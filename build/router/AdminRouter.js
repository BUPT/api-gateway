"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
let router = express.Router();
const AdminPlugin_1 = require("../plugin/AdminPlugin");
const UserPlugin_1 = require("../plugin/UserPlugin");
const RegisterPlugin_1 = require("../plugin/RegisterPlugin");
const CombinationPlugin_1 = require("../plugin/CombinationPlugin");
const config_1 = require("../config/config");
const PerformanceMonitorPlugin_1 = require("../plugin/PerformanceMonitorPlugin");
class AdminRouter {
    constructor() {
        this._router = router;
    }
    getRouter() {
        this.setRouter();
        return this._router;
    }
    setRouter() {
        let config = new config_1.Config();
        let adminPlugin = new AdminPlugin_1.AdminPlugin();
        let userPlugin = new UserPlugin_1.UserPlugin();
        let registerPlugin = new RegisterPlugin_1.RegisterPlugin();
        let combinationPlugin = new CombinationPlugin_1.CombinationPlugin();
        let performanceMonitor = new PerformanceMonitorPlugin_1.PerformanceMonitorPlugin();
        // 允许跨域访问
        this._router.all('*', adminPlugin.allowCORSAccess);
        //性能监控
        this._router.all('*', performanceMonitor.logPerformanceMonitor);
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
        this._router.get("/user/register", userPlugin.register);
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
         *       description: 用户注册
         *       deprecated: false
         *       tags:
         *           - "用户管理"
         *       parameters:
         *         - name: user_name
         *           in: query
         *           description: 用户名
         *           required: true
         *           type: string
         *         - name: password
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
    }
}
exports.AdminRouter = AdminRouter;
