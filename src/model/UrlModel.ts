/**
 * 定义url表的模型
 */
class UrlModel{
    private _URL: any = null;
    constructor(db: any){
        this._URL = db.define("url", {
            id: { type: 'serial', key: true },
            appId: String,
            from: String,
            to: String,
            status: String,
            is_new: String
        });
    }

	public get(): any  {
		return this._URL;
	}

	public set(value: any ) {
		this._URL = value;
	}
    // 查找数据
    public query(data: {[key:string]: string}, callback: (err: Error, results: {[key:string]:string}[]) => void){
        this._URL.find(data, callback);
    }
    // 插入多条数据
    public insert(data: { [key: string]: string }[], callback: (err: Error) => void){
        this._URL.create(data, callback);
    }

    // 删除数据
    public remove(data:{[key: string]: string}, callback: (err: Error) => void){
        this._URL.find(data).remove(callback);
    }

    // 更改数据
    public update(data: { [key: string]: string }, eachCallback: (err: Error) => void, saveCallback: (err: Error) => void){
        this._URL.find(data).each(eachCallback).save(saveCallback);
    }
}

export{UrlModel};