import { DBConnect } from "../util/DBConnect";
import { CombinationModel } from "../model/CombinationModel";
import { GeneralResult } from "../general/GeneralResult";
import { getLogger } from "../util/logger";
import { Logger } from "_log4js@2.5.3@log4js";

const logger: Logger = getLogger("combination");
class CombinationService {
    // 连接数据库
    private _db: any = new DBConnect().getDB();

    // 插入数据
    public async insert(data: { [key: string]: string }[]): Promise<GeneralResult> {
        // 传递上下文
        let _this = this;
        return new Promise<GeneralResult>(function (resolve) {
            _this._db.then(function (db) {
                let combinationModel: CombinationModel = new CombinationModel(db);
                combinationModel.insert(data, function (err) {
                    if (err) {
                        console.log("INSERT DATA INTO combination FAIL");
                        logger.error("INSERT DATA INTO combination FAIL!\n ");
                        resolve(new GeneralResult(false, err.message, data));
                    } else {
                        console.log("INSERT DATA INTO combination SUCCESS");
                        logger.info("INSERT DATA INTO combination SUCCESS!\n", data);
                        resolve(new GeneralResult(true, null, data));
                    }
                });
            }).catch(function (err) {
                console.log(err);
                logger.error("INSERT DATA INTO combination FAIL!\n", data)
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
                let combinationModel: CombinationModel = new CombinationModel(db);
                combinationModel.remove(data, function (err) {
                    if (err) {
                        console.log("DELETE DATA FROM combination FAIL!");
                        logger.error("DELETE DATA FROM combination FAIL!\n");
                        reslove(new GeneralResult(false, err.message, null));
                    } else {
                        console.log("DELETE DATA FROM combination SUCCESS!");
                        logger.info("DELETE DATA FROM combination SUCCESS!\n", data);
                        reslove(new GeneralResult(true, null, null));
                    }
                });
            }).catch(function (err) {
                console.log(err);
                logger.error("DELETE DATA FROM combination FAIL\n", data);
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
                let combinationModel: CombinationModel = new CombinationModel(db);
                combinationModel.query(data, function (err, results) {
                    if (err) {
                        logger.error("QUERY DATA FROM combination FAIL\n");
                        resolve(new GeneralResult(false, err.message, null));
                    } else {
                        logger.info("QUERY DATA FROM combination SUCCESS!\n", data);
                        resolve(new GeneralResult(true, null, results));
                    }
                });
            });
        });
    }

    /**
     * 更新多条信息
     * @param condition 
     * @param data 
     */
    public async update(condition: { [key: string]: string }, data: { [key: string]: string }[]): Promise<GeneralResult> {
        //先删除相关信息
        let removeResult: GeneralResult = await this.remove(condition);
        // 在插入相关信息
        if (removeResult.getResult() === true) {
            let insertResult: GeneralResult = await this.insert(data);
            console.log(insertResult.getDatum());
            logger.info("UPDATE DATA FROM combination SUCCESS!\n", data);
            return insertResult;
        }
        logger.error("UPDATE DATA FROM combination FAIL!\n", data);
        return removeResult;

    }

    /**
     * 选择性更新结果
     * @param condition 
     * @param data 
     */
    public async updateSelective(condition: { [key: string]: string }, data: { [key: string]: string }): Promise<GeneralResult> {
        let queryResult: GeneralResult = await this.query(condition);
        if (queryResult.getResult() === true && queryResult.getDatum().length > 0) {
            if (data.combination_url === "" || !data.combination_url) {
                data.combination_url = queryResult.getDatum()[0].combination_url;
            }
            if (data.flow === "" || !data.flow) {
                data.flow = queryResult.getDatum()[0].flow;
            }
        }
        this.remove(condition);
        logger.info("UPDATE DATA SELECTIVE FROM combination SUCCESS!\n", data);
        return this.insert([data]);
    }
}
export { CombinationService };