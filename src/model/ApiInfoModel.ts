/**
 * 定义url表的模型
 */
class ApiInfoModel {
    private _apiInfo: any = null;
    constructor(db: any) {
        this._apiInfo = db.define("url", {
            ID: { type: "serial", key: true },
            appId: String,
            name: String,
            type: String,
            argument: String,
            event: String,
            URL: String
        });
    }

    public get(): any {
        return this._apiInfo;
    }

    public set(value: any) {
        this._apiInfo = value;
    }
    // 查找数据
    public query(data: { [key: string]: string }, callback: (err: Error, results: { [key: string]: string }[]) => void) {
        this._apiInfo.find(data, callback);
    }
    // 插入多条数据
    public insert(data: { [key: string]: string }[], callback: (err: Error) => void) {
        this._apiInfo.create(data, callback);
    }

    // 删除数据
    public remove(data: { [key: string]: string }, callback: (err: Error) => void) {
        this._apiInfo.find(data).remove(callback);
    }

    // 更改数据
    public update(data: { [key: string]: string }, eachCallback: (err: Error) => void, saveCallback: (err: Error) => void) {
        this._apiInfo.find(data).each(eachCallback).save(saveCallback);
    }
}

export { ApiInfoModel };