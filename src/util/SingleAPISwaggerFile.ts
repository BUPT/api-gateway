/**
 * @author: 林贻民
 * @description: 根据API Id从整个swagger文件中提取出对应API的swagger配置文件
 */

import {Config} from "../config/config";
import {ApiInfoService} from "../service/ApiInfoService";
import yaml = require("yamljs");
import fs = require("fs");
import { ApiInfoModel } from "../model/ApiInfoModel";

class SingleAPISwaggerFile{
    /**
     * 根据API Id从整个swagger文件中提取出对应API的swagger配置文件
     * @param apiId API对应的Id
     * @param swaggerFilePath 整个swagger配置文件的路径
     * @param singleSwaggerFilePath 生成swagger文件的路径
     */
     public generateSingleSwaggerFile(apiId: string, swaggerFilePath: string, singleSwaggerFilePath: string): void{
        let swaggerJson: {[key: string]: any} = yaml.parse(fs.readFileSync(swaggerFilePath).toString());
        let singleJson: {[key: string]: any} = {};
        singleJson.info = swaggerJson.info;
        singleJson.host = swaggerJson.host;
        singleJson.basePath = swaggerJson.basePath;
        singleJson.swagger = swaggerJson.swagger;
        singleJson.schemes = swaggerJson.schemes;
        singleJson.consumes = swaggerJson.consumes;
        singleJson.produces = swaggerJson.produces;
        singleJson.definitions = swaggerJson.definitions;
        singleJson.tags = [];
        let apiInfoService: ApiInfoService = new ApiInfoService();
        let result: Promise<any> = apiInfoService.queryById(apiId);
        result.then(function(data){
            if(data.length > 0){
                let url: string = data[0].URL;
                let path: { [key: string]: string } = {};
                path[url] = swaggerJson.paths[url];
                singleJson["paths"] = path;
                var writeStream = fs.createWriteStream(singleSwaggerFilePath);
                writeStream.end(JSON.stringify(singleJson));
            }
        }).catch(function(err){
            console.log(err);
            throw err;
        });
    }
 }

 export{SingleAPISwaggerFile};