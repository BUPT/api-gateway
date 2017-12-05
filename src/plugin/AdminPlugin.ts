import {UrlService} from "../service/UrlService";
import {ApiInfoService} from "../service/ApiInfoService";
import {Config} from "../config/config";
import {UserListService} from "../service/UserListService";
import {DBConnect} from "../util/DBConnect";
import {YamlParse} from "../util/YamlParse";
import {RegisterPlugin} from "../plugin/RegisterPlugin";
import { SingleAPISwaggerFile} from "../util/SingleAPISwaggerFile";
import basicAuth = require("basic-auth");
import crypto = require("crypto");
import formidable = require("formidable");
import fs = require("fs");
import {SwaggerFile} from "../util/SwaggerFile";
import { GeneralResult } from "../general/GeneralResult";
<<<<<<< HEAD
class AdminPlugin{
=======
import rq = require("request-promise");
import {CombinationUrlService} from "../service/CombinationUrlService";
import events = require("events");
import { CombinationPlugin } from "./CombinationPlugin";
import { config } from "bluebird";
class AdminPlugin{

>>>>>>> 7b8875d097b14c5d46d2878ed607b6d83b0e52af
    /**
     * 基于basic-auth的身份认证
     * @param req 
     * @param res 
     * @param next 
     */
    public basicAuth(req, res, next){
        function unauthorized(res) {
            console.log("需要登录")
            res.set('WWW-Authenticate', 'Basic real m=Input User&Password');
            return res.sendStatus(401);
        }
        let user = basicAuth(req);
        if (!user || !user.name || !user.pass) {
            return unauthorized(res);
        }
        // 查询条件
        let data: {[key: string]: string} = { user_name: user.name };
        let userListService: UserListService = new UserListService();
        (async () => {
            let result: GeneralResult = await userListService.query(data);
            if(result.getResult() == true){
                let results = result.getDatum();
                var password = null;
                if (results.length > 0) {
                    password = crypto.createHmac('sha256', user.pass).update(results[0].salt).digest('hex');
                    if (password === results[0].password) {
                        next();
                        return;
                    } else {
                        console.log("用户名或密码错误");
                        return unauthorized(res);
                    }
                } else {
                    console.log("未能登录");
                    return unauthorized(res);
                }
            }else{
                console.log("未能登录");
                return unauthorized(res);
            }
        })();
<<<<<<< HEAD
        // let result: Promise<GeneralResult> = userListService.query(data);
        // result.then(function(result){
        //     // 对用户输入的密码进行加密运算
        //     var password = null;
        //     if (result.length > 0) {
        //         password = crypto.createHmac('sha256', user.pass).update(result[0].salt).digest('hex');
        //         if (password === result[0].password) {
        //             next();
        //             return;
        //         }else{
        //             console.log("用户名或密码错误");
        //             return unauthorized(res);
        //         }
        //     }else{
        //         console.log("未能登录");
        //         return unauthorized(res);
        //     }
        // }).catch(function(err){
        //     console.log(err);
        //     console.log("未能登录");
        //     return unauthorized(res);
        // });
=======
>>>>>>> 7b8875d097b14c5d46d2878ed607b6d83b0e52af
    }

    /**
     * 允许跨域访问
     * @param req 
     * @param res 
     * @param next 
     */
    public allowCORSAccess(req, res, next): void{
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    }

