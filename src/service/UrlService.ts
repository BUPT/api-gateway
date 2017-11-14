import {DBConnect} from "../util/DBConnect";
import {UrlModel}  from "../model/UrlModel";
class UrlService{

    // 连接数据库
    private _db:any = new DBConnect().getDB();
    /**
     * @description 插入多条数据
     * @param data
     */
    public async insert(data: {[key:string]: string}[]): Promise<void>{
        this._db.then(function(db){
            let urlModel: UrlModel = new UrlModel(db);
            urlModel.insert(data, function(err){
                if(err){
                    console.log("INSERT DATA INTO url FAIL!");
                    throw err;
                }
                console.log("INSERT DATA INTO url SUCCESS!")
            });
        });
    }
    // 删除数据
    public async remove(data: {[key:string]:string}): Promise<void>{
        this._db.then(function(db){
            let urlModel: UrlModel = new UrlModel(db);
            urlModel.remove(data, function(err){
                if(err){
                    console.log("DELETE DATA FROM url FAIL!");
                    throw err;
                }else{
                    console.log("DELETE DATA FROM url SUCCESS!");
                }
            });
        });
    }
}
export{UrlService};