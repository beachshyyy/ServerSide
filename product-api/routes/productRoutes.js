const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// Get all products

router.get('/products', productController.getAllProducts);


// Get product by ID

router.get('/products/:id', productController.getProductById);


// Search product by keyword

router.get('/products/search/:keyword', productController.searchProducts);


// Create product

router.post('/products', productController.createProduct);


// Update product

router.put('/products/:id', productController.updateProduct);


// Soft delete product

router.delete('/products/:id', productController.softDeleteProduct);


// Restore product

router.put('/products/restore/:id', productController.restoreProduct);

module.exports = router;