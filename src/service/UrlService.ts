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
                    return;
                }else{
                    console.log("DELETE DATA FROM url SUCCESS!");
                    return;
                }
            });
        });
    }

    // 先清空数据库在插入新的数据
    public loadData(data: {[key: string]: string}[]): void{
        // this上下文传递
        let _this = this;
        // 删除数据
        let result: Promise<void> = this.remove({});
        // 插入新数据
        result.then(function(){
            _this.insert(data);
        }).catch(function(err){
            throw err;
        });
    }
}
export{UrlService};