/**
 * 定义combination_url表模型
 */
class CombinationUrlModel{
    private _combinationUrl: any = null;
    constructor(db: any) {
        this._combinationUrl = db.define("combination_url", {
            id: { type: 'serial', key: true },
            url: String,
            atom_url: String
        });
    }

    public get(): any {
        return this._combinationUrl;
    }

    public set(value: any) {
        this._combinationUrl = value;
    }
    // 查找数据
    public async query(data: { [key: string]: string }, callback: (err: Error, results: { [key: string]: string }[]) => void): Promise<void> {
        this._combinationUrl.find(data, callback);
    }
    // 插入多条数据
    public async insert(data: { [key: string]: string }[], callback: (err: Error) => void): Promise<void> {
        this._combinationUrl.create(data, callback);
    }

    // 删除数据
    public async remove(data: { [key: string]: string }, callback: (err: Error) => void): Promise<void> {
        this._combinationUrl.find(data).remove(callback);
    }

    // 更改数据
    public async update(data: { [key: string]: string }, eachCallback: (err: Error) => void, saveCallback: (err: Error) => void): Promise<void> {
        this._combinationUrl.find(data).each(eachCallback).save(saveCallback);
    }
}

export{CombinationUrlModel};