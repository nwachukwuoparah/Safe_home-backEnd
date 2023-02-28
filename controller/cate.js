const express = require("express")
const Cates = require("../models/CateModle")
const ProductCates = require("../models/product")

exports.NewCates = async (req, res) => {
  try {
    const productId = req.params.productId;
    const products = await ProductCates.findById(productId);
    const category = await Cates.create({ categoryName: req.body.categoryName });
    res.status(201).json({
      message: "Categories successful",
      data: category,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
};

// get allCategory
exports.getAllCates = async(req, res) => {
  try{
      const category = req.params.category;
      const allCategory = await Cates.find();
      res.status(201).json({
          message: "Category was gotten",     
          length: allCategory.length,
          data: allCategory,
      })
  } catch(error) {
      res.status(404).json({
          message: error.message
      })
  } 

 }

// get category by name

exports.getCategoryByName = async (req, res) => {
  try {
    const name = req.params.name;
    const categoryName = await Cates.find({ categoryName: name });
    if (categoryName) {
      res.status(200).json({
        message: "Category retrieved successfully",
        length: categoryName.length,
        data: categoryName,
      });
    } else {
      res.status(404).json({
        message: "Category not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};