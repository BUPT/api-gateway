import {DBConnect} from "../util/DBConnect";
import {ApiInfoModel} from "../model/ApiInfoModel";
import {GeneralResult} from "../general/GeneralResult";

class ApiInfoService{
    // 连接数据库
    private _db: any = new DBConnect().getDB();

    // 数据库所有ApiInfo信息

    // 插入数据
    public async insert(data: {[key: string]: string}[]): Promise<GeneralResult>{
        // 传递上下文
        let _this = this;
        return new Promise<GeneralResult>(function(resolve){
            _this._db.then(function (db) {
                let apiInfoModel: ApiInfoModel = new ApiInfoModel(db);
                apiInfoModel.insert(data, function (err) {
                    if (err) {
                        console.log("INSERT DATA INTO API_info FAIL");
                        resolve(new GeneralResult(false, err.message, data));
                    } else {
                        console.log("INSERT DATA INTO API_info SUCCESS");
                        resolve(new GeneralResult(true, null, data));
                    }
                });
            }).catch(function (err) {
                console.log(err);
                resolve(new GeneralResult(false, err.message, data));
            });
        });
        
    }

    public async remove(data: {[key: string]: string}): Promise<GeneralResult> {
        // 传递上下文
        let _this = this;
        return new Promise<GeneralResult>(function(reslove){
            _this._db.then(function (db) {
                let apiInfoModel: ApiInfoModel = new ApiInfoModel(db);
                apiInfoModel.remove(data, function (err) {
                    if (err) {
                        console.log("DELETE DATA FROM API_info FAIL!");
                        console.log(err);
                        reslove(new GeneralResult(false, err.message, null));
                    } else {
                        console.log("DELETE DATA FROM API_info SUCCESS!");
                        reslove(new GeneralResult(true, null, null));
                    }
                });
            }).catch(function (err) {
                console.log(err);
                reslove(new GeneralResult(false, err.message, null));
            });
        });
    }


    /**
     * 查询数据
     * @param data 
     */
    public async query(data: {[key: string]: string}): Promise<GeneralResult>{
        // 上下文传递
        let _this = this;
        return new Promise<GeneralResult>(function(resolve){
            _this._db.then(function (db) {
                let apiInfoModel: ApiInfoModel = new ApiInfoModel(db);
                apiInfoModel.query(data, function (err, results) {
                    if (err) {
                        resolve(new GeneralResult(false, err.message, null));
                    } else {
                        console.log(results[0]);
                        resolve(new GeneralResult(true, null, results));
                    }
                });
            });
        });
    }

    // 根据appId查找API相关数据
    public async queryByAppId(data: string): Promise<GeneralResult>{
        let _this = this;
        return new Promise<GeneralResult>(function(resolve){
            let apiInfos: { [key: string]: string } = null;
            _this._db.then(function (db) {
                let apiInfoModel: ApiInfoModel = new ApiInfoModel(db);
                apiInfoModel.query({ appId: data }, function (err, results) {
                    if (err) {
                        resolve(new GeneralResult(false, err.message, null));
                    }else{
                        let apiInfo: Map<string, string> = new Map();
                        for(let i = 0; i < results.length; i++){
                            apiInfo.set(results[i].ID, results[i].URL);
                        }
                        resolve(new GeneralResult(true, null, apiInfo));
                    }
                });
            }).catch(function(err){
                console.log(err);
                resolve(new GeneralResult(false, err.message, null));
            });
        });
    } 
    // 根据ID查找API相关数据
    public async queryById(data: string): Promise<GeneralResult> {
        let _this = this;
        return new Promise<GeneralResult>(function (resolve) {
            let apiInfos: { [key: string]: string } = null;
            _this._db.then(function (db) {
                let apiInfoModel: ApiInfoModel = new ApiInfoModel(db);
                apiInfoModel.query({ ID: data }, function (err, results) {
                    if (err) {
                        resolve(new GeneralResult(false, err.message, null));
                    } else {
                        resolve(new GeneralResult(true, null, results));
                    }
                });
            }).catch(function (err) {
                resolve(new GeneralResult(false, err.message, null));
            });
        });
    } 

    // 先清空数据库信息，在重新插入新的数据集
    public async loadData(data: {[key: string]: string}[]): Promise<void> {
        // 先删除数据信息
        let result: GeneralResult = await this.remove({});
        // 刪除成功则插入新的数据集
        if(result.getResult() === true){
            this.insert(data);
        }else{
            console.log(result.getReason());
        }
    }


    public eachCallback(data: string): void{
        
    }

    public async update(condition: {[key: string]: string}, serviceName: string): Promise<GeneralResult>{
        let apiInfoService: ApiInfoService = new ApiInfoService();
        let queryResult: GeneralResult = await apiInfoService.query(condition);
        let removeResult: GeneralResult = await apiInfoService.remove(condition);
        if(queryResult.getResult() == true && removeResult.getResult() == true){
            let dataum: {[key: string]: string}[] = queryResult.getDatum();
            if(dataum.length == 0){
                return new GeneralResult(false,"该服务不存在", null);
            }
            dataum[0]["URL"] = serviceName;
            let data:{[key: string]: string} = {};
            data.ID = dataum[0].ID;
            data.appId = dataum[0].appId;
            data.name = dataum[0].name;
            data.type = dataum[0].type;
            data.argument = dataum[0].argument;
            data.event = dataum[0].event;
            data.URL = dataum[0].URL;
            let insertResult: GeneralResult = await apiInfoService.insert([data]);
            return insertResult;
        }else{
            return (queryResult.getResult() == true) ? queryResult : removeResult;
        }
    }
}  
export{ApiInfoService};