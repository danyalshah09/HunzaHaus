module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define('order', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    orderNumber: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    totalAmount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
      defaultValue: 'pending'
    },
    paymentMethod: {
      type: Sequelize.ENUM('cash_on_delivery', 'credit_card', 'bank_transfer'),
      defaultValue: 'cash_on_delivery'
    },
    paymentStatus: {
      type: Sequelize.ENUM('pending', 'paid', 'failed'),
      defaultValue: 'pending'
    },
    shippingFee: {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0.00
    },
    shippingAddress: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false
    },
    postalCode: {
      type: Sequelize.STRING,
      allowNull: false
    },
    country: {
      type: Sequelize.STRING,
      defaultValue: 'Pakistan'
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    notes: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    trackingNumber: {
      type: Sequelize.STRING,
      allowNull: true
    }
  }, {
    timestamps: true,
    paranoid: true,
    hooks: {
      beforeCreate: (order) => {
        // Generate order number: ORD-{TIMESTAMP}
        const timestamp = new Date().getTime().toString().slice(-6);
        order.orderNumber = `ORD-${timestamp}`;
      }
    }
  });

  return Order;
}; 