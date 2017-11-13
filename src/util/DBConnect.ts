/**
 * @author: 林贻民
 * @description: 使用orm框架连接数据库，并将该链接保存在缓存变量中
 */

import ORM = require("orm");
import {Config} from "../config/config";

class DBConnect{
    private _db: Promise<any> = null;
    constructor(){
        this._db = (async () => { return await this.createConnect(); })();
    }

    public getDB(): Promise<any>{
        return this._db;
    }

    async createConnect(): Promise<any>{
        return new Promise(function(resolve, reject){
            let config = new Config();
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
            ORM.connect(opts, function (err: Error, db) {
                if (err) {
                    reject(err);
                }
                resolve(db);
            });
        });
    }
}
export {DBConnect};