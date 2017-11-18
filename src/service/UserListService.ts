import {DBConnect} from "../util/DBConnect";
import {UserListModel} from "../model/UserListModel";

class UserListService{
    private _db: Promise<any> = new DBConnect().getDB();
    // 插入多条数据
    public async insert(data: {[key:string]: string}[]): Promise<any>{
        let _this = this;
        return new Promise(function (resolve, reject) {
            this._db.then(function (db) {
                let userListModel: UserListModel = new UserListModel(db);
                userListModel.insert(data, function (err) {
                    if (err) {
                        console.log("INSERT DATA INTO user_list FAIL!");
                        reject(0)
                    } else {
                        console.log("INSERT DATA INTO user_list SUCCESS");
                        resolve(1);
                    }
                });
            });
        });
    }
    /**
     * 查询数据
     * @param data 查询条件
     */
    public query(data: {[key: string]: string}): Promise<any>{
        let _this = this;
        return new Promise(function(resolve, reject){
            _this._db.then(function(db){
                let userListModel: UserListModel = new UserListModel(db);
                userListModel.query(data, function(err, results){
                    if(err){
                        console.log(err);
                        reject(err);
                    }else{
                        resolve(results);
                    }
                });
            }).catch(function(err){
                console.log(err);
                reject(err);
            });
        });
    }
    // 删除数据
    public async remove(data: {[key:string]: string}): Promise<void>{
        this._db.then(function(db){
            let userListModel: UserListModel = new UserListModel(db);
            userListModel.remove(data, function(err){
                if(err){
                    console.log("DELETE DATA FROM user_list FAIL!");
                    throw err;
                }else{
                    console.log("DELETE DATA FROM user_list SUCCESS!");
                }
            });
        });
    }

    // 先清空数据库，然后再插入新的数据
    public loadData(data: {[key: string]: string}[]): void{
        // this上下文传递
        let _this = this;
        // 删除数据库信息
        let result: Promise<void> = this.remove({});
        // 插入新的数据
        result.then(function(){
            _this.insert(data);
        }).catch(function(err){
            console.log(err);
            throw err;
        });
    }
}
export {UserListService};