import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/products/ProductList';
import { getAllProducts, getAllCategories } from '../utils/api';
import embroiderImage from '/hat5.jpeg';
import applejam from '/applejam.jpeg';
import silajeet from '/silajeet.jpg';
import hunzaidress from '/hunzaidress.jpeg';
import apricot from '/apricot.jpeg';
import wallnuts from '/wallnuts.jpeg';
import scarf from '/scarf.jpeg';
import apricotOil from '/apricotOil.jpeg';
import hunzaBackground from '/hunzaBackground.jpg';
import hunza2 from '/hunza2.jpg';
import embroideryBackground from '/embroideryBackground.jpg';

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
    inStock: true,
    rating: 4.9
  },
  {
    _id: '4',
    name: 'Apricot Oil',
    description: 'Pure apricot oil extracted from Hunza apricots.',
    price: 8.99,
    category: 'apricot-oil',
    imageUrl: apricotOil,
    inStock: true,
    rating: 4.6
  }
];

const slides = [
  {
    title: "Discover Hunza's Finest Treasures",
    description: "Authentic products straight from the heart of Hunza Valley",
    image: hunzaBackground
  },
  {
    title: "Premium Quality Products",
    description: "Handpicked and carefully selected for your satisfaction",
    image: hunza2
  },
  {
    title: "Direct from Hunza Valley",
    description: "Experience the authentic taste and quality of Hunza",
    image: embroideryBackground
  }
];

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Load categories
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);

        // Load featured products
        const products = await getAllProducts();
        setFeaturedProducts(products.slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch data', error);
        setError('Failed to load data. Using sample data instead.');
        setCategories([
          { 
            name: 'Embroidery', 
            description: 'Exquisite handcrafted embroidery from Hunza',
            image: embroiderImage,
            slug: 'embroidery'
          },
          { 
            name: 'Apple Jams', 
            description: 'Fresh, locally sourced apple jams',
            image: applejam,
            slug: 'apple-jams'
          },
          { 
            name: 'Silajeet', 
            description: 'Pure Himalayan Silajeet supplements',
            image: silajeet,
            slug: 'silajeet'
          }
        ]);
        setFeaturedProducts(sampleProducts);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Slider */}
      <div className="relative h-[500px] overflow-hidden rounded-lg">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50" />
            </div>
            <div className="relative h-full flex flex-col items-center justify-center text-center text-white p-8">
              <h1 className="text-4xl font-bold mb-4">
                {slide.title}
              </h1>
              <p className="text-xl mb-6">
                {slide.description}
              </p>
              <Link 
                to="/products" 
                className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-colors"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-colors"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slider Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <section className="mt-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Our Categories
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div 
              key={category.slug} 
              className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full"
            >
              <img 
                src={category.imageUrl || category.image} 
                alt={category.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-black text-center flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  {category.description}
                </p>
                <Link 
                  to={`/products/${category.slug}`}
                  className="text-primary hover:text-primary-dark mt-auto"
                >
                  Explore {category.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="mt-12">
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