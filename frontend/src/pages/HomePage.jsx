import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/products/ProductList';
import { getAllProducts } from '../utils/api';
import embroiderImage from '/hat5.jpeg';
import applejam from '/applejam.jpeg';
import silajeet from '/silajeet.jpg';
import hunzaidress from '/hunzaidress.jpeg';
import apricot from '/apricot.jpeg';
import wallnuts from '/wallnuts.jpeg';
import scarf from '/scarf.jpeg';
import apricotOil from '/apricotOil.jpeg';

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
    imageUrl: wallnuts,
    inStock: true,
    rating: 4.7
  },
  {
    _id: '3',
    name: 'Traditional Hunzai Embroidery Scarf',
    description: 'Handcrafted embroidery scarf with traditional Hunzai patterns.',
    price: 25.99,
    category: 'embroidery',
    imageUrl: scarf,
       rating: 4.9
  },
  {
    _id: '4',
    name: 'Apricot Oil',
    description: 'Delicious apple jam made from freshly picked apples.',
    price: 8.99,
    category: 'apricot-oil',
    imageUrl: apricotOil,
    inStock: true,
    rating: 4.6
  }
];

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const products = await getAllProducts();
        // Get first 4 products as featured
        setFeaturedProducts(products.slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch featured products', error);
        // Use sample data when API fails
        setFeaturedProducts(sampleProducts);
        setError('Using sample products since API failed to load.');
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
      image: embroiderImage
    },
    { 
      name: 'Apple Jams', 
      description: 'Fresh, locally sourced apple jams',
      image: applejam
    },
    { 
      name: 'Silajeet', 
      description: 'Pure Himalayan Silajeet supplements',
      image: silajeet
    },
    { 
      name: 'Hunzai Dresses', 
      description: 'Traditional Hunzai clothing',
      image: hunzaidress
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 text-center rounded-lg">
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

      {error && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

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