    /**
     * API数据的注册
     * @param req 
     * @param res 
     */
<<<<<<< HEAD
    public APIRegister(req, res): void{
=======
    public async APIRegister(req, res): Promise<void>{
>>>>>>> 7b8875d097b14c5d46d2878ed607b6d83b0e52af
        // 根据JSdoc产生swagger的API配置文件
        let swaggerFile: SwaggerFile = new SwaggerFile();
        swaggerFile.generateFile();
        let path = new Config().getPath();
        let yamlParse: YamlParse = new YamlParse();
        let data: { [key: string]: string }[][] = yamlParse.parse(path.swaggerFile);
        let url: {[key: string]: string}[] = data[0];
        let apiInfo: {[key: string]: string}[] = data[1];
<<<<<<< HEAD
        // 将API注册信息加载到内存
        let registerPlugin: RegisterPlugin = new RegisterPlugin();
        registerPlugin.loadData(url);
        // 将数据存入数据库
        let urlService: UrlService = new UrlService();
        let apiInfoService: ApiInfoService = new ApiInfoService();
        urlService.loadData(url);
        apiInfoService.loadData(apiInfo);
=======

        let urlService: UrlService = new UrlService();
        let apiInfoService: ApiInfoService = new ApiInfoService();

        // 保存组合API的信息(API_info)
        let combiantionUrlApiinfos: {[key: string]: string}[] = (await apiInfoService.query({"type": "组合"})).getDatum();

        // 将数据存入数据库(由于注册组合API需要访问数据库信息，所以先将数据存入数据库)
        await urlService.loadData(url);
        await apiInfoService.loadData(apiInfo);
        // 将API注册信息加载到内存
        let registerPlugin: RegisterPlugin = new RegisterPlugin();
        registerPlugin.loadData(url, combiantionUrlApiinfos).catch(function(err){
            console.log(err);
        });
>>>>>>> 7b8875d097b14c5d46d2878ed607b6d83b0e52af
        let config: Config = new Config();
        // 设置cookie，将fileName的值传给swagger UI的index.html文件使用
        res.cookie("fileName", "swagger.yaml");
        res.redirect(config.getPath().swaggerUIURL);
    }

    /**
     * 上传文件并完成注册
     * @param req 
     * @param res 
     */
    public upload(req, res): void{
        let config: Config = new Config();
        // 创建表单上传
        let form: formidable.IncomingForm = new formidable.IncomingForm();
        // 设置编辑
        form.encoding = 'utf-8';
        // 设置文件存储路径
        form.uploadDir = config.getPath().swaggerDir;
        // 保留后缀
        form.keppExtendsions = true;
        form.maxFieldsSize = 2 * 1024 * 1024;
        form.parse(req, function(err, fields, files){
            if(err){
                console.log(err.message);
            }else{
                // 获取文件名
                let fileName: string = fields.fileName;
                let file: string = config.getPath().swaggerDir + fileName;
                fs.renameSync(files.upload.path, file);
                let yamlParse: YamlParse = new YamlParse();
                let data: {[key: string]: any}[][] = yamlParse.parse(file);
                let url: {[key: string]: string}[] = data[0];
                let api_info: {[key: string]: string}[] = data[1];
                // 注册到内存和加载到数据库
                let registerPlugin: RegisterPlugin = new RegisterPlugin();
                let apiInfoService: ApiInfoService = new ApiInfoService();
                let urlService: UrlService = new UrlService();
                registerPlugin.addData(url);
<<<<<<< HEAD
                // let removeUrl: Promise<any> = urlService.remove({ "APPId": url[0].APPId });
                // removeUrl.then(function(){
                //     urlService.insert(url);
                // }).catch(function(err){
                //     console.log(err);
                // });
                // let removeApiInfo: Promise<any> = apiInfoService.remove({ "appId": api_info[0].appId});
                // removeApiInfo.then(function(){
                //     apiInfoService.insert(api_info);
                // }).catch(function(err){
                //     console.log(err);
                // });
=======
>>>>>>> 7b8875d097b14c5d46d2878ed607b6d83b0e52af
                (async () => {
                    let removeUrl: GeneralResult = await urlService.remove({ "APPId": url[0].APPId });
                    let removeApiInfo: GeneralResult = await apiInfoService.remove({"appId": api_info[0].appId});
                    if(removeUrl.getResult() == true && removeApiInfo.getResult() == true){
                        // 插入新数据
                        urlService.insert(url);
                        apiInfoService.insert(api_info);
                        // 设置cookie，将fileName的值传给swagger UI的index.html文件使用
                        res.cookie("fileName", fileName);
                        res.redirect(config.getPath().swaggerUIURL);
                    }else{
                        res.json((removeUrl.getResult() == true ? removeUrl : removeApiInfo).getReturn());
                    }
                })();
            }
        });
    }

    /**
     * 上传文件界面
     * @param req 
     * @param res 
     */
    public uploadFileView(req, res): void{
        let config: Config = new Config();
        res.sendFile(config.getPath().uploadFileURL);
    }

    /**
     * 使用swagger UI查看已注册的API信息
     * @param req 
     * @param res 
     */
    public viewAPIs(req, res): void{
        let fileName: string = req.query.fileName;
        /**
         * 如果输入swagger文件名称，则转到对应的swagger UI
         * 否则转到管理API的swagger UI
         */
        let config: Config = new Config();
        if(fileName){
            // 设置cookie，将fileName的值传给swagger UI的index.html文件使用
            res.cookie("fileName", fileName);
            res.redirect(config.getPath().swaggerUIURL);
        }else{
            res.redirect(config.getPath().adminAPIsURL);
        }
    }

    /**
     * 使用swagger UI查看单个API信息
     * @param req 
     * @param res 
     */
    public viewSingleAPI(req, res): void{
        let singleAPISwaggerFile: SingleAPISwaggerFile = new SingleAPISwaggerFile();
        let config: Config = new Config();
        // 根据API的ID获取API对应的swagger信息
        let id: string = req.query.id;
        singleAPISwaggerFile.generateSingleSwaggerFile(id, config.getPath().swaggerFile, config.getPath().singleSwaggerFile);
        res.redirect(config.getPath().singleSwaggerFileURL);
    }
    
    //获取JSON解析器中间件  
    public jsonParser(){
        require("body-parser").json();
    }
<<<<<<< HEAD
=======


    /**
     * 返回所有API数据
     * @param req 
     * @param res 
     */
    public async getAllAPI(req, res): Promise<void>{
        let apiInfoService: ApiInfoService = new ApiInfoService();
        let apiInfos: GeneralResult = await apiInfoService.query({});
        res.json(apiInfos.getReturn());
    }

    /**
     * 修改组合API名字
     * @param req
     * @param res
     */
    public async renameServiceName(req, res): Promise<void>{
        let apiInfoService: ApiInfoService = new ApiInfoService();
        let combinationUrlService: CombinationUrlService = new CombinationUrlService();
        let url: string = req.query.url;
        let serviceName: string = req.query.serviceName;

        // 更新内存
        let registerPlugin: RegisterPlugin = new RegisterPlugin();
        let registerApp = registerPlugin.getRegisterApp();
        if(registerApp._router && registerApp._router.stack){
            for(let i = 2; i < registerApp._router.stack.length; i++){
                if(registerApp._router.stack[i].url == url){
                    // 删除原url对应的中间件
                    registerApp._router.stack.splice(i, 1);
                    break;
                }
            }
        }
        // 向内存中注册新的url
        let combinationPlugin: CombinationPlugin = new CombinationPlugin();
        registerApp.use(serviceName, combinationPlugin.combinationService);

        // 更新数据库
        //将URL转换成小驼峰类型的文件名
        let adminPlugin: AdminPlugin = new AdminPlugin();
        let config: Config = new Config();
        let originName = adminPlugin.urlToUppercase(url);
        let fileName = adminPlugin.urlToUppercase(serviceName);
        // 更改流程文件的名称
        let dir: string = config.getPath().combinationFileDir;
        fs.renameSync(dir + originName + ".json", dir + fileName + ".json");
        // 更新数据库
        let updateResult: GeneralResult = await apiInfoService.update({URL: url}, fileName, serviceName);
        let updataCombinnationResult: GeneralResult = await combinationUrlService.update({url: url}, serviceName);
        res.json(updateResult.getReturn());
    }

    /**
     * 封装rq，返回Boolean类型，判断访问是否成功
     * @param url 
     */
    private async _request(url: string): Promise<boolean>{
        return new Promise<boolean>(function(resolve){
            rq(url).then(function(){
                resolve(true);
            }).catch(function(){
                resolve(false);
            }); 
        });
    }

    /**
     * 将URL转换成小驼峰类型的文件名
     * @param url 
     */
    private urlToUppercase(url: string): string{
        if (url[0] != '/') {
            url = "/" + url;
        }
        let data: string[] = url.split("/");
        let fileName = data[1];
        for (let i = 2; i < data.length; i++) {
            fileName += data[i].toLowerCase().replace(/[a-z]/, function (c) { return c.toUpperCase() });
        }
        return fileName;
    }

    /**
     * 组合API调试
     * @param req 
     * @param res 
     */
    public async debugAPI(req, res){
        let eventEmitter = new events.EventEmitter();
        let url: string = req.query.url;
        let config: Config = new Config();
        // 获取组合API的原子API ID
        let combinationUrlService: CombinationUrlService = new CombinationUrlService();
        // let queryResult: GeneralResult = await combinationUrlService.query({url:url});
        // // 判断该url是否存在
        // if(queryResult.getResult() == false || queryResult.getDatum().length == 0){
        //     res.json(new GeneralResult(false, "该API不存在", url + "该url不存在").getReturn());
        //     return;
        // }
        // let id: string[] = queryResult.getDatum()[0].atom_url.split(",");
        // // 根据API的id查询API对应的url,并存储在urls中
        // let urls: string [] = [];
        // let apiInfoService: ApiInfoService = new ApiInfoService();
        // for(let i = 0; i < id.length; i++){
        //     let result: GeneralResult = await apiInfoService.queryById(id[i]);
        //     urls[i] = (result.getDatum())[0].URL;
        // }
        let result: GeneralResult = await combinationUrlService.getAtomUrl(url);
        if(result.getResult() == false || result.getDatum().length == 0){
            res.json(result.getReturn());
            return;
        }
        // 保存所有的原子API
        let urls: string[] = result.getDatum();
        // 保存测试结果
        let data: Map<string, any> = new Map();
        let adminPlugin: AdminPlugin = new AdminPlugin();
        data = await adminPlugin.testAPI(urls);
        // 测试复合API的URL
        if(data.get("flag") == true){
            let result: boolean = await adminPlugin._request("http://www.linyimin.club:8000" + url);
            if(result == true){
                data.set(url, "suceess");
                res.json(new GeneralResult(true, null, adminPlugin._mapToObject(data)).getReturn());
            }else{
                data.set(url, "fail");
                res.json(new GeneralResult(false, null, adminPlugin._mapToObject(data)).getReturn());
            }
        }else{
            data.set(url, "fail");
            res.json(new GeneralResult(false, null, adminPlugin._mapToObject(data)).getReturn());
        }
    }

    /**
     * 将Map转换成Object
     * @param data 
     */
    private _mapToObject(data: Map<string, string>): {[key: string]: string}{
        let result: {[key: string]: string} = {};
        for(let [key, value] of data){
            if(key != "flag"){
                result[key] = value;
            }
        }
        return result;
    }

    /**
     * 测试多个原子API的可用性
     * @param urls 原子API的url组成的数组
     */
    public async testAPI(urls: string []): Promise<Map<string, any>>{
        // flag为true表示所有原子API都可用
        let flag: boolean = true;
        let data: Map<string, any> = new Map();
        console.log(urls);
        for (let i = 0; i < urls.length; i++) {
            let result: boolean = await this._request("http://www.linyimin.club:8000" + urls[i]);
            if (result !== true) {
                flag = false;
                data.set(urls[i], "fail");
            } else {
                data.set(urls[i], "suceess");
            }
        }
        data.set("flag", flag);
        return data;
    }
>>>>>>> 7b8875d097b14c5d46d2878ed607b6d83b0e52af
}
export{AdminPlugin};
