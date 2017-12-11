"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 定义整个一级网关能力平台监测的模型
 * 总访问次数，单位时间总访问次数，并发数，cpu memory iops监控，均响应时间
 *
 */
class TopPerformanceModel {
    constructor() {
        this._totleVisit = 0;
        this._unitTimeTotleVisit = 0;
        this._concurrentVolume = 0;
        this._cpuUsage = 0;
        this._memoryUsage = '0';
        this._iopsUsage = 0;
        this._averageResponseTime = 0;
    }
    //进行一次初始化，然后将 topPerformance 作为调用对象
    static init() {
        TopPerformanceModel.topPerformance = new TopPerformanceModel();
    }
    get() {
        return this._cpuUsage;
    }
    set totleVisit(totleVisit) {
        this._totleVisit = totleVisit;
    }
    set unitTimeTotleVisit(unitTimeTotleVisit) {
        this._unitTimeTotleVisit = unitTimeTotleVisit;
    }
    set concurrentVolume(concurrentVolume) {
        this._concurrentVolume = concurrentVolume;
    }
    set cpuUsage(cpuUsage) {
        this._cpuUsage = cpuUsage;
    }
    set memoryUsage(memoryUsage) {
        this._memoryUsage = memoryUsage;
    }
    set iopsUsage(iopsUsage) {
        this._iopsUsage = iopsUsage;
    }
    set averageResponseTime(averageResponseTime) {
        this._averageResponseTime = averageResponseTime;
    }
}
exports.TopPerformanceModel = TopPerformanceModel;
