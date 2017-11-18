"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const AdminRouter_1 = require("./router/AdminRouter");
const RegisterPlugin_1 = require("./plugin/RegisterPlugin");
let router = new AdminRouter_1.AdminRouter().getRouter();
let registerApp = new RegisterPlugin_1.RegisterPlugin().getRegisterApp();
let adminApp = express();
adminApp.use("/", router);
adminApp.listen(8001);
registerApp.listen(8000);
