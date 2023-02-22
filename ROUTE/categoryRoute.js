const express = require("express")

const cateRouter = express.Router();

const {NewCates,categorizedProducts} = require("../controller/cate")

cateRouter.route("/cate").post(NewCates)
cateRouter.route("/cates/:category").get(categorizedProducts)

module.exports = cateRouter;