const express = require('express');
const { body } = require('express-validator');
const productController = require('../controllers/product.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const upload = require('../middleware/upload.middleware');

const router = express.Router();

// Product validation rules
const productValidationRules = [
  body('name').notEmpty().withMessage('Product name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price')
    .isNumeric()
    .withMessage('Price must be a number')
    .isFloat({ min: 0.01 })
    .withMessage('Price must be greater than 0'),
  body('categoryId').notEmpty().withMessage('Category is required')
];

// Get all products with filtering and pagination
router.get('/', productController.getAllProducts);

// Get featured products
router.get('/featured', productController.getFeaturedProducts);

// Get single product by ID
router.get('/:id', productController.getProductById);

// Create new product (Admin only)
router.post(
  '/',
  verifyToken,
  isAdmin,
  upload.single('image'),
  productValidationRules,
  validate,
  productController.createProduct
);

// Update product (Admin only)
router.put(
  '/:id',
  verifyToken,
  isAdmin,
  upload.single('image'),
  productController.updateProduct
);

// Delete product (Admin only)
router.delete(
  '/:id',
  verifyToken,
  isAdmin,
  productController.deleteProduct
);

module.exports = router; 