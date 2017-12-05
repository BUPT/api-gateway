import crypto = require("crypto");
import {DBConnect} from "../util/DBConnect";
import {RandomSalt} from "../util/RandomSalt";
import { UserListService } from "../service/UserListService";
import {GeneralResult} from "../general/GeneralResult";

class UserPlugin{
    /**
     * 用户注册
     * @param req 
     * @param res 
     */
<<<<<<< HEAD
    public register(req, res): void{
=======
    public async register(req, res): Promise<void>{
>>>>>>> 7b8875d097b14c5d46d2878ed607b6d83b0e52af
        let randomSalt: RandomSalt = new RandomSalt();
        // 产生长度为20的随机盐值
        let salt: string = randomSalt.generateRandomSalt(20);
        // 使用随机产生的盐值和密码一起进行加密运算,产生密文密码
<<<<<<< HEAD
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
        (async () => {
            let result = await userListService.insert([data]);
            res.json(result.getReturn());
            return;
        })();
        // let result: Promise<GeneralResult> = userListService.insert([data]);
        // result.then(function(){
        //     res.json({"result": true});
        // }).catch(function(err){
        //     res.json({"result": false, "reason": err});
        // });
=======
        let password: string = crypto.createHmac('sha256', req.query.pwd).update(salt).digest('hex');
        // 构造成一条user_list表记录
        let data: {[key: string]: string} = {
            user_name: req.query.username,
            email: req.query.email,
            password: password,
            salt: salt,
            raw_password: req.query.pwd,
            role:req.query.role,
            real_name: req.query.realname
        }
        // 将数据插入数据库
        let userListService: UserListService = new UserListService();
        let queryResult: GeneralResult = await userListService.query({user_name: data.user_name});
        if(queryResult.getResult() == true && queryResult.getDatum().length > 0){
            res.json(new GeneralResult(false, "该用户名已经存在", null).getReturn());
        }else{
            let result = await userListService.insert([data]);
            res.json(result.getReturn());
        }
>>>>>>> 7b8875d097b14c5d46d2878ed607b6d83b0e52af
    }

    /**
     * 用户登录
     * @param req 
     * @param res 
     */
    public doLogin(req, res): void{
        // 获取用户名和密码
<<<<<<< HEAD
        let userName: string = req.query.user_name;
        let password: string = req.query.password;
=======
        let userName: string = req.query.username;
        let password: string = req.query.pwd;
>>>>>>> 7b8875d097b14c5d46d2878ed607b6d83b0e52af
        // 构造查询条件
        let data: {[key: string]: string} = {"user_name": userName};
        let userListService: UserListService = new UserListService();
        (async () =>{
            let result: GeneralResult = await userListService.query(data);
            let userLists = result.getDatum();
            if (userLists.length > 0) {
                password = crypto.createHmac('sha256', password).update(userLists[0].salt).digest('hex');
                if (password === userLists[0].password) {
                    res.json(new GeneralResult(true, null, null).getReturn());
                } else {
                    res.json(new GeneralResult(false, "用户名或密码不正确!", null).getReturn());
                }
            } else {
                res.json(new GeneralResult(false, "用户名或密码不正确!", null).getReturn());
            }
        })();
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
<<<<<<< HEAD
=======


    /**
     * 获取所有的用户
     * @param req 
     * @param res 
     */
    public async getAllUser(req, res): Promise<void>{
        let userListService: UserListService = new UserListService();
        let queryResult: GeneralResult = await userListService.query({});
        res.json(queryResult.getReturn());
    }


    /**
     * 根据用户名获取用户名信息
     * @param req 
     * @param res 
     */
    public async getUserByname(req, res): Promise<void>{
        let username = req.query.username
        let userListService: UserListService = new UserListService();
        let queryResult: GeneralResult = await userListService.query({user_name: username});
        if(queryResult.getResult() == true && queryResult.getDatum().length > 0){
            res.json(queryResult.getReturn());
        }else{
            res.json(new GeneralResult(false, "该用户名不存在", null).getReturn());
        }
        
    }

    /**
     * 根据用户名删除用户信息
     * @param req 
     * @param res 
     */
    public async removeUserByName(req, res): Promise<void>{
        let username = req.query.username
        let userListService: UserListService = new UserListService();
        let removeResult: GeneralResult = await userListService.remove({user_name: username});
        res.json(removeResult.getReturn());
    }

    /**
     * 更改用户名信息
     * @param req 
     * @param res 
     */
    public async updateUser(req, res): Promise<void>{

        let randomSalt: RandomSalt = new RandomSalt();
        // 产生长度为20的随机盐值
        let salt: string = randomSalt.generateRandomSalt(20);
        // 使用随机产生的盐值和密码一起进行加密运算,产生密文密码
        let password: string = crypto.createHmac('sha256', req.query.pwd).update(salt).digest('hex');
        // 构造成一条user_list表记录
        let data: { [key: string]: string } = {
            user_name: req.query.username,
            email: req.query.email,
            password: password,
            salt: salt,
            raw_password: req.query.pwd,
            role: req.query.role,
            real_name: req.query.realname
        }
        let userListService: UserListService = new UserListService();
        let queryResult: GeneralResult = await userListService.query({ user_name: data.user_name });
        if(queryResult.getResult() == true && queryResult.getDatum().length > 0){
            let removeResult: GeneralResult = await userListService.remove({ user_name: data.user_name });
            let insertResult: GeneralResult = await userListService.insert([data]);
            res.json(insertResult.getReturn());
        }else{
            res.json(new GeneralResult(false, "该用户名不存在", null));
        }
        
        
    }


>>>>>>> 7b8875d097b14c5d46d2878ed607b6d83b0e52af
}

export{UserPlugin};