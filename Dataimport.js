const express = require ("express");
const user = require("./models/user");
const users = require("./Data/user");
const product = require("./models/product");
const products = require("./Data/product");
const asyncHandler = require ("express-async-handler");


const importData = express.Router();

importData.post(
    "/user", 
    asyncHandler(async(req,res) => {
    await user.remove({});
    const importUser = await user.insertMany(users)
    res.send({importUser});
})
)

importData.post(
    "/products",
    asyncHandler(async(req,res) => {
    await product.remove({});
    const importProduct = await product.insertMany(products)
    res.send({importProduct});
})
)
module.exports = importData;