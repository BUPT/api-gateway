import { DBConnect } from "../util/DBConnect";
import { CombinationFlowModel } from "../model/CombinationFlowModel";
import { GeneralResult } from "../general/GeneralResult";
class CombinationFlowService {
    // 连接数据库
    private _db: any = new DBConnect().getDB();

    // 插入数据
    public async insert(data: { [key: string]: string }[]): Promise<GeneralResult> {
        // 传递上下文
        let _this = this;
        return new Promise<GeneralResult>(function (resolve) {
            _this._db.then(function (db) {
                let combinationFlowModel: CombinationFlowModel = new CombinationFlowModel(db);
                combinationFlowModel.insert(data, function (err) {
                    if (err) {
                        console.log("INSERT DATA INTO combination_flow FAIL");
                        console.log(err);
                        resolve(new GeneralResult(false, err.message, data));
                    } else {
                        console.log("INSERT DATA INTO combination_flow SUCCESS");
                        resolve(new GeneralResult(true, null, data));
                    }
                });
            }).catch(function (err) {
                console.log(err);
                resolve(new GeneralResult(false, err.message, data));
            });
        });

    }

    /**
     * 删除数据
     * @param data 
     */
    public async remove(data: { [key: string]: string }): Promise<GeneralResult> {
        // 传递上下文
        let _this = this;
        return new Promise<GeneralResult>(function (reslove) {
            _this._db.then(function (db) {
                let combinationFlowModel: CombinationFlowModel = new CombinationFlowModel(db);
                combinationFlowModel.remove(data, function (err) {
                    if (err) {
                        console.log("DELETE DATA FROM combination_flow FAIL!");
                        console.log(err);
                        reslove(new GeneralResult(false, err.message, null));
                    } else {
                        console.log("DELETE DATA FROM combination_flow SUCCESS!");
                        reslove(new GeneralResult(true, null, null));
                    }
                });
            }).catch(function (err) {
                console.log(err);
                reslove(new GeneralResult(false, err.message, null));
            });
        });
    }


    /**
     * 查询数据
     * @param data 
     */
    public async query(data: { [key: string]: string }): Promise<GeneralResult> {
        // 上下文传递
        let _this = this;
        return new Promise<GeneralResult>(function (resolve) {
            _this._db.then(function (db) {
                let combinationFlowModel: CombinationFlowModel = new CombinationFlowModel(db);
                combinationFlowModel.query(data, function (err, results) {
                    if (err) {
                        resolve(new GeneralResult(false, err.message, null));
                    } else {
                        resolve(new GeneralResult(true, null, results));
                    }
                });
            });
        });
    }

    public async update(condition: { [key: string]: string }, data: { [key: string]: string }[]): Promise<GeneralResult> {
        //先删除相关信息
        let removeResult: GeneralResult = await this.remove(condition);
        // 在插入相关信息
        let insertResult: GeneralResult = await this.insert(data);
        console.log(insertResult.getDatum());
        return insertResult;
    }
}
export { CombinationFlowService };