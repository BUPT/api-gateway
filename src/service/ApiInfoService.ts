import {DBConnect} from "../util/DBConnect";
import {ApiInfoModel} from "../model/ApiInfoModel";

class ApiInfoService{
    // 连接数据库
    private _db:any = new DBConnect().getDB();

    // 插入数据
    public async function(data: {[key: string]: string}[]): Promise<void>{
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
        });
    }
}  