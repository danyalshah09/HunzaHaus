const express = require('express');
const { body } = require('express-validator');
const categoryController = require('../controllers/category.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const upload = require('../middleware/upload.middleware');

const router = express.Router();

// Category validation rules
const categoryValidationRules = [
  body('name').notEmpty().withMessage('Category name is required')
];

// Get all categories
router.get('/', categoryController.getAllCategories);

// Get single category by slug with products
router.get('/:slug', categoryController.getCategoryBySlug);

// Create new category (Admin only)
router.post(
  '/',
  verifyToken,
  isAdmin,
  upload.single('image'),
  categoryValidationRules,
  validate,
  categoryController.createCategory
);

// Update category (Admin only)
router.put(
  '/:id',
  verifyToken,
  isAdmin,
  upload.single('image'),
  categoryController.updateCategory
);

// Delete category (Admin only)
router.delete(
  '/:id',
  verifyToken,
  isAdmin,
  categoryController.deleteCategory
);

module.exports = router; 