"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CallControllRouter_1 = require("./CallControllRouter");
const NumTransRouter_1 = require("./NumTransRouter");
const url = require("url");
class Router {
    constructor() {
        this.options = {
            host: 'www.baidu.com',
            port: '',
            path: '/'
        };
    }
    handleRequest(request, response, http) {
        var params = url.parse(request.url, true).query;
        if (params.type) {
            switch (params.type) {
                case "呼叫控制":
                    if (this.callControllRouter == undefined || this.callControllRouter == null) {
                        this.callControllRouter = new CallControllRouter_1.CallControllRouter("localhost", "root", "", "router", this.options, http, request, response, params.phoneNumber);
                    }
                    else {
                        this.callControllRouter.setRequest(request);
                        this.callControllRouter.setResponse(response);
                        this.callControllRouter.setHttp(http);
                        this.callControllRouter.setPhone(params.phoneNumber);
                    }
                    this.callControllRouter.CallControll_Handler();
                    break;
                case "号码翻译":
                    if (this.numTransRouter == undefined || this.numTransRouter == null) {
                        this.numTransRouter = new NumTransRouter_1.NumTransRouter("localhost", "root", "", "router", this.options, http, request, response, params.targetedPhone);
                    }
                    else {
                        this.numTransRouter.setRequest(request);
                        this.numTransRouter.setResponse(response);
                        this.numTransRouter.setHttp(http);
                        this.numTransRouter.setPhone(params.targetedPhone);
                    }
                    this.numTransRouter.NumTrans_Handler();
                    break;
                default:
                    console.log("No Handler Found!");
                    response.statusCode = 404;
                    response.end();
            }
        }
    }
}
exports.Router = Router;
