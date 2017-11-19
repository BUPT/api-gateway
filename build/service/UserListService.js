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
class UserListService {
    constructor() {
        this._db = new DBConnect_1.DBConnect().getDB();
    }
    // 插入多条数据
    insert(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let _this = this;
            return new Promise(function (resolve, reject) {
                _this._db.then(function (db) {
                    let userListModel = new UserListModel_1.UserListModel(db);
                    userListModel.insert(data, function (err) {
                        if (err) {
                            console.log("INSERT DATA INTO user_list FAIL!");
                            reject(err);
                        }
                        else {
                            console.log("INSERT DATA INTO user_list SUCCESS");
                            resolve(data);
                        }
                    });
                }).catch(function (err) {
                    reject(err);
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
        return new Promise(function (resolve, reject) {
            _this._db.then(function (db) {
                let userListModel = new UserListModel_1.UserListModel(db);
                userListModel.query(data, function (err, results) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    else {
                        resolve(results);
                    }
                });
            }).catch(function (err) {
                console.log(err);
                reject(err);
            });
        });
    }
    // 删除数据
    remove(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this._db.then(function (db) {
                let userListModel = new UserListModel_1.UserListModel(db);
                userListModel.remove(data, function (err) {
                    if (err) {
                        console.log("DELETE DATA FROM user_list FAIL!");
                        throw err;
                    }
                    else {
                        console.log("DELETE DATA FROM user_list SUCCESS!");
                    }
                });
            });
        });
    }
    // 先清空数据库，然后再插入新的数据
    loadData(data) {
        // this上下文传递
        let _this = this;
        // 删除数据库信息
        let result = this.remove({});
        // 插入新的数据
        result.then(function () {
            _this.insert(data);
        }).catch(function (err) {
            console.log(err);
            throw err;
        });
    }
}
exports.UserListService = UserListService;
