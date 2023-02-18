const express = require("express");
const asyncHandler = require ("express-async-handler");
const prod = require("../models/product");

exports.newStock = asyncHandler (async (req, res) => {
    try{
        const productId = req.params.productId;
        const newStock = req.body.newStock;
        const product = await prod.findByIdAndUpdate(productId, {
            stockQuantity: newStock
        },{
            new: true
        });
       res.status(200).json({
           message: "Stock updated successfully",
             data: product,
    });
    }catch(error){
        res.status(400).json({
            message: error.message
        })
    }
})
