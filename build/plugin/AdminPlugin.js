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
const UrlService_1 = require("../service/UrlService");
const ApiInfoService_1 = require("../service/ApiInfoService");
const config_1 = require("../config/config");
const UserListService_1 = require("../service/UserListService");
const YamlParse_1 = require("../util/YamlParse");
const RegisterPlugin_1 = require("../plugin/RegisterPlugin");
const SingleAPISwaggerFile_1 = require("../util/SingleAPISwaggerFile");
const basicAuth = require("basic-auth");
const crypto = require("crypto");
const formidable = require("formidable");
const fs = require("fs");
const SwaggerFile_1 = require("../util/SwaggerFile");
const GeneralResult_1 = require("../general/GeneralResult");
const rq = require("request-promise");
const CombinationUrlService_1 = require("../service/CombinationUrlService");
const events = require("events");
const CombinationUrlPlugin_1 = require("./CombinationUrlPlugin");
class AdminPlugin {
    /**
     * 基于basic-auth的身份认证
     * @param req
     * @param res
     * @param next
     */
    basicAuth(req, res, next) {
        function unauthorized(res) {
            console.log("需要登录");
            res.set('WWW-Authenticate', 'Basic real m=Input User&Password');
            return res.sendStatus(401);
        }
        let user = basicAuth(req);
        if (!user || !user.name || !user.pass) {
            return unauthorized(res);
        }
        // 查询条件
        let data = { user_name: user.name };
        let userListService = new UserListService_1.UserListService();
        (() => __awaiter(this, void 0, void 0, function* () {
            let result = yield userListService.query(data);
            if (result.getResult() == true) {
                let results = result.getDatum();
                var password = null;
                if (results.length > 0) {
                    password = crypto.createHmac('sha256', user.pass).update(results[0].salt).digest('hex');
                    if (password === results[0].password) {
                        next();
                        return;
                    }
                    else {
                        console.log("用户名或密码错误");
                        return unauthorized(res);
                    }
                }
                else {
                    console.log("未能登录");
                    return unauthorized(res);
                }
            }
            else {
                console.log("未能登录");
                return unauthorized(res);
            }
        }))();
    }
    /**
     * 允许跨域访问
     * @param req
     * @param res
     * @param next
     */
    allowCORSAccess(req, res, next) {
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
    APIRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // 根据JSdoc产生swagger的API配置文件
            let swaggerFile = new SwaggerFile_1.SwaggerFile();
            swaggerFile.generateFile();
            let path = new config_1.Config().getPath();
            let yamlParse = new YamlParse_1.YamlParse();
            let data = yamlParse.parse(path.swaggerFile);
            let url = data[0];
            let apiInfo = data[1];
            let urlService = new UrlService_1.UrlService();
            let apiInfoService = new ApiInfoService_1.ApiInfoService();
            // 保存组合API的信息(API_info)
            let combiantionUrlApiinfos = (yield apiInfoService.query({ "type": "组合" })).getDatum();
            // 将数据存入数据库(由于注册组合API需要访问数据库信息，所以先将数据存入数据库)
            yield urlService.loadData(url);
            yield apiInfoService.loadData(apiInfo);
            // 将API注册信息加载到内存
            let registerPlugin = new RegisterPlugin_1.RegisterPlugin();
            registerPlugin.loadData(url, combiantionUrlApiinfos).catch(function (err) {
                console.log(err);
            });
            let config = new config_1.Config();
            // 设置cookie，将fileName的值传给swagger UI的index.html文件使用
            res.cookie("fileName", "swagger.yaml");
            res.redirect(config.getPath().swaggerUIURL);
        });
    }
    /**
     * 上传文件并完成注册
     * @param req
     * @param res
     */
    upload(req, res) {
        let config = new config_1.Config();
        // 创建表单上传
        let form = new formidable.IncomingForm();
        // 设置编辑
        form.encoding = 'utf-8';
        // 设置文件存储路径
        form.uploadDir = config.getPath().swaggerDir;
        // 保留后缀
        form.keppExtendsions = true;
        form.maxFieldsSize = 2 * 1024 * 1024;
        form.parse(req, function (err, fields, files) {
            if (err) {
                console.log(err.message);
            }
            else {
                // 获取文件名
                let fileName = fields.fileName;
                let file = config.getPath().swaggerDir + fileName;
                fs.renameSync(files.upload.path, file);
                let yamlParse = new YamlParse_1.YamlParse();
                let data = yamlParse.parse(file);
                let url = data[0];
                let api_info = data[1];
                // 注册到内存和加载到数据库
                let registerPlugin = new RegisterPlugin_1.RegisterPlugin();
                let apiInfoService = new ApiInfoService_1.ApiInfoService();
                let urlService = new UrlService_1.UrlService();
                registerPlugin.addData(url);
                (() => __awaiter(this, void 0, void 0, function* () {
                    let removeUrl = yield urlService.remove({ "APPId": url[0].APPId });
                    let removeApiInfo = yield apiInfoService.remove({ "appId": api_info[0].appId });
                    if (removeUrl.getResult() == true && removeApiInfo.getResult() == true) {
                        // 插入新数据
                        urlService.insert(url);
                        apiInfoService.insert(api_info);
                        // 设置cookie，将fileName的值传给swagger UI的index.html文件使用
                        res.cookie("fileName", fileName);
                        res.redirect(config.getPath().swaggerUIURL);
                    }
                    else {
                        res.json((removeUrl.getResult() == true ? removeUrl : removeApiInfo).getReturn());
                    }
                }))();
            }
        });
    }
    /**
     * 上传文件界面
     * @param req
     * @param res
     */
    uploadFileView(req, res) {
        let config = new config_1.Config();
        res.sendFile(config.getPath().uploadFileURL);
    }
    /**
     * 使用swagger UI查看已注册的API信息
     * @param req
     * @param res
     */
    viewAPIs(req, res) {
        let fileName = req.query.fileName;
        /**
         * 如果输入swagger文件名称，则转到对应的swagger UI
         * 否则转到管理API的swagger UI
         */
        let config = new config_1.Config();
        if (fileName) {
            // 设置cookie，将fileName的值传给swagger UI的index.html文件使用
            res.cookie("fileName", fileName);
            res.redirect(config.getPath().swaggerUIURL);
        }
        else {
            res.redirect(config.getPath().adminAPIsURL);
        }
    }
    /**
     * 使用swagger UI查看单个API信息
     * @param req
     * @param res
     */
    viewSingleAPI(req, res) {
        let singleAPISwaggerFile = new SingleAPISwaggerFile_1.SingleAPISwaggerFile();
        let config = new config_1.Config();
        // 根据API的ID获取API对应的swagger信息
        let id = req.query.id;
        singleAPISwaggerFile.generateSingleSwaggerFile(id, config.getPath().swaggerFile, config.getPath().singleSwaggerFile);
        res.redirect(config.getPath().singleSwaggerFileURL);
    }
    //获取JSON解析器中间件  
    jsonParser() {
        require("body-parser").json();
    }
    /**
     * 返回所有API数据
     * @param req
     * @param res
     */
    getAllAPI(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let apiInfoService = new ApiInfoService_1.ApiInfoService();
            let apiInfos = yield apiInfoService.query({});
            res.json(apiInfos.getReturn());
        });
    }
    getAllAPIInfoWithKong(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let urlService = new UrlService_1.UrlService();
            let apiInfoService = new ApiInfoService_1.ApiInfoService();
            let config = new config_1.Config();
            let result = [];
            // 获取url表中的所有信息
            let urlResult = yield urlService.query({});
            if (urlResult.getResult() === true && urlResult.getDatum().length > 0) {
                let temp = {};
                for (let i = 0; i < urlResult.getDatum().length; i++) {
                    let apiInfoResult = yield apiInfoService.query({ URL: urlResult.getDatum()[i].from });
                    if (apiInfoResult.getResult() === true && apiInfoResult.getDatum().length > 0) {
                        temp.method = urlResult.getDatum()[i].method;
                        temp.name = apiInfoResult.getDatum()[0].name;
                        temp.host = config.getApiServer().host;
                        temp.interface = urlResult.getDatum()[i].from;
                        temp.uris = urlResult.getDatum()[i].to;
                        temp.upstreamUrl = urlResult.getDatum()[i].to + temp.interface;
                        temp.time = "2017-12-07 12:09:22";
                        result[i] = temp;
                    }
                }
                res.json(new GeneralResult_1.GeneralResult(true, "", result).getReturn());
            }
            else {
                res.json(new GeneralResult_1.GeneralResult(false, "您还没有注册相关API", null).getReturn());
            }
        });
    }
    /**
     * 根据API的类型获取API数据信息
     * @param req
     * @param res
     */
    getApiInfoByType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // 获取api类型
            let type = req.query.APIType;
            let apiInfoService = new ApiInfoService_1.ApiInfoService();
            let apiInfos = yield apiInfoService.query({ type: type });
            if (apiInfos.getResult() === true && apiInfos.getDatum().length > 0) {
                res.json(apiInfos.getReturn());
            }
            else {
                res.json(new GeneralResult_1.GeneralResult(false, "输入的类型对应的API不存在", null).getReturn());
            }
        });
    }
    /**
     * 修改组合API名字
     * @param req
     * @param res
     */
    renameServiceName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let apiInfoService = new ApiInfoService_1.ApiInfoService();
            let combinationUrlService = new CombinationUrlService_1.CombinationUrlService();
            let url = req.query.url;
            let serviceName = req.query.serviceName;
            // 更新内存
            let registerPlugin = new RegisterPlugin_1.RegisterPlugin();
            let registerApp = registerPlugin.getRegisterApp();
            if (registerApp._router && registerApp._router.stack) {
                for (let i = 2; i < registerApp._router.stack.length; i++) {
                    if (registerApp._router.stack[i].url == url) {
                        // 删除原url对应的中间件
                        registerApp._router.stack.splice(i, 1);
                        break;
                    }
                }
            }
            // 向内存中注册新的url
            let combinationUrlPlugin = new CombinationUrlPlugin_1.CombinationUrlPlugin();
            registerApp.use(serviceName, combinationUrlPlugin.combinationService);
            // 更新数据库
            //将URL转换成小驼峰类型的文件名
            let adminPlugin = new AdminPlugin();
            let config = new config_1.Config();
            let originName = adminPlugin.urlToUppercase(url);
            let fileName = adminPlugin.urlToUppercase(serviceName);
            // 更改流程文件的名称
            let dir = config.getPath().combinationFileDir;
            fs.renameSync(dir + originName + ".json", dir + fileName + ".json");
            // 更新数据库
            let updateResult = yield apiInfoService.update({ URL: url }, fileName, serviceName);
            let updataCombinnationResult = yield combinationUrlService.update({ url: url }, serviceName);
            res.json(updateResult.getReturn());
        });
    }
    /**
     * 封装rq，返回Boolean类型，判断访问是否成功
     * @param url
     */
    _request(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve) {
                rq(url).then(function () {
                    resolve(true);
                }).catch(function () {
                    resolve(false);
                });
            });
        });
    }
    /**
     * 将URL转换成小驼峰类型的文件名
     * @param url
     */
    urlToUppercase(url) {
        if (url[0] != '/') {
            url = "/" + url;
        }
        let data = url.split("/");
        let fileName = data[1];
        for (let i = 2; i < data.length; i++) {
            fileName += data[i].toLowerCase().replace(/[a-z]/, function (c) { return c.toUpperCase(); });
        }
        return fileName;
    }
    /**
     * 组合API调试
     * @param req
     * @param res
     */
    debugAPI(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let eventEmitter = new events.EventEmitter();
            let url = req.query.url;
            let config = new config_1.Config();
            // 获取组合API的原子API ID
            let combinationUrlService = new CombinationUrlService_1.CombinationUrlService();
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
            let result = yield combinationUrlService.getAtomUrl(url);
            if (result.getResult() == false || result.getDatum().length == 0) {
                res.json(result.getReturn());
                return;
            }
            // 保存所有的原子API
            let urls = result.getDatum();
            // 保存测试结果
            let data = new Map();
            let adminPlugin = new AdminPlugin();
            data = yield adminPlugin.testAPI(urls);
            // 测试复合API的URL
            if (data.get("flag") == true) {
                let result = yield adminPlugin._request("http://www.linyimin.club:8000" + url);
                if (result == true) {
                    data.set(url, "suceess");
                    res.json(new GeneralResult_1.GeneralResult(true, null, adminPlugin._mapToObject(data)).getReturn());
                }
                else {
                    data.set(url, "fail");
                    res.json(new GeneralResult_1.GeneralResult(false, null, adminPlugin._mapToObject(data)).getReturn());
                }
            }
            else {
                data.set(url, "fail");
                res.json(new GeneralResult_1.GeneralResult(false, null, adminPlugin._mapToObject(data)).getReturn());
            }
        });
    }
    /**
     * 将Map转换成Object
     * @param data
     */
    _mapToObject(data) {
        let result = {};
        let t;
        for (let t of data) {
            if (t[0] != "flag") {
                result[t[0]] = t[1];
            }
        }
        return result;
    }
    /**
     * 测试多个原子API的可用性
     * @param urls 原子API的url组成的数组
     */
    testAPI(urls) {
        return __awaiter(this, void 0, void 0, function* () {
            // flag为true表示所有原子API都可用
            let flag = true;
            let data = new Map();
            console.log(urls);
            for (let i = 0; i < urls.length; i++) {
                let result = yield this._request("http://www.linyimin.club:8000" + urls[i]);
                if (result !== true) {
                    flag = false;
                    data.set(urls[i], "fail");
                }
                else {
                    data.set(urls[i], "suceess");
                }
            }
            data.set("flag", flag);
            return data;
        });
    }
}
exports.AdminPlugin = AdminPlugin;
