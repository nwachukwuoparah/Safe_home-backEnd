const express = require("express");

const cateRouter = express.Router()

const {NewCates,getAllCates} = require('../controller/Cate');
//const {realAdmin} = require("../helper/auth")




cateRouter.post("/cates",NewCates)
cateRouter.get("/allcat",getAllCates)

module.exports = cateRouter;
