const express = require('express');
const { IsAdminAuth } = require('../tils/authorization');

const {
  NewPro,
  DeleteFurni,
  UpdateFurni,
  categoriesForChair,
  categoriesForbeds,
  categoriesForChests,
  categoriesForCabinets,
  categoriesFordesks,
  categoriesFortables
} = require('../controller/prodt');
const router = express.Router();

router.post('/admin/:adminId', IsAdminAuth, NewPro)
router.delete('/admin/:adminId/:productid', IsAdminAuth, DeleteFurni)
router.patch('/admin/:adminId/:id', IsAdminAuth, UpdateFurni)

//router.post('/admin/:id/',IsAdminAuth,  function(req, res){
// orderRouter})

module.exports = router;


