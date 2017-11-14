"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DBConnect_1 = require("../util/DBConnect");
const UrlModel_1 = require("../model/UrlModel");
let dbConnect = new DBConnect_1.DBConnect();
let db = dbConnect.getDB();
db.then(function (db) {
    let urlModel = new UrlModel_1.UrlModel(db);
    let t = urlModel.query({ "id": "1088" }, function (err, results) {
        if (results.length > 0) {
            console.log(results[0].APPId);
        }
    });
    t.then(() => {
        let data = [{ "id": "1200", "APPId": "001", "from": "/index", "to": "www.google.com", "status": "1", "is_new": "1" },
            { "id": "1201", "APPId": "001", "from": "/index", "to": "www.google.com", "status": "1", "is_new": "1" }];
        // let data = {};
        urlModel.insert(data, function (err) {
            console.log("Hello");
        });
    });
}).catch(function (err) {
    console.log('------------------------------------');
    console.log(err);
    console.log('------------------------------------');
});
// async function test(): Promise<any>{
//     return 1;
// }
// let t = test();
// t.then(function(t){
//     console.log(t);
// }).catch(function(err){
//     console.log(err);
// }) 
