const express = require('express');
const { IsAdminAuth } = require('../tils/authorization');

const {
  NewPro,DeleteFurni,UpdateFurni,GetallFurniByCategory} = require('../controller/prodt');
const router = express.Router();


// router.get('/admin/:adminId/category', IsAdminAuth, GetallFurniByCategory)
router.get('/category', GetallFurniByCategory)
router.post('/admin/:adminId', IsAdminAuth, NewPro) 
router.delete('/admin/:adminId/:productid', IsAdminAuth, DeleteFurni)
router.patch('/admin/:adminId/:id', IsAdminAuth, UpdateFurni)

//router.post('/admin/:id/',IsAdminAuth,  function(req, res){
// orderRouter})
 
module.exports = router;