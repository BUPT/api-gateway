import {DBConnect} from "../util/DBConnect";
import {ApiInfoModel} from "../model/ApiInfoModel";

class ApiInfoService{
    // 连接数据库
    private _db: any = new DBConnect().getDB();

    // 数据库所有ApiInfo信息

    // 插入数据
    public async insert(data: {[key: string]: string}[]): Promise<void>{
        this._db.then(function(db){
            let apiInfoModel: ApiInfoModel = new ApiInfoModel(db);
            apiInfoModel.insert(data, function(err){
                if(err){
                    console.log("INSERT DATA INTO API_info FAIL");
                    return;
                }else{
                    console.log("INSERT DATA INTO API_info SUCCESS");
                    return;
                }
            });
        }).catch(function(err){
            console.log(err);
            return;
        });
    }

    public async remove(data: {[key: string]: string}): Promise<void> {
        this._db.then(function(db){
            let apiInfoModel: ApiInfoModel = new ApiInfoModel(db);
            apiInfoModel.remove(data, function(err){
                if(err){
                    console.log("DELETE DATA FROM API_info FAIL!");
                    console.log(err);
                    return;
                }else{
                    console.log("DELETE DATA FROM API_info SUCCESS!");
                    return;
                }
            });
        }).catch(function(err){
            console.log(err);
            return;
        });
    }

    // 根据appId查找API相关数据
    public async queryByAppId(data: string): Promise<any>{
        let _this = this;
        return new Promise(function(resolve, reject){
            let apiInfos: { [key: string]: string } = null;
            _this._db.then(function (db) {
                let apiInfoModel: ApiInfoModel = new ApiInfoModel(db);
                apiInfoModel.query({ appId: data }, function (err, results) {
                    if (err) {
                        reject(err);
                    }else{
                        let apiInfo: Map<string, string> = new Map();
                        for(let i = 0; i < results.length; i++){
                            apiInfo.set(results[i].ID, results[i].URL);
                        }
                        resolve(apiInfo);
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
    // 根据ID查找API相关数据
    public async queryById(data: string): Promise<any> {
        let _this = this;
        return new Promise(function (resolve, reject) {
            let apiInfos: { [key: string]: string } = null;
            _this._db.then(function (db) {
                let apiInfoModel: ApiInfoModel = new ApiInfoModel(db);
                apiInfoModel.query({ ID: data }, function (err, results) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
            }).catch(function (err) {
                reject(err);
            }).catch(function (err) {
                console.log(err);
                reject(err);
            });
        });
    } 

    // 先清空数据库信息，在重新插入新的数据集
    public loadData(data: {[key: string]: string}[]):void {
        // this上下文传递
        let _this = this;
        // 先删除数据信息
        let result: Promise<void> = this.remove({});
        // 插入新的数据集
        result.then(function(){
            _this.insert(data);
        }).catch(function(err){
            console.log(err);
            throw err;
        })
    }
}  
export{ApiInfoService};