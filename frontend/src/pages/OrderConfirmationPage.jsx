import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUserOrders } from '../utils/api';

// Sample order for demo/fallback purposes
const createSampleOrder = (orderId) => {
  return {
    _id: orderId,
    items: [
      {
        _id: '1',
        name: 'Premium Dried Apricots',
        price: 15.99,
        quantity: 2,
        imageUrl: 'https://images.unsplash.com/photo-1633933768224-13b2a9f57b45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
      },
      {
        _id: '3',
        name: 'Traditional Hunzai Embroidery Scarf',
        price: 25.99,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=726&q=80',
      }
    ],
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main Street',
      city: 'Anytown',
      state: 'ST',
      postalCode: '12345'
    },
    status: 'confirmed',
    total: 57.97,
    createdAt: new Date().toISOString()
  };
};

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrderDetails = async () => {
      try {
        // Check if it's a sample order (from our demo checkout)
        if (orderId.startsWith('sample-')) {
          setOrder(createSampleOrder(orderId));
          setError('Using sample order data for demonstration purposes.');
          setLoading(false);
          return;
        }

        // Try to get real order from API
        try {
          // Since we don't have fetchOrderDetails, we'll use getUserOrders and filter
          const orders = await getUserOrders();
          const foundOrder = orders.find(o => o._id === orderId);
          
          if (foundOrder) {
            setOrder(foundOrder);
          } else {
            // If the order is not found, create a sample one
            setOrder(createSampleOrder(orderId));
            setError('Order data not found. Showing sample data for demonstration.');
          }
        } catch (apiError) {
          console.error('Failed to fetch order details from API', apiError);
          setOrder(createSampleOrder(orderId));
          setError('Could not connect to the orders API. Showing sample data for demonstration.');
        }
      } catch (error) {
        console.error('Failed to process order details', error);
        setError('Failed to process order details. Please contact customer support.');
      } finally {
        setLoading(false);
      }
    };

    loadOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-lg">Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
        <p className="mb-6">We couldn't find the order you're looking for.</p>
        <Link 
          to="/products" 
          className="bg-primary text-white px-6 py-3 rounded hover:bg-primary-dark"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {error && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-green-600">
            Order Confirmed!
          </h1>
        </div>

        <div className="text-center mb-6">
          <p className="text-xl">
            Thank you for your purchase, {order.shippingAddress.firstName}!
          </p>
          <p className="text-gray-600">
            Order Number: <span className="font-medium">{order._id}</span>
          </p>
          <p className="text-gray-600 mt-1">
            Date: <span className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</span>
          </p>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="divide-y">
            {order.items.map((item) => (
              <div 
                key={item._id} 
                className="py-4 flex items-center"
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded mr-4"
                />
                <div className="flex-grow">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-600">
                    Quantity: {item.quantity} | ${item.price.toFixed(2)} each
                  </p>
                </div>
                <p className="font-bold whitespace-nowrap">
                  ${(item.quantity * item.price).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 text-right">
            <p className="text-xl">
              Total: <span className="font-bold">${order.total.toFixed(2)}</span>
            </p>
          </div>
        </div>

        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">Shipping Address</h3>
          <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
          <p>{order.shippingAddress.address}</p>
          <p>
            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
          </p>
        </div>

        <div className="text-center mt-8">
          <Link 
            to="/products" 
            className="bg-primary text-white px-6 py-3 rounded hover:bg-primary-dark"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;