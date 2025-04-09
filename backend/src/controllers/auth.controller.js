const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.users;
const { RateLimiterMemory } = require('rate-limiter-flexible');

// Configure rate limiter: maximum 5 attempts per 15 minutes
const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 15 * 60, // 15 minutes
});

// Register a new user
exports.register = async (req, res) => {
  try {
    // Check if email already exists
    const existingUser = await User.findOne({ 
      where: { email: req.body.email }
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'Email is already in use'
      });
    }

    // Validate password strength (more lenient)
    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters long'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user with only required fields
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    };

    // Add optional fields if they exist
    if (req.body.phone) userData.phone = req.body.phone;
    if (req.body.address) userData.address = req.body.address;
    if (req.body.city) userData.city = req.body.city;
    if (req.body.state) userData.state = req.body.state;
    if (req.body.postalCode) userData.postalCode = req.body.postalCode;
    if (req.body.country) userData.country = req.body.country;

    // Create user
    const user = await User.create(userData);

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id }, 
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '24h' }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret',
      { expiresIn: '7d' }
    );

    // Store refresh token in database
    await user.update({ refreshToken });

    // Send response without password
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token,
      refreshToken
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle specific database errors
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.errors.map(e => e.message)
      });
    }
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        message: 'Email is already in use'
      });
    }

    res.status(500).json({
      message: 'Failed to register user. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    // Check rate limit
    try {
      await rateLimiter.consume(req.ip);
    } catch (rateLimiterRes) {
      return res.status(429).json({
        message: 'Too many login attempts. Please try again later.',
        retryAfter: Math.ceil(rateLimiterRes.msBeforeNext / 1000)
      });
    }

    // Find user by email with password included
    const user = await User.scope('withPassword').findOne({
      where: { email: req.body.email }
    });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    // Check if account is locked
    if (user.isLocked) {
      return res.status(403).json({
        message: 'Account is locked. Please contact support.'
      });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) {
      // Increment failed login attempts
      const failedAttempts = (user.failedLoginAttempts || 0) + 1;
      await user.update({ failedLoginAttempts });

      // Lock account after 5 failed attempts
      if (failedAttempts >= 5) {
        await user.update({ isLocked: true });
        return res.status(403).json({
          message: 'Account has been locked due to too many failed attempts. Please contact support.'
        });
      }

      return res.status(401).json({
        message: 'Invalid email or password',
        remainingAttempts: 5 - failedAttempts
      });
    }

    // Reset failed login attempts on successful login
    await user.update({ 
      failedLoginAttempts: 0,
      isLocked: false,
      lastLogin: new Date()
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id }, 
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    // Store refresh token in database
    await user.update({ refreshToken });

    // Send response without password
    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token,
      refreshToken
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      message: 'Failed to login',
      error: error.message
    });
  }
};

// Refresh token
exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        message: 'Refresh token is required'
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    
    // Find user and verify refresh token
    const user = await User.findOne({
      where: { 
        id: decoded.id,
        refreshToken
      }
    });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid refresh token'
      });
    }

    // Generate new access token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      token
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(401).json({
      message: 'Invalid refresh token'
    });
  }
};

// Get current user profile
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      message: 'Failed to fetch user',
      error: error.message
    });
  }
}; 