const express = require("express")
const Cates = require("../models/CateModle")
const prod = require("../models/product")

exports.NewCates = async(req, res) => {
  try{
    const categoryName = req.body.categoryName;
    const categories = {
      categoryName,
    }
    // const category = await Cates.insertMany(categories)
    const category = await Cates.create(categories);
    res.status(201).json({
      message: "Category is created",
      data: category
    })
  } catch(error){
    res.status(400).json({
      message: error.message
    })
  }
}


exports.categorizedProducts = async (req, res) => {
   try {
    const category = req.params.category;
    // const categoryId = await Cates.findById(categoryId)
    const categoryProducts = await prod.find({category: category})
    console.log(categoryProducts)
    // const productCodes = categoryProducts.map(product => product.code);
    if (categoryProducts) {
      res.send(categoryProducts);
    } else {
      res.status(404).json({
        message: "Plenty Error"
      })
  } 
  }catch (err) {
    res.status(400).json({
      message: err.message
    })
}
}
