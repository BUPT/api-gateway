import {Config} from "../config/config";
import swaggerJsDoc = require("swagger-jsdoc");
import fs = require("fs");
class SwaggerFile{
    public generateFile(filePath: string): void{
        let config: Config = new Config();
        let adminServer: {[key: string]: string} = config.getAdminServer();
        let swaggerDefinition: {[key: string]: any} = {
            info: {
                title: 'Node Swagger API',
                version: '1.0.0',
                "x-appId": '001',
                description: 'API网关管理接口',
            },
            host: adminServer.host + ":" + adminServer.port,
            basePath: '/'
        };
        let options: {} = {

        }
    }
}