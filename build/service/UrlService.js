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
const UrlModel_1 = require("../model/UrlModel");
const GeneralResult_1 = require("../general/GeneralResult");
class UrlService {
    constructor() {
        // 连接数据库
        this._db = new DBConnect_1.DBConnect().getDB();
    }
    /**
     * @description 插入多条数据
     * @param data
     */
    insert(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // 传递上下文
            let _this = this;
            return new Promise(function (resolve) {
                _this._db.then(function (db) {
                    let urlModel = new UrlModel_1.UrlModel(db);
                    urlModel.insert(data, function (err) {
                        if (err) {
                            console.log("INSERT DATA INTO url FAIL!");
                            resolve(new GeneralResult_1.GeneralResult(false, err.message, null));
                        }
                        else {
                            console.log("INSERT DATA INTO url SUCCESS!");
                            resolve(new GeneralResult_1.GeneralResult(true, null, data));
                        }
                    });
                }).catch(function (err) {
                    console.log("INSERT DATA INTO url FAIL!");
                    resolve(new GeneralResult_1.GeneralResult(false, err.message, null));
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
            return new Promise(function (resolve) {
                _this._db.then(function (db) {
                    let urlModel = new UrlModel_1.UrlModel(db);
                    urlModel.remove(data, function (err) {
                        if (err) {
                            console.log("DELETE DATA FROM url FAIL!");
                            resolve(new GeneralResult_1.GeneralResult(false, err.message, null));
                        }
                        else {
                            console.log("DELETE DATA FROM url SUCCESS!");
                            resolve(new GeneralResult_1.GeneralResult(true, null, null));
                        }
                    });
                }).catch(function (err) {
                    console.log("DELETE DATA FROM url FALI!");
                    resolve(new GeneralResult_1.GeneralResult(false, err.message, null));
                });
            });
        });
    }
    /**
     * 先清空数据库在插入新的数据
     * @param data
     */
    loadData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // 删除数据
            let result = yield this.remove({});
            // 如果删除成功，则插入新的数据
            if (result.getResult() == true) {
                this.insert(data);
            }
            else {
                console.log(result.getReason());
            }
        });
    }
    /**
     * 查询url表中的信息
     * @param data
     */
    query(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // 传递上下文
            let _this = this;
            return new Promise(function (resolve) {
                _this._db.then(function (db) {
                    let urlModel = new UrlModel_1.UrlModel(db);
                    urlModel.query(data, function (err, results) {
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
}
exports.UrlService = UrlService;
