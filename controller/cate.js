const express = require("express")
const asyncHandler = require ("express-async-handler");
const comment = require("../models/cate");
const cloudinary = require("../helper/cloudinary")

exports.NewComment = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const result = await cloudinary.uploader.upload(req.files.image.tempFilePath)
        const commentAdd = {
            text: req.body.text,
            image: result.secure_url,
            cloudId: result.public_id,
        },
            created = await comment.create(commentAdd);
        res.status(201).json({
            message: "Comment is added successfully",
            data: created
        });

    } catch (e) {
        res.status(400).json({
            message: e.message
        });
    }
}
)