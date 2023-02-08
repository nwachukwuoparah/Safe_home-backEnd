const express = require("express");
const asyncHandler = require ("express-async-handler");
const reviews = require("./../models/review");

exports.reviewPro =  
asyncHandler (async (req, res) => {
    try{
        const {rating, comment} = req.body;
        const product = await product.findById(req.params.id)
        if(product){
            const alreadyViewed = product.review.find(
                (r) => r.user.toString() === req.user._id.toString()
            )
            if(alreadyViewed) {
                res.status(400).json({
                    message: "product already reviewed",
                })
                const reviews = {
                    name: req.user.name,
                    rating: Number(rating),
                    comment,
                    user: req.user_id,
                };

            product.reviews.push(review)
            product.numReview.product.review.length
            product.rating = 
            product.reviews.reduce( (acc, item) => item.rating + acc, 0)
            product.reviews.length;

            await product.save()
            res.status(200).json({
                message: "Reviewed Added"
            })

            } else{
                res.status(404).json({
                    message: "product not found",
                    
                })
            }
        }
    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
    })