const express = require('express')
const {GetallFurni,GetSingle} = require('../controller/prodt')

const router = express.Router();


router.route('/user').get(GetallFurni)
router.route('/get/:id').get(GetSingle)
module.exports = router

