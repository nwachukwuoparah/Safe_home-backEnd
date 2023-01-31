const express = require("express")
const {signUpUser,login} = require("../controller/users")

const Router = express.Router();

Router.route('/sign').post(signUpUser)
Router.route('/login').post(login)
module.exports = Router;