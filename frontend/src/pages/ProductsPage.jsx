import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductList from '../components/products/ProductList';
import { getAllProducts } from '../utils/api';
import apricot from '/apricot.jpeg';

// Sample product data to use when API fails
const sampleProducts = [
  {
    _id: '1',
    name: 'Premium Dried Apricots',
    description: 'Naturally sweet and nutritious dried apricots from Hunza Valley.',
    price: 15.99,
    category: 'dried-fruits',
    imageUrl: apricot,
    inStock: true,
    rating: 4.8
  },
  {
    _id: '2',
    name: 'Hunza Walnuts',
    description: 'Organic walnuts known for their exceptional quality and taste.',
    price: 12.99,
    category: 'nuts',
    imageUrl: 'https://images.unsplash.com/photo-1605197788751-3d11475bd9e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    inStock: true,
    rating: 4.7
  },
  {
    _id: '3',
    name: 'Traditional Hunzai Embroidery Scarf',
    description: 'Handcrafted embroidery scarf with traditional Hunzai patterns.',
    price: 25.99,
    category: 'embroidery',
    imageUrl: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=726&q=80',
    inStock: true,
    rating: 4.9
  },
  {
    _id: '4',
    name: 'Homemade Apple Jam',
    description: 'Delicious apple jam made from freshly picked apples.',
    price: 8.99,
    category: 'apple-jams',
    imageUrl: 'https://images.unsplash.com/photo-1597528662465-55ece5734101?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    inStock: true,
    rating: 4.6
  }
];

const ProductsPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Build query parameters
        const queryParams = {
          page: pagination.currentPage,
          limit: 12, // Show 12 products per page
          ...(category && { category })
        };
        
        const response = await getAllProducts(queryParams);
        
        // Update products and pagination
        setProducts(response.products || []);
        setPagination({
          currentPage: response.currentPage,
          totalPages: response.totalPages,
          totalItems: response.totalItems
        });
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [category, pagination.currentPage]);
  
  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, currentPage: newPage }));
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : 'All Products'}
      </h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">No products found in this category.</p>
        </div>
      ) : (
        <>
          <ProductList products={products} />
          
          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="px-3 py-1 rounded border disabled:opacity-50"
                >
                  Previous
                </button>
                
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded border ${
                      page === pagination.currentPage ? 'bg-primary text-white' : ''
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="px-3 py-1 rounded border disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsPage; 