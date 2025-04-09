import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105">
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
        {imageError ? (
          <div className="text-gray-400 text-center">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2">Image not available</p>
          </div>
        ) : (
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        )}
      </div>
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