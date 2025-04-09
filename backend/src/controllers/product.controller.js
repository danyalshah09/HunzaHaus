const db = require('../models');
const Product = db.products;
const Category = db.categories;
const Review = db.reviews;
const { Op } = require('sequelize');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      sort = 'createdAt', 
      order = 'DESC',
      search,
      minPrice,
      maxPrice,
      inStock
    } = req.query;
    
    // Build filter conditions
    const whereConditions = { isActive: true };
    
    if (category) {
      whereConditions.categoryId = await getCategoryIdBySlug(category);
    }
    
    if (search) {
      whereConditions[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }
    
    if (minPrice) {
      whereConditions.price = {
        ...whereConditions.price,
        [Op.gte]: parseFloat(minPrice)
      };
    }
    
    if (maxPrice) {
      whereConditions.price = {
        ...whereConditions.price,
        [Op.lte]: parseFloat(maxPrice)
      };
    }
    
    if (inStock === 'true') {
      whereConditions.inStock = true;
    }
    
    // Calculate pagination
    const offset = (parseInt(page) - 1) * parseInt(limit);
    
    // Query products
    const { count, rows } = await Product.findAndCountAll({
      where: whereConditions,
      limit: parseInt(limit),
      offset,
      order: [[sort, order]],
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'slug']
        }
      ]
    });
    
    res.status(200).json({
      products: rows,
      totalItems: count,
      totalPages: Math.ceil(count / parseInt(limit)),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      message: 'Failed to fetch products',
      error: error.message
    });
  }
};

// Get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'slug']
        },
        {
          model: Review,
          as: 'reviews',
          where: { isApproved: true },
          required: false,
          attributes: ['id', 'rating', 'title', 'comment', 'createdAt'],
          include: [
            {
              model: db.users,
              as: 'user',
              attributes: ['id', 'name']
            }
          ]
        }
      ]
    });
    
    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }
    
    res.status(200).json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      message: 'Failed to fetch product',
      error: error.message
    });
  }
};

// Create a new product (Admin only)
exports.createProduct = async (req, res) => {
  try {
    // Process file upload if present
    let imageUrl = null;
    if (req.file) {
      // In a real-world scenario, you might want to store the path in cloud storage
      imageUrl = `/uploads/${req.file.filename}`;
    }
    
    // Create product
    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      categoryId: req.body.categoryId,
      imageUrl: imageUrl || req.body.imageUrl,
      inStock: req.body.inStock !== undefined ? req.body.inStock : true,
      quantity: req.body.quantity || 0,
      weight: req.body.weight,
      sku: req.body.sku,
      featuredProduct: req.body.featuredProduct || false,
      origin: req.body.origin || 'Hunza, Pakistan'
    });
    
    res.status(201).json({
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      message: 'Failed to create product',
      error: error.message
    });
  }
};

// Update product (Admin only)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }
    
    // Process file upload if present
    let imageUrl = product.imageUrl;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }
    
    // Update product
    await product.update({
      name: req.body.name || product.name,
      description: req.body.description || product.description,
      price: req.body.price || product.price,
      categoryId: req.body.categoryId || product.categoryId,
      imageUrl: req.body.imageUrl || imageUrl,
      inStock: req.body.inStock !== undefined ? req.body.inStock : product.inStock,
      quantity: req.body.quantity !== undefined ? req.body.quantity : product.quantity,
      weight: req.body.weight || product.weight,
      sku: req.body.sku || product.sku,
      featuredProduct: req.body.featuredProduct !== undefined ? req.body.featuredProduct : product.featuredProduct,
      origin: req.body.origin || product.origin,
      isActive: req.body.isActive !== undefined ? req.body.isActive : product.isActive
    });
    
    res.status(200).json({
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      message: 'Failed to update product',
      error: error.message
    });
  }
};

// Delete product (Admin only)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }
    
    // Use soft delete (paranoid mode)
    await product.destroy();
    
    res.status(200).json({
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      message: 'Failed to delete product',
      error: error.message
    });
  }
};

// Get featured products
exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { 
        featuredProduct: true,
        isActive: true
      },
      limit: 8,
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'slug']
        }
      ]
    });
    
    res.status(200).json(products);
  } catch (error) {
    console.error('Get featured products error:', error);
    res.status(500).json({
      message: 'Failed to fetch featured products',
      error: error.message
    });
  }
};

// Helper function to get category ID by slug
async function getCategoryIdBySlug(slug) {
  const category = await Category.findOne({
    where: { slug }
  });
  return category ? category.id : null;
} 