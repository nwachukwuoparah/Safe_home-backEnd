const express = require("express");

const orderRouter = express.Router()

const {newOrder,getOrder,deleteOrder,getOneOrder} = require('../controller/orderpro');
//const {realAdmin} = require("../helper/auth")




orderRouter.post("/order/:userId",newOrder)
orderRouter.get("/order/:adminId",getOrder)
orderRouter.delete("/order/:adminId/:orderId",deleteOrder)
orderRouter.get("/order/:adminId/:Id",getOneOrder)

module.exports = orderRouter;
