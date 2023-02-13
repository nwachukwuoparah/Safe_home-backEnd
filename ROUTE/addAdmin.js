const express = require("express")
const { Adminlogin, AdminSignUp, AdminVerify, Forgotpassword, passwordchange, isAdminVerify } = require("../controller/admin")

const Router = express.Router();

Router.route('/Login').post(Adminlogin)
Router.route('/adminSign').post(AdminSignUp)
Router.route('/adminVerify/:Id').post(AdminVerify)
//Router.route('/confirmAdmin/:userid').post(isAdminVerify)
Router.route('/adminForget/:id').post(Forgotpassword)
Router.route('/adminChng/:id/:token').post(passwordchange)
module.exports = Router;


