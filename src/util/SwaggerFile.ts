import {Config} from "../config/config";
import swaggerJsDoc = require("swagger-jsdoc");
import fs = require("fs");
class SwaggerFile{
    public generateFile(): void{
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
            // import swaggerDefinitions
            swaggerDefinition: swaggerDefinition,
            // path to the API docs
            apis: [config.getPath().defineSwaggerFile]
        }

        let swaggerSpec = swaggerJsDoc(options);
        fs.writeFileSync(config.getPath().adminAPIsFile, JSON.stringify(swaggerSpec));
        fs.writeFileSync(config.getPath().adminAPIsFile, JSON.stringify(swaggerSpec));
    }
}
export{SwaggerFile};