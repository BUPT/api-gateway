import {DBConnect} from "../util/DBConnect";
import {UserListModel} from "../model/UserListModel";
import {GeneralResult} from "../general/GeneralResult";
class UserListService{
    private _db: Promise<any> = new DBConnect().getDB();
    /**
     * 插入多条数据
     * @param data 
     */
    public async insert(data: {[key:string]: string}[]): Promise<GeneralResult>{
        let _this = this;
        return new Promise<GeneralResult>(function (resolve) {
            _this._db.then(function (db) {
                let userListModel: UserListModel = new UserListModel(db);
                userListModel.insert(data, function (err) {
                    if (err) {
                        console.log("INSERT DATA INTO user_list FAIL!");
                        return resolve(new GeneralResult(false, err.message, null));
                    } else {
                        console.log("INSERT DATA INTO user_list SUCCESS");
                        return resolve(new GeneralResult(true, null, data));
                    }
                }).catch(function(err){
                    console.log("INSERT DATA INTO user_list FAIL!");
                    return resolve(new GeneralResult(false, err.message, null));
                });
            }).catch(function(err){
                console.log("INSERT DATA INTO user_list FAIL!");
                return resolve(new GeneralResult(false, err.message, null));
            });
        });
    }
    /**
     * 查询数据
     * @param data 查询条件
     */
    public query(data: {[key: string]: string}): Promise<GeneralResult>{
        let _this = this;
        return new Promise<GeneralResult>(function(resolve){
            _this._db.then(function(db){
                let userListModel: UserListModel = new UserListModel(db);
                userListModel.query(data, function(err, results){
                    if(err){
                        console.log(err);
                        resolve(new GeneralResult(false, err.message, null));
                    }else{
                        resolve(new GeneralResult(true, null, results));
                    }
                });
            }).catch(function(err){
                console.log(err);
                resolve(new GeneralResult(false, err.message, null));
            });
        });
    }
    /**
     * 删除数据
     * @param data 
     */
    public async remove(data: {[key:string]: string}): Promise<GeneralResult>{
        // 传递上下文
        let _this = this;
        return new Promise<GeneralResult>(function(resolve, reject){
            _this._db.then(function (db) {
                let userListModel: UserListModel = new UserListModel(db);
                userListModel.remove(data, function (err) {
                    if (err) {
                        console.log("DELETE DATA FROM user_list FAIL!");
                        reject(new GeneralResult(false, err.message, null));
                    } else {
                        console.log("DELETE DATA FROM user_list SUCCESS!");
                        resolve(new GeneralResult(true, null, null));
                    }
                });
            }).catch(function(err){
                console.log("DELETE DATA FROM user_list FALI!");
                reject(new GeneralResult(false, err.message, null));
            });
        });
    }

    // 先清空数据库，然后再插入新的数据
    public async loadData(data: {[key: string]: string}[]): Promise<void>{
        // 删除数据库信息
        let result: GeneralResult = await this.remove({});
        // 如果删除数据成功，则插入数据
        if(result.getResult() == true){
            this.insert(data);
        }else{
            console.log(result.getReason());
        }
    }
}
export {UserListService};