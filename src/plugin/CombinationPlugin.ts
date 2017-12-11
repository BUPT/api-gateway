import {CombinationService} from "../service/CombinationService";
import { GeneralResult } from "../general/GeneralResult";
import { CombinationFlowService } from "../service/CombinationFlowService";
import { ApiInfoService } from "../service/ApiInfoService";
import { UrlService } from "../service/UrlService";
import { Config } from "../config/config";
import { RegisterPlugin } from "./RegisterPlugin";
import rq = require("request-promise");

import events = require("events");
let eventEmitter = new events.EventEmitter();

let atomApiInfo: { [key: string]: string } [] = [];
let count: number = 0;


/**
 * 遍历树节点
 * @param node 
 */
function run(node: {[key: string]: any}) {
    if ((typeof node == 'object') && (node.constructor == Object.prototype.constructor)) {
        // 执行节点上的API
        // TODO 调用node节点上的api
        let config: Config = new Config();
        let url: string = "http://" + config.getApiServer().host + ":" + config.getApiServer().port + node.url;
        rq(url).then((body) => {
            let condition: string[] = [];
            let children = node.childEles;
            // 将响应值由字符串转成JSON
            let response: {[key: string]: string} = {};
            if(body.length > 0){
                response = JSON.parse(body);
            }
            // 执行孩子节点
            if (children) {
                for (let i = 0; i < children.length; i++) {
                    // 同步的情况
                    if (children[i].asntype == "0"){
                        // 处理执行条件
                        let temp: string = children[i].condition
                        temp = (temp[temp.length - 1] === ";") ? temp.slice(0, temp.length - 1) : temp;
                        condition = temp.split(";");
                        let flag: boolean = true;
                        let key: string = "";
                        let value: string = "";
                        for (let j = 0; j < condition.length; j++) {
                            key = condition[j].split("=")[0];
                            value = condition[j].split("=")[1];
                            if (key === "statusCode")
                                continue;
                            if (response[key] && response[key] != value) {
                                flag = false;
                                break;
                            }
                        }
                        if (flag === true) {
                            run(children[i]);
                        }
                    }
                    // 异步的情况
                    if (children[i].asntype == "1") {
                        eventEmitter.on(children[i].condition, function () {
                            run(children[i]);
                        });
                    }
                }
            }
        }).catch((err) => {
            console.log(err);
            return;
        });
    }
}


class CombinationPlugin{
    /**
     * 临时存储原子API块信息
     * @param req 
     * @param res 
     */
    public storeAtomApiInfo(req, res){
        let temp: {[key: string]: string} = {};
        temp.module_id = req.query.moduleId || "";
        temp.type = req.query.type || "";
        temp.name = req.query.name || "";
        temp.api_id = req.query.id || "";
        temp.argument = req.query.argument || "";
        temp.response = req.query.response || "";
        temp.URL = req.query.URL || "";
        temp.is_async = req.query.isAsync || "";
        temp.condition = req.query.condition || "";
        atomApiInfo[count++] = temp;
        res.json(atomApiInfo);
    }

    /**
     * 根据模块ID或组合API的url获取原子API的信息
     * 只有模块ID时，获取临时存储的原子API信息
     * 既有模块ID又有组合的API的url时获取持久化存储的原子API信息
     */
    public async getAtomApiInfo(req, res): Promise<void>{
        let moduleId: string = req.query.moduleId || "";
        let combinationUrl: string = req.query.combinationUrl || "";
        // 从数据库中提取信息
        if(moduleId != "" && combinationUrl != ""){
            let combinationService: CombinationService = new CombinationService();
            let result: GeneralResult = await combinationService.query({module_id: moduleId, combination_url: combinationUrl});
            if(result.getResult() === true && result.getDatum().length >0){
                res.json(result.getReturn());
            }else{
                res.json(new GeneralResult(false, "该模块对应的API不存在", null));
            }
            return;
        }
        if(moduleId != ""){
            let temp: {[key: string]: string} = {};
            for(let i = 0; i < atomApiInfo.length; i++){
                if (moduleId === atomApiInfo[i].module_id){
                    res.json(new GeneralResult(true, null, atomApiInfo[i]).getReturn());
                    return;
                }
            }
        }
        res.json(new GeneralResult(false, "该模块对应的API不存在", null));
    }

