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
const UserListModel_1 = require("../model/UserListModel");
const GeneralResult_1 = require("../general/GeneralResult");
class UserListService {
    constructor() {
        this._db = new DBConnect_1.DBConnect().getDB();
    }
    /**
     * 插入多条数据
     * @param data
     */
    insert(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let _this = this;
            return new Promise(function (resolve) {
                _this._db.then(function (db) {
                    let userListModel = new UserListModel_1.UserListModel(db);
                    userListModel.insert(data, function (err) {
                        if (err) {
                            console.log("INSERT DATA INTO user_list FAIL!");
                            return resolve(new GeneralResult_1.GeneralResult(false, err.message, null));
                        }
                        else {
                            console.log("INSERT DATA INTO user_list SUCCESS");
                            return resolve(new GeneralResult_1.GeneralResult(true, null, data));
                        }
                    }).catch(function (err) {
                        console.log("INSERT DATA INTO user_list FAIL!");
                        return resolve(new GeneralResult_1.GeneralResult(false, err.message, null));
                    });
                }).catch(function (err) {
                    console.log("INSERT DATA INTO user_list FAIL!");
                    return resolve(new GeneralResult_1.GeneralResult(false, err.message, null));
                });
            });
        });
    }
    /**
     * 查询数据
     * @param data 查询条件
     */
    query(data) {
        let _this = this;
        return new Promise(function (resolve) {
            _this._db.then(function (db) {
                let userListModel = new UserListModel_1.UserListModel(db);
                userListModel.query(data, function (err, results) {
                    if (err) {
                        console.log(err);
                        resolve(new GeneralResult_1.GeneralResult(false, err.message, null));
                    }
                    else {
                        resolve(new GeneralResult_1.GeneralResult(true, null, results));
                    }
                });
            }).catch(function (err) {
                console.log(err);
                resolve(new GeneralResult_1.GeneralResult(false, err.message, null));
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
            return new Promise(function (resolve, reject) {
                _this._db.then(function (db) {
                    let userListModel = new UserListModel_1.UserListModel(db);
                    userListModel.remove(data, function (err) {
                        if (err) {
                            console.log("DELETE DATA FROM user_list FAIL!");
                            reject(new GeneralResult_1.GeneralResult(false, err.message, null));
                        }
                        else {
                            console.log("DELETE DATA FROM user_list SUCCESS!");
                            resolve(new GeneralResult_1.GeneralResult(true, null, null));
                        }
                    });
                }).catch(function (err) {
                    console.log("DELETE DATA FROM user_list FALI!");
                    reject(new GeneralResult_1.GeneralResult(false, err.message, null));
                });
            });
        });
    }
    // 先清空数据库，然后再插入新的数据
    loadData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // 删除数据库信息
            let result = yield this.remove({});
            // 如果删除数据成功，则插入数据
            if (result.getResult() == true) {
                this.insert(data);
            }
            else {
                console.log(result.getReason());
            }
        });
    }
}
exports.UserListService = UserListService;
