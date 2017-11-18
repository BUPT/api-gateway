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
            this._db.then(function (db) {
                let urlModel = new UrlModel_1.UrlModel(db);
                urlModel.insert(data, function (err) {
                    if (err) {
                        console.log("INSERT DATA INTO url FAIL!");
                        throw err;
                    }
                    console.log("INSERT DATA INTO url SUCCESS!");
                });
            });
        });
    }
    // 删除数据
    remove(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this._db.then(function (db) {
                let urlModel = new UrlModel_1.UrlModel(db);
                urlModel.remove(data, function (err) {
                    if (err) {
                        console.log("DELETE DATA FROM url FAIL!");
                        return;
                    }
                    else {
                        console.log("DELETE DATA FROM url SUCCESS!");
                        return;
                    }
                });
            });
        });
    }
    // 先清空数据库在插入新的数据
    loadData(data) {
        // this上下文传递
        let _this = this;
        // 删除数据
        let result = this.remove({});
        // 插入新数据
        result.then(function () {
            _this.insert(data);
        }).catch(function (err) {
            throw err;
        });
    }
}
exports.UrlService = UrlService;
