const db = require('../models');
const Category = db.categories;

const categories = [
  {
    name: 'Embroidery',
    description: 'Exquisite handcrafted embroidery from Hunza',
    slug: 'embroidery',
    imageUrl: '/hat5.jpeg',
    isActive: true
  },
  {
    name: 'Apple Jams',
    description: 'Fresh, locally sourced apple jams',
    slug: 'apple-jams',
    imageUrl: '/applejam.jpeg',
    isActive: true
  },
  {
    name: 'Silajeet',
    description: 'Pure Himalayan Silajeet supplements',
    slug: 'silajeet',
    imageUrl: '/silajeet.jpg',
    isActive: true
  },
  {
    name: 'Dried Fruits',
    description: 'Premium quality dried fruits from Hunza Valley',
    slug: 'dried-fruits',
    imageUrl: '/apricot.jpeg',
    isActive: true
  },
  {
    name: 'Nuts',
    description: 'Organic nuts known for their exceptional quality',
    slug: 'nuts',
    imageUrl: '/walnuts.jpeg',
    isActive: true
  }
];

const seedCategories = async () => {
  try {
    // Check if categories already exist
    const existingCategories = await Category.findAll();
    if (existingCategories.length > 0) {
      console.log('Categories already exist. Skipping seeding.');
      return;
    }

    // Create categories
    await Category.bulkCreate(categories);
    console.log('Categories seeded successfully');
  } catch (error) {
    console.error('Error seeding categories:', error);
  } finally {
    // Close the database connection
    await db.sequelize.close();
  }
};

// Run the seeding function
seedCategories(); 