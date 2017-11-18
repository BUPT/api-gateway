import crypto = require("crypto");
import {DBConnect} from "../util/DBConnect";
import {RandomSalt} from "../util/RandomSalt";
import { UserListService } from "../service/UserListService";

class UserPlugin{
    /**
     * 用户注册
     * @param req 
     * @param res 
     */
    public register(req, res): void{
        let randomSalt: RandomSalt = new RandomSalt();
        // 产生长度为20的随机盐值
        let salt: string = randomSalt.generateRandomSalt(20);
        // 使用随机产生的盐值和密码一起进行加密运算,产生密文密码
        let password: string = crypto.createHmac('sha256', req.query.password).update(salt).digest('hex');
        // 构造成一条user_list表记录
        let data: {[key: string]: string} = {
            user_name: req.query.user_name,
            email: req.query.email,
            password: password,
            salt: salt,
            raw_password: req.query.password,
            role:"1"
        }
        // 将数据插入数据库
        let userListService: UserListService = new UserListService();
        let result: Promise<any> = userListService.insert([data]);
        result.then(function(){
            res.json({"result": true});
        }).catch(function(err){
            res.json({"result": false, "reason": err});
        });
    }

    /**
     * 用户登录
     * @param req 
     * @param res 
     */
    public doLogin(req, res): void{
        // 获取用户名和密码
        let userName: string = req.query.user_name;
        let password: string = req.query.password;
        // 构造查询条件
        let data: {[key: string]: string} = {"user_name": userName};
        let userListService: UserListService = new UserListService();
        let result: Promise<any> = userListService.query(data);
        result.then(function(results){
            // 若用户存在对用户输入的密码进行加密运算
            if(results.length > 0){
                password = crypto.createHmac('sha256', password).update(results[0].salt).digest('hex');
                if(password === results[0].password){
                    res.json({result: true, reason: null});
                }else{
                    res.json({ datum: { result: false, reason: "用户名或密码不正确!" } });
                }
            }else{
                res.json({ datum: { result: false, reason: "用户名或密码不正确!" } });
            }
        }).catch(function(err){
            res.json({result: false, reason: err});
        });
    }
}

export{UserPlugin};