"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const swaggerJsDoc = require("swagger-jsdoc");
const fs = require("fs");
class SwaggerFile {
    generateFile() {
        let config = new config_1.Config();
        let adminServer = config.getAdminServer();
        let swaggerDefinition = {
            info: {
                title: 'Node Swagger API',
                version: '1.0.0',
                "x-appId": '001',
                description: 'API网关管理接口',
            },
            host: adminServer.host + ":" + adminServer.port,
            basePath: '/'
        };
        let options = {
            // import swaggerDefinitions
            swaggerDefinition: swaggerDefinition,
            // path to the API docs
            apis: [config.getPath().defineSwaggerFile]
        };
        let swaggerSpec = swaggerJsDoc(options);
        fs.writeFileSync(config.getPath().adminAPIsFile, JSON.stringify(swaggerSpec));
    }
}
exports.SwaggerFile = SwaggerFile;
