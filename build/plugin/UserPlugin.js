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
const crypto = require("crypto");
const RandomSalt_1 = require("../util/RandomSalt");
const UserListService_1 = require("../service/UserListService");
const GeneralResult_1 = require("../general/GeneralResult");
class UserPlugin {
    /**
     * 用户注册
     * @param req
     * @param res
     */
    register(req, res) {
        let randomSalt = new RandomSalt_1.RandomSalt();
        // 产生长度为20的随机盐值
        let salt = randomSalt.generateRandomSalt(20);
        // 使用随机产生的盐值和密码一起进行加密运算,产生密文密码
        let password = crypto.createHmac('sha256', req.query.password).update(salt).digest('hex');
        // 构造成一条user_list表记录
        let data = {
            user_name: req.query.user_name,
            email: req.query.email,
            password: password,
            salt: salt,
            raw_password: req.query.password,
            role: "1"
        };
        // 将数据插入数据库
        let userListService = new UserListService_1.UserListService();
        (() => __awaiter(this, void 0, void 0, function* () {
            let result = yield userListService.insert([data]);
            res.json(result.getReturn());
            return;
        }))();
        // let result: Promise<GeneralResult> = userListService.insert([data]);
        // result.then(function(){
        //     res.json({"result": true});
        // }).catch(function(err){
        //     res.json({"result": false, "reason": err});
        // });
    }
    /**
     * 用户登录
     * @param req
     * @param res
     */
    doLogin(req, res) {
        // 获取用户名和密码
        let userName = req.query.user_name;
        let password = req.query.password;
        // 构造查询条件
        let data = { "user_name": userName };
        let userListService = new UserListService_1.UserListService();
        (() => __awaiter(this, void 0, void 0, function* () {
            let result = yield userListService.query(data);
            let userLists = result.getDatum();
            if (userLists.length > 0) {
                password = crypto.createHmac('sha256', password).update(userLists[0].salt).digest('hex');
                if (password === userLists[0].password) {
                    res.json(new GeneralResult_1.GeneralResult(true, null, null).getReturn());
                }
                else {
                    res.json(new GeneralResult_1.GeneralResult(false, "用户名或密码不正确!", null).getReturn());
                }
            }
            else {
                res.json(new GeneralResult_1.GeneralResult(false, "用户名或密码不正确!", null).getReturn());
            }
        }))();
        // let result: Promise<any> = userListService.query(data);
        // result.then(function(results){
        //     // 若用户存在对用户输入的密码进行加密运算
        //     if(results.length > 0){
        //         password = crypto.createHmac('sha256', password).update(results[0].salt).digest('hex');
        //         if(password === results[0].password){
        //             res.json({result: true, reason: null});
        //         }else{
        //             res.json({ datum: { result: false, reason: "用户名或密码不正确!" } });
        //         }
        //     }else{
        //         res.json({ datum: { result: false, reason: "用户名或密码不正确!" } });
        //     }
        // }).catch(function(err){
        //     res.json({result: false, reason: err});
        // });
    }
}
exports.UserPlugin = UserPlugin;
