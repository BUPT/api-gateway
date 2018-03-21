import schedule = require('node-schedule');
import {TopPerformanceModel} from "../model/TopPerformanceModel"
import {SoursePerformanceModel} from "../model/SoursePerformanceModel"
/*
每分钟的第30秒触发： '30 * * * * *'
每小时的1分30秒触发 ：'30 1 * * * *'
每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'
每月的1日1点1分30秒触发 ：'30 1 1 1 * *'
2016年的1月1日1点1分30秒触发 ：'30 1 1 1 2016 *'
每周1的1点1分30秒触发 ：'30 1 1 * * 1'
*/
class Timing{
    public topPerformanceTimingReset(){
        let tag = schedule.scheduleJob('30 1 * * * *', function(){
            TopPerformanceModel.topPerformance.unitTimeTotleVisit = 0;
        });
        // 可通过cancel取消循环
        // tag.cancel();
        //更新网关的总访问量的返回链表 topPerformance.totleVisitList[]  totleVisitList[0]为当前总访问量
        let tag2 = schedule.scheduleJob('0 0 0 * * *', function(){
            let length = TopPerformanceModel.topPerformance.totleVisitList.length;
            for(let i = 0;i<length;i++){
                if(length-i-2<0){
                    TopPerformanceModel.topPerformance.totleVisitList[length-i-1] = TopPerformanceModel.topPerformance.totleVisit;
                }else{
                    TopPerformanceModel.topPerformance.totleVisitList[length-i-1] = TopPerformanceModel.topPerformance.totleVisitList[length-i-2];
                }
            }

        });
        //更新网关的单位时间访问量的返回链表 topPerformance.totleVisitList[] 
        let tag3 = schedule.scheduleJob('0 0 * * * *', function(){
            let length = TopPerformanceModel.topPerformance.unitTimeTotleVisitList.length;
            for(let i = 0;i<length;i++){
                if(length-i-2<0){
                    TopPerformanceModel.topPerformance.unitTimeTotleVisitList[length-i-1] = TopPerformanceModel.topPerformance.unitTimeTotleVisit;
                }else{
                    TopPerformanceModel.topPerformance.unitTimeTotleVisitList[length-i-1] = TopPerformanceModel.topPerformance.unitTimeTotleVisitList[length-i-2];
                }
            }
        });
    }
    public soursePerformanceTimingReset(){
        let tag = schedule.scheduleJob('30 1 * * * *', function(){
            SoursePerformanceModel._soursePerformanceMap.forEach(function(value,key){
                value.unitTimeTotleVisit = 0;
            });
        });
        // 可通过cancel取消循环
        // tag.cancel();
        let tag2 = schedule.scheduleJob('0 0 0 * * *', function(){
            SoursePerformanceModel._soursePerformanceMap.forEach(function(value,key){
                let length = value.totleVisitList.length;
                for(let i = 0;i<length;i++){
                    if(length-i-2<0){
                        value.totleVisitList[length-i-1] = value.totleVisit;
                    }else{
                        value.totleVisitList[length-i-1] = value.totleVisitList[length-i-2];
                    }
                }
            });
        });
        let tag3 = schedule.scheduleJob('0 0 * * * *', function(){
            SoursePerformanceModel._soursePerformanceMap.forEach(function(value,key){
                let length = value.unitTimeTotleVisitList.length;
                for(let i = 0;i<length;i++){
                    if(length-i-2<0){
                        value.unitTimeTotleVisitList[length-i-1] = value.unitTimeTotleVisit;
                    }else{
                        value.unitTimeTotleVisitList[length-i-1] = value.unitTimeTotleVisitList[length-i-2];
                    }
                }
            });
        });
    }
    public initTiming(){
        this.topPerformanceTimingReset();
        this.soursePerformanceTimingReset();
    }
}
export{Timing}
