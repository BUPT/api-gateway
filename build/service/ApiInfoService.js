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
    // 插入数据
    function(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this._db.then(function (db) {
                let apiInfoModel = new ApiInfoModel_1.ApiInfoModel(db);
                apiInfoModel.insert(data, function (err) {
                    if (err) {
                        console.log("INSERT DATA INTO API_info FAIL");
                        throw err;
                    }
                    else {
                        console.log("INSERT DATA INTO API_info SUCCESS");
                    }
                });
            });
        });
    }
}
