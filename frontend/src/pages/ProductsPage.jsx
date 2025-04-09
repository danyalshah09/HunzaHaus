import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductList from '../components/products/ProductList';
import { getAllProducts } from '../utils/api';
import embroiderImage from '/hat5.jpeg';
import applejam from '/applejam.jpeg';
import silajeet from '/silajeet.jpg';
import hunzaidress from '/hunzaidress.jpeg';
import scarf from '/embroidery/scarf.jpeg';

import embroideryBackground from '/embroideryBackground.jpg';

// Sample product data for each category
const sampleProducts = {
  'embroidery': [
    {
      _id: '1',
      name: 'Traditional Hunzai Embroidery Scarf',
      description: 'Handcrafted embroidery scarf with traditional Hunzai patterns.',
      price: 25.99,
      category: 'embroidery',
      imageUrl: scarf,
      inStock: true,
      rating: 4.9
    },
    {
      _id: '2',
      name: 'Embroidered Wall Hanging',
      description: 'Beautiful wall hanging with intricate Hunzai embroidery.',
      price: 35.99,
      category: 'embroidery',
      imageUrl: '/embroidery/wallhangings.jpeg',
      inStock: true,
      rating: 4.8
    },
    {
      _id: '3',
      name: 'Embroidered Cushion Cover',
      description: 'Handmade cushion cover with traditional patterns.',
      price: 20.99,
      category: 'embroidery',
      imageUrl: '/embroidery/cushioncover.jpeg',
      inStock: true,
      rating: 4.7
    },
    {
      _id: '4',
      name: 'Embroidered Table Runner',
      description: 'Elegant table runner with Hunzai embroidery.',
      price: 30.99,
      category: 'embroidery',
      imageUrl: '/embroidery/tablerunner.jpeg',
      inStock: true,
      rating: 4.6
    },
    {
      _id: '5',
      name: 'Embroidered Shawl',
      description: 'Warm shawl with traditional embroidery patterns.',
      price: 40.99,
      category: 'embroidery',
      imageUrl: '/embroidery/shawl.jpeg',
      inStock: true,
      rating: 4.9
    }
  ],
  'apple-jams': [
    {
      _id: '6',
      name: 'Classic Apple Jam',
      description: 'Traditional apple jam made from fresh Hunza apples.',
      price: 8.99,
      category: 'apple-jams',
      imageUrl: applejam,
      inStock: true,
      rating: 4.8
    },
    {
      _id: '7',
      name: 'Apricot Jam',
      description: 'Apple jam with a hint of fresh apricot and cloves.',
      price: 9.99,
      category: 'apple-jams',
      imageUrl: '/jam/apricotjam.jpeg',
      inStock: true,
      rating: 4.7
    },
    {
      _id: '8',
      name: 'Cherry Jam',
      description: 'Delicious blend of organic Cherry.',
      price: 10.99,
      category: 'apple-jams',
      imageUrl: '/jam/cherryjam.jpeg',
      inStock: true,
      rating: 4.9
    },
    {
      _id: '9',
      name: 'Plum Jam',
      description: '100% organic apple jam from Hunza orchards.',
      price: 11.99,
      category: 'apple-jams',
      imageUrl: '/jam/plumjam.jpeg',
      inStock: true,
      rating: 4.8
    },
    {
      _id: '10',
      name: 'Fig Jam',
      description: 'Rich jam with chunks of walnuts.',
      price: 12.99,
      category: 'apple-jams',
      imageUrl: '/jam/figjam.jpeg',
      inStock: true,
      rating: 4.7
    }
  ],
  'silajeet': [
    {
      _id: '11',
      name: 'Pure Himalayan Silajeet',
      description: '100% pure Silajeet from the Himalayas.',
      price: 29.99,
      category: 'silajeet',
      imageUrl: '/silajeet.jpg',
      inStock: true,
      rating: 4.9
    },
    {
      _id: '12',
      name: 'Silajeet Capsules',
      description: 'Easy-to-take Silajeet in capsule form.',
      price: 34.99,
      category: 'silajeet',
      imageUrl: '/silajeet/capsules.jpeg',
      inStock: true,
      rating: 4.8
    },
    {
      _id: '13',
      name: 'Silajeet Powder',
      description: 'Pure Silajeet in powder form.',
      price: 27.99,
      category: 'silajeet',
      imageUrl: '/silajeet/powder.jpeg',
      inStock: true,
      rating: 4.7
    },
    {
      _id: '14',
      name: 'Silajeet with Honey',
      description: 'Silajeet mixed with pure Hunza honey.',
      price: 39.99,
      category: 'silajeet',
      imageUrl: '/silajeet/silajeet.jpeg',
      inStock: true,
      rating: 4.9
    }
  ],
  'dry-fruits': [
    {
      _id: '16',
      name: 'Dried Apricots',
      description: 'Authentic Hunzai apricots dried in the sun.',
      price: 49.99,
      category: 'dry-fruits',
      imageUrl: '/dryfruits/driedapples.jpeg',
      inStock: true,
      rating: 4.9
    },
    {
      _id: '17',
      name: 'Dried Apples',
      description: 'Dress with intricate Hunzai embroidery.',
      price: 59.99,
      category: 'dry-fruits',
      imageUrl: '/dryfruits/apples.jpeg',
      inStock: true,
      rating: 4.8
    },
    {
      _id: '18',
      name: 'Kishmish',
      description: 'Contemporary take on traditional Hunzai dress.',
      price: 54.99,
      category: 'dry-fruits',
      imageUrl: '/dryfruits/kishmish.jpeg',
      inStock: true,
      rating: 4.7
    },
    {
      _id: '19',
      name: 'Mulberries',
      description: 'Traditional wedding dress from Hunza.',
      price: 79.99,
      category: 'dry-fruits',
      imageUrl: '/dryfruits/mulberries.jpeg',
      inStock: true,
      rating: 4.9
    },
    {
      _id: '20',
      name: 'Wallnuts',
      description: 'Everyday wear Hunzai dress.',
      price: 44.99,
      category: 'dry-fruits',
      imageUrl: '/dryfruits/wallnuts.jpeg',
      inStock: true,
      rating: 4.8
    }
  ]
};

const ProductsPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Directly use sample data based on category
    if (category && sampleProducts[category]) {
      setProducts(sampleProducts[category]);
    } else {
      setProducts([]);
    }
  }, [category]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 capitalize">
        {category ? category.replace(/-/g, ' ') : 'All Products'}
      </h1>
      <ProductList products={products} />
    </div>
  );
};

export default ProductsPage; 