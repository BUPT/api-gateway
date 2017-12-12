"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const CombinationService_1 = require("../service/CombinationService");
const GeneralResult_1 = require("../general/GeneralResult");
let atomApiInfo = [];
let count = 0;
class CombinationPlugin {
    /**
     * 临时存储原子API块信息
     * @param req
     * @param res
     */
    storeAtomApiInfo(req, res) {
        let temp = {};
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
    getAtomApiInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let moduleId = req.query.moduleId || "";
            let combinationUrl = req.query.combinationUrl || "";
            // 从数据库中提取信息
            if (moduleId != "" && combinationUrl != "") {
                let combinationService = new CombinationService_1.CombinationService();
                let result = yield combinationService.query({ module_id: moduleId, combination_url: combinationUrl });
                if (result.getResult() === true && result.getDatum().length > 0) {
                    res.json(result.getReturn());
                }
                else {
                    res.json(new GeneralResult_1.GeneralResult(false, "改模块对应的API不存在", null));
                }
                return;
            }
            if (moduleId != "") {
                let temp = {};
                for (let i = 0; i < atomApiInfo.length; i++) {
                    if (moduleId === atomApiInfo[i].module_id) {
                        res.json(new GeneralResult_1.GeneralResult(true, null, atomApiInfo[i]).getReturn());
                        return;
                    }
                }
            }
            res.json(new GeneralResult_1.GeneralResult(false, "该模块对应的API不存在", null));
        });
    }
    registerCombinationAPI(req, res) {
        let combinationUrl = req.query.combinationUrl;
        let flowJson = req.query.flowJson;
        for (let i = 0; i < atomApiInfo.length; i++) {
            atomApiInfo[i].combination_url = combinationUrl;
        }
        let combinationService = new CombinationService_1.CombinationService();
        combinationService.update({ combination_url: atomApiInfo[0].combination_url }, atomApiInfo);
        res.json({ "flowJson": flowJson });
    }
}
exports.CombinationPlugin = CombinationPlugin;
