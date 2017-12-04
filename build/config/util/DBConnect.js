"use strict";
/**
 * @author: 林贻民
 * @description: 使用orm框架连接数据库，并将该链接保存在缓存变量中
 */
Object.defineProperty(exports, "__esModule", { value: true });
class DBConnect {
    constructor() {
        this._db = null;
        // 数据库信息
        var opts = {
            host: config.storage.host,
            database: config.storage.database,
            password: config.storage.password,
            protocol: config.storage.protocol,
            port: config.storage.port,
            // 启用连接池
            query: { pool: true }
        };
    }
}
