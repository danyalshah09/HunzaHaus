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
    <nav className="bg-white text-gray-800 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4 py-2 text-sm md:text-base lg:text-lg">
          {categories.map((category) => (
            <Link
              key={category.path}
              to={category.path}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;