const db = require('../models');
const Order = db.orders;
const OrderItem = db.orderItems;
const Product = db.products;
const User = db.users;

// Create new order
exports.createOrder = async (req, res) => {
  try {
    // Verify cart items and calculate total
    const cartItems = req.body.items;
    if (!cartItems || !cartItems.length) {
      return res.status(400).json({
        message: 'No items in the order'
      });
    }

    // Validate shipping information
    const requiredFields = ['shippingAddress', 'city', 'state', 'postalCode', 'phone', 'email'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          message: `${field} is required`
        });
      }
    }

    // Calculate total amount
    let totalAmount = 0;
    const productIds = cartItems.map(item => item.productId);
    const products = await Product.findAll({
      where: { id: productIds }
    });

    // Create product mapping for easy access
    const productMap = {};
    products.forEach(product => {
      productMap[product.id] = product;
    });

    // Check if products exist and are in stock
    for (const item of cartItems) {
      const product = productMap[item.productId];
      if (!product) {
        return res.status(404).json({
          message: `Product with ID ${item.productId} not found`
        });
      }

      if (!product.inStock) {
        return res.status(400).json({
          message: `Product ${product.name} is out of stock`
        });
      }

      totalAmount += product.price * item.quantity;
    }

    // Add shipping fee if applicable
    const shippingFee = req.body.shippingFee || 0;
    totalAmount += shippingFee;

    // Create the order
    const order = await Order.create({
      userId: req.userId,
      totalAmount,
      status: 'pending',
      paymentMethod: req.body.paymentMethod || 'cash_on_delivery',
      paymentStatus: 'pending',
      shippingFee,
      shippingAddress: req.body.shippingAddress,
      city: req.body.city,
      state: req.body.state,
      postalCode: req.body.postalCode,
      country: req.body.country || 'Pakistan',
      phone: req.body.phone,
      email: req.body.email,
      notes: req.body.notes
    });

    // Create order items
    const orderItems = [];
    for (const item of cartItems) {
      const product = productMap[item.productId];
      
      const orderItem = await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
        name: product.name,
        imageUrl: product.imageUrl
      });
      
      orderItems.push(orderItem);
    }

    res.status(201).json({
      message: 'Order created successfully',
      order: {
        ...order.toJSON(),
        items: orderItems
      }
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      message: 'Failed to create order',
      error: error.message
    });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [
            {
              model: Product,
              as: 'product',
              attributes: ['id', 'name', 'imageUrl', 'price']
            }
          ]
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    if (!order) {
      return res.status(404).json({
        message: 'Order not found'
      });
    }

    // Check if user is authorized to view this order
    if (req.userId !== order.userId && req.userRole !== 'admin') {
      return res.status(403).json({
        message: 'Not authorized to view this order'
      });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      message: 'Failed to fetch order',
      error: error.message
    });
  }
};

// Get user's orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.userId },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [
            {
              model: Product,
              as: 'product',
              attributes: ['id', 'name', 'imageUrl']
            }
          ]
        }
      ]
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
};

// Update order status (Admin only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, paymentStatus, trackingNumber } = req.body;
    
    const order = await Order.findByPk(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        message: 'Order not found'
      });
    }
    
    // Update order
    const updatedOrder = await order.update({
      status: status || order.status,
      paymentStatus: paymentStatus || order.paymentStatus,
      trackingNumber: trackingNumber || order.trackingNumber
    });
    
    res.status(200).json({
      message: 'Order updated successfully',
      order: updatedOrder
    });
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({
      message: 'Failed to update order',
      error: error.message
    });
  }
};

// Get all orders (Admin only)
exports.getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    // Build filter conditions
    const whereConditions = {};
    if (status) {
      whereConditions.status = status;
    }
    
    // Calculate pagination
    const offset = (parseInt(page) - 1) * parseInt(limit);
    
    // Query orders
    const { count, rows } = await Order.findAndCountAll({
      where: whereConditions,
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        }
      ]
    });
    
    res.status(200).json({
      orders: rows,
      totalItems: count,
      totalPages: Math.ceil(count / parseInt(limit)),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
}; 