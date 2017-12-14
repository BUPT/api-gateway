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
 * 定义combiantion表的模型
 */
class CombinationModel {
    constructor(db) {
        this._combination = null;
        this._combination = db.define("combination", {
            id: String,
            module_id: String,
            type: String,
            name: String,
            api_id: String,
            argument: String,
            response: String,
            URL: String,
            is_async: String,
            condition: String,
            combination_url: String
        });
    }
    get() {
        return this._combination;
    }
    set(value) {
        this._combination = value;
    }
    // 查找数据
    query(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            this._combination.find(data, callback);
        });
    }
    // 插入多条数据
    insert(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            this._combination.create(data, callback);
        });
    }
    // 删除数据
    remove(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            this._combination.find(data).remove(callback);
        });
    }
    // 更改数据
    update(condition, data, eachCallback, saveCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            this._combination.find(condition).each(eachCallback).save(saveCallback);
        });
    }
}
exports.CombinationModel = CombinationModel;
