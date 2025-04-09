const bcrypt = require('bcrypt');
const db = require('../models');
const User = db.users;
const { Op } = require('sequelize');

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }
    
    // Check if email is already taken by another user
    if (req.body.email && req.body.email !== user.email) {
      const existingUser = await User.findOne({
        where: {
          email: req.body.email,
          id: { [Op.ne]: req.userId }
        }
      });
      
      if (existingUser) {
        return res.status(400).json({
          message: 'Email is already in use'
        });
      }
    }
    
    // Update user
    await user.update({
      name: req.body.name || user.name,
      email: req.body.email || user.email,
      phone: req.body.phone || user.phone,
      address: req.body.address || user.address,
      city: req.body.city || user.city,
      state: req.body.state || user.state,
      postalCode: req.body.postalCode || user.postalCode,
      country: req.body.country || user.country
    });
    
    res.status(200).json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      message: 'Failed to update profile',
      error: error.message
    });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    // Find user with password
    const user = await User.scope('withPassword').findByPk(req.userId);
    
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }
    
    // Check if current password is correct
    const isValidPassword = await bcrypt.compare(req.body.currentPassword, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        message: 'Current password is incorrect'
      });
    }
    
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
    
    // Update password
    await user.update({
      password: hashedPassword
    });
    
    res.status(200).json({
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      message: 'Failed to change password',
      error: error.message
    });
  }
};

// Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    
    // Build filter conditions
    const whereConditions = {};
    if (search) {
      whereConditions[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } }
      ];
    }
    
    // Calculate pagination
    const offset = (parseInt(page) - 1) * parseInt(limit);
    
    // Query users
    const { count, rows } = await User.findAndCountAll({
      where: whereConditions,
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json({
      users: rows,
      totalItems: count,
      totalPages: Math.ceil(count / parseInt(limit)),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      message: 'Failed to fetch users',
      error: error.message
    });
  }
};

// Delete user account
exports.deleteAccount = async (req, res) => {
  try {
    // Check if user is deleting their own account or admin is deleting another account
    if (req.userId !== parseInt(req.params.id) && req.userRole !== 'admin') {
      return res.status(403).json({
        message: 'Not authorized to delete this account'
      });
    }
    
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }
    
    // Use soft delete (paranoid mode)
    await user.destroy();
    
    res.status(200).json({
      message: 'Account deleted successfully'
    });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({
      message: 'Failed to delete account',
      error: error.message
    });
  }
}; 