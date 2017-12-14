"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 定义Log的模型
 * 访问时间，用户名称，用户类别（是否为管理员等），ip，访问设备，访问服务，访问状态（是否访问成功），响应时间
 */
class LogModel {
    constructor() {
        this._ID = '0';
        this._time = '';
        this._username = '';
        this._classes = '';
        this._ip = '';
        this._device = '';
        this._service = '';
        this._status = '';
        this._responseTime = '';
    }
    getAll() {
        return this._ID + ' ' + this._time + ' ' + this._username + ' ' + this._classes + ' ' + this._ip + ' ' + this._device + ' ' + this._service + ' ' + this._status + ' ' + this._responseTime;
    }
    get() {
        return [this._ID, this._time, this._username, this._classes, this._ip, this._device, this._service, this._status, this._responseTime];
    }
    set ID(id) {
        this._ID = id;
    }
    set time(time) {
        this._time = time;
    }
    set username(name) {
        this._username = name;
    }
    set classes(classes) {
        this._classes = classes;
    }
    set ip(ip) {
        this._ip = ip;
    }
    set device(device) {
        this._device = device;
    }
    set service(service) {
        this._service = service;
    }
    set status(status) {
        this._status = status;
    }
    set responseTime(responseTime) {
        this._responseTime = responseTime;
    }
}
exports.LogModel = LogModel;
