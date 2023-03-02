const express = require("express");
const asyncHandler = require ("express-async-handler");
const Order = require("../models/Order");
const mailSender = require("../tils/Emails")


exports.newOrder = asyncHandler (async (req, res) => {
    try{
    const Id = req.params.userId;
    const {quantity,customerAddress,phoneNumber,customerName,customerEmail,product,delivery,delivered} = req.body;
    const orderProduct = {
        quantity,
        customerAddress,
        phoneNumber,
        customerName, 
        customerEmail,
        product,
        delivery,
        delivered,
        }
        const created = await Order.create(orderProduct);
        res.status(201).json({
            message: "Order placed successful",
            data: created
        });
    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
}
)

exports.getOrder = asyncHandler  (async(req, res) => {
    try{
        const allOrder = await Order.find();
        res.status(201).json({
            message: "Order was gotten",
            length: allOrder.length,
            data: allOrder,
        })
    } catch(error) {
        res.status(404).json({
            message: error.message
        })
    }
})


exports.getOneOrder = asyncHandler(async(req,res) => {
    try{
        const orderId = req.params.orderId;
       const order = await Order.findById(orderId) 
       if(order.length === 0){ 
        res.status(200).json({
            message: `there no no current order with this ${id}`,
            data: order
        })
    } else{
        res.status(200).json({ 
            data: order
        })
    }
    }catch(error){
        res.status(401).json({
            message: error.message
        })
    }
})
exports.deleteOrder = asyncHandler(async(req,res) => {
    try{ 
        const orderId = req.params.orderId;
        await Order.findByIdAndDelete(orderId);
        res.status(200).json({
            message: "Order has been deleted",
        })
    }catch(error){
        res.status(401).json({
            message: error.message
        })
    }
})

exports.Delivered = async (req, res) => {
    try {
        const orderid = req.params.orderId
        const orderId = await Order.findById(orderid)
        await Order.findByIdAndUpdate(
            orderId._id,
            {
                delivered: true
            },
            {
                new: true
            }
        )

        res.status(200).json({
            message: "delivery is Confirmed"
        })
    } catch (e) {
        res.status(401).json({
            message: e.message
        })
    }
}