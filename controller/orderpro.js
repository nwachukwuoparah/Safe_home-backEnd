const express = require("express");
const asyncHandler = require ("express-async-handler");
const order = require("../models/Order");
const cloudinary = require("../helper/cloudinary");
//const protect = require("../middleware/errorhand")

const orderRouter = express.Router()


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

