const express = require('express');
const { IsAdminAuth } = require('../tils/authorization');

const { NewPro,DeleteFurni,UpdateFurni,GetallFurniByCategory} = require('../controller/prodt');
const productRoute = express.Router();


// router.get('/admin/:adminId/category', IsAdminAuth, GetallFurniByCategory)
productRoute.get('/category', GetallFurniByCategory)
productRoute.post('/admin/:adminId', IsAdminAuth ,NewPro) 
productRoute.delete('/admin/:adminId/:productid', IsAdminAuth, DeleteFurni)
productRoute.patch('/admin/:adminId/:id', IsAdminAuth, UpdateFurni)

//productRoute.post('/admin/:id/',IsAdminAuth,  function(req, res){
// orderproductRoute})
 
module.exports = productRoute; 