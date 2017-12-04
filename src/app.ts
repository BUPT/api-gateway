import express = require("express");
import {AdminRouter} from "./router/AdminRouter";
import {RegisterPlugin} from "./plugin/RegisterPlugin";
<<<<<<< HEAD
import {TopPerformanceModel} from "./model/TopPerformanceModel"
let router = new AdminRouter().getRouter();
let registerApp = new RegisterPlugin().getRegisterApp()
let adminApp = express();
TopPerformanceModel.init();
adminApp.use("/",router);
adminApp.listen(8001);
registerApp.listen(8000);
=======
import {Router} from "./router/Router"
import * as http from 'http';
let router = new AdminRouter().getRouter();
let registerApp = new RegisterPlugin().getRegisterApp()
let adminApp = express();
adminApp.use("/",router);
adminApp.listen(8001);
registerApp.listen(8000);
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
>>>>>>> 7b8875d097b14c5d46d2878ed607b6d83b0e52af
