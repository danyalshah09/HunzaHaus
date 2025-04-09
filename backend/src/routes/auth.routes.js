const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');

const router = express.Router();

// Register validation rules
const registerValidationRules = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .trim()
    .escape(),
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('phone')
    .optional()
    .trim()
    .escape(),
  body('address')
    .optional()
    .trim()
    .escape(),
  body('city')
    .optional()
    .trim()
    .escape(),
  body('state')
    .optional()
    .trim()
    .escape(),
  body('postalCode')
    .optional()
    .trim()
    .escape(),
  body('country')
    .optional()
    .trim()
    .escape()
];

// Login validation rules
const loginValidationRules = [
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Refresh token validation rules
const refreshTokenValidationRules = [
  body('refreshToken')
    .notEmpty()
    .withMessage('Refresh token is required')
];

// Register new user
router.post(
  '/register',
  registerValidationRules,
  validate,
  authController.register
);

// Login user
router.post(
  '/login',
  loginValidationRules,
  validate,
  authController.login
);

// Refresh token
router.post(
  '/refresh-token',
  refreshTokenValidationRules,
  validate,
  authController.refreshToken
);

// Get current user profile
router.get(
  '/me',
  verifyToken,
  authController.getCurrentUser
);

module.exports = router; 