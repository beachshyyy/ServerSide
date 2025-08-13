const express = require('express');
const router = express.Router();

const db = require("../config/db.js");
const productController = require('../controllers/productController');

router.get('/', productController.getProductsView);

modules.exports = router;