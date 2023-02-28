const Addfurni = require('../models/product')
const asyncHandler = require("express-async-handler");
const Cat = require("../models/CateModle")
const cloudinary = require("../helper/cloudinary");

exports.NewPro = async (req, res) => {
    try {
        const categoryId = req.params.categoryId
        const theCat = await Cat.findById(categoryId)
        const result = await cloudinary.uploader.upload(req.files.image.tempFilePath)
        const fruniData = {
            title: req.body.title,
            description: req.body.description,
            image: result.secure_url,
            cloudId: result.public_id,
            price: req.body.price,
            rating: req.body.rating,
            numReview: req.body.numReview,
            categories: req.body.categories,
            stockQuantity: req.body.stockQuantity,
            brandName: req.body.brandName
        }
        // const data = {title,description,image,price,rating,numReview,stockQuantity,cloudId}
        const created = await Addfurni(fruniData)
        await created.save();
        if (theCat && Array.isArray(theCat.products)) {
            await created.save();
            theCat.products.push(created);
            await theCat.save();
        }
        res.status(201).json({
            message: "Furniture item created successfully",
            furniture: created
        });
    } catch (e) {
        res.status(400).json({
            message: e.message
        });
    }
}
exports.GetallFurni = asyncHandler(async (req, res) => {
    try {
        const user = req.params.id;
        const allFurni = await Addfurni.find(user);
        res.status(201).json({
            message: "Allfurni",
            length: allFurni.length,
            data: allFurni
        });

    } catch (e) {
        res.status(400).json({
            message: e.message
        });
    }
}
)
//asyncHandler(
exports.GetSingle = asyncHandler(async (req, res) => {
    try {
        const proid = req.params.proid;
        const allFurni = await Addfurni.findById(proid);
        // console.log(allFurni)
        if (allFurni) {
            res.status(201).json({
                message: "Allfurni",
                //length: allFurni.length,
                data: allFurni
            });
        } else {
            res.status(404).json({
                message: "No furniture in the database"
            })
        }

    } catch (e) {
        res.status(400).json({
            message: e.message
        });
    }
}
)


exports.DeleteFurni = async (req, res) => {
    try {
        const productid = req.params.productid
        await Addfurni.deleteOne({ _id: productid });
        console.log(productid)
        res.status(200).json({
            message: "Deleted",
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}


exports.UpdateFurni = asyncHandler(async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.files.image.tempFilePath)
        const id = req.params.id;
        const productId = await Addfurni.findById(id)
        const newUpdate = {
            title: req.body.title,
            description: req.body.description,
            image: result.secure_url,
            cloudId: result.public_id,
            price: req.body.price,
            rating: req.body.rating,
            numReview: req.body.numReview,
            stockQuantity: req.body.stockQuantity,
        }
        const reviewFurni = await Addfurni.findByIdAndUpdate(productId, newUpdate);
        res.status(201).json({
            message: "update was successful",
            data: reviewFurni
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
}
)

