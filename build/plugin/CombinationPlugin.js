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
const xml2js = require("xml2js");
const json2yaml = require("json2yaml");
const fs = require("fs");
const config_1 = require("../config/config");
const UrlService_1 = require("../service/UrlService");
const ApiInfoService_1 = require("../service/ApiInfoService");
const request = require("request");
const RegisterPlugin_1 = require("./RegisterPlugin");
const GeneralResult_1 = require("../general/GeneralResult");
const CombinationUrlService_1 = require("../service/CombinationUrlService");
// 计算组合的API数
let count = 0;
// 存储所有的AppId为001的API信息
let ApiInfo = new ApiInfoService_1.ApiInfoService().queryByAppId("001");
class CombinationPlugin {
    constructor() {
        this._ApiInfo = ApiInfo;
    }
    getApiInfo() {
        return this._ApiInfo;
    }
    /**
     * 获取流程文件的内容，并加以解析注册
     * @param req
     * @param res
     */
    getFloWXMLFile(req, res) {
        // 获取流程文件的内容
        let flowData = req.query.fileContent;
        // 获取组合API的URL
        let serviceName = req.query.serviceName;
        // 获取组合API的参数
        let argument = req.query.argument;
        // 获取组合API的事件
        let event = req.query.event;
        // 将URL转换成小驼峰类型的文件名
        if (serviceName[0] != '/') {
            serviceName = "/" + serviceName;
        }
        let data = serviceName.split("/");
        let fileName = data[1];
        for (let i = 2; i < data.length; i++) {
            fileName += data[i].toLowerCase().replace(/[a-z]/, function (c) { return c.toUpperCase(); });
        }
        // 将xml流程的内容转成JSON格式
        xml2js.parseString(flowData, function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                // 将xml文件转换成JSON，并写入文件
                let config = new config_1.Config();
                let writeStream = fs.createWriteStream(config.getPath().combinationFileDir + fileName + ".json");
                writeStream.end(JSON.stringify(result));
                // 
                // 将JSON格式的数据转换成yaml
                let yamlText = json2yaml.stringify(result);
                // 注册
                let registerPlugin = new RegisterPlugin_1.RegisterPlugin();
                let registerApp = registerPlugin.getRegisterApp();
                let combinationPlugin = new CombinationPlugin();
                registerApp.use(serviceName, combinationPlugin.combinationService);
                // 为相关的API标注，以便后期注销
                registerApp._router.stack[registerApp._router.stack.length - 1].appId = "001";
                registerApp._router.stack[registerApp._router.stack.length - 1].url = serviceName;
                // 插入数据库
                let url = {
                    from: serviceName, APPId: "001", to: config.getApiServer().host + ":" + config.getApiServer().port, status: "0", is_new: "1"
                };
                let apiInfo = {
                    ID: "0a00" + (count++), appId: "001", name: fileName, type: "组合", argument: argument, event: event, URL: serviceName
                };
                let combinationUrl = {
                    url: serviceName, atom_url: (combinationPlugin.getApiIdFromFlow(result).join(","))
                };
                // 将结果插入数据库
                let urlService = new UrlService_1.UrlService();
                let apiInfoService = new ApiInfoService_1.ApiInfoService();
                let combinationUrlService = new CombinationUrlService_1.CombinationUrlService();
                //let urlResult: Promise<GeneralResult> = urlService.insert([url]);
                // let apiInfoResult: Promise<GeneralResult> = apiInfoService.insert([apiInfo]);
                (() => __awaiter(this, void 0, void 0, function* () {
                    let urlInsertResult = yield urlService.insert([url]);
                    let apiInfoInsertResult = yield apiInfoService.insert([apiInfo]);
                    let combinationUrlInsertResult = yield combinationUrlService.insert([combinationUrl]);
                    if (urlInsertResult.getResult() == true && apiInfoInsertResult.getResult() == true) {
                        res.json(new GeneralResult_1.GeneralResult(true, null, yamlText).getReturn());
                    }
                    else {
                        let errMessage = (urlInsertResult.getResult() == true) ? urlInsertResult.getReason() : apiInfoInsertResult.getReason();
                        res.json(new GeneralResult_1.GeneralResult(false, err.Message, null).getReturn());
                    }
                }))();
                // 给前端返回yaml文件内容
                // res.send(yamlText);
                // res.end();
            }
        });
    }
    /**
     * 解析得到的流程JSON文件，并向API网关中注册
     * @param req
     * @param res
     */
    combinationService(req, res) {
        // 从访问url中获取文件名
        let serviceName = req.baseUrl;
        var data = serviceName.split("/");
        let fileName = data[1];
        for (let i = 2; i < data.length; i++) {
            fileName += data[i].toLocaleLowerCase().replace(/[a-z]/, function (c) { return c.toUpperCase(); });
        }
        if (fileName == "") {
            fileName = data[0];
        }
        let combinationPlugin = new CombinationPlugin();
        // 获取组合API中原子API执行顺序的ID
        let flowJson = require("../../views/uploads/json/" + fileName);
        let id = combinationPlugin.getApiIdFromFlow(flowJson);
        let apiInfo = combinationPlugin.getApiInfo();
        let config = new config_1.Config();
        // 存储原子API的url
        let url = [];
        apiInfo.then(function (apiInfos) {
            for (let i = 0; i < id.length; i++) {
                url[i] = "http://" + config.getApiServer().host + ":" + config.getApiServer().port + apiInfos.getDatum().get(id[i]);
            }
            // 开始按顺序访问原子Api
            // 保存每个原子API执行的返回值
            let data = "";
            request(url[0], function (error, response, body) {
                // 访问成功
                if (!error && response.statusCode == 200) {
                    data += body + "\n";
                    request(url[1], function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            data += body + "\n";
                            res.json(new GeneralResult_1.GeneralResult(true, null, data).getReturn());
                            return;
                        }
                        else {
                            request(url[2], function (error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    data += body;
                                    res.json(new GeneralResult_1.GeneralResult(false, null, data).getReturn());
                                    return;
                                }
                            });
                        }
                    });
                }
            });
        }).catch(function (err) {
            console.log(err);
            res.json(new GeneralResult_1.GeneralResult(false, null, data).getReturn());
            return;
        });
    }
    getApiIdFromFlow(flowJson) {
        // 导入流程JSON文件
        let config = new config_1.Config();
        // 提取目标信息
        let urls = flowJson.xml.block[0];
        // 存储分子API调用原子API的ID
        let id = [];
        id[0] = urls.$.id;
        // 存在其他url
        if (urls.next) {
            // 剩余url的个数
            let length = urls.next[0].block[0].statement.length;
            for (let i = 1; i <= length; i++) {
                id[i] = urls.next[0].block[0].statement[i - 1].block[0].$.id;
            }
        }
        return id;
    }
}
exports.CombinationPlugin = CombinationPlugin;
