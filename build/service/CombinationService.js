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
const DBConnect_1 = require("../util/DBConnect");
const CombinationModel_1 = require("../model/CombinationModel");
const GeneralResult_1 = require("../general/GeneralResult");
class CombinationService {
    constructor() {
        // 连接数据库
        this._db = new DBConnect_1.DBConnect().getDB();
    }
    // 插入数据
    insert(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // 传递上下文
            let _this = this;
            return new Promise(function (resolve) {
                _this._db.then(function (db) {
                    let combinationModel = new CombinationModel_1.CombinationModel(db);
                    combinationModel.insert(data, function (err) {
                        if (err) {
                            console.log("INSERT DATA INTO combination FAIL");
                            resolve(new GeneralResult_1.GeneralResult(false, err.message, data));
                        }
                        else {
                            console.log("INSERT DATA INTO combination SUCCESS");
                            resolve(new GeneralResult_1.GeneralResult(true, null, data));
                        }
                    });
                }).catch(function (err) {
                    console.log(err);
                    resolve(new GeneralResult_1.GeneralResult(false, err.message, data));
                });
            });
        });
    }
    /**
     * 删除数据
     * @param data
     */
    remove(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // 传递上下文
            let _this = this;
            return new Promise(function (reslove) {
                _this._db.then(function (db) {
                    let combinationModel = new CombinationModel_1.CombinationModel(db);
                    combinationModel.remove(data, function (err) {
                        if (err) {
                            console.log("DELETE DATA FROM combination FAIL!");
                            console.log(err);
                            reslove(new GeneralResult_1.GeneralResult(false, err.message, null));
                        }
                        else {
                            console.log("DELETE DATA FROM combination SUCCESS!");
                            reslove(new GeneralResult_1.GeneralResult(true, null, null));
                        }
                    });
                }).catch(function (err) {
                    console.log(err);
                    reslove(new GeneralResult_1.GeneralResult(false, err.message, null));
                });
            });
        });
    }
    /**
     * 查询数据
     * @param data
     */
    query(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // 上下文传递
            let _this = this;
            return new Promise(function (resolve) {
                _this._db.then(function (db) {
                    let combinationModel = new CombinationModel_1.CombinationModel(db);
                    combinationModel.query(data, function (err, results) {
                        if (err) {
                            resolve(new GeneralResult_1.GeneralResult(false, err.message, null));
                        }
                        else {
                            resolve(new GeneralResult_1.GeneralResult(true, null, results));
                        }
                    });
                });
            });
        });
    }
    update(condition, data) {
        return __awaiter(this, void 0, void 0, function* () {
            //先删除相关信息
            let removeResult = yield this.remove(condition);
            // 在插入相关信息
            let insertResult = yield this.insert(data);
            console.log(insertResult.getDatum());
            return insertResult;
        });
    }
}
exports.CombinationService = CombinationService;
