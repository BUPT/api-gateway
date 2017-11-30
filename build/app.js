"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const AdminRouter_1 = require("./router/AdminRouter");
const RegisterPlugin_1 = require("./plugin/RegisterPlugin");
const Router_1 = require("./router/Router");
const http = require("http");
let router = new AdminRouter_1.AdminRouter().getRouter();
let registerApp = new RegisterPlugin_1.RegisterPlugin().getRegisterApp();
let adminApp = express();
adminApp.use("/", router);
adminApp.listen(8001);
registerApp.listen(8000);
let wcy_router = new Router_1.Router();
http.createServer(function (request, response) {
    response.writeHead(200, {
        "Content-Type": "text/html;charset=utf-8"
    });
    wcy_router.handleRequest(request, response, http);
}).listen(8002);
