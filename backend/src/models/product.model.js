module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define('product', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: true
    },
    inStock: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    weight: {
      type: Sequelize.DECIMAL(5, 2),
      allowNull: true,
      comment: 'Weight in kg'
    },
    sku: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true
    },
    featuredProduct: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    rating: {
      type: Sequelize.DECIMAL(3, 1),
      defaultValue: 0.0
    },
    numReviews: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    origin: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'Hunza, Pakistan'
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  }, {
    timestamps: true,
    paranoid: true
  });

  return Product;
}; 