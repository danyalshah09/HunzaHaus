import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductList from '../components/products/ProductList';
import { getAllProducts } from '../utils/api';

const ProductsPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        
        // Filter by category if provided
        const filteredProducts = category 
          ? data.filter(p => p.category.toLowerCase() === category.toLowerCase())
          : data;
          
        setProducts(filteredProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [category]);
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : 'All Products'}
      </h1>
      
      {loading ? (
        <div className="flex justify-center">
          <p className="text-lg">Loading products...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg">No products found in this category.</p>
        </div>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
};

export default ProductsPage; 