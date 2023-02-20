const express = require("express");

const orderRouter = express.Router()

const {newOrder,getOrder,deleteOrder,getOneOrder,verifyOrder, Delivered} = require('../controller/orderpro');
//const {realAdmin} = require("../helper/auth")

orderRouter.post("/neworder/:userId",newOrder)
orderRouter.get("/allorder/:adminId",getOrder)
orderRouter.delete("/deleteorder/:adminId/:orderId",deleteOrder)
orderRouter.get("/order/:orderId/:userId",getOneOrder)
orderRouter.post("/ordered/:orderId", Delivered)

module.exports = orderRouter;

