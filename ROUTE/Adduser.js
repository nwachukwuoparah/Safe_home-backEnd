const express = require("express")
const {login,signUpUser} = require("../controller/users")

const Router = express.Router();


Router.route('/login').post(login)
Router.route('/sign').post(signUpUser)
module.exports = Router;