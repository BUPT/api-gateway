"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const AdminRouter_1 = require("./router/AdminRouter");
const RegisterPlugin_1 = require("./plugin/RegisterPlugin");
const Router_1 = require("./router/Router");
const SwaggerFile_1 = require("./util/SwaggerFile");
const http = require("http");
let router = new AdminRouter_1.AdminRouter().getRouter();
let registerPlugin = new RegisterPlugin_1.RegisterPlugin();
let registerApp = registerPlugin.getRegisterApp();
// 初始化注册
registerPlugin.init();
registerApp.listen(8000);
// 生成swagger文件
let swaggerFile = new SwaggerFile_1.SwaggerFile();
swaggerFile.generateFile();
let adminApp = express();
adminApp.use("/", router);
adminApp.listen(8001);
let wcy_router = new Router_1.Router();
http.createServer(function (request, response) {
    response.writeHead(200, {
        "Content-Type": "text/html;charset=utf-8"
    });
    wcy_router.handleRequest(request, response, http);
}).listen(8002);
