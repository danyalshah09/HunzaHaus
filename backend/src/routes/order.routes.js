const express = require('express');
const { body } = require('express-validator');
const orderController = require('../controllers/order.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');

const router = express.Router();

// Order validation rules
const orderValidationRules = [
  body('items').isArray({ min: 1 }).withMessage('Order must contain at least one item'),
  body('items.*.productId').notEmpty().withMessage('Product ID is required'),
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  body('shippingAddress').notEmpty().withMessage('Shipping address is required'),
  body('city').notEmpty().withMessage('City is required'),
  body('state').notEmpty().withMessage('State is required'),
  body('postalCode').notEmpty().withMessage('Postal code is required'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('email').isEmail().withMessage('Valid email is required')
];

// Create new order
router.post(
  '/',
  verifyToken,
  orderValidationRules,
  validate,
  orderController.createOrder
);

// Get user's orders
router.get(
  '/my-orders',
  verifyToken,
  orderController.getUserOrders
);

// Get order by ID
router.get(
  '/:id',
  verifyToken,
  orderController.getOrderById
);

// Update order status (Admin only)
router.put(
  '/:id/status',
  verifyToken,
  isAdmin,
  orderController.updateOrderStatus
);

// Get all orders (Admin only)
router.get(
  '/',
  verifyToken,
  isAdmin,
  orderController.getAllOrders
);

module.exports = router; 