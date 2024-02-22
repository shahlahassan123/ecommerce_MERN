const express = require('express');
const router = express.Router();

const {getAllCategory} = require('../controllers/categoryController.js')
const {getAllProducts} = require('../controllers/productsController.js')
const {addOrder, getOrdersByUser,getLatestOrder} = require("../controllers/ordersController.js")
const {addAddress, getAddressByUser, getAddressByTitle} = require("../controllers/addressController.js")

router.get('/categories', getAllCategory)
router.get('/products', getAllProducts)
router.post("/orders", addOrder);
router.post("/address",addAddress );
router.get("/address/:id", getAddressByUser)
router.get("/addresses", getAddressByTitle)

module.exports = router