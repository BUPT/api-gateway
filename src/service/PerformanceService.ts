import express = require("express");
import {LogModel} from "../model/LogModel";
import fs = require("fs");
import {TopPerformanceModel} from "../model/TopPerformanceModel";
import {SoursePerformanceModel} from "../model/SoursePerformanceModel";
import { UserPerformanceModel } from "../model/UserPerformanceModel";
import {PerformanceMonitorPlugin} from "../plugin/PerformanceMonitorPlugin"
class PerformanceService{
    /**
     * 日志存放到本地文件中
     * @param 
     */
    public logPerformanceToFile(log:LogModel):void{
        fs.appendFileSync("../performanceFile/logPerformance.txt",log.getAll()+'\n');
    }

     /**
     * 一级平台监控数据存放到本地文件中
     * @param 
     */
    public topPerformanceToFile():void{
        PerformanceMonitorPlugin.topPerformanceMonitorCommen();
        fs.writeFileSync('../performanceFile/topPerformance.txt',TopPerformanceModel.getAll()); 
    }
     /**
     * Api监控数据存放到本地文件中
     * @param 
     */
    public SoursePerformanceToFile():void{
        fs.writeFileSync('../performanceFile/SoursePerformance.txt',SoursePerformanceModel.getAll());         
    }
     /**
     * 用户访问监控数据存放到本地文件中
     * @param 
     */
    public userPerformanceToFile():void{
        fs.writeFileSync('../performanceFile/userPerformance.txt',UserPerformanceModel.getAll());                 
    }
     
}
export {PerformanceService}