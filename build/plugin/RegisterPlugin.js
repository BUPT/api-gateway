"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const proxy = require("express-http-proxy");
let registerApp = express();
/**
 * 注册API数据
 */
class RegisterPlugin {
    constructor() {
        this._registerApp = registerApp;
    }
    getRegisterApp() {
        return this._registerApp;
    }
    loadData(url) {
        let data = new Map();
        // _router数组存在数据，则清空
        if (this._registerApp._router) {
            this._registerApp._router.stack.length = 2;
        }
        // 加载数据
        for (let i = 0; i < url.length; i++) {
            let value = { "to": url[i].to, "status": url[i].status };
            data.set(url[i].from, value);
            if (url[i].status == 0) {
                this._registerApp.use(url[i].from, proxy(url[i].to, {
                    proxyReqPathResolver: function (req) {
                        return req.originalUrl;
                    }
                }));
                // 为相关的API标注，以便后期注销
                this._registerApp._router.stack[this._registerApp._router.stack.length - 1].appId = url[0].APPId;
                this._registerApp._router.stack[this._registerApp._router.stack.length - 1].url = url[0].from;
            }
        }
        console.log(data);
    }
    addData(url) {
        let data = new Map();
        // 先清空之前已经注册公司的数据，再重新重新注册改公司的API数据
        let appId = url[0].APPId;
        if (this._registerApp._router && this._registerApp.stack) {
            for (let i = 2; i < this._registerApp._router.satck.length; i++) {
                if (this._registerApp._router.stack[i].appId === appId) {
                    // 删除一个元素
                    this._registerApp._router.stack.splice(i, 1);
                    i--;
                }
            }
        }
        // 加载新数据
        for (let i = 0; i < url.length; i++) {
            let value = { "to": url[i].to, "status": url[i].status };
            data.set(url[i].from, value);
            if (url[i].status == 0) {
                this._registerApp.use(url[i].from, proxy(url[i].to, {
                    proxyReqPathResolver: function (req) {
                        return req.originalUrl;
                    }
                }));
                // 为相关的API标注，以便后期注销
                this._registerApp._router.stack[this._registerApp._router.stack.length - 1].appId = url[0].appId;
                this._registerApp._router.stack[this._registerApp._router.stack.length - 1].url = url[0].from;
            }
        }
        console.log(data);
    }
}
exports.RegisterPlugin = RegisterPlugin;
