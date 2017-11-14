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
 * 定义user_list表的模型
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
        return __awaiter(this, void 0, void 0, function* () {
            this._userList.find(data, callback);
        });
    }
    // 插入多条数据
    insert(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            this._userList.create(data, callback);
        });
    }
    // 删除数据
    remove(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            this._userList.find(data).remove(callback);
        });
    }
    // 更改数据
    update(data, eachCallback, saveCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            this._userList.find(data).each(eachCallback).save(saveCallback);
        });
    }
}
exports.UserListModel = UserListModel;
