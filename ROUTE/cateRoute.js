const express = require("express");

const commentRouter = express.Router()

const {NewComment} = require('../controller/comment');

commentRouter.post("/cate/:id",NewComment)

module.exports = commentRouter;

