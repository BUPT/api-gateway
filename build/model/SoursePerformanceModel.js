"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 定义整个二级能力平台监测的模型
 * 服务，单位时间内总访问次数，当前并发量，平均响应时间
 */
class SoursePerformanceModel {
    constructor() {
        this._serverName = 'serverName';
        this._totleVisit = 0;
        this._unitTimeTotleVisit = 0;
        this._concurrentVolume = 0;
        this._averageResponseTime = 0;
    }
    get() {
        return this._serverName;
    }
    set serverName(serverName) {
        this._serverName = serverName;
    }
    get serverName() {
        return this._serverName;
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
    set averageResponseTime(averageResponseTime) {
        this._averageResponseTime = averageResponseTime;
    }
    get averageResponseTime() {
        return this._averageResponseTime;
    }
}
SoursePerformanceModel._soursePerformanceMap = new Map();
exports.SoursePerformanceModel = SoursePerformanceModel;
