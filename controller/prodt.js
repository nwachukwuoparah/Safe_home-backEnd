const Addfurni = require('../models/product')
const asyncHandler = require("express-async-handler");
const cloudinary = require("../helper/cloudinary");

exports.NewPro = asyncHandler(async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.files.image.tempFilePath)
        const fruniData = {
            title: req.body.title,
            description: req.body.description,
            image: result.secure_url,
            cloudId: result.public_id,
            price: req.body.price,
            rating: req.body.rating,
            categories: req.body.categories,
            stockQuantity: req.body.stockQuantity,
            brandName: req.body.brandName
        },
            // const data = {title,description,image,price,rating,numReview,stockQuantity,cloudId}
            created = await Addfurni.create(fruniData);
        // console.log(created)
        res.status(201).json({
            message: "New Furniture Added",
            data: created
        });

    } catch (e) {
        res.status(400).json({
            message: e.message
        });
    }
}
)

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
        const allFurni = await Addfurni.findOne({ proid });
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
        await Addfurni.findByIdAndDelete(productid);
        res.status(204).json({
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

