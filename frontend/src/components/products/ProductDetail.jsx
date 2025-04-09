import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../../utils/api';
import { useCart } from '../../context/CartContext';

// Sample products for fallback when API fails
const sampleProducts = {
  '1': {
    _id: '1',
    name: 'Premium ',
    description: 'Naturally sweet and nutritious dried apricots from Hunza Valley. Our apricots are sun-dried to preserve their natural sweetness and nutritional value. Packed with vitamins, minerals, and antioxidants, they make a perfect healthy snack or addition to your breakfast.',
    price: 15.99,
    category: 'dried-fruits',
    imageUrl: 'https://images.unsplash.com/photo-1633933768224-13b2a9f57b45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
    inStock: true,
    rating: 4.8
  },
  '2': {
    _id: '2',
    name: 'Hunza Walnuts',
    description: 'Organic walnuts known for their exceptional quality and taste. Sourced directly from the mountains of Hunza, these walnuts are packed with omega-3 fatty acids and antioxidants. Their rich, buttery flavor makes them perfect for snacking, baking, or adding to salads.',
    price: 12.99,
    category: 'nuts',
    imageUrl: 'https://images.unsplash.com/photo-1605197788751-3d11475bd9e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    inStock: true,
    rating: 4.7
  },
  '3': {
    _id: '3',
    name: 'Traditional Hunzai Embroidery Scarf',
    description: 'Handcrafted embroidery scarf with traditional Hunzai patterns. Each scarf is meticulously created by skilled artisans using techniques passed down through generations. The vibrant colors and intricate patterns reflect the rich cultural heritage of the Hunza region. A perfect gift or accessory to elevate any outfit.',
    price: 25.99,
    category: 'embroidery',
    imageUrl: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=726&q=80',
    inStock: true,
    rating: 4.9
  },
  '4': {
    _id: '4',
    name: 'Homemade Apple Jam',
    description: 'Delicious apple jam made from freshly picked apples from Hunza orchards. This jam is prepared using traditional recipes with minimal processing to maintain the natural flavor and nutritional benefits. Contains no artificial preservatives or additives. Perfect for breakfast toast, pastries, or as a natural sweetener.',
    price: 8.99,
    category: 'apple-jams',
    imageUrl: 'https://images.unsplash.com/photo-1597528662465-55ece5734101?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    inStock: true,
    rating: 4.6
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProductDetail = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product details', error);
        // Use sample data as fallback
        if (sampleProducts[id]) {
          setProduct(sampleProducts[id]);
          setError('Using sample product data since API request failed.');
        } else {
          // If the ID doesn't match any sample product, use the first one
          setProduct(sampleProducts['1']);
          setError('Product not found. Showing a sample product instead.');
        }
      } finally {
        setLoading(false);
      }
    };

    loadProductDetail();
  }, [id]);

  if (loading) return <div className="text-center py-8">Loading product details...</div>;

  if (!product) return (
    <div className="text-center py-8">
      <p className="text-xl mb-4">Product not found</p>
      <Link to="/products" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
        Browse Products
      </Link>
    </div>
  );

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    // Show a toast or notification here
    alert(`Added ${quantity} ${product.name} to cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {error && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6 grid md:grid-cols-2 gap-8">
      <div>
        <img 
          src={product.imageUrl} 
          alt={product.name} 
            className="w-full rounded-lg shadow-md object-cover h-80"
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating) ? "text-yellow-500" : "text-gray-300"}>★</span>
              ))}
            </div>
            <span className="text-gray-600">({product.rating})</span>
          </div>
          <p className="text-gray-600 mb-6">{product.description}</p>
        <div className="flex items-center mb-4">
          <span className="text-2xl font-bold text-primary mr-4">
            ${product.price.toFixed(2)}
          </span>
            <span className="text-green-600 bg-green-100 px-2 py-1 rounded">
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
          <div className="flex items-center mb-6">
          <label className="mr-4">Quantity:</label>
            <div className="flex border rounded">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 border-r"
              >
                -
              </button>
          <input 
            type="number" 
            min="1" 
            value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center py-1"
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 border-l"
              >
                +
              </button>
            </div>
        </div>
          <div className="flex space-x-4">
        <button 
          onClick={handleAddToCart}
          disabled={!product.inStock}
              className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark disabled:opacity-50 flex-grow"
        >
          Add to Cart
        </button>
            <Link 
              to="/cart" 
              className="border border-primary text-primary px-6 py-2 rounded hover:bg-gray-50"
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;