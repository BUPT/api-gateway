"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 定义url表的模型
 */
class ApiInfoModel {
    constructor(db) {
        this._apiInfo = null;
        this._apiInfo = db.define("url", {
            ID: { type: "serial", key: true },
            appId: String,
            name: String,
            type: String,
            argument: String,
            event: String,
            URL: String
        });
    }
    get() {
        return this._apiInfo;
    }
    set(value) {
        this._apiInfo = value;
    }
    // 查找数据
    query(data, callback) {
        this._apiInfo.find(data, callback);
    }
    // 插入多条数据
    insert(data, callback) {
        this._apiInfo.create(data, callback);
    }
    // 删除数据
    remove(data, callback) {
        this._apiInfo.find(data).remove(callback);
    }
    // 更改数据
    update(data, eachCallback, saveCallback) {
        this._apiInfo.find(data).each(eachCallback).save(saveCallback);
    }
}
exports.ApiInfoModel = ApiInfoModel;
