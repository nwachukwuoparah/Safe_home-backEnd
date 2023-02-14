const express = require("express");

const commentRouter = express.Router()

const {NewComment} = require('../controller/comment');

commentRouter.get("/comment/:id",NewComment)

module.exports = commentRouter;
