import express = require("express");
import proxy = require("express-http-proxy");
import {PerformanceMonitorPlugin} from "./PerformanceMonitorPlugin"
import { request } from "https";
import { print } from "util";
import {CombinationUrlService} from "../service/CombinationUrlService";
import { ApiInfoService } from "../service/ApiInfoService";
import { GeneralResult } from "../general/GeneralResult";
import {AdminPlugin} from "../plugin/AdminPlugin";
import { CombinationPlugin } from "./CombinationPlugin";
import { UrlService } from "../service/UrlService";
import { config } from "bluebird";
import { Config } from "../config/config";
let registerApp = express();
/**
 * 注册API数据
 */
class RegisterPlugin{
    private _registerApp = registerApp;
    public getRegisterApp(){
        return this._registerApp;
    }

    /**
     * 重新加载注册API
     * @param url 
     */
    public async loadData(url: { [key: string]: any }[], combiantionUrlApiinfos:{[key: string]: any}[]): Promise<void>{
        let data = new Map();
        // 保存真实的API服务地址
        let config: Config = new Config();
        let realhost: string = config.getApiServer().host + ":" + config.getApiServer().port;
        // _router数组存在数据，则清空
        if(this._registerApp._router){
            this._registerApp._router.stack.length = 2;
        }
        // 加载数据
        for(let i = 0; i < url.length; i++){
            let value = { "to": url[i].to, "status": url[i].status};
            data.set(url[i].from, value);
            if(url[i].status == 0){
                let performanceMonitorPlugin:PerformanceMonitorPlugin =  new PerformanceMonitorPlugin();
                performanceMonitorPlugin.soursePerformanceHost = url[i].to ;
                this._registerApp.use(url[i].from,performanceMonitorPlugin.soursePerformanceMonitor.bind(performanceMonitorPlugin),proxy(url[i].to, {
                    proxyReqPathResolver: function (req) {
                        return req.originalUrl;
                    }
                }));
                // 为相关的API标注，以便后期注销
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
                let url: string = combinationUrls.getDatum()[i].url;
                let atomUrls: string [] = (await combinationUrlService.getAtomUrl(url)).getDatum();
                let adminPlugin: AdminPlugin = new AdminPlugin();
                let result: Map<string, any> = await adminPlugin.testAPI(atomUrls);
                if(result.get("flag") == true){
                    registerApp.use(url, combinationPlugin.combinationService);

                    // 获取url对应的APPId
                    let apiInfo: GeneralResult = await apiInfoService.query({url: atomUrls[0]});
                    // 为相关的API标注，以便后期注销
                    this._registerApp._router.stack[this._registerApp._router.stack.length - 1].appId = apiInfo.getDatum()[0].appId;
                    this._registerApp._router.stack[this._registerApp._router.stack.length - 1].url = url;
                    data.set(url, {to: realhost, status:"0"});
                }
            }
        }
        console.log(data);
    }


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
                this._registerApp._router.stack[this._registerApp._router.stack.length - 1].url = url[0].from;
            }
        }
        console.log(data);
    }


    /**
     * 初始化系统时从数据库读取数据进行注册
     */
    public async init(): Promise<void>{
        let urlService: UrlService = new UrlService();
        let apiInfoService: ApiInfoService = new ApiInfoService();
        // 获取url表中的所有数据
        let urlResult: GeneralResult = await urlService.query({});
        // 获取API_info表中的所有数据
        let apiInfoResult: GeneralResult = await apiInfoService.query({});
        // 保存组合API的信息(API_info)
        let combiantionUrlApiinfos: GeneralResult = await apiInfoService.query({ "type": "组合" });
        await this.loadData(urlResult.getDatum(), combiantionUrlApiinfos.getDatum());
        
    }
}
export{RegisterPlugin};