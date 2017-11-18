"use strict";
/**
 * @author: 林贻民
 * @description: 将swagger配置的yaml文件解析，返回url和API_info表字段对应的数组
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const yaml = require("yamljs");
class YamlParse {
    constructor() {
        this._METHOD = ["get", "post", "put", "delete", "GET", "POST", "PUT", "DELETE"];
    }
    /**
     * 加载yaml文件，并解析成JSON字符串
     * @param filePath yaml文件的路径
     */
    loadFile(filePath) {
        return yaml.parse(fs.readFileSync(filePath).toString());
    }
    /**
     * 解析JSON字段，构造API_info和url表批量插入数据数组
     * @param filePath
     */
    parse(filePath) {
        // 存储批量数据的二维数组
        let API_info = [];
        let url = [];
        let data = this.loadFile(filePath);
        // 真实服务器地址"www.linyimin.club:10010"
        let realHost = "www.linyimin.club:10010";
        // 基础URL
        let basePath = data.basePath;
        // 公司对应的ID
        let appId = data.info["x-appId"];
        // API的ID
        let ID = "";
        // API名称
        let name = "";
        // API的类型
        let type = "";
        // API的参数
        let argument = "";
        // API触发的事件
        let event = "";
        // API的url
        let API = "";
        // API的状态，0正常服务，1暂停服务
        let status = "";
        // API是否加载进内存,0表示未加载，1表示已加载
        let is_new = "1";
        let paths = Object.keys(data.paths);
        for (let i = 0; i < paths.length; i++) {
            // 过滤"/swagger"路径
            if (paths[i] == "/swagger") {
                continue;
            }
            var pathsObject = data.paths[paths[i]];
            ID = pathsObject["x-ID"];
            name = pathsObject["x-name"];
            for (let j = 0; j < this._METHOD.length; j++) {
                if (pathsObject[this._METHOD[j]]) {
                    type = pathsObject[this._METHOD[j]].tags[0];
                    if (pathsObject[this._METHOD[j]].parameters) {
                        argument = JSON.stringify(pathsObject[this._METHOD[j]].parameters);
                    }
                    else {
                        argument = null;
                    }
                    status = (pathsObject[this._METHOD[j]].deprecated == true) ? "1" : "0";
                    var operationID = pathsObject[this._METHOD[j]].operationId;
                    event = JSON.stringify([operationID + "Success", operationID + "fail"]);
                    break;
                }
            }
            API = ("/" != basePath) ? (basePath + paths[i]) : paths[i];
            API_info[i] = { "ID": ID, "name": name, "type": type, "argument": argument, "event": event, "URL": API, "appId": appId };
            url[i] = { "from": API, "to": realHost, "status": status, "is_new": is_new, "APPId": appId };
        }
        return [url, API_info];
    }
}
exports.YamlParse = YamlParse;
