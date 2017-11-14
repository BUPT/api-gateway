import {DBConnect} from "../util/DBConnect";
import {UserListModel} from "../model/UserListModel";

class UserListService{
    private _db: Promise<any> = new DBConnect().getDB();
    // 插入多条数据
    public insert(data: {[key:string]: string}[]): void{
        this._db.then(function(db){
            let userListModel: UserListModel = new UserListModel(db);
            userListModel.insert(data, function(err){
                if(err){
                    console.log("INSERT DATA INTO user_list FAIL!");
                    throw err;
                }else{
                    console.log("INSERT DATA INTO user_list SUCCESS");
                }
            });
        });
    }
    // 删除数据
    public remove(data: {[key:string]: string}): void{
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
}