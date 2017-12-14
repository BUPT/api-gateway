"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const TopPerformanceModel_1 = require("../model/TopPerformanceModel");
const SoursePerformanceModel_1 = require("../model/SoursePerformanceModel");
const userPerformanceModel_1 = require("../model/userPerformanceModel");
const PerformanceMonitorPlugin_1 = require("../plugin/PerformanceMonitorPlugin");
class PerformanceService {
    /**
     * 日志存放到本地文件中
     * @param
     */
    logPerformanceToFile(log) {
        fs.appendFileSync("./performanceFile/logPerformance.txt", log.getAll() + '\n');
    }
    /**
    * 一级平台监控数据存放到本地文件中
    * @param
    */
    topPerformanceToFile() {
        PerformanceMonitorPlugin_1.PerformanceMonitorPlugin.topPerformanceMonitorCommen();
        fs.writeFileSync('./performanceFile/topPerformance.txt', TopPerformanceModel_1.TopPerformanceModel.getAll());
    }
    /**
    * Api监控数据存放到本地文件中
    * @param
    */
    SoursePerformanceToFile() {
        fs.writeFileSync('./performanceFile/SoursePerformance.txt', SoursePerformanceModel_1.SoursePerformanceModel.getAll());
    }
    /**
    * 用户访问监控数据存放到本地文件中
    * @param
    */
    userPerformanceToFile() {
        fs.writeFileSync('./performanceFile/userPerformance.txt', userPerformanceModel_1.UserPerformanceModel.getAll());
    }
}
exports.PerformanceService = PerformanceService;
