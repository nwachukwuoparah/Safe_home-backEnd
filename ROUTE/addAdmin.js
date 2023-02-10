const express = require("express")
const { Adminlogin, AdminSignUp, AdminVerify, Forgotpassword, passwordchange, isAdminVerify } = require("../controller/admin")

const Router = express.Router();



Router.route('/adminLogin').post(Adminlogin)
Router.route('/adminSign').post(AdminSignUp)
Router.route('/adminVeri/:id').post(AdminVerify)
Router.route('/confirmAdmin/:userid').post(isAdminVerify)
Router.route('/adminForget').post(Forgotpassword)
Router.route('/adminChng').post(passwordchange)
module.exports = Router;
