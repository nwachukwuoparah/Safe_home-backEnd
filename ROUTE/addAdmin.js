const express = require("express")
const { Login, AdminSignUp, AdminVerify, Forgotpassword, passwordchange,UpdateUsers} = require("../controller/admin")
// const { Adminlogin, AdminSignUp, authMiddleware, adminMiddleware, superadminMiddleware,} = require("../controller/admin")

const Router = express.Router();

Router.route('/Login').post(Login)
Router.route('/adminSign').post(AdminSignUp)
Router.route('/Verify/:Id').post(AdminVerify)
Router.route('/confirmAdmin/:Id').post(AdminVerify)
Router.route('/Forget').post(Forgotpassword)
Router.route('/Chng/:id').post(passwordchange)
Router.route("/update/:userid").patch(UpdateUsers)
// Router.route('/adminChng/:id/:token').post(passwordchange)
module.exports = Router;
