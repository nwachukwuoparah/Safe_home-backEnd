const express = require("express");
const asyncHandler = require ("express-async-handler");
const order = require("./../models/Order");
const protect = require("../middleware/errorhand")

const orderRouter = express.Router()


protect,asyncHandler (async (req, res) => {
        const{
            orderItems,
            shippingAddress,
            paymentMethod,
            paymentResult,
            taxprice,
            shippingPrice,
            itemPrice,
            totalPrice,
        
        } = req.body
        if(orderItems && orderItems.length === 0) {
            res.status(400).json({
                message: "items not order",
                data: order
    }) 
        return
    } else{
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            paymentResult: req.body.paymentResult,
            taxprice: req.body.taxprice,
            shippingPrice: req.body.shippingPrice,
            itemPrice: req.body.itemPrice,
            totalPrice: req.body.totalPrice
        })
        const createOrder = await order.save();
            res.status(404).json({
                data: createOrder
            })
    }
     })

    
     //get order

     asyncHandler (async (req, res) => {
        const order = await order.findById(req.params.id).populate(
            "name",
            "email"
        );
    if(order){
        res.status(order)
    }else{
        throw new Error("order not found")
    }
    })
    
             
module.exports = orderRouter;

