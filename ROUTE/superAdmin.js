const express = require("express")
const { SuperASignUp, getAllUsers, getAllAdmin, DelUser } = require("../controller/admin")
//const {isSuperAdmin} = require('../helper/auth')
const superRoutes = express.Router();

superRoutes.route("/super").post(SuperASignUp)
superRoutes.route('/allUsers/:id').get(getAllUsers)
superRoutes.route('/allAdmin/:id').get(getAllAdmin)
superRoutes.route('/delete/:userId').delete(DelUser)



module.exports = superRoutes