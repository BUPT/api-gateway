import {CombinationUrlModel} from "../model/CombinationUrlModel";
import {DBConnect} from "../util/DBConnect";
import { GeneralResult } from "../general/GeneralResult";
import { CombinationPlugin } from "../plugin/CombinationPlugin";

class CombinationUrlService{
    // 连接数据库
    private _db: any = new DBConnect().getDB();

    /**
     * 插入多条数据
     * @param data 
     */
    public insert(data: {[key: string]: string}[]): Promise<GeneralResult>{
        // 上下文传递
        let _this = this;
        return new Promise<GeneralResult>(function(resolve){
            _this._db.then(function(db){
                let combinationUrlModel: CombinationUrlModel = new CombinationUrlModel(db);
                combinationUrlModel.insert(data, function(err){
                    if(err){
                        console.log(err);
                        console.log("INSERT DATA INTO combination_url FAIL");
                        resolve(new GeneralResult(false, err.message, null));
                    }else{
                        console.log("INSERT DATA INTO combination_url SUCCESS");
                        resolve(new GeneralResult(true, null, data));
                    }
                });
            }).catch(function(err){
                console.log(err);
                console.log("INSERT DATA INTO combination_url FAIL");
                resolve(new GeneralResult(false, err.message, null));
            });
        });
    }

    public async remove(data: { [key: string]: string }): Promise<GeneralResult> {
        // 传递上下文
        let _this = this;
        return new Promise<GeneralResult>(function (reslove) {
            _this._db.then(function (db) {
                let combinationUrlModel: CombinationUrlModel = new CombinationUrlModel(db);
                combinationUrlModel.remove(data, function (err) {
                    if (err) {
                        console.log("DELETE DATA FROM combination_url FAIL!");
                        console.log(err);
                        reslove(new GeneralResult(false, err.message, null));
                    } else {
                        console.log("DELETE DATA FROM combination_url SUCCESS!");
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
                let combinationUrlModel: CombinationUrlModel = new CombinationUrlModel(db);
                combinationUrlModel.query(data, function (err, results) {
                    if (err) {
                        resolve(new GeneralResult(false, err.message, null));
                    } else {
                        resolve(new GeneralResult(true, null, results));
                    }
                });
            }).catch(function(err){
                resolve(new GeneralResult(false, err.message, null));
            });
        });
    }

    public async update(condition: { [key: string]: string }, serviceName: string): Promise<GeneralResult> {
        let combinationUrlService: CombinationUrlService = new CombinationUrlService();
        let queryResult: GeneralResult = await combinationUrlService.query(condition);
        let removeResult: GeneralResult = null;
        if(queryResult.getResult() == true){
            removeResult = await combinationUrlService.remove(condition);
        }else{
            return new GeneralResult(false, "该服务不存在", null);
        }
        if (removeResult.getResult() == true) {
            let dataum: { [key: string]: string }[] = queryResult.getDatum();
            if (dataum == null || dataum.length == 0) {
                return new GeneralResult(false, "该服务不存在", null);
            }
            let data: { [key: string]: string } = {};
            data.id = dataum[0].id;
            data.url = serviceName;
            data.atom_url = dataum[0].atom_url;
            let insertResult: GeneralResult = await combinationUrlService.insert([data]);
            return insertResult;
        } else {
            return removeResult;
        }
    }
}
export{CombinationUrlService};