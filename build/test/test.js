// import {DBConnect} from "../util/DBConnect";
// import {UrlModel} from "../model/UrlModel";
// let dbConnect: DBConnect = new DBConnect();
// let db: Promise<any> = dbConnect.getDB();
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
<<<<<<< HEAD
// export default class GeneratorClass {
//     constructor() {
//         const iterator = this.generator(10);
//         iterator.next();
//     }
//     *generator(count: number): IterableIterator<number> {
//         while (true)
//             yield count++;
//     }
// }
// import {LogModel} from "../model/LogModel";
// let logModel :LogModel= new LogModel();
// console.log(logModel.get());
var proxy = require('express-http-proxy');
var other_app = require('express')();
var app = require('express')();
other_app.use('/proxy0', function (req, res, next) {
    res.json({ "name": "chenyuanxing" });
    next();
});
other_app.listen(12345);
app.use('/proxy0', proxy('www.baidu.com'));
// app.use('/proxy', proxy('localhost:12345', {
//     proxyReqPathResolver: function(req) {
//       return require('url').parse(req.url).path;
//     }
//   }));
app.use('/proxy', proxy('localhost:12345', {
    proxyReqPathResolver: function (req) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                var resolvedPathValue = "http://baidu.com";
                resolve(resolvedPathValue);
            }, 200);
        });
    }
}));
app.listen(8888);
=======
let name = "test";
let js = require("../../views/uploads/json/" + name);
console.log(js);
>>>>>>> 7b8875d097b14c5d46d2878ed607b6d83b0e52af
