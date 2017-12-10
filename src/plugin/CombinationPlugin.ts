import {CombinationService} from "../service/CombinationService";
import { GeneralResult } from "../general/GeneralResult";
let atomApiInfo: { [key: string]: string } [] = [];
let count: number = 0;
class CombinationPlugin{
    /**
     * 临时存储原子API块信息
     * @param req 
     * @param res 
     */
    public storeAtomApiInfo(req, res){
        let temp: {[key: string]: string} = {};
        temp.module_id = req.query.moduleId || "";
        temp.type = req.query.type || "";
        temp.name = req.query.name || "";
        temp.api_id = req.query.id || "";
        temp.argument = req.query.argument || "";
        temp.response = req.query.response || "";
        temp.URL = req.query.URL || "";
        temp.is_async = req.query.isAsync || "";
        temp.condition = req.query.condition || "";
        atomApiInfo[count++] = temp;
        res.json(atomApiInfo);
    }

    public async getAtomApiInfo(req, res): Promise<void>{
        let moduleId: string = req.query.moduleId || "";
        let combinationUrl: string = req.query.combinationUrl || "";
        // 从数据库中提取信息
        if(moduleId != "" && combinationUrl != ""){
            let combinationService: CombinationService = new CombinationService();
            let result: GeneralResult = await combinationService.query({module_id: moduleId, combination_url: combinationUrl});
            if(result.getResult() === true && result.getDatum().length >0){
                res.json(result.getReturn());
            }else{
                res.json(new GeneralResult(false, "改模块对应的API不存在", null));
            }
            return;
        }
        if(moduleId != ""){
            let temp: {[key: string]: string} = {};
            for(let i = 0; i < atomApiInfo.length; i++){
                if (moduleId === atomApiInfo[i].module_id){
                    res.json(new GeneralResult(true, null, atomApiInfo[i]).getReturn());
                    return;
                }
            }
        }
        res.json(new GeneralResult(false, "该模块对应的API不存在", null));
    }

    public registerCombinationAPI(req, res){
        let combinationUrl: string = req.query.combinationUrl;
        let flowJson: string = req.query.flowJson;
        for(let i = 0; i < atomApiInfo.length; i++){
            atomApiInfo[i].combination_url = combinationUrl;
        }
        let combinationService: CombinationService = new CombinationService();
        combinationService.update({combination_url: atomApiInfo[0].combination_url}, atomApiInfo);
        res.json({"flowJson": flowJson});
    }
}

export{CombinationPlugin};