    public async registerCombinationAPI(req, res): Promise<void>{
        let combinationUrl: string = req.query.combinationUrl;
        // 判断该组合API的url是否存在
        let combinationFlowService: CombinationFlowService = new CombinationFlowService();
        let result: GeneralResult = await combinationFlowService.query({combination_url: combinationUrl});
        if(result.getResult() === true && result.getDatum().length > 0){
            res.json(new GeneralResult(false, "该组合url已经存在", null));
            return;
        }
        let flow: string = req.query.flowJson;
        // 存储原子API对应的组合API的url
        for(let i = 0; i < atomApiInfo.length; i++){
            atomApiInfo[i].combination_url = combinationUrl;
        }
        let combinationService: CombinationService = new CombinationService();
        let apiInfoService: ApiInfoService = new ApiInfoService();
        let urlService: UrlService = new UrlService();
        await combinationService.update({combination_url: atomApiInfo[0].combination_url}, atomApiInfo);

        // 找到原子API所属的项目或第三方
        let temp: GeneralResult = await apiInfoService.query({URL: atomApiInfo[0].URL});
        let appId: string = temp.getDatum()[0].appId;
        // 持久化存储后清空临时存储
        atomApiInfo = [];


        let apiInfo: {[key: string]: string} = {};
        let url: {[key: string]: string} = {};
        let combinationFlow: {[key: string]: string} = {};
        apiInfo.ID = req.query.ID;
        apiInfo.appId = appId;
        apiInfo.name = req.query.name;
        apiInfo.argument = req.query.argument;
        apiInfo.response = req.query.response;
        apiInfo.URL = combinationUrl;
        apiInfo.type = "组合";

        apiInfoService.insert([apiInfo]);

        let config: Config = new Config();
        url.APPId = appId;
        url.from = combinationUrl;
        url.to = config.getApiServer().host + ":" + config.getApiServer().port;
        // TODO: 先检测之后在再确定status的值
        // TODO: 添加访问方法类型
        url.status = "0";
        url.is_new = "1";
        url.method = "get";

        urlService.insert([url]);

        combinationFlow.combination_url = combinationUrl;
        combinationFlow.flow = flow;


        combinationFlowService.insert([combinationFlow]);

        // 注册
        let registerPlugin: RegisterPlugin = new RegisterPlugin();
        let registerApp = registerPlugin.getRegisterApp();
        let combinationPlugin: CombinationPlugin = new CombinationPlugin();
        registerApp.use(combinationUrl, combinationPlugin.combinationService);
        // 为相关的API标注，以便后期注销
        registerApp._router.stack[registerApp._router.stack.length - 1].appId = appId;
        registerApp._router.stack[registerApp._router.stack.length - 1].url = combinationUrl;
        
        res.json({"flowJson": flow});
    }


    public async combinationService(req, res): Promise<void>{
        // 获取流程文件
        let combinationFlowService: CombinationFlowService = new CombinationFlowService();
        let temp: GeneralResult = await combinationFlowService.query({combination_url: req.baseUrl});
        //let flowJson: { [key: string]: string } = JSON.parse(temp.getDatum()[0].flow).childEles[0].childEles[0];
        let flowJson: { [key: string]: string } = JSON.parse(temp.getDatum()[0].flow)
        //await combinationFlowService.query({ combination_url: combinationUrl})
        run(flowJson);
        res.json({"data": flowJson});
    }
    public publish(req, res){
        eventEmitter.emit(req.query.event);
        res.json({data:"发布事件"});
    }

}

export{CombinationPlugin};