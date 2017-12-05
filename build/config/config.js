"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    constructor() {
<<<<<<< HEAD
        this._baseDir = "D:/API-Gateway-v3-master";
=======
        this._baseDir = "E:/API网关文档/APIGateWay/ts/5TypeScript/router/lym/API-Gateway-v3";
>>>>>>> 7b8875d097b14c5d46d2878ed607b6d83b0e52af
        this._storage = {
            "host": '111.207.243.66',
            "user": 'root',
            "password": 'A123456',
            "database": 'api_gateway',
            "protocol": "mysql",
            "port": "3306"
        };
        this._api_server = {
<<<<<<< HEAD
            "host": "localhost",
            "port": "8000",
        };
        this._admin_server = {
            "host": "localhost",
=======
            "host": "www.linyimin.club",
            "port": "8000",
        };
        this._admin_server = {
            "host": "www.linyimin.club",
>>>>>>> 7b8875d097b14c5d46d2878ed607b6d83b0e52af
            "port": "8001",
        };
        this._path = {
            // API的swagger配置文件存放目录
            "swaggerDir": this._baseDir + "/views/uploads/swagger/",
            // 初始化注册API数据的swagger配置文件路径
            "swaggerFile": this._baseDir + "/views/uploads/swagger/swagger.yaml",
            // xml流程文件的存放目录
            "flowXMLDir": this._baseDir + "/views/uploads/xml/",
            "flowXMLFile": this._baseDir + "/views/uploads/xml/test.xml",
            // 管理员API的swagger配置文件路径
            "adminAPIsFile": this._baseDir + "/views/uploads/json/file.json",
            // 注册API的swagger UI的首页html路径
<<<<<<< HEAD
            "swaggerUIURL": "http://localhost:8001/static/index.html",
            // 管理员API的swagger UI的首页HTML路径
            "adminAPIsURL": "http://localhost:8001/static/viewAPIs.html",
=======
            "swaggerUIURL": "http://www.linyimin.club:8001/static/index.html",
            // 管理员API的swagger UI的首页HTML路径
            "adminAPIsURL": "http://www.linyimin.club:8001/static/viewAPIs.html",
>>>>>>> 7b8875d097b14c5d46d2878ed607b6d83b0e52af
            // 文件上传页面的HTML页面路径
            "uploadFileURL": this._baseDir + "/views/fileUpload.html",
            // 定义swagger注释的文件路径
            "defineSwaggerFile": this._baseDir + "/build/router/*.js",
            // 静态文件目录
            "static": this._baseDir + "/views/",
            // 组合API流程文件目录
            "combinationFileDir": this._baseDir + "/views/uploads/json/",
            // 单个接口的swagger配置文件
            "singleSwaggerFile": this._baseDir + "/views/uploads/json/single.json",
            // 单个API的swagger UI的首页HTML路径
<<<<<<< HEAD
            "singleSwaggerFileURL": "http://localhost:8001/static/single.html"
=======
            "singleSwaggerFileURL": "http://www.linyimin.club:8001/static/single.html"
>>>>>>> 7b8875d097b14c5d46d2878ed607b6d83b0e52af
        };
    }
    getBaseDir() {
        return this._baseDir;
    }
    getStorage() {
        return this._storage;
    }
    getApiServer() {
        return this._api_server;
    }
    getAdminServer() {
        return this._admin_server;
    }
    getPath() {
        return this._path;
    }
}
exports.Config = Config;
