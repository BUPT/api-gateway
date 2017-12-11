import express = require("express");
import {LogModel} from "../model/LogModel";
import {TopPerformanceModel} from "../model/TopPerformanceModel";
import {SoursePerformanceModel} from "../model/SoursePerformanceModel";

import sd = require('silly-datetime');
import {GetIP} from "../util/GetIp"
import fs = require("fs");
import util = require("util")
import os = require("os")
import osUtils = require("os-utils");
import { print } from "util";
import { UserPerformanceModel } from "../model/userPerformanceModel";
import {PerformanceService} from "../service/PerformanceService"
/**
 * 性能监控插件
 */
class PerformanceMonitorPlugin{

    private _topPerformance = new TopPerformanceModel();
    private _soursePerformanceHost:String = '_soursePerformanceHost';
    set soursePerformanceHost(soursePerformanceHost:String){
        this._soursePerformanceHost = soursePerformanceHost;
    }
    get soursePerformanceHost(){
        return this._soursePerformanceHost;
    }
    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    public logPerformanceMonitor(req, res, next): void{
        let logModel :LogModel= new LogModel();
        if(req.query.username!=undefined){
            logModel.username = req.query.username;    
            logModel.classes = 'common';
        }else{
            logModel.username = 'null';
            logModel.classes = 'null';
        }
        logModel.time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
        logModel.ip = GetIP.getClientIP(req);
        logModel.status = 'succeed';        //默认为成功
        logModel.service = req.originalUrl;
        logModel.device = req.rawHeaders[5];
        req.on('end',function(){
            logModel.responseTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss'); 
            // console.log(logModel.get())           
        }).on('error',function(){
            logModel.status = 'error'
            // console.log(logModel.get())  
        })
        let performanceService :PerformanceService= new PerformanceService();
        performanceService.logPerformanceToFile(logModel);
        // fs.writeFileSync('req',util.inspect(req,{depth:null})); //depth:null 展开全部层级
        next();
    }
         /**
     * 一级网关能力平台性能监控1
     * 获取系统自带信息,cpu,memory信息
     */
    public topPerformanceMonitorCommen(): void{
        TopPerformanceModel.topPerformance.memoryUsage = ((os.totalmem()-os.freemem())/os.totalmem()).toFixed(3);
        osUtils.cpuUsage(function(value){
            TopPerformanceModel.topPerformance.cpuUsage = value;
        });
    }
      /**
     * 一级网关能力平台性能监控2
     * @param req 
     * @param res 
     * @param next 
     * 
     */
    public topPerformanceMonitor(req, res, next): void{
        TopPerformanceModel.topPerformance.totleVisit++;
        TopPerformanceModel.topPerformance.unitTimeTotleVisit++;
        TopPerformanceModel.topPerformance.concurrentVolume++;
        let visitTime = new Date();
        req.on('end',function(){
            let responseTime =new Date(); 
            //这里得到的时间是毫秒为单位
            let time :number  = (responseTime.getTime()-visitTime.getTime());
            TopPerformanceModel.topPerformance.averageResponseTime =(TopPerformanceModel.topPerformance.averageResponseTime*(TopPerformanceModel.topPerformance.unitTimeTotleVisit-1)+time)/TopPerformanceModel.topPerformance.unitTimeTotleVisit;
            TopPerformanceModel.topPerformance.concurrentVolume--;
        }).on('error',function(){
            TopPerformanceModel.topPerformance.concurrentVolume--;            
        })
        next();
    }

     /**
     * 二级能力平台性能监控1
     * @param req 
     * @param res 
     * @param next 
     */
    public soursePerformanceMonitor(req, res, next): void{
        //二级平台性能监控的的服务名称
        let serverName = this._soursePerformanceHost.toString()+req.originalUrl.toString();
        let SoursePerformance :SoursePerformanceModel;
        let visitTime = new Date();
        if(SoursePerformanceModel._soursePerformanceMap.has(serverName)){
            SoursePerformance = SoursePerformanceModel._soursePerformanceMap.get(serverName);
        }else{
            SoursePerformance = new SoursePerformanceModel();
        }
        SoursePerformance.totleVisit++;
        SoursePerformance.unitTimeTotleVisit++;
        SoursePerformance.concurrentVolume++;
        SoursePerformance.serverName = serverName;
        SoursePerformanceModel._soursePerformanceMap.set(serverName,SoursePerformance);

        req.on('end',function(){
            SoursePerformanceModel._soursePerformanceMap.get(serverName).concurrentVolume--;
            let responseTime = new Date();      
            //这里得到的时间是毫秒为单位
            let time = (responseTime.getTime() - visitTime.getTime());     
            SoursePerformanceModel._soursePerformanceMap.get(serverName).averageResponseTime  =(SoursePerformanceModel._soursePerformanceMap.get(serverName).averageResponseTime*(SoursePerformanceModel._soursePerformanceMap.get(serverName).unitTimeTotleVisit-1)+time)/SoursePerformanceModel._soursePerformanceMap.get(serverName).unitTimeTotleVisit; 
        }).on('error',function(){
            SoursePerformanceModel._soursePerformanceMap.get(serverName).concurrentVolume--;
        })
        SoursePerformanceModel._soursePerformanceMap.forEach(function(value,key,map){
            console.log(key+' value= '+value.totleVisit+' '+value.unitTimeTotleVisit+' '+value.concurrentVolume+' '+value.averageResponseTime)
        })
        
        next();
    }

     /**
     * 二级能力平台性能监控1
     * @param req 
     * @param res 
     * @param next 
     */
    public userPerformanceMonitor(req, res, next): void{
        //用户性能监控的的服务名称
        let username = req.require.username;
        if(username==undefined){
        }else{
            let userPerformance :UserPerformanceModel;
            let lastVIsitTime = new Date();
            if(UserPerformanceModel._userPerformanceMap.has(username)){
                userPerformance = UserPerformanceModel._userPerformanceMap.get(username);
            }else{
                userPerformance = new UserPerformanceModel();
            }
            userPerformance.totleVisit++;
            userPerformance.unitTimeTotleVisit++;
            userPerformance.lastVisitTime = lastVIsitTime;
            UserPerformanceModel._userPerformanceMap.set(username,userPerformance);
        }
        next();
    }
}
export{PerformanceMonitorPlugin};