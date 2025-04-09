import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Embroidery', path: '/products/embroidery' },
  { name: 'Apple Jams', path: '/products/apple-jams' },
  { name: 'Silajeet', path: '/products/silajeet' },
  { name: 'Dry fruits', path: '/products/dry-fruits' }
];

const Navbar = () => {
  return (
    <nav className="bg-white py-3 border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 flex justify-center space-x-6">
        {categories.map((category) => (
          <Link 
            key={category.path} 
            to={category.path} 
            className="text-gray-800 hover:text-gray-600 transition-colors duration-300 font-medium"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;