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

router.post('/admin/:userId', IsAdminAuth, NewPro)
router.delete('/admin/:userId/:productid', IsAdminAuth, DeleteFurni)
router.patch('/admin/:userId/:id', IsAdminAuth, UpdateFurni)
router.get("/product/chair", categoriesForChair)
router.get("/product/bed", categoriesForbeds);
router.get("/product/cabinets", categoriesForCabinets);
router.get("/product/chests", categoriesForChests);
router.get("/product/desks", categoriesFordesks);
router.get("/product/tables", categoriesFortables);



//router.post('/admin/:id/',IsAdminAuth,  function(req, res){
// orderRouter})

module.exports = router;
