import express = require("express");
import {AdminRouter} from "./router/AdminRouter";
import {RegisterPlugin} from "./plugin/RegisterPlugin";
import {TopPerformanceModel} from "./model/TopPerformanceModel"
let router = new AdminRouter().getRouter();
let registerApp = new RegisterPlugin().getRegisterApp()
let adminApp = express();
TopPerformanceModel.init();
adminApp.use("/",router);
adminApp.listen(8001);
registerApp.listen(8000);