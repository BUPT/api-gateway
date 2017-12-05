import express = require("express");
import proxy = require("express-http-proxy");
<<<<<<< HEAD
import {PerformanceMonitorPlugin} from "./PerformanceMonitorPlugin"
import { request } from "https";
import { print } from "util";
let registerApp = express();
=======
let registerApp = express();
import {CombinationUrlService} from "../service/CombinationUrlService";
import { ApiInfoService } from "../service/ApiInfoService";
import { GeneralResult } from "../general/GeneralResult";
import {AdminPlugin} from "../plugin/AdminPlugin";
import { CombinationPlugin } from "./CombinationPlugin";
import { UrlService } from "../service/UrlService";
>>>>>>> 7b8875d097b14c5d46d2878ed607b6d83b0e52af

/**
 * 注册API数据
 */
class RegisterPlugin{
    private _registerApp = registerApp;
    public getRegisterApp(){
        return this._registerApp;
    }
<<<<<<< HEAD
    public loadData(url): void{
=======

    /**
     * 重新加载注册API
     * @param url 
     */
    public async loadData(url: { [key: string]: any }[], combiantionUrlApiinfos:{[key: string]: any}[]): Promise<void>{
>>>>>>> 7b8875d097b14c5d46d2878ed607b6d83b0e52af
        let data = new Map();
        // _router数组存在数据，则清空
        if(this._registerApp._router){
            this._registerApp._router.stack.length = 2;
        }
        // 加载数据
        for(let i = 0; i < url.length; i++){
            let value = { "to": url[i].to, "status": url[i].status};
            data.set(url[i].from, value);
            if(url[i].status == 0){
<<<<<<< HEAD
                let performanceMonitorPlugin:PerformanceMonitorPlugin =  new PerformanceMonitorPlugin();
                performanceMonitorPlugin.soursePerformanceHost = url[i].to ;
                this._registerApp.use(url[i].from,performanceMonitorPlugin.soursePerformanceMonitor.bind(performanceMonitorPlugin),proxy(url[i].to, {
=======
                this._registerApp.use(url[i].from, proxy(url[i].to, {
>>>>>>> 7b8875d097b14c5d46d2878ed607b6d83b0e52af
                    proxyReqPathResolver: function (req) {
                        return req.originalUrl;
                    }
                }));
                // 为相关的API标注，以便后期注销
<<<<<<< HEAD
                this._registerApp._router.stack[this._registerApp._router.stack.length - 1].appId = url[0].appId;
=======
                this._registerApp._router.stack[this._registerApp._router.stack.length - 1].appId = url[0].APPId;
                this._registerApp._router.stack[this._registerApp._router.stack.length - 1].url = url[0].from;
            }
        }

        // 加载组合API数据
        let combinationUrlService: CombinationUrlService = new CombinationUrlService();
        let apiInfoService: ApiInfoService = new ApiInfoService();
        let urlService: UrlService = new UrlService();
        let combinationUrls: GeneralResult = await combinationUrlService.query({});
        // 存在组合API
        if(combinationUrls.getResult() == true){
            let combinationPlugin: CombinationPlugin = new CombinationPlugin();
            for(let i = 0; i < (combinationUrls.getDatum()).length; i++){
                let url: string = combinationUrls.getDatum()[0].url;
                let atomUrls: string [] = (await combinationUrlService.getAtomUrl(url)).getDatum();
                let adminPlugin: AdminPlugin = new AdminPlugin();
                let result: Map<string, any> = await adminPlugin.testAPI(atomUrls);
                if(result.get("flag") == true){
                    registerApp.use(url, combinationPlugin.combinationService);
                    // 为相关的API标注，以便后期注销
                    this._registerApp._router.stack[this._registerApp._router.stack.length - 1].appId = "001";
                    this._registerApp._router.stack[this._registerApp._router.stack.length - 1].url = url;
                    data.set(url, {to: "http://www.linyijin.club:8000", status:"0"});

                    // 将数据插入数据库
                    for(let j = 0; j < combiantionUrlApiinfos.length; j++){
                        if(combiantionUrlApiinfos[j].URL == url){
                            let apiInfo: {[key: string]: string} = {};
                            apiInfo.ID = combiantionUrlApiinfos[j].ID;
                            apiInfo.appId = combiantionUrlApiinfos[j].appId;
                            apiInfo.name = combiantionUrlApiinfos[j].name;
                            apiInfo.type = combiantionUrlApiinfos[j].type;
                            apiInfo.argument = combiantionUrlApiinfos[j].argument;
                            apiInfo.event = combiantionUrlApiinfos[j].event;
                            apiInfo.URL = combiantionUrlApiinfos[j].URL;
                            apiInfoService.insert([apiInfo]);
                            break;
                        }
                    }
                    urlService.insert([{"APPId": "001", "to": "http://www.linyimin.club:8000", "from": url, "status": "0", "is_new": "1" }]);
                }
>>>>>>> 7b8875d097b14c5d46d2878ed607b6d83b0e52af
            }
        }
        console.log(data);
    }

<<<<<<< HEAD
    public addData(url): void{
        let data = new Map();
        // 先清空之前已经注册公司的数据，再重新重新注册改公司的API数据
        let appId: string = url[0].appId;
=======

    public async loadCombinationData(): Promise<void>{

    }

    /**
     * 添加注册
     * @param url 
     */
    public addData(url): void{
        let data = new Map();
        // 先清空之前已经注册公司的数据，再重新重新注册改公司的API数据
        let appId: string = url[0].APPId;
>>>>>>> 7b8875d097b14c5d46d2878ed607b6d83b0e52af
        if(this._registerApp._router && this._registerApp.stack){
            for(let i = 2; i < this._registerApp._router.satck.length; i++){
                if(this._registerApp._router.stack[i].appId === appId){
                    // 删除一个元素
                    this._registerApp._router.stack.splice(i, 1);
                    i--;
                }
            }
        }
        // 加载新数据
        for (let i = 0; i < url.length; i++) {
            let value = {"to": url[i].to, "status": url[i].status};
            data.set(url[i].from, value);
            if(url[i].status == 0){
                this._registerApp.use(url[i].from, proxy(url[i].to, {
                    proxyReqPathResolver: function (req) {
                        return req.originalUrl;
                    }
                }));
                // 为相关的API标注，以便后期注销
                this._registerApp._router.stack[this._registerApp._router.stack.length - 1].appId = url[0].appId;
<<<<<<< HEAD
=======
                this._registerApp._router.stack[this._registerApp._router.stack.length - 1].url = url[0].from;
>>>>>>> 7b8875d097b14c5d46d2878ed607b6d83b0e52af
            }
        }
        console.log(data);
    }
}
export{RegisterPlugin};