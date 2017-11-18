import express = require("express");
import {AdminRouter} from "./router/AdminRouter";
import {RegisterPlugin} from "./plugin/RegisterPlugin";
let router = new AdminRouter().getRouter();
let registerApp = new RegisterPlugin().getRegisterApp()
let adminApp = express();
adminApp.use("/",router);
adminApp.listen(8001);
registerApp.listen(8000);