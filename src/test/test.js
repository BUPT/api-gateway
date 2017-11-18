"use strict";
// import {DBConnect} from "../util/DBConnect";
// import {UrlModel} from "../model/UrlModel";
// let dbConnect: DBConnect = new DBConnect();
// let db: Promise<any> = dbConnect.getDB();
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// db.then(function(db){
//     let urlModel: UrlModel = new UrlModel(db);
//     let t = urlModel.query({"id": "1088"}, function(err, results){
//         if(results.length > 0){
//             console.log(results[0].APPId);
//         }
//     });
//     t.then(() => {
//         let data: { [key: string]: string }[] = [{ "id": "1200", "APPId": "001", "from": "/index", "to": "www.google.com", "status": "1", "is_new": "1" }, 
//             { "id": "1201", "APPId": "001", "from": "/index", "to": "www.google.com", "status": "1", "is_new": "1" }];
//         // let data = {};
//         urlModel.insert(data, function(err){
//             console.log("Hello");
//         })
//     })
// }).catch(function (err) {   
//     console.log('------------------------------------');
//     console.log(err);
//     console.log('------------------------------------');
// });
// import {Xml2Yaml} from "../util/xml2yaml";
// let xml2yaml: Xml2Yaml = new Xml2Yaml();
// xml2yaml.xml2jaml("F:/项目/API-Gateway-v3/views/uploads/xml/test.xml", "F:/项目/API-Gateway-v3/views/uploads/xml/testFile.yaml");
// async function test(): Promise<any>{
//     return 1;
// }
// let t = test();
// t.then(function(t){
//     console.log(t);
// }).catch(function(err){
//     console.log(err);
// })
// import {RandomSalt} from "../util/RandomSalt";
// let randomSalt: RandomSalt = new RandomSalt();
// console.log(randomSalt.generateRandomSalt(30));
//  import {SingleAPISwaggerFile} from "../util/SingleAPISwaggerFile";
// import { ApiInfoService} from "../service/ApiInfoService";
// let apiInfoService = new ApiInfoService();
// apiInfoService.insert([{"ID":"006", "appUId":"001", "name":'sadfd', "type":"dfd", "argument":"df", "event":"", "URL":""}]);
// let singleAPISwaggerFile: SingleAPISwaggerFile = new SingleAPISwaggerFile();
// singleAPISwaggerFile.generateSingleSwaggerFile("001", "F:/项目/API-Gateway-v3/views/uploads/swagger/swagger.yaml", "F:/项目/API-Gateway-v3/views/uploads/json/test1.json");
// import {YamlParse} from "../util/YamlParse";
// let yamlParse: YamlParse = new YamlParse();
// console.log(yamlParse.parse("F:/项目/API-Gateway-v3/views/uploads/swagger/swagger.yaml"));
// import express = require("express");
// import {AdminPlugin} from "../plugin/AdminPlugin";
// let app = express();
// let adminPlugin: AdminPlugin = new AdminPlugin();
// // 对管理员操作进行basic-auth身份认证
// app.all("/index", adminPlugin.basicAuth, function (req, res) {
//     res.json({"name": "linyimin"});
// });
// app.listen(8000);
// import fs = require("fs");
// let data:string[]  = fs.readFileSync("F://项目/test/dataBase/1.txt").toString().split("\n");
// let temp: string[] = data.slice(14, 24);
// for(let i = 0 ; i < temp.length; i++){
//     // 去掉\r
//     temp[i] = temp[i].replace(/[\'\"\\\/\b\f\n\r\t]/g, "");
//     // 提取数字
//     temp[i] = temp[i].match(/[0-9]+([.]{1}[0-9]+){0,1}/)[0];
//     //result[i] = JSON.parse(temp[i]);
//     console.log(temp[i]);
// }
// function *getCount(i: number) {
//     while (true) {
//         yield i++;
//     }
// }
// let t = getCount(1);
// console.log(t.next());
var GeneratorClass = /** @class */ (function () {
    function GeneratorClass() {
        var iterator = this.generator(10);
        iterator.next();
    }
    GeneratorClass.prototype.generator = function (count) {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!true) return [3 /*break*/, 2];
                    return [4 /*yield*/, count++];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
    };
    return GeneratorClass;
}());
exports["default"] = GeneratorClass;
