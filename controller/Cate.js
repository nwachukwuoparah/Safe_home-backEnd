const express = require("express");
const asyncHandler = require ("express-async-handler");
const Cates = require("../models/CateModle");

exports.NewCates = asyncHandler (async (req, res) => {
    try{
    const Id = req.params.catnames;
    const {chairs,beds,cabinets,chests,desks,tables} = req.body.catnames;
    const cateProduct = {
        chairs,
        beds,
        cabinets,
        chests, 
        desks,
        tables,
        }
        const categories = await Cates.create(cateProduct);
        res.status(201).json({
            message: "Categories successful",
            data: categories
        });
    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
}
)

exports.getAllCates = asyncHandler  (async(req, res) => {
    try{
        const allCates = await Cates.find();
        res.status(201).json({
            message: "Categories was gotten",
            length: allCates.length,
            data: allCates,
        })
    } catch(error) {
        res.status(404).json({
            message: error.message
        })
    }
})
