"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DBConnect_1 = require("../util/DBConnect");
const UserListModel_1 = require("../model/UserListModel");
class UserListService {
    constructor() {
        this._db = new DBConnect_1.DBConnect().getDB();
    }
    // 插入多条数据
    insert(data) {
        this._db.then(function (db) {
            let userListModel = new UserListModel_1.UserListModel(db);
            userListModel.insert(data, function (err) {
                if (err) {
                    console.log("INSERT DATA INTO user_list FAIL!");
                    throw err;
                }
                else {
                    console.log("INSERT DATA INTO user_list SUCCESS");
                }
            });
        });
    }
    // 删除数据
    remove(data) {
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
    }
}
