module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role: {
      type: Sequelize.ENUM('user', 'admin'),
      defaultValue: 'user'
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    },
    address: {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: null
    },
    city: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    },
    state: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    },
    postalCode: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    },
    country: {
      type: Sequelize.STRING,
      defaultValue: 'Pakistan'
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    lastLogin: {
      type: Sequelize.DATE,
      allowNull: true
    },
    // New security fields
    failedLoginAttempts: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    isLocked: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    refreshToken: {
      type: Sequelize.STRING(1000),
      allowNull: true
    },
    passwordResetToken: {
      type: Sequelize.STRING,
      allowNull: true
    },
    passwordResetExpires: {
      type: Sequelize.DATE,
      allowNull: true
    },
    emailVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    emailVerificationToken: {
      type: Sequelize.STRING,
      allowNull: true
    }
  }, {
    timestamps: true, // Adds createdAt and updatedAt
    paranoid: true,   // Adds deletedAt for soft deletes
    
    // Don't include sensitive fields when converting to JSON
    defaultScope: {
      attributes: { 
        exclude: ['password', 'refreshToken', 'passwordResetToken', 'emailVerificationToken'] 
      }
    },
    // Scope for when we need the password (during login)
    scopes: {
      withPassword: {
        attributes: { }
      }
    }
  });

  return User;
}; 