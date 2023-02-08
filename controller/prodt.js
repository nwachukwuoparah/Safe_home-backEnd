const Addfurni = require('../models/product')
const asyncHandler = require ("express-async-handler");
const cloudinary = require("../helper/cloudinary");

exports.NewPro = asyncHandler (async (req, res) => {
    try{
        const result = await cloudinary.uploader.upload(req.files.image.tempFilePath)
        const fruniData = {
            title:req.body.title,
            description:req.body.description,
            image:result.secure_url,
            cloudId:result.public_id,
            price: req.body.price,
            rating: req.body.rating,
            numReview: req.body.numReview,
            stockQuantity: req.body.stockQuantity,
            
        }
        // const data = {title,description,image,price,rating,numReview,stockQuantity,cloudId}
        const created = await Addfurni.create(fruniData);
        res.status(201).json({
            message: "New Furniture Added",
            data: created
        });

    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
}
)

exports.GetallFurni = asyncHandler(async (req, res) => {
    try{
        const allFurni = await Addfurni.find();
        res.status(201).json({
            message: "Allfurni",
            length: allFurni.length,
            data: allFurni
        });

    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
}
)

exports.GetSingle = asyncHandler(async (req, res) => {
    try{
        const allFurni = await Addfurni.findById(req.params.id);
        res.status(201).json({
            message: "Allfurni",
            length: allFurni.length,
            data: allFurni
        });

    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
}
)

exports.DeleteFurni =  async (req, res) => {
    try{
        const productid = req.params.productid
         await Addfurni.findByIdAndDelete(productid);
        res.status(204).json({
            message: "Deleted",
        });
    
    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
}
            

exports.UpdateFurni = asyncHandler(async(req, res) => {
    try{
        const id = req.params.id;
        const newUpdate = {
            title:req.body.title,
            description:req.body.description,
            image:result.secure_url,
            cloudId:result.public_id,
            price: req.body.price,
            rating: req.body.rating,
            numReview: req.body.numReview,
            stockQuantity: req.body.stockQuantity,
        }
        const reviewFurni = await Addfurni.findByIdAndUpdate(id, newUpdate);
        // res.status(201).json({
        //     message: "update was sucessful",
        //     // length: reviewFurni.length,
        //     data: newUpdate
        // });
        if(! reviewFurni === 0) {
            res.status(400).json({
                message: "update is not succesfful",
            })
        } else {
            res.status(201).json({
                message: "update was successful",
                data: newUpdate
            })
        }
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
}
)

// get random product
// exports.randomproduct= asyncHandler(async(req, res) => {
//     try{
//         const product= await AddUser.find().limit(-1).skip
//         const random_item = product.sort().next
//         return
//     } catch(err){
//         res.status(200).send({
//             success: true,
//             message: "successful",
//             // success:randomproduct,
//             data:random_item
//         })

//     }
// })

exports.randomproduct= asyncHandler(async(req, res) => {
    try{
        function random_item(items)
{
return items[Math.floor(Math.random()*items.length)];
}
var items = [];
console.log(random_item(items));
    }catch(err){
        res.status(201).json({
            message: err.message
        })
    }
})
