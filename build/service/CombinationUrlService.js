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
const CombinationUrlModel_1 = require("../model/CombinationUrlModel");
const DBConnect_1 = require("../util/DBConnect");
const GeneralResult_1 = require("../general/GeneralResult");
class CombinationUrlService {
    constructor() {
        // 连接数据库
        this._db = new DBConnect_1.DBConnect().getDB();
    }
    /**
     * 插入多条数据
     * @param data
     */
    insert(data) {
        // 上下文传递
        let _this = this;
        return new Promise(function (resolve) {
            _this._db.then(function (db) {
                let combinationUrlModel = new CombinationUrlModel_1.CombinationUrlModel(db);
                combinationUrlModel.insert(data, function (err) {
                    if (err) {
                        console.log(err);
                        console.log("INSERT DATA INTO combination_url FAIL");
                        resolve(new GeneralResult_1.GeneralResult(false, err.message, null));
                    }
                    else {
                        console.log("INSERT DATA INTO combination_url SUCCESS");
                        resolve(new GeneralResult_1.GeneralResult(true, null, data));
                    }
                });
            }).catch(function (err) {
                console.log(err);
                console.log("INSERT DATA INTO combination_url FAIL");
                resolve(new GeneralResult_1.GeneralResult(false, err.message, null));
            });
        });
    }
    remove(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // 传递上下文
            let _this = this;
            return new Promise(function (reslove) {
                _this._db.then(function (db) {
                    let combinationUrlModel = new CombinationUrlModel_1.CombinationUrlModel(db);
                    combinationUrlModel.remove(data, function (err) {
                        if (err) {
                            console.log("DELETE DATA FROM API_info FAIL!");
                            console.log(err);
                            reslove(new GeneralResult_1.GeneralResult(false, err.message, null));
                        }
                        else {
                            console.log("DELETE DATA FROM API_info SUCCESS!");
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
                    let combinationUrlModel = new CombinationUrlModel_1.CombinationUrlModel(db);
                    combinationUrlModel.query(data, function (err, results) {
                        if (err) {
                            resolve(new GeneralResult_1.GeneralResult(false, err.message, null));
                        }
                        else {
                            resolve(new GeneralResult_1.GeneralResult(true, null, results[0]));
                        }
                    });
                }).catch(function (err) {
                    resolve(new GeneralResult_1.GeneralResult(false, err.message, null));
                });
            });
        });
    }
    update(condition, serviceName) {
        return __awaiter(this, void 0, void 0, function* () {
            let combinationUrlService = new CombinationUrlService();
            let queryResult = yield combinationUrlService.query(condition);
            let removeResult = yield combinationUrlService.remove(condition);
            if (queryResult.getResult() == true && removeResult.getResult() == true) {
                let dataum = queryResult.getDatum();
                if (dataum.length == 0) {
                    return new GeneralResult_1.GeneralResult(false, "该服务不存在", null);
                }
                dataum[0]["URL"] = serviceName;
                let data = {};
                data.id = dataum[0].id;
                data.url = dataum[0].url;
                data.atom_url = dataum[0].atom_url;
                let insertResult = yield combinationUrlService.insert([data]);
                return insertResult;
            }
            else {
                return (queryResult.getResult() == true) ? queryResult : removeResult;
            }
        });
    }
}
exports.CombinationUrlService = CombinationUrlService;
