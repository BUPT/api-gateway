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
class ApiInfoService {
    constructor() {
        // 连接数据库
        this._db = new DBConnect_1.DBConnect().getDB();
    }
    // 数据库所有ApiInfo信息
    // 插入数据
    insert(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this._db.then(function (db) {
                let apiInfoModel = new ApiInfoModel_1.ApiInfoModel(db);
                apiInfoModel.insert(data, function (err) {
                    if (err) {
                        console.log("INSERT DATA INTO API_info FAIL");
                        return;
                    }
                    else {
                        console.log("INSERT DATA INTO API_info SUCCESS");
                        return;
                    }
                });
            }).catch(function (err) {
                console.log(err);
                return;
            });
        });
    }
    remove(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this._db.then(function (db) {
                let apiInfoModel = new ApiInfoModel_1.ApiInfoModel(db);
                apiInfoModel.remove(data, function (err) {
                    if (err) {
                        console.log("DELETE DATA FROM API_info FAIL!");
                        console.log(err);
                        return;
                    }
                    else {
                        console.log("DELETE DATA FROM API_info SUCCESS!");
                        return;
                    }
                });
            }).catch(function (err) {
                console.log(err);
                return;
            });
        });
    }
    // 根据appId查找API相关数据
    queryByAppId(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let _this = this;
            return new Promise(function (resolve, reject) {
                let apiInfos = null;
                _this._db.then(function (db) {
                    let apiInfoModel = new ApiInfoModel_1.ApiInfoModel(db);
                    apiInfoModel.query({ appId: data }, function (err, results) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(results);
                        }
                    });
                }).catch(function (err) {
                    reject(err);
                }).catch(function (err) {
                    console.log(err);
                    reject(err);
                });
            });
        });
    }
    // 根据ID查找API相关数据
    queryById(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let _this = this;
            return new Promise(function (resolve, reject) {
                let apiInfos = null;
                _this._db.then(function (db) {
                    let apiInfoModel = new ApiInfoModel_1.ApiInfoModel(db);
                    apiInfoModel.query({ ID: data }, function (err, results) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(results);
                        }
                    });
                }).catch(function (err) {
                    reject(err);
                }).catch(function (err) {
                    console.log(err);
                    reject(err);
                });
            });
        });
    }
    // 先清空数据库信息，在重新插入新的数据集
    loadData(data) {
        // this上下文传递
        let _this = this;
        // 先删除数据信息
        let result = this.remove({});
        // 插入新的数据集
        result.then(function () {
            _this.insert(data);
        }).catch(function (err) {
            console.log(err);
            throw err;
        });
    }
}
exports.ApiInfoService = ApiInfoService;
