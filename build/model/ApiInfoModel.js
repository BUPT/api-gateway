"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 定义API_info表的模型
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
        return __awaiter(this, void 0, void 0, function* () {
            this._apiInfo.find(data, callback);
        });
    }
    // 插入多条数据
    insert(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            this._apiInfo.create(data, callback);
        });
    }
    // 删除数据
    remove(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            this._apiInfo.find(data).remove(callback);
        });
    }
    // 更改数据
    update(data, eachCallback, saveCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            this._apiInfo.find(data).each(eachCallback).save(saveCallback);
        });
    }
}
exports.ApiInfoModel = ApiInfoModel;
