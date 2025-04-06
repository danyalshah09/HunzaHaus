import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105">
      <img 
        src={product.imageUrl} 
        alt={product.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex space-x-2">
            <Link 
              to={`/product/${product._id}`} 
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              Details
            </Link>
            <button 
              onClick={() => addToCart(product)} 
              className="px-3 py-1 bg-primary text-white rounded hover:bg-primary-dark"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;