"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 定义url表的模型
 */
class UserListModel {
    constructor(db) {
        this._userList = null;
        this._userList = db.define("url", {
            ID: { type: 'serial', key: true },
            user_name: String,
            email: String,
            password: String,
            salt: String,
            role: String,
            raw_password: String
        });
    }
    get() {
        return this._userList;
    }
    set(value) {
        this._userList = value;
    }
    // 查找数据
    query(data, callback) {
        this._userList.find(data, callback);
    }
    // 插入多条数据
    insert(data, callback) {
        this._userList.create(data, callback);
    }
    // 删除数据
    remove(data, callback) {
        this._userList.find(data).remove(callback);
    }
    // 更改数据
    update(data, eachCallback, saveCallback) {
        this._userList.find(data).each(eachCallback).save(saveCallback);
    }
}
exports.UserListModel = UserListModel;
