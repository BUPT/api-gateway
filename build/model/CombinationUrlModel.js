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
 * 定义combination_url表模型
 */
class CombinationUrlModel {
    constructor(db) {
        this._combinationUrl = null;
        this._combinationUrl = db.define("combination_url", {
            id: { type: 'serial', key: true },
            url: String,
            atom_url: String,
            flow_xml: String
        });
    }
    get() {
        return this._combinationUrl;
    }
    set(value) {
        this._combinationUrl = value;
    }
    // 查找数据
    query(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            this._combinationUrl.find(data, callback);
        });
    }
    // 插入多条数据
    insert(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            this._combinationUrl.create(data, callback);
        });
    }
    // 删除数据
    remove(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            this._combinationUrl.find(data).remove(callback);
        });
    }
    // 更改数据
    update(data, eachCallback, saveCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            this._combinationUrl.find(data).each(eachCallback).save(saveCallback);
        });
    }
}
exports.CombinationUrlModel = CombinationUrlModel;
