const db = require('../models');
const Category = db.categories;
const Product = db.products;
const { Op } = require('sequelize');

// Helper function to create slug from name
const createSlug = (name) => {
  return name.toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/-+/g, '-');     // Remove consecutive -
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const { active } = req.query;
    
    const whereConditions = {};
    if (active === 'true') {
      whereConditions.isActive = true;
    }
    
    const categories = await Category.findAll({
      where: whereConditions,
      order: [['name', 'ASC']]
    });
    
    res.status(200).json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      message: 'Failed to fetch categories',
      error: error.message
    });
  }
};

// Get single category by slug with products
exports.getCategoryBySlug = async (req, res) => {
  try {
    const category = await Category.findOne({
      where: { 
        slug: req.params.slug,
        isActive: true
      },
      include: [
        {
          model: Product,
          as: 'products',
          where: { isActive: true },
          attributes: ['id', 'name', 'description', 'price', 'imageUrl', 'inStock', 'rating']
        }
      ]
    });
    
    if (!category) {
      return res.status(404).json({
        message: 'Category not found'
      });
    }
    
    res.status(200).json(category);
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({
      message: 'Failed to fetch category',
      error: error.message
    });
  }
};

// Create a new category (Admin only)
exports.createCategory = async (req, res) => {
  try {
    // Check if name exists
    const existingCategory = await Category.findOne({
      where: {
        [Op.or]: [
          { name: req.body.name },
          { slug: createSlug(req.body.name) }
        ]
      }
    });
    
    if (existingCategory) {
      return res.status(400).json({
        message: 'Category name already exists'
      });
    }
    
    // Process file upload if present
    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }
    
    // Create slug from name
    const slug = createSlug(req.body.name);
    
    // Create category
    const category = await Category.create({
      name: req.body.name,
      description: req.body.description,
      slug,
      imageUrl: imageUrl || req.body.imageUrl,
      isActive: req.body.isActive !== undefined ? req.body.isActive : true
    });
    
    res.status(201).json({
      message: 'Category created successfully',
      category
    });
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({
      message: 'Failed to create category',
      error: error.message
    });
  }
};

// Update category (Admin only)
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        message: 'Category not found'
      });
    }
    
    // Check if new name exists (if name is changed)
    if (req.body.name && req.body.name !== category.name) {
      const existingCategory = await Category.findOne({
        where: {
          name: req.body.name,
          id: { [Op.ne]: category.id }
        }
      });
      
      if (existingCategory) {
        return res.status(400).json({
          message: 'Category name already exists'
        });
      }
    }
    
    // Process file upload if present
    let imageUrl = category.imageUrl;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }
    
    // Create slug from name if name is changed
    let slug = category.slug;
    if (req.body.name && req.body.name !== category.name) {
      slug = createSlug(req.body.name);
    }
    
    // Update category
    await category.update({
      name: req.body.name || category.name,
      description: req.body.description || category.description,
      slug,
      imageUrl: req.body.imageUrl || imageUrl,
      isActive: req.body.isActive !== undefined ? req.body.isActive : category.isActive
    });
    
    res.status(200).json({
      message: 'Category updated successfully',
      category
    });
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({
      message: 'Failed to update category',
      error: error.message
    });
  }
};

// Delete category (Admin only)
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        message: 'Category not found'
      });
    }
    
    // Check if category has products
    const productCount = await Product.count({
      where: { categoryId: category.id }
    });
    
    if (productCount > 0) {
      return res.status(400).json({
        message: 'Cannot delete category with products',
        productCount
      });
    }
    
    // Use soft delete (paranoid mode)
    await category.destroy();
    
    res.status(200).json({
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({
      message: 'Failed to delete category',
      error: error.message
    });
  }
}; 