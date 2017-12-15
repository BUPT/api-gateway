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
    static getAll() {
        return '总访问次数: ' + TopPerformanceModel.topPerformance._totleVisit + '   单位时间总访问次数: ' + TopPerformanceModel.topPerformance._unitTimeTotleVisit + '   并发数: ' + TopPerformanceModel.topPerformance._concurrentVolume + '   cpu利用率：' + TopPerformanceModel.topPerformance._cpuUsage + '   iopsUsage：' + TopPerformanceModel.topPerformance._iopsUsage + '   memory利用率：' + TopPerformanceModel.topPerformance._memoryUsage + '   均响应时间：' + TopPerformanceModel.topPerformance._averageResponseTime + '';
    }
    get() {
        return this._cpuUsage;
    }
    set totleVisit(totleVisit) {
        this._totleVisit = totleVisit;
    }
    get totleVisit() {
        return this._totleVisit;
    }
    set unitTimeTotleVisit(unitTimeTotleVisit) {
        this._unitTimeTotleVisit = unitTimeTotleVisit;
    }
    get unitTimeTotleVisit() {
        return this._unitTimeTotleVisit;
    }
    set concurrentVolume(concurrentVolume) {
        this._concurrentVolume = concurrentVolume;
    }
    get concurrentVolume() {
        return this._concurrentVolume;
    }
    set cpuUsage(cpuUsage) {
        this._cpuUsage = cpuUsage;
    }
    get cpuUsage() {
        return this._cpuUsage;
    }
    set memoryUsage(memoryUsage) {
        this._memoryUsage = memoryUsage;
    }
    get memoryUsage() {
        return this._memoryUsage;
    }
    set iopsUsage(iopsUsage) {
        this._iopsUsage = iopsUsage;
    }
    get iopsUsage() {
        return this._iopsUsage;
    }
    set averageResponseTime(averageResponseTime) {
        this._averageResponseTime = averageResponseTime;
    }
    get averageResponseTime() {
        return this._averageResponseTime;
    }
}
TopPerformanceModel.topPerformance = new TopPerformanceModel();
exports.TopPerformanceModel = TopPerformanceModel;
