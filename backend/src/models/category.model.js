module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define('category', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    slug: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: true
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  }, {
    timestamps: true,
    paranoid: true
  });

  return Category;
}; 