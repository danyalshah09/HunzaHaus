const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');

const router = express.Router();

// Update profile validation rules
const updateProfileValidationRules = [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('phone').optional().notEmpty().withMessage('Phone cannot be empty'),
  body('address').optional().notEmpty().withMessage('Address cannot be empty'),
  body('city').optional().notEmpty().withMessage('City cannot be empty'),
  body('state').optional().notEmpty().withMessage('State cannot be empty'),
  body('postalCode').optional().notEmpty().withMessage('Postal code cannot be empty')
];

// Update password validation rules
const updatePasswordValidationRules = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long'),
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Passwords do not match');
      }
      return true;
    })
];

// Update user profile
router.put(
  '/profile',
  verifyToken,
  updateProfileValidationRules,
  validate,
  userController.updateProfile
);

// Change password
router.post(
  '/change-password',
  verifyToken,
  updatePasswordValidationRules,
  validate,
  userController.changePassword
);

// Get all users (Admin only)
router.get(
  '/',
  verifyToken,
  isAdmin,
  userController.getAllUsers
);

// Delete user account
router.delete(
  '/:id',
  verifyToken,
  userController.deleteAccount
);

module.exports = router; 