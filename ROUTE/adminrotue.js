const express = require('express');
const {IsAdminAuth} = require('../tils/authorization');

const {NewPro,DeleteFurni,UpdateFurni,orderRouter} = require('../controller/prodt');


const router = express.Router();

router.post('/admin/:userid',NewPro)

router.delete('/admin/:userid/:productid', IsAdminAuth, DeleteFurni)

router.patch('/admin/:userid/:productid', IsAdminAuth, UpdateFurni)

 router.post('/admin/:id/',IsAdminAuth,  function(req, res){
    orderRouter})




module.exports = router
