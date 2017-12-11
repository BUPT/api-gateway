"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 定义整个对于用户的平台监测的模型
 * 用户名，访问总次数，单位时间访问次数，最后一次访问时间
 */
class UserPerformanceModel {
    constructor() {
        this._userName = 'userName';
        this._totleVisit = 0;
        this._unitTimeTotleVisit = 0;
        this._lastVisitTime = null;
    }
    static getAll() {
        let str = '';
        UserPerformanceModel._userPerformanceMap.forEach(function (value, key, map) {
            str = str + '\n' + key + ' value= ' + value.totleVisit + ' ' + value.unitTimeTotleVisit + ' ' + value._lastVisitTime;
        });
        return str;
    }
    get() {
        return this._userName;
    }
    set userName(userName) {
        this._userName = userName;
    }
    get userName() {
        return this._userName;
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
    set lastVisitTime(lastVisitTime) {
        this._lastVisitTime = lastVisitTime;
    }
    get lastVisitTime() {
        return this._lastVisitTime;
    }
}
UserPerformanceModel._userPerformanceMap = new Map();
exports.UserPerformanceModel = UserPerformanceModel;
