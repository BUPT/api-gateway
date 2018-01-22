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
        var tag = schedule.scheduleJob('10 * * * * *', function(){
            TopPerformanceModel.topPerformance.unitTimeTotleVisit = 0;
        });
        // 可通过cancel取消循环
        // tag.cancel();
    }
    public soursePerformanceTimingReset(){
        var tag = schedule.scheduleJob('30 1 * * * *', function(){
            SoursePerformanceModel._soursePerformanceMap.forEach(function(value,key){
                value.unitTimeTotleVisit = 0;
            });
        });

        // 可通过cancel取消循环
        // tag.cancel();
    }
}
export{Timing}
