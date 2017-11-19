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
class AdminPlugin{
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
        let result: Promise<any> = userListService.query(data);
        result.then(function(result){
            // 对用户输入的密码进行加密运算
            var password = null;
            if (result.length > 0) {
                password = crypto.createHmac('sha256', user.pass).update(result[0].salt).digest('hex');
                if (password === result[0].password) {
                    next();
                    return;
                }else{
                    console.log("用户名或密码错误");
                    return unauthorized(res);
                }
            }else{
                console.log("未能登录");
                return unauthorized(res);
            }
        }).catch(function(err){
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
    public APIRegister(req, res): void{
        let swaggerFile: SwaggerFile = new SwaggerFile();
        swaggerFile.generateFile();
        let path = new Config().getPath();
        let yamlParse: YamlParse = new YamlParse();
        let data: { [key: string]: string }[][] = yamlParse.parse(path.swaggerFile);
        let url: {[key: string]: string}[] = data[0];
        let apiInfo: {[key: string]: string}[] = data[1];
        // 将API注册信息加载到内存
        let registerPlugin: RegisterPlugin = new RegisterPlugin();
        registerPlugin.loadData(url);
        // 将数据存入数据库
        let urlService: UrlService = new UrlService();
        let apiInfoService: ApiInfoService = new ApiInfoService();
        urlService.loadData(url);
        apiInfoService.loadData(apiInfo);
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
                let removeUrl: Promise<any> = urlService.remove({ "APPId": url[0].APPId });
                removeUrl.then(function(){
                    urlService.insert(url);
                }).catch(function(err){
                    console.log(err);
                });
                let removeApiInfo: Promise<any> = apiInfoService.remove({ "appId": api_info[0].appId});
                removeApiInfo.then(function(){
                    apiInfoService.insert(api_info);
                }).catch(function(err){
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
}
export{AdminPlugin};
