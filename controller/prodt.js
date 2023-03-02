const Addfurni = require('../models/product')
const asyncHandler = require("express-async-handler");
const cloudinary = require("../helper/cloudinary");

exports.NewPro = async (req, res) => {
    try {
        const categoryId = req.params.categoryId
        const theCat = await Addfurni.findById(categoryId)
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
        const allFurni = await Addfurni.find();
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
exports.GetallFurniByCategory = asyncHandler(async (req, res) => {
    try {
        // const categoryId = req.params.id;
        // const category = await Addfurni.find({categories: categoryId});
        const query = req.query.category ? { categories: req.query.category } : {}
        const product = await Addfurni.find(query)
        res.status(201).json({
            message: "Allfurni By Categories",
            length: product.length,
            data: product
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
        let updateFields = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            stockQuantity: req.body.stockQuantity
        };

        if (req.files && req.files.image) {
            const result = await cloudinary.uploader.upload(
                req.files.image.tempFilePath
            );
            updateFields.image = result.secure_url;
            updateFields.cloudId = result.public_id;
        }

        const productId = req.params.id;
        const updatedProduct = await Addfurni.findByIdAndUpdate(
            productId,
            updateFields,
            { new: true }
        );

        res.status(201).json({
            message: "update was successful",
            data: updatedProduct
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

// exports.UpdateFurni = asyncHandler(async (req, res) => {
//     try {
//         const result = await cloudinary.uploader.upload(req.files.image.tempFilePath)
//         const id = req.params.id;
//         const product = await Addfurni.findById(id);
//         const newUpdate = {
//             title: req.body.title,
//             description: req.body.description,
//             image: result.secure_url,
//             cloudId: result.public_id,
//             price: req.body.price,
//             stockQuantity: req.body.stockQuantity,
//         }
//         const updatedProduct = await Addfurni.findByIdAndUpdate(product._id, newUpdate, { new: true });
//         res.status(201).json({
//             message: "update was successful",
//             data: updatedProduct
//         });
//     } catch (err) {
//         res.status(400).json({
//             message: err.message
//         });
//     }
// }
// )

