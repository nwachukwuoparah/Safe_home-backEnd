const express = require('express')
const {GetallFurni,GetSingle} = require('../controller/prodt')
const {reviewPro} = require("../middleware/errorhand")

const router = express.Router();


router.route('/user').get(GetallFurni)
router.route('/get/:proid').get(GetSingle)
// router.route("/:id/review").post(reviewPro)
module.exports = router

