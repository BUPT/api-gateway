"use strict";
/**
 * @author: 林贻民
 * @description: 使用orm框架连接数据库，并将该链接保存在缓存变量中
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ORM = require("orm");
const config_1 = require("../config/config");
// 保存数据库连接的全局变量
let db = null;
class DBConnect {
    constructor() {
        this._db = null;
        this._db = (() => __awaiter(this, void 0, void 0, function* () {
            if (db === null) {
                db = yield this.createConnect();
                console.log("数据库连接");
            }
            return db;
        }))();
    }
    getDB() {
        return this._db;
    }
    createConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                let config = new config_1.Config();
                let storage = config.getStorage();
                // 数据库信息
                let opts = {
                    host: storage.host,
                    database: storage.database,
                    password: storage.password,
                    protocol: storage.protocol,
                    port: storage.port,
                    // 启用连接池
                    query: { pool: true }
                };
                ORM.connect(opts, function (err, db) {
                    if (err) {
                        reject(err);
                    }
                    resolve(db);
                });
            });
        });
    }
}
exports.DBConnect = DBConnect;
