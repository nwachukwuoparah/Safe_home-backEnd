const express = require("express");
const asyncHandler = require ("express-async-handler");
const prod = require("../models/product");

exports.newRating = asyncHandler (async (req, res) => {
    try{
        const productId = req.params.id;
        const newRating = req.body.rating;
        
        const product = await prod.findByIdAndUpdate(productId, {
            rating: newRating
        });
       res.status(200).json({
           message: "Product rated successfully!",
             data: product,
    });
    }catch(error){
        res.status(400).json({
            message: error.message
        })
    }
})

