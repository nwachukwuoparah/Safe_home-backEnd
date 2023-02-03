const express = require('express');
const {IsAdminAuth} = require('../tils/authorization');

const {NewPro,DeleteFurni,UpdateFurni,orderRouter} = require('../controller/prodt');
 

const router = express.Router();

router.post('/admin/:id', IsAdminAuth, NewPro)

router.delete('/admin/:id/:productid', IsAdminAuth, DeleteFurni)

router.post('/admin/:id/:productid', IsAdminAuth, UpdateFurni)

router.post('/admin/:id/:productid', IsAdminAuth, UpdateFurni)

router.post('/admin/:id/',IsAdminAuth,  function(req, res){
    orderRouter})

// router.post("/admin/:id", IsAdminAuth,randomproduct)


module.exports = router
