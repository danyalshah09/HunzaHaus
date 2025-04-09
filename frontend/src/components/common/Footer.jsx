import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">About Us</h3>
          <p>Premium dry fruits and traditional products from Hunza region.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <nav className="space-y-2">
            <Link to="/products" className="block hover:text-gray-600">All Products</Link>
            <Link to="/about" className="block hover:text-gray-600">About Us</Link>
            <Link to="/contact" className="block hover:text-gray-600">Contact</Link>
          </nav>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Info</h3>
          <p>Email: info@dryfruitstore.com</p>
          <p>Phone: +92 327 563 5038</p>
        </div>
      </div>
      <div className="text-center mt-6 border-t border-gray-200 pt-4">
        © 2024 Dry Fruits Store. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;