/**
 * 定义url表的模型
 */
class UserListModel {
    private _userList: any = null;
    constructor(db: any) {
        this._userList = db.define("url", {
            ID: { type: 'serial', key: true },
            user_name: String,
            email: String,
            password: String,
            salt: String,
            role: String,
            raw_password: String
        });
    }

    public get(): any {
        return this._userList;
    }

    public set(value: any) {
        this._userList = value;
    }
    // 查找数据
    public query(data: { [key: string]: string }, callback: (err: Error, results: { [key: string]: string }[]) => void) {
        this._userList.find(data, callback);
    }
    // 插入多条数据
    public insert(data: { [key: string]: string }[], callback: (err: Error) => void) {
        this._userList.create(data, callback);
    }

    // 删除数据
    public remove(data: { [key: string]: string }, callback: (err: Error) => void) {
        this._userList.find(data).remove(callback);
    }

    // 更改数据
    public update(data: { [key: string]: string }, eachCallback: (err: Error) => void, saveCallback: (err: Error) => void) {
        this._userList.find(data).each(eachCallback).save(saveCallback);
    }
}

export { UserListModel };