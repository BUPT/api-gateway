"use strict";
/**
 * @author: 林贻民
 * @description: 将xml文件转成yaml文件
 */
Object.defineProperty(exports, "__esModule", { value: true });
const xml2js = require("xml2js");
const json2yaml = require("json2yaml");
const fs = require("fs");
class Xml2Yaml {
    /**
     * 将xml文件转成yaml文件
     * @param flowXMLFile
     * @param yamlFilePath
     */
    xml2jaml(flowXMLFile, yamlFilePath) {
        let data = fs.readFileSync(flowXMLFile);
        xml2js.parseString(data, function (err, result) {
            // 将JSON格式的数据转成yaml格式，并写入文件
            let yamlText = json2yaml.stringify(result);
            fs.writeFileSync(yamlFilePath, yamlText);
        });
    }
}
exports.Xml2Yaml = Xml2Yaml;
