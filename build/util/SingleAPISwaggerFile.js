"use strict";
/**
 * @author: 林贻民
 * @description: 根据API Id从整个swagger文件中提取出对应API的swagger配置文件
 */
Object.defineProperty(exports, "__esModule", { value: true });
const ApiInfoService_1 = require("../service/ApiInfoService");
const yaml = require("yamljs");
const fs = require("fs");
class SingleAPISwaggerFile {
    /**
     * 根据API Id从整个swagger文件中提取出对应API的swagger配置文件
     * @param apiId API对应的Id
     * @param swaggerFilePath 整个swagger配置文件的路径
     * @param singleSwaggerFilePath 生成swagger文件的路径
     */
    generateSingleSwaggerFile(apiId, swaggerFilePath, singleSwaggerFilePath) {
        let swaggerJson = yaml.parse(fs.readFileSync(swaggerFilePath).toString());
        let singleJson = {};
        singleJson.info = swaggerJson.info;
        singleJson.host = swaggerJson.host;
        singleJson.basePath = swaggerJson.basePath;
        singleJson.swagger = swaggerJson.swagger;
        singleJson.schemes = swaggerJson.schemes;
        singleJson.consumes = swaggerJson.consumes;
        singleJson.produces = swaggerJson.produces;
        singleJson.definitions = swaggerJson.definitions;
        singleJson.tags = [];
        let apiInfoService = new ApiInfoService_1.ApiInfoService();
        let result = apiInfoService.queryById(apiId);
        result.then(function (data) {
            if (data.length > 0) {
                let url = data[0].URL;
                let path = {};
                path[url] = swaggerJson.paths[url];
                singleJson["paths"] = path;
                var writeStream = fs.createWriteStream(singleSwaggerFilePath);
                writeStream.end(JSON.stringify(singleJson));
            }
        }).catch(function (err) {
            console.log(err);
            throw err;
        });
    }
}
exports.SingleAPISwaggerFile = SingleAPISwaggerFile;
