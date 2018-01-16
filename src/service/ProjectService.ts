import { DBConnect } from "../util/DBConnect";
import { ProjectModel } from "../model/ProjectModel";
import { GeneralResult } from "../general/GeneralResult";
class ProjectService {

    // 连接数据库
    private _db: any = new DBConnect().getDB();
    /**
     * @description 插入多条数据
     * @param data
     */
    public async insert(data: { [key: string]: string }[]): Promise<GeneralResult> {
        // 传递上下文
        let _this = this;
        return new Promise<GeneralResult>(function (resolve) {
            _this._db.then(function (db) {
                let projectModel: ProjectModel = new ProjectModel(db);
                projectModel.insert(data, function (err) {
                    if (err) {
                        console.log("INSERT DATA INTO project FAIL!");
                        resolve(new GeneralResult(false, err.message, null));
                    } else {
                        console.log("INSERT DATA INTO project SUCCESS!")
                        resolve(new GeneralResult(true, null, data));
                    }
                });
            }).catch(function (err) {
                console.log("INSERT DATA INTO project FAIL!");
                resolve(new GeneralResult(false, err.message, null));
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
        return new Promise<GeneralResult>(function (resolve) {
            _this._db.then(function (db) {
                let projectModel: ProjectModel = new ProjectModel(db);
                projectModel.remove(data, function (err) {
                    if (err) {
                        console.log("DELETE DATA FROM project FAIL!");
                        resolve(new GeneralResult(false, err.message, null));
                    } else {
                        console.log("DELETE DATA FROM project SUCCESS!");
                        resolve(new GeneralResult(true, null, null));
                    }
                });
            }).catch(function (err) {
                console.log("DELETE DATA FROM project FAIl!");
                resolve(new GeneralResult(false, err.message, null));
            });
        });
    }

    /**
     * 查询url表中的信息
     * @param data 
     */
    public async query(data: { [key: string]: string }): Promise<GeneralResult> {
        // 传递上下文
        let _this = this;
        return new Promise<GeneralResult>(function (resolve) {
            _this._db.then(function (db) {
                let projectModel: ProjectModel = new ProjectModel(db);
                projectModel.query(data, function (err, results) {
                    if (err) {
                        resolve(new GeneralResult(false, err.message, null));
                    } else {
                        resolve(new GeneralResult(true, null, results));
                    }
                });
            });
        })
    }
}
export { ProjectService };