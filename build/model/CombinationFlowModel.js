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
class CombinationFlowModel {
    constructor(db) {
        this._combinationFlow = null;
        this._combinationFlow = db.define("combination_flow", {
            id: Number,
            combination_url: String,
            flow: String
        });
    }
    get() {
        return this._combinationFlow;
    }
    set(value) {
        this._combinationFlow = value;
    }
    // 查找数据
    query(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            this._combinationFlow.find(data, callback);
        });
    }
    // 插入多条数据
    insert(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            this._combinationFlow.create(data, callback);
        });
    }
    // 删除数据
    remove(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            this._combinationFlow.find(data).remove(callback);
        });
    }
    // 更改数据
    update(condition, data, eachCallback, saveCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            this._combinationFlow.find(condition).each(eachCallback).save(saveCallback);
        });
    }
}
exports.CombinationFlowModel = CombinationFlowModel;
