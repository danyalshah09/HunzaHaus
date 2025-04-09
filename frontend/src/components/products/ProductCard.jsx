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
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full">
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
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
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            onError={handleImageError}
          />
        )}
      </div>
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{product.description}</p>
        <div className="mt-auto">
          <div className="text-xl font-bold text-black mb-3">
            ${product.price.toFixed(2)}
          </div>
          <div className="flex gap-2">
            <Link 
              to={`/product/${product._id}`} 
              className="flex-1 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-center"
            >
              Details
            </Link>
            <button 
              onClick={() => addToCart(product)} 
              className="flex-1 px-3 py-2 bg-blue-300 text-black rounded hover:bg-blue-500 text-center"
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