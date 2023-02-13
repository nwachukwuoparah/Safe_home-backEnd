const express = require("express")
const { Adminlogin, AdminSignUp, AdminVerify, Forgotpassword, passwordchange, isAdminVerify } = require("../controller/admin")

const Router = express.Router();

Router.route('/Login').post(Adminlogin)
Router.route('/adminSign').post(AdminSignUp)
Router.route('/Verify/:Id').post(AdminVerify)
Router.route('/confirmAdmin/:userid').post(isAdminVerify)
Router.route('/Forget/:id').post(Forgotpassword)
Router.route('/Chng/:id').post(passwordchange)
//Router.route('/adminChng/:id/:token').post(passwordchange)
module.exports = Router;


