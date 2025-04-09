const { Sequelize } = require('sequelize');
const dbConfig = require('../config/db.config.js');

// Initialize Sequelize with database configuration
const sequelize = new Sequelize(
  dbConfig.DATABASE,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    logging: dbConfig.logging
  }
);

// Create db object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import model definitions
db.users = require('./user.model.js')(sequelize, Sequelize);
db.products = require('./product.model.js')(sequelize, Sequelize);
db.categories = require('./category.model.js')(sequelize, Sequelize);
db.orders = require('./order.model.js')(sequelize, Sequelize);
db.orderItems = require('./order-item.model.js')(sequelize, Sequelize);
db.reviews = require('./review.model.js')(sequelize, Sequelize);

// Set up associations between models

// Product and Category (many-to-one)
db.categories.hasMany(db.products, { as: 'products' });
db.products.belongsTo(db.categories, {
  foreignKey: 'categoryId',
  as: 'category'
});

// Product and Review (one-to-many)
db.products.hasMany(db.reviews, { as: 'reviews' });
db.reviews.belongsTo(db.products, {
  foreignKey: 'productId',
  as: 'product'
});

// User and Review (one-to-many)
db.users.hasMany(db.reviews, { as: 'reviews' });
db.reviews.belongsTo(db.users, {
  foreignKey: 'userId',
  as: 'user'
});

// User and Order (one-to-many)
db.users.hasMany(db.orders, { as: 'orders' });
db.orders.belongsTo(db.users, {
  foreignKey: 'userId',
  as: 'user'
});

// Order and OrderItem (one-to-many)
db.orders.hasMany(db.orderItems, { as: 'items' });
db.orderItems.belongsTo(db.orders, {
  foreignKey: 'orderId',
  as: 'order'
});

// OrderItem and Product (many-to-one)
db.products.hasMany(db.orderItems);
db.orderItems.belongsTo(db.products, {
  foreignKey: 'productId',
  as: 'product'
});

module.exports = db; 