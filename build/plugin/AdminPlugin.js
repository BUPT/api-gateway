"use strict";
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
        let result = userListService.query(data);
        result.then(function (result) {
            // 对用户输入的密码进行加密运算
            var password = null;
            if (result.length > 0) {
                password = crypto.createHmac('sha256', user.pass).update(result[0].salt).digest('hex');
                if (password === result[0].password) {
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
        }).catch(function (err) {
            console.log(err);
            console.log("未能登录");
            return unauthorized(res);
        });
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
        let swaggerFile = new SwaggerFile_1.SwaggerFile();
        swaggerFile.generateFile();
        let path = new config_1.Config().getPath();
        let yamlParse = new YamlParse_1.YamlParse();
        let data = yamlParse.parse(path.swaggerFile);
        let url = data[0];
        let apiInfo = data[1];
        // 将API注册信息加载到内存
        let registerPlugin = new RegisterPlugin_1.RegisterPlugin();
        registerPlugin.loadData(url);
        // 将数据存入数据库
        let urlService = new UrlService_1.UrlService();
        let apiInfoService = new ApiInfoService_1.ApiInfoService();
        urlService.loadData(url);
        apiInfoService.loadData(apiInfo);
        let config = new config_1.Config();
        // 设置cookie，将fileName的值传给swagger UI的index.html文件使用
        res.cookie("fileName", "swagger.yaml");
        res.redirect(config.getPath().swaggerUIURL);
    }
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
                let removeUrl = urlService.remove({ "APPId": url[0].APPId });
                removeUrl.then(function () {
                    urlService.insert(url);
                }).catch(function (err) {
                    console.log(err);
                });
                let removeApiInfo = apiInfoService.remove({ "appId": api_info[0].appId });
                removeApiInfo.then(function () {
                    apiInfoService.insert(api_info);
                }).catch(function (err) {
                    console.log(err);
                });
                // 设置cookie，将fileName的值传给swagger UI的index.html文件使用
                res.cookie("fileName", fileName);
                console.log(fileName);
                res.redirect(config.getPath().swaggerUIURL);
                console.log(config.getPath().swaggerUIURL);
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
}
exports.AdminPlugin = AdminPlugin;
