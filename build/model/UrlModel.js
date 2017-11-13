"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 定义url表的模型
 */
class UrlModel {
    constructor(db) {
        this._URL = null;
        this._URL = db.define("url", {
            id: { type: 'serial', key: true },
            appId: String,
            from: String,
            to: String,
            status: String,
            is_new: String
        });
    }
    get() {
        return this._URL;
    }
    set(value) {
        this._URL = value;
    }
    // 查找数据
    query(data, callback) {
        this._URL.find(data, callback);
    }
    // 插入多条数据
    insert(data, callback) {
        this._URL.create(data, callback);
    }
    // 删除数据
    remove(data, callback) {
        this._URL.find(data).remove(callback);
    }
    // 更改数据
    update(data, eachCallback, saveCallback) {
        this._URL.find(data).each(eachCallback).save(saveCallback);
    }
}
exports.UrlModel = UrlModel;
