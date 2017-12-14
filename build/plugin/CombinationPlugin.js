"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const CombinationService_1 = require("../service/CombinationService");
const GeneralResult_1 = require("../general/GeneralResult");
const CombinationFlowService_1 = require("../service/CombinationFlowService");
const ApiInfoService_1 = require("../service/ApiInfoService");
const UrlService_1 = require("../service/UrlService");
const config_1 = require("../config/config");
const RegisterPlugin_1 = require("./RegisterPlugin");
const rq = require("request-promise");
const events = require("events");
let eventEmitter = new events.EventEmitter();
let atomApiInfo = [];
let count = 0;
/**
 * 遍历树节点
 * @param node
 */
function run(node) {
    if ((typeof node == 'object') && (node.constructor == Object.prototype.constructor)) {
        // 执行节点上的API
        // TODO 调用node节点上的api
        let config = new config_1.Config();
        let url = "http://" + config.getApiServer().host + ":" + config.getApiServer().port + node.url;
        rq(url).then((body) => {
            let condition = [];
            let children = node.childEles;
            // 将响应值由字符串转成JSON
            let response = {};
            if (body.length > 0) {
                response = JSON.parse(body);
            }
            // 执行孩子节点
            if (children) {
                for (let i = 0; i < children.length; i++) {
                    // 同步的情况
                    if (children[i].asntype == "0") {
                        // 处理执行条件
                        let temp = children[i].condition;
                        temp = (temp[temp.length - 1] === ";") ? temp.slice(0, temp.length - 1) : temp;
                        condition = temp.split(";");
                        let flag = true;
                        let key = "";
                        let value = "";
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
class CombinationPlugin {
    /**
     * 临时存储原子API块信息
     * @param req
     * @param res
     */
    storeAtomApiInfo(req, res) {
        let temp = {};
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
    getAtomApiInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let moduleId = req.query.moduleId || "";
            let combinationUrl = req.query.combinationUrl || "";
            // 从数据库中提取信息
            if (moduleId != "" && combinationUrl != "") {
                let combinationService = new CombinationService_1.CombinationService();
                let result = yield combinationService.query({ module_id: moduleId, combination_url: combinationUrl });
                if (result.getResult() === true && result.getDatum().length > 0) {
                    res.json(result.getReturn());
                }
                else {
                    res.json(new GeneralResult_1.GeneralResult(false, "该模块对应的API不存在", null));
                }
                return;
            }
            if (moduleId != "") {
                let temp = {};
                for (let i = 0; i < atomApiInfo.length; i++) {
                    if (moduleId === atomApiInfo[i].module_id) {
                        res.json(new GeneralResult_1.GeneralResult(true, null, atomApiInfo[i]).getReturn());
                        return;
                    }
                }
            }
            res.json(new GeneralResult_1.GeneralResult(false, "该模块对应的API不存在", null));
        });
    }
    registerCombinationAPI(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let combinationUrl = req.query.combinationUrl;
            // 判断该组合API的url是否存在
            let combinationFlowService = new CombinationFlowService_1.CombinationFlowService();
            let result = yield combinationFlowService.query({ combination_url: combinationUrl });
            if (result.getResult() === true && result.getDatum().length > 0) {
                res.json(new GeneralResult_1.GeneralResult(false, "该组合url已经存在", null));
                return;
            }
            let flow = req.query.flowJson;
            // 存储原子API对应的组合API的url
            for (let i = 0; i < atomApiInfo.length; i++) {
                atomApiInfo[i].combination_url = combinationUrl;
            }
            let combinationService = new CombinationService_1.CombinationService();
            let apiInfoService = new ApiInfoService_1.ApiInfoService();
            let urlService = new UrlService_1.UrlService();
            yield combinationService.update({ combination_url: atomApiInfo[0].combination_url }, atomApiInfo);
            // 找到原子API所属的项目或第三方
            let temp = yield apiInfoService.query({ URL: atomApiInfo[0].URL });
            let appId = temp.getDatum()[0].appId;
            // 持久化存储后清空临时存储
            atomApiInfo = [];
            let apiInfo = {};
            let url = {};
            let combinationFlow = {};
            apiInfo.ID = req.query.ID;
            apiInfo.appId = appId;
            apiInfo.name = req.query.name;
            apiInfo.argument = req.query.argument;
            apiInfo.response = req.query.response;
            apiInfo.URL = combinationUrl;
            apiInfo.type = "组合";
            apiInfoService.insert([apiInfo]);
            let config = new config_1.Config();
            url.APPId = appId;
            url.from = combinationUrl;
            url.to = config.getApiServer().host + ":" + config.getApiServer().port;
            // TODO: 先检测之后在再确定status的值
            // TODO: 添加访问方法类型
            url.status = "0";
            url.is_new = "1";
            url.method = "get";
            url.is_atom = "0";
            urlService.insert([url]);
            combinationFlow.combination_url = combinationUrl;
            combinationFlow.flow = flow;
            combinationFlowService.insert([combinationFlow]);
            // 注册
            let registerPlugin = new RegisterPlugin_1.RegisterPlugin();
            let registerApp = registerPlugin.getRegisterApp();
            let combinationPlugin = new CombinationPlugin();
            registerApp.use(combinationUrl, combinationPlugin.combinationService);
            // 为相关的API标注，以便后期注销
            registerApp._router.stack[registerApp._router.stack.length - 1].appId = appId;
            registerApp._router.stack[registerApp._router.stack.length - 1].url = combinationUrl;
            res.json(new GeneralResult_1.GeneralResult(true, null, { "flowJson": flow }).getReturn());
        });
    }
    /**
     * 组合API的执行
     * @param req
     * @param res
     */
    combinationService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // 获取流程文件
            let combinationFlowService = new CombinationFlowService_1.CombinationFlowService();
            let temp = yield combinationFlowService.query({ combination_url: req.baseUrl });
            let flowJson = JSON.parse(temp.getDatum()[0].flow).childEles[0].childEles[0];
            //let flowJson: { [key: string]: string } = JSON.parse(temp.getDatum()[0].flow)
            //await combinationFlowService.query({ combination_url: combinationUrl})
            run(flowJson);
            res.json(new GeneralResult_1.GeneralResult(true, null, { "data": flowJson }).getReturn());
        });
    }
    /**
     * 事件发布
     * @param req
     * @param res
     */
    publish(req, res) {
        eventEmitter.emit(req.query.event);
        res.json({ data: "发布事件" });
    }
}
exports.CombinationPlugin = CombinationPlugin;
