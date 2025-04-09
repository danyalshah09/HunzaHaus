module.exports = (sequelize, Sequelize) => {
  const OrderItem = sequelize.define('orderItem', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      comment: 'Price at the time of purchase'
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: 'Product name at the time of purchase'
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Product image at the time of purchase'
    },
    totalPrice: {
      type: Sequelize.VIRTUAL,
      get() {
        return this.price * this.quantity;
      }
    }
  }, {
    timestamps: false
  });

  return OrderItem;
}; 