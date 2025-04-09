import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get order from localStorage
    const savedOrder = localStorage.getItem('lastOrder');
    if (savedOrder) {
      const parsedOrder = JSON.parse(savedOrder);
      if (parsedOrder._id === orderId) {
        setOrder(parsedOrder);
      } else {
        setError('Order not found. Please check your order ID.');
      }
    } else {
      setError('No order found. Please try again.');
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-lg">Loading order details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
        <p className="mb-6">{error}</p>
        <Link 
          to="/products" 
          className="bg-primary text-white px-6 py-3 rounded hover:bg-primary-dark"
        >
          Continue Shopping
        </Link>
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
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="ml-4 flex-grow">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-xl font-bold">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
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