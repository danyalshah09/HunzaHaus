import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUserOrders } from '../utils/api';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrderDetails = async () => {
      try {
        // Since we don't have fetchOrderDetails, we'll use getUserOrders and filter
        const orders = await getUserOrders();
        const foundOrder = orders.find(o => o._id === orderId);
        setOrder(foundOrder);
      } catch (error) {
        console.error('Failed to fetch order details', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrderDetails();
  }, [orderId]);

  if (loading) {
    return <div>Loading order details...</div>;
  }

  if (!order) {
    return (
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
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
        <h1 className="text-3xl font-bold mb-6 text-center text-green-600">
          Order Confirmed!
        </h1>

        <div className="text-center mb-6">
          <p className="text-xl">
            Thank you for your purchase, {order.shippingAddress.firstName}!
          </p>
          <p className="text-gray-600">
            Order Number: {order._id}
          </p>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          {order.items.map((item) => (
            <div 
              key={item._id} 
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-gray-600">
                  Quantity: {item.quantity} | ${item.price.toFixed(2)} each
                </p>
              </div>
              <p className="font-bold">
                ${(item.quantity * item.price).toFixed(2)}
              </p>
            </div>
          ))}

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
            {order.shippingAddress.city}, {order.shippingAddress.postalCode}
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