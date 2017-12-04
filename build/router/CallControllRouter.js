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
const db_1 = require("../util/db");
class CallControllRouter {
    /**
     * CallControll_Handler
     */
    getDb() {
        return this.db;
    }
    getOptions() {
        return this.options;
    }
    getHttp() {
        return this.http;
    }
    getRequest() {
        return this.request;
    }
    getResponse() {
        return this.response;
    }
    getIp() {
        return this.ip;
    }
    setDb(db) {
        this.db = db;
    }
    setRequest(request) {
        this.request = request;
    }
    setResponse(response) {
        this.response = response;
    }
    setPhone(phone) {
        //       console.log("phone====>"+phone);
        this.phone = phone;
    }
    setHttp(http) {
        this.http = http;
    }
    constructor(host, user, passwd, database, options, http, request, response, phone) {
        this.db = new db_1.DataBase(host, user, passwd, database);
        this.options = options;
        this.http = http;
        this.request = request;
        this.response = response;
        this.phone = phone;
    }
    CallControll_Handler() {
        return __awaiter(this, void 0, void 0, function* () {
            let pos = yield getUserPos(this.db.getConnection(), this.phone);
            let ip = yield getUserIp(this.db.getConnection(), pos);
            this.options["host"] = ip;
            this.options["path"] = "/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=" + this.phone;
            var real_req = this.http.request(this.options, (real_res) => {
                real_res.pipe(this.response);
                this.response.write("<br/>（呼叫控制类API调用）hello,this is from " + pos + ",and it's owner is " + this.phone);
            });
            this.request.pipe(real_req);
        });
    }
}
exports.CallControllRouter = CallControllRouter;
var getUserPos = function (connection, phone) {
    return new Promise((resolve, reject) => {
        // console.log("userpos==>"+connection);
        connection.query("select * from router where src = " + "'" + phone + "'", function (err, results, fields) {
            if (err)
                reject(err);
            else
                resolve(results[0]["des"]);
        });
    });
};
var getUserIp = function (connection, pos) {
    return new Promise((resolve, reject) => {
        //      console.log("userip==>");
        connection.query("select * from city_ip where city = " + "'" + pos + "'", function (err, results, fields) {
            if (err)
                reject(err);
            else
                resolve(results[0]["ip"]);
        });
    });
};
