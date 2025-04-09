// Load environment variables first
require('dotenv').config();

const bcrypt = require('bcrypt');
const db = require('../models');
const User = db.users;
const Category = db.categories;
const Product = db.products;

// Function to seed initial data
async function seedData() {
  try {
    console.log('Starting database seeding...');
    console.log('Using database config:', {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      database: process.env.DB_NAME || 'hunza_estore',
      // Not logging the password for security
    });
    
    // Create admin user
    const adminExists = await User.findOne({ where: { email: 'admin@example.com' } });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Admin user created');
    }
    
    // Create categories
    const categories = [
      {
        name: 'Dried Fruits',
        description: 'High-quality dried fruits from Hunza Valley',
        slug: 'dried-fruits',
        imageUrl: 'https://images.unsplash.com/photo-1605548230624-8d2d0419c517?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
      },
      {
        name: 'Embroidery',
        description: 'Traditional Hunzai embroidery and handcrafts',
        slug: 'embroidery',
        imageUrl: 'https://images.unsplash.com/photo-1603513492128-ba7bc9b3e143?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
      },
      {
        name: 'Hunzai Dresses',
        description: 'Traditional clothing from Hunza Valley',
        slug: 'hunzai-dresses',
        imageUrl: 'https://images.unsplash.com/photo-1582748517252-3737d451dada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80'
      },
      {
        name: 'Apple Jams',
        description: 'Homemade apple jams and preserves from Hunza',
        slug: 'apple-jams',
        imageUrl: 'https://images.unsplash.com/photo-1597832793713-08e8f4fc1322?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1331&q=80'
      },
      {
        name: 'Silajeet',
        description: 'Natural silajeet from the mountains of Hunza',
        slug: 'silajeet',
        imageUrl: 'https://images.unsplash.com/photo-1516734212186-315c21fa7ca4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80'
      }
    ];
    
    for (const categoryData of categories) {
      const categoryExists = await Category.findOne({ where: { name: categoryData.name } });
      if (!categoryExists) {
        await Category.create(categoryData);
        console.log(`Category ${categoryData.name} created`);
      }
    }
    
    // Get categories for reference
    const driedFruits = await Category.findOne({ where: { slug: 'dried-fruits' } });
    const embroidery = await Category.findOne({ where: { slug: 'embroidery' } });
    const hunzaiDresses = await Category.findOne({ where: { slug: 'hunzai-dresses' } });
    const appleJams = await Category.findOne({ where: { slug: 'apple-jams' } });
    const silajeet = await Category.findOne({ where: { slug: 'silajeet' } });
    
    // Create sample products
    const products = [
      {
        name: 'Premium Dried Apricots',
        description: 'Naturally sweet and delicious dried apricots from Hunza Valley. These premium quality apricots are sun-dried to preserve the natural flavor and nutrients. High in fiber and antioxidants.',
        price: 15.99,
        categoryId: driedFruits.id,
        imageUrl: 'https://images.unsplash.com/photo-1633933768224-13b2a9f57b45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
        inStock: true,
        quantity: 100,
        weight: 0.5,
        sku: 'DF-APR-001',
        featuredProduct: true,
        rating: 4.8
      },
      {
        name: 'Hunza Walnuts',
        description: 'Organic walnuts from the mountains of Hunza. Rich in omega-3 fatty acids and antioxidants. Excellent for heart health and brain function.',
        price: 12.99,
        categoryId: driedFruits.id,
        imageUrl: 'https://images.unsplash.com/photo-1603844838275-f5451a3a8dc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
        inStock: true,
        quantity: 80,
        weight: 0.5,
        sku: 'DF-WAL-001',
        featuredProduct: true,
        rating: 4.7
      },
      {
        name: 'Dried Mulberries',
        description: 'Sweet and nutritious dried mulberries from Hunza Valley. Packed with antioxidants, vitamins, and minerals. A healthy and tasty snack for any time of day.',
        price: 9.99,
        categoryId: driedFruits.id,
        imageUrl: 'https://images.unsplash.com/photo-1618852410461-45a7f74086a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
        inStock: true,
        quantity: 90,
        weight: 0.25,
        sku: 'DF-MUL-001',
        featuredProduct: false,
        rating: 4.5
      },
      {
        name: 'Traditional Hunzai Embroidery Scarf',
        description: 'Beautifully crafted hand-embroidered scarf with traditional Hunzai patterns. Each piece is unique and showcases the rich cultural heritage of the region.',
        price: 25.99,
        categoryId: embroidery.id,
        imageUrl: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=726&q=80',
        inStock: true,
        quantity: 20,
        weight: 0.2,
        sku: 'EM-SCF-001',
        featuredProduct: true,
        rating: 4.9
      },
      {
        name: 'Embroidered Wall Hanging',
        description: 'Intricately embroidered wall hanging featuring traditional Hunzai designs. Perfect for adding a touch of cultural elegance to your home decor.',
        price: 34.99,
        categoryId: embroidery.id,
        imageUrl: 'https://images.unsplash.com/photo-1528396518501-b53b655eb9b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        inStock: true,
        quantity: 15,
        weight: 0.3,
        sku: 'EM-WLH-001',
        featuredProduct: false,
        rating: 4.7
      },
      {
        name: 'Traditional Hunzai Dress',
        description: 'Authentic Hunzai dress made with high-quality fabric and traditional designs. Comfortable, elegant, and perfect for special occasions or cultural celebrations.',
        price: 79.99,
        categoryId: hunzaiDresses.id,
        imageUrl: 'https://images.unsplash.com/photo-1607242792481-37f27e1901ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        inStock: true,
        quantity: 10,
        weight: 0.8,
        sku: 'HD-DRS-001',
        featuredProduct: true,
        rating: 4.9
      },
      {
        name: 'Homemade Apple Jam',
        description: 'Delicious homemade apple jam made with organic apples from Hunza Valley. No preservatives or artificial flavors, just the natural sweetness of Hunza apples.',
        price: 8.99,
        categoryId: appleJams.id,
        imageUrl: 'https://images.unsplash.com/photo-1564843411483-9584fabac868?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        inStock: true,
        quantity: 50,
        weight: 0.4,
        sku: 'AJ-JAM-001',
        featuredProduct: true,
        rating: 4.6
      },
      {
        name: 'Pure Silajeet',
        description: 'Natural silajeet harvested from the mountains of Hunza. Known for its numerous health benefits and medicinal properties according to traditional practices.',
        price: 19.99,
        categoryId: silajeet.id,
        imageUrl: 'https://images.unsplash.com/photo-1542444256-164bd32f11fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        inStock: true,
        quantity: 30,
        weight: 0.1,
        sku: 'SL-PUR-001',
        featuredProduct: true,
        rating: 4.8
      }
    ];
    
    for (const productData of products) {
      const productExists = await Product.findOne({ where: { name: productData.name } });
      if (!productExists) {
        await Product.create(productData);
        console.log(`Product ${productData.name} created`);
      }
    }
    
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Execute the seeding function
seedData(); 