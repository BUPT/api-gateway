import xml2js = require("xml2js");
import json2yaml = require("json2yaml");
import fs = require("fs");
import {Config} from "../config/config";
import {UrlService} from "../service/UrlService";
import {ApiInfoService} from "../service/ApiInfoService";
import request = require("request");
import { RegisterPlugin } from "./RegisterPlugin";
import {GeneralResult} from "../general/GeneralResult";
import {CombinationUrlService} from "../service/CombinationUrlService";

// 计算组合的API数
let count = 0;
// 存储所有的AppId为001的API信息
let ApiInfo: Promise<any> = new ApiInfoService().queryByAppId("001");

class CombinationPlugin{

    private _ApiInfo: Promise<any> = ApiInfo;

    public getApiInfo(){
        return this._ApiInfo;
    }

    /**
     * 获取流程文件的内容，并加以解析注册
     * @param req 
     * @param res 
     */
    public async getFloWXMLFile(req, res): Promise<void> {
        // 获取流程文件的内容
        let flowData: string = req.query.fileContent;
        // 获取组合API的URL
        let serviceName: string = req.query.serviceName;
        // 获取组合API的参数
        let argument: string = req.query.argument;
        // 获取组合API的事件
        let event: string = req.query.event;
        if (serviceName[0] != '/') {
            serviceName = "/" + serviceName;
        }
        let apiInfoService: ApiInfoService = new ApiInfoService();
        // 判断该url是否已经存在
        let result: GeneralResult = await apiInfoService.isExisit(serviceName);
        if(result.getResult() == true){
            result.setResult(false);
            res.json(result.getReturn());
            return;
        }
        // 将URL转换成小驼峰类型的文件名
        let data: string[] = serviceName.split("/");
        let fileName: string = data[1];
        for (let i = 2; i < data.length; i++) {
            fileName += data[i].toLowerCase().replace(/[a-z]/, function (c) { return c.toUpperCase() });
        }

        // 将xml流程的内容转成JSON格式
        xml2js.parseString(flowData, function(err, result){
            if(err){
                console.log(err);
            }else{
                // 将xml文件转换成JSON，并写入文件
                let config: Config = new Config();
                let writeStream = fs.createWriteStream(config.getPath().combinationFileDir + fileName + ".json");
                writeStream.end(JSON.stringify(result));

                // 
                // 将JSON格式的数据转换成yaml
                let yamlText: string = json2yaml.stringify(result);
                // 注册
                let registerPlugin: RegisterPlugin = new RegisterPlugin();
                let registerApp = registerPlugin.getRegisterApp();
                let combinationPlugin: CombinationPlugin = new CombinationPlugin();
                registerApp.use(serviceName, combinationPlugin.combinationService);
                // 为相关的API标注，以便后期注销
                registerApp._router.stack[registerApp._router.stack.length-1].appId = "001";
                registerApp._router.stack[registerApp._router.stack.length - 1].url = serviceName;
                // 插入数据库
                let url: {[key: string]: string} = {
                    from: serviceName, APPId: "001", to: config.getApiServer().host + ":" + config.getApiServer().port, status: "0", is_new:"1"
                };
                let apiInfo: {[key: string]: string} = {
                    ID: "0a00" + (count++), appId: "001", name: fileName, type:"组合", argument:argument, event: event, URL:serviceName
                };
                let combinationUrl: {[key: string]: string} = {
                    url: serviceName, atom_url: (combinationPlugin.getApiIdFromFlow(result).join(","))
                }
                // 将结果插入数据库
                let urlService: UrlService = new UrlService();
                let apiInfoService: ApiInfoService = new ApiInfoService();
                let combinationUrlService: CombinationUrlService = new CombinationUrlService();
                (async () =>{
                    let urlInsertResult: GeneralResult = await urlService.insert([url]);
                    let apiInfoInsertResult: GeneralResult = await apiInfoService.insert([apiInfo]);
                    let combinationUrlInsertResult: GeneralResult = await combinationUrlService.insert([combinationUrl]);
                    if(urlInsertResult.getResult() == true && apiInfoInsertResult.getResult() == true){
                        res.json(new GeneralResult(true, null, yamlText).getReturn());
                    }else{
                        let errMessage: string = (urlInsertResult.getResult() == true) ? urlInsertResult.getReason() : apiInfoInsertResult.getReason();
                        res.json(new GeneralResult(false, err.Message, null).getReturn());
                    }
                })(); 
            }
        });
    }

    /**
     * 解析得到的流程JSON文件，并向API网关中注册
     * @param req 
     * @param res 
     */
    public combinationService(req, res): void{
        // 从访问url中获取文件名
        let serviceName: string = req.baseUrl;
        var data: string[] = serviceName.split("/");
        let fileName: string = data[1];
        for(let i = 2; i < data.length; i++){
            fileName += data[i].toLocaleLowerCase().replace(/[a-z]/, function(c){ return c.toUpperCase()});
        }
        if(fileName == ""){
            fileName = data[0];
        }
        let combinationPlugin: CombinationPlugin = new CombinationPlugin();
        // 获取组合API中原子API执行顺序的ID
        let flowJson = require("../../views/uploads/json/" + fileName);
        let id: string[] = combinationPlugin.getApiIdFromFlow(flowJson);
        let apiInfo = combinationPlugin.getApiInfo();
        let config: Config = new Config();
        // 存储原子API的url
        let url: string[] = [];
        apiInfo.then(function(apiInfos){
            for (let i = 0; i < id.length; i++) {
                url[i] = "http://" + config.getApiServer().host + ":" + config.getApiServer().port + apiInfos.getDatum().get(id[i]);
            }
            // 开始按顺序访问原子Api
            // 保存每个原子API执行的返回值
            let data: string = "";
            request(url[0], function (error, response, body) {
                // 访问成功
                if (!error && response.statusCode == 200) {
                    data += body + "\n";
                    request(url[1], function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            data += body + "\n";
                            res.json(new GeneralResult(true, null, data).getReturn());
                            return;
                        } else {
                            request(url[2], function (error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    data += body;
                                    res.json(new GeneralResult(false, null, data).getReturn());
                                    return;
                                }
                            });
                        }
                    });
                }
            });
        }).catch(function(err){
            console.log(err);
            res.json(new GeneralResult(false, null, data).getReturn());
            return;
        });
    }

    public getApiIdFromFlow(flowJson): string[]{
        // 导入流程JSON文件
        let config: Config = new Config();
        // 提取目标信息
        let urls = flowJson.xml.block[0];
        // 存储分子API调用原子API的ID
        let id = [];
        id[0] = urls.$.id;
        // 存在其他url
        if (urls.next) {
            // 剩余url的个数
            let length: number = urls.next[0].block[0].statement.length;
            for (let i = 1; i <= length; i++) {
                id[i] = urls.next[0].block[0].statement[i - 1].block[0].$.id;
            }
        }
        return id;
    }
}
export{CombinationPlugin};