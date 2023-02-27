const express = require("express")
const {SuperASignUp,getAllUsers,getAllAdmin} = require("../controller/admin")
//const {isSuperAdmin} = require('../helper/auth')
const superRoutes = express.Router();

//superRoutes.route("/super").post(SuperASignUp)
superRoutes.route('/allUsers/:id').get(getAllUsers)
superRoutes.route('/allAdmin/:id').get(getAllAdmin)

module.exports = superRoutes