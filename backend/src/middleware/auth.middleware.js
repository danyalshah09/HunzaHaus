const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.users;

// Verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'No token provided'
    });
  }

  // Extract token from authorization header
  const token = authHeader.split(' ')[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Unauthorized! Invalid token'
    });
  }
};

// Check if user is an admin
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({
        message: 'Require Admin Role!'
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: 'Unable to validate user role'
    });
  }
};

module.exports = {
  verifyToken,
  isAdmin
}; 