import {DBConnect} from "../util/DBConnect";
import {UrlModel}  from "../model/UrlModel";
import {GeneralResult} from "../general/GeneralResult";
class UrlService{

    // 连接数据库
    private _db:any = new DBConnect().getDB();
    /**
     * @description 插入多条数据
     * @param data
     */
    public async insert(data: {[key:string]: string}[]): Promise<GeneralResult>{
        // 传递上下文
        let _this = this;
        return new Promise<GeneralResult>(function(resolve){
            _this._db.then(function (db) {
                let urlModel: UrlModel = new UrlModel(db);
                urlModel.insert(data, function (err) {
                    if (err) {
                        console.log("INSERT DATA INTO url FAIL!");
                        resolve(new GeneralResult(false, err.message, null));
                    } else {
                        console.log("INSERT DATA INTO url SUCCESS!")
                        resolve(new GeneralResult(true, null, data));
                    }
                });
            }).catch(function(err){
                console.log("INSERT DATA INTO url FAIL!");
                resolve(new GeneralResult(false, err.message, null));
            });
        });
    }
    
    /**
     * 删除数据
     * @param data 
     */
    public async remove(data: {[key:string]:string}): Promise<GeneralResult>{
        // 传递上下文
        let _this = this;
        return new Promise<GeneralResult>(function(resolve){
            _this._db.then(function (db) {
                let urlModel: UrlModel = new UrlModel(db);
                urlModel.remove(data, function (err) {
                    if (err) {
                        console.log("DELETE DATA FROM url FAIL!");
                        resolve(new GeneralResult(false, err.message, null));
                    } else {
                        console.log("DELETE DATA FROM url SUCCESS!");
                        resolve(new GeneralResult(true, null, null));
                    }
                });
            }).catch(function(err){
                console.log("DELETE DATA FROM url FALI!");
                resolve(new GeneralResult(false, err.message, null));
            });
        });
    }

    /**
     * 先清空数据库在插入新的数据
     * @param data 
     */
    public async loadData(data: {[key: string]: string}[]): Promise<void>{
        // 删除数据
        let result: GeneralResult = await this.remove({});
        // 如果删除成功，则插入新的数据
        if(result.getResult() == true){
            this.insert(data);
        }else{
            console.log(result.getReason());
        }
    }



    /**
     * 查询url表中的信息
     * @param data 
     */
    public async query(data: {[key: string]: string}): Promise<GeneralResult>{
        // 传递上下文
        let _this = this;
        return new Promise<GeneralResult>(function(resolve){
            _this._db.then(function (db) {
                let urlModel: UrlModel = new UrlModel(db);
                urlModel.query(data, function (err, results) {
                    if (err) {
                        resolve(new GeneralResult(false, err.message, null));
                    } else {
                        resolve(new GeneralResult(true, null, results));
                    }
                });
            });
        })
    }
}
export{UrlService};