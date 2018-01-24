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

    /**
     * 选择性更新project数据库表
     * @param data 
     * @param condition 
     */
    public async updateSelective(data: { [key: string]: any }, condition: { [key: string]: any }): Promise<void>{
        let queryResult: GeneralResult = await this.query(condition);
        if(queryResult.getResult() === true && queryResult.getDatum().length > 0){
            await this.remove(condition);
            data.create_time = queryResult.getDatum()[0].create_time;
            if(data.name === ""){
                data.name = queryResult.getDatum()[0].name;
            }
            if(data.description === ""){
                data.description = queryResult.getDatum()[0].description;
            }
            if(data.create_time === ""){
                data.create_time = queryResult.getDatum()[0].create_time;
            }
            if(data.publisher === ""){
                data.publisher = queryResult.getDatum()[0].publisher;
            }
            if(data.img === ""){
                data.img = queryResult.getDatum()[0].img;
            }
        }
        this.insert([data]);
    }
}
export { ProjectService };