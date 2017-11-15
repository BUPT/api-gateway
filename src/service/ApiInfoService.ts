import {DBConnect} from "../util/DBConnect";
import {ApiInfoModel} from "../model/ApiInfoModel";

class ApiInfoService{
    // 连接数据库
    private _db: any = new DBConnect().getDB();

    // 插入数据
    public async insert(data: {[key: string]: string}[]): Promise<void>{
        this._db.then(function(db){
            let apiInfoModel: ApiInfoModel = new ApiInfoModel(db);
            apiInfoModel.insert(data, function(err){
                if(err){
                    console.log("INSERT DATA INTO API_info FAIL");
                    throw err;
                }else{
                    console.log("INSERT DATA INTO API_info SUCCESS");
                }
            });
        }).catch(function(err){
            console.log(err);
        });
    }

    // 根据ID查找API相关数据
    public async queryById(data: string): Promise<any>{
        let _this = this;
        return new Promise(function(resolve, reject){
            let apiInfos: { [key: string]: string } = null;
            _this._db.then(function (db) {
                let apiInfoModel: ApiInfoModel = new ApiInfoModel(db);
                apiInfoModel.query({ ID: data }, function (err, results) {
                    if (err) {
                        reject(err);
                    }else{
                        resolve(results);
                    }
                });
            }).catch(function(err){
                 reject(err);
            }).catch(function(err){
                console.log(err);
                reject(err);
            });
        });
    } 
}  
export{ApiInfoService};