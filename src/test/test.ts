import {DBConnect} from "../util/DBConnect";
import {UrlModel} from "../model/UrlModel";
let dbConnect: DBConnect = new DBConnect();
let db: Promise<any> = dbConnect.getDB();

db.then(function(db){
    let urlModel: UrlModel = new UrlModel(db);
    urlModel.query({"id": "1088"}, function(err, results){
        console.log(results[0].appId);
    })
}).catch(function (err) {
    console.log('------------------------------------');
    console.log(err);
    console.log('------------------------------------');
});

