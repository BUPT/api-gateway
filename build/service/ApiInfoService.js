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
const ApiInfoModel_1 = require("../model/ApiInfoModel");
const GeneralResult_1 = require("../general/GeneralResult");
class ApiInfoService {
    constructor() {
        // 连接数据库
        this._db = new DBConnect_1.DBConnect().getDB();
    }
    // 数据库所有ApiInfo信息
    // 插入数据
    insert(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // 传递上下文
            let _this = this;
            return new Promise(function (resolve) {
                _this._db.then(function (db) {
                    let apiInfoModel = new ApiInfoModel_1.ApiInfoModel(db);
                    apiInfoModel.insert(data, function (err) {
                        if (err) {
                            console.log("INSERT DATA INTO API_info FAIL");
                            resolve(new GeneralResult_1.GeneralResult(false, err.message, data));
                        }
                        else {
                            console.log("INSERT DATA INTO API_info SUCCESS");
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
    remove(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // 传递上下文
            let _this = this;
            return new Promise(function (reslove) {
                _this._db.then(function (db) {
                    let apiInfoModel = new ApiInfoModel_1.ApiInfoModel(db);
                    apiInfoModel.remove(data, function (err) {
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
                    let apiInfoModel = new ApiInfoModel_1.ApiInfoModel(db);
                    apiInfoModel.query(data, function (err, results) {
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
    // 根据appId查找API相关数据
    queryByAppId(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let _this = this;
            return new Promise(function (resolve) {
                let apiInfos = null;
                _this._db.then(function (db) {
                    let apiInfoModel = new ApiInfoModel_1.ApiInfoModel(db);
                    apiInfoModel.query({ appId: data }, function (err, results) {
                        if (err) {
                            resolve(new GeneralResult_1.GeneralResult(false, err.message, null));
                        }
                        else {
                            let apiInfo = new Map();
                            for (let i = 0; i < results.length; i++) {
                                apiInfo.set(results[i].ID, results[i].URL);
                            }
                            resolve(new GeneralResult_1.GeneralResult(true, null, apiInfo));
                        }
                    });
                }).catch(function (err) {
                    console.log(err);
                    resolve(new GeneralResult_1.GeneralResult(false, err.message, null));
                });
            });
        });
    }
    // 根据ID查找API相关数据
    queryById(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let _this = this;
            return new Promise(function (resolve) {
                let apiInfos = null;
                _this._db.then(function (db) {
                    let apiInfoModel = new ApiInfoModel_1.ApiInfoModel(db);
                    apiInfoModel.query({ ID: data }, function (err, results) {
                        if (err) {
                            resolve(new GeneralResult_1.GeneralResult(false, err.message, null));
                        }
                        else {
                            resolve(new GeneralResult_1.GeneralResult(true, null, results));
                        }
                    }).catch(function (err) {
                        console.log(err);
                        resolve(new GeneralResult_1.GeneralResult(false, err.message, null));
                    });
                }).catch(function (err) {
                    resolve(new GeneralResult_1.GeneralResult(false, err.message, null));
                });
            });
        });
    }
    // 先清空数据库信息，在重新插入新的数据集
    loadData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // 先删除数据信息
            let result = yield this.remove({});
            // 刪除成功则插入新的数据集
            if (result.getResult() === true) {
                this.insert(data);
            }
            else {
                console.log(result.getReason());
            }
        });
    }
    eachCallback(data) {
    }
    /**
     *
     * @param condition
     * @param name
     * @param serviceName
     */
    update(condition, name, URL) {
        return __awaiter(this, void 0, void 0, function* () {
            let apiInfoService = new ApiInfoService();
            let queryResult = yield apiInfoService.query(condition);
            let removeResult = null;
            if (queryResult.getResult() == true) {
                removeResult = yield apiInfoService.remove(condition);
                ;
            }
            else {
                return new GeneralResult_1.GeneralResult(false, "该服务不存在", null);
            }
            if (removeResult.getResult() == true) {
                let dataum = queryResult.getDatum();
                if (dataum == null || dataum.length == 0) {
                    return new GeneralResult_1.GeneralResult(false, "该服务不存在", null);
                }
                dataum[0]["name"] = name;
                dataum[0]["URL"] = URL;
                let data = {};
                data.ID = dataum[0].ID;
                data.appId = dataum[0].appId;
                data.name = dataum[0].name;
                data.type = dataum[0].type;
                data.argument = dataum[0].argument;
                data.event = dataum[0].event;
                data.URL = dataum[0].URL;
                let insertResult = yield apiInfoService.insert([data]);
                return insertResult;
            }
            else {
                return removeResult;
            }
        });
    }
}
exports.ApiInfoService = ApiInfoService;
