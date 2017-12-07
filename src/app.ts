import express = require("express");
import {AdminRouter} from "./router/AdminRouter";
import {RegisterPlugin} from "./plugin/RegisterPlugin";
import {Router} from "./router/Router"
import * as http from 'http';
let router = new AdminRouter().getRouter();
let registerPlugin: RegisterPlugin = new RegisterPlugin();
let registerApp = registerPlugin.getRegisterApp()
// 初始化注册
(async () =>{
    await registerPlugin.init();
    registerApp.listen(8000);
})();


let adminApp = express();
adminApp.use("/",router);
adminApp.listen(8001);
let wcy_router:Router = new Router();
http.createServer(
    function (request, response)
       {
            response.writeHead(200, {
         "Content-Type": "text/html;charset=utf-8"
         });
         
         wcy_router.handleRequest(request,response,http);
  
     }   
 
).listen(8002);
