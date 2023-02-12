const express = require('express');
const {IsAdminAuth} = require('../tils/authorization');

const {NewPro,DeleteFurni,UpdateFurni,orderRouter} = require('../controller/prodt');

const router = express.Router();

router.post('/admin/:userId',IsAdminAuth,NewPro)

router.delete('/admin/:userId/:productid', IsAdminAuth, DeleteFurni)

router.patch('/admin/:userId/:id', IsAdminAuth, UpdateFurni)

 //router.post('/admin/:id/',IsAdminAuth,  function(req, res){
   // orderRouter})

module.exports = router
