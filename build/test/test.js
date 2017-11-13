"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DBConnect_1 = require("../util/DBConnect");
const UrlModel_1 = require("../model/UrlModel");
let dbConnect = new DBConnect_1.DBConnect();
let db = dbConnect.getDB();
db.then(function (db) {
    let urlModel = new UrlModel_1.UrlModel(db);
    urlModel.query({ "id": "1088" }, function (err, results) {
        console.log(results[0].appId);
    });
}).catch(function (err) {
    console.log('------------------------------------');
    console.log(err);
    console.log('------------------------------------');
});
