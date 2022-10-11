const express = require('express');
const upload = require('../utils/multer')
const { createProduct, viewAllProduct, bulkProduct, createCart, getCart } = require("../controller/product");

const router = express.Router();


router.post("/create",createProduct);
router.get("/allproduct", viewAllProduct);
router.post("/bulkproduct",bulkProduct);
router.post("/cart", createCart);
router.get("/getcart" ,getCart)




module.exports = router
