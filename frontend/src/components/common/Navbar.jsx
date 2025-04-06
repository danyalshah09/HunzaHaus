import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Embroidery', path: '/products/embroidery' },
  { name: 'Apple Jams', path: '/products/apple-jams' },
  { name: 'Silajeet', path: '/products/silajeet' },
  { name: 'Hunzai Dresses', path: '/products/hunzai-dresses' }
];

const Navbar = () => {
  return (
    <nav className="bg-primary-dark py-3 border-t border-white/20">
      <div className="container mx-auto px-4 flex justify-center space-x-6">
        {categories.map((category) => (
          <Link 
            key={category.path} 
            to={category.path} 
            className="text-white hover:text-gray-200 transition-colors duration-300"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;