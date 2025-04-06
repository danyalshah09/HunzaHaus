import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../../utils/api';
import { useCart } from '../../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProductDetail = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product details', error);
      }
    };

    loadProductDetail();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <div className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
      <div>
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full rounded-lg shadow-md"
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex items-center mb-4">
          <span className="text-2xl font-bold text-primary mr-4">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-green-600">
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        <div className="flex items-center mb-4">
          <label className="mr-4">Quantity:</label>
          <input 
            type="number" 
            min="1" 
            value={quantity} 
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-20 border rounded px-2 py-1"
          />
        </div>
        <button 
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark disabled:opacity-50"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;