import {CombinationService} from "../service/CombinationService";
import { GeneralResult } from "../general/GeneralResult";
import { CombinationFlowService } from "../service/CombinationFlowService";
import { ApiInfoService } from "../service/ApiInfoService";
import { UrlService } from "../service/UrlService";
import { Config } from "../config/config";
import { RegisterPlugin } from "./RegisterPlugin";
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

    /**
     * 根据模块ID或组合API的url获取原子API的信息
     * 只有模块ID时，获取临时存储的原子API信息
     * 既有模块ID又有组合的API的url时获取持久化存储的原子API信息
     */
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
                res.json(new GeneralResult(false, "该模块对应的API不存在", null));
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

    public async registerCombinationAPI(req, res): Promise<void>{
        let combinationUrl: string = req.query.combinationUrl;
        // 判断该组合API的url是否存在
        let combinationFlowService: CombinationFlowService = new CombinationFlowService();
        let result: GeneralResult = await combinationFlowService.query({combination_url: combinationUrl});
        if(result.getResult() === true && result.getDatum().length > 0){
            res.json(new GeneralResult(false, "该组合url已经存在", null));
            return;
        }
        let flow: string = req.query.flowJson;
        // 存储原子API对应的组合API的url
        for(let i = 0; i < atomApiInfo.length; i++){
            atomApiInfo[i].combination_url = combinationUrl;
        }
        let combinationService: CombinationService = new CombinationService();
        let apiInfoService: ApiInfoService = new ApiInfoService();
        let urlService: UrlService = new UrlService();
        await combinationService.update({combination_url: atomApiInfo[0].combination_url}, atomApiInfo);

        // 找到原子API所属的项目或第三方
        let temp: GeneralResult = await apiInfoService.query({URL: atomApiInfo[0].URL});
        let appId: string = temp.getDatum()[0].appId;
        // 持久化存储后清空临时存储
        atomApiInfo = [];


        let apiInfo: {[key: string]: string} = {};
        let url: {[key: string]: string} = {};
        let combinationFlow: {[key: string]: string} = {};
        apiInfo.ID = req.query.ID;
        apiInfo.appId = appId;
        apiInfo.name = req.query.name;
        apiInfo.argument = req.query.argument;
        apiInfo.response = req.query.response;
        apiInfo.URL = combinationUrl;
        apiInfo.type = "组合";

        apiInfoService.insert([apiInfo]);

        let config: Config = new Config();
        url.APPId = appId;
        url.from = combinationUrl;
        url.to = config.getApiServer().host + ":" + config.getApiServer().port;
        // TODO: 先检测之后在再确定status的值
        // TODO: 添加访问方法类型
        url.status = "0";
        url.is_new = "1";
        url.method = "get";

        urlService.insert([url]);

        combinationFlow.combination_url = combinationUrl;
        combinationFlow.flow = flow;


        combinationFlowService.insert([combinationFlow]);

        // 注册
        let registerPlugin: RegisterPlugin = new RegisterPlugin();
        let registerApp = registerPlugin.getRegisterApp();
        let combinationPlugin: CombinationPlugin = new CombinationPlugin();
        registerApp.use(combinationUrl, combinationPlugin.combinationService);
        // 为相关的API标注，以便后期注销
        registerApp._router.stack[registerApp._router.stack.length - 1].appId = appId;
        registerApp._router.stack[registerApp._router.stack.length - 1].url = combinationUrl;

        
        res.json({"flowJson": flow});
    }


    public combinationService(){
        console.log("hello");
    }

}

export{CombinationPlugin};