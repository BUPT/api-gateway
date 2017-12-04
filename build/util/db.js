"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class DataBase {
    constructor(host, user, passwd, db) {
        this.host = host;
        this.user = user;
        this.passwd = passwd;
        this.db = db;
        this.connection = mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.passwd,
            database: this.db
        });
        this.connection.connect();
    }
    setDb(db) {
        this.db = db;
    }
    getDb() {
        return this.db;
    }
    setPasswd(passwd) {
        this.passwd = passwd;
    }
    getPasswd(passwd) {
        return this.passwd;
    }
    setUser(user) {
        this.user = user;
    }
    getUser() {
        return this.user;
    }
    setHost(host) {
        this.host = host;
    }
    getHost() {
        return this.host;
    }
    setConnection(connection) {
        this.connection = connection;
    }
    getConnection() {
        return this.connection;
    }
}
exports.DataBase = DataBase;
