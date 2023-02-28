const express = require("express")

const cateRouter = express.Router();

const {NewCates,getAllCates,getCategoryByName} = require('../controller/cate');
//const {IsSuperAdmin} = require("../helper/auth")


cateRouter.route("/cates").post(NewCates);
cateRouter.route("/allCates/category").get(getAllCates)



cateRouter.route("/categories/:name").get(getCategoryByName)
module.exports = cateRouter;
