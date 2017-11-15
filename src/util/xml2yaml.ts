/**
 * @author: 林贻民
 * @description: 将xml文件转成yaml文件
 */

import xml2js = require("xml2js");
import json2yaml = require("json2yaml");
import {Config} from "../config/config";
import fs = require("fs");
class Xml2Yaml{
    /**
     * 将xml文件转成yaml文件
     * @param flowXMLFile
     * @param yamlFilePath 
     */
    public xml2jaml(flowXMLFile: string, yamlFilePath: string): void{
        let data: Buffer = fs.readFileSync(flowXMLFile);
        xml2js.parseString(data, function(err, result){
            // 将JSON格式的数据转成yaml格式，并写入文件
            let yamlText: string = json2yaml.stringify(result);
            fs.writeFileSync(yamlFilePath, yamlText);
        });
    }
}

export{Xml2Yaml};