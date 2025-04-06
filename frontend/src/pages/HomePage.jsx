import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/products/ProductList';
import { getAllProducts } from '../utils/api';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const products = await getAllProducts();
        // Get first 4 products as featured
        setFeaturedProducts(products.slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch featured products', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  const featuredCategories = [
    { 
      name: 'Embroidery', 
      description: 'Exquisite handcrafted embroidery from Hunza',
      image: '/images/embroidery.jpg'
    },
    { 
      name: 'Apple Jams', 
      description: 'Fresh, locally sourced apple jams',
      image: '/images/apple-jams.jpg'
    },
    { 
      name: 'Silajeet', 
      description: 'Pure Himalayan Silajeet supplements',
      image: '/images/silajeet.jpg'
    },
    { 
      name: 'Hunzai Dresses', 
      description: 'Traditional Hunzai clothing',
      image: '/images/hunzai-dresses.jpg'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Discover Hunza's Finest Treasures
        </h1>
        <p className="text-xl mb-6">
          Authentic products straight from the heart of Hunza Valley
        </p>
        <Link 
          to="/products" 
          className="bg-white text-primary px-8 py-3 rounded-full hover:bg-gray-100"
        >
          Shop Now
        </Link>
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Our Categories
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {featuredCategories.map((category) => (
            <div 
              key={category.name} 
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600">
                  {category.description}
                </p>
                <Link 
                  to={`/products/${category.name.toLowerCase().replace(' ', '-')}`}
                  className="mt-4 inline-block text-primary hover:underline"
                >
                  Explore {category.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Products
        </h2>
        {loading ? (
          <div className="text-center">Loading featured products...</div>
        ) : (
          <ProductList products={featuredProducts} />
        )}
      </section>
    </div>
  );
};

export default HomePage;