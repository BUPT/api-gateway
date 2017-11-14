import {DBConnect} from "../util/DBConnect";
import {UrlModel} from "../model/UrlModel";
let dbConnect: DBConnect = new DBConnect();
let db: Promise<any> = dbConnect.getDB();

db.then(function(db){
    let urlModel: UrlModel = new UrlModel(db);
    let t = urlModel.query({"id": "1088"}, function(err, results){
        if(results.length > 0){
            console.log(results[0].APPId);
        }
    });
    t.then(() => {
        let data: { [key: string]: string }[] = [{ "id": "1200", "APPId": "001", "from": "/index", "to": "www.google.com", "status": "1", "is_new": "1" }, 
            { "id": "1201", "APPId": "001", "from": "/index", "to": "www.google.com", "status": "1", "is_new": "1" }];
        // let data = {};
        urlModel.insert(data, function(err){
            console.log("Hello");
        })
    })
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