# Hunza E-Store API

This is the backend API for the Hunza E-Store, built with Node.js, Express, and MySQL with Sequelize ORM.

## Features

- Complete RESTful API for an e-commerce platform
- Authentication with JWT
- User management (register, login, profile)
- Product management with categories
- Order processing and tracking
- Image upload functionality
- Data validation and error handling
- Database seeding for development

## Requirements

- Node.js 16+
- MySQL 5.7+ or 8.0+
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Configure your MySQL database
4. Create a `.env` file based on the example provided
5. Run database migrations and seed data:
   ```
   npm run dev
   npm run seed
   ```

## Environment Variables

Create a `.env` file in the root of the project with the following variables:

```
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hunza_estore

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=24h

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

## Running the Server

### Development mode

```
npm run dev
```

### Production mode

```
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Products
- `GET /api/products` - Get all products (with filtering and pagination)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get a single product by ID
- `POST /api/products` - Create a new product (Admin)
- `PUT /api/products/:id` - Update a product (Admin)
- `DELETE /api/products/:id` - Delete a product (Admin)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:slug` - Get a single category by slug with products
- `POST /api/categories` - Create a new category (Admin)
- `PUT /api/categories/:id` - Update a category (Admin)
- `DELETE /api/categories/:id` - Delete a category (Admin)

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders/my-orders` - Get current user's orders
- `GET /api/orders/:id` - Get a single order by ID
- `PUT /api/orders/:id/status` - Update order status (Admin)
- `GET /api/orders` - Get all orders (Admin)

### Users
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/change-password` - Change user password
- `GET /api/users` - Get all users (Admin)
- `DELETE /api/users/:id` - Delete user account

## Demo Credentials

Admin User:
- Email: admin@example.com
- Password: admin123

## Database Schema

The database has the following main tables:
- Users
- Products
- Categories
- Orders
- OrderItems
- Reviews

## Folder Structure

```
backend/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Sequelize models
│   ├── routes/         # Route definitions
│   ├── seeders/        # Database seeders
│   └── server.js       # Entry point
├── uploads/            # Uploaded files
├── .env                # Environment variables
├── package.json        # Dependencies and scripts
└── README.md           # Documentation
```

## Development

For development, we use:

- ESLint for code linting
- Nodemon for automatic server reloading
- MySQL for database storage
- Sequelize for ORM

## License

This project is licensed under the MIT License. 