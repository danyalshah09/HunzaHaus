import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserOrders } from '../utils/api';
import { Link } from 'react-router-dom';

// Sample orders for mock mode
const sampleOrders = [
  {
    _id: 'sample-45fd2c',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    totalAmount: 57.97,
    status: 'Delivered',
    items: [
      { name: 'Premium Dried Apricots', quantity: 2, price: 15.99 },
      { name: 'Traditional Hunzai Embroidery Scarf', quantity: 1, price: 25.99 }
    ]
  },
  {
    _id: 'sample-98h3df',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
    totalAmount: 37.97,
    status: 'Delivered',
    items: [
      { name: 'Hunza Walnuts', quantity: 1, price: 12.99 },
      { name: 'Homemade Apple Jam', quantity: 2, price: 8.99 },
      { name: 'Dried Mulberries', quantity: 1, price: 7.00 }
    ]
  }
];

const AccountPage = () => {
  const { user, logout, mockMode } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (mockMode) {
          // Use sample orders in mock mode
          setOrders(sampleOrders);
          setLoading(false);
          return;
        }
        
        try {
          const ordersData = await getUserOrders();
          setOrders(ordersData);
        } catch (apiError) {
          console.error('Failed to fetch orders from API, using sample data', apiError);
          setOrders(sampleOrders);
          setError('Unable to connect to the orders API. Showing sample orders.');
        }
      } catch (err) {
        setError('Failed to load your orders. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [mockMode]);
  
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Account</h1>
        <button 
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      
      {mockMode && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-6">
          You are using the demo mode. Your data is stored locally and will be lost when you log out.
        </div>
      )}
      
      {error && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Account Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500">Name</p>
            <p className="font-medium">{user?.name}</p>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium">{user?.email}</p>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Order History</h2>
        
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            <p className="ml-3">Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-gray-100 p-8 text-center rounded">
            <p className="text-lg mb-4">You haven't placed any orders yet.</p>
            <Link to="/products" className="inline-block bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-primary">
                        {order._id.substring(0, 8)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${order.totalAmount.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link 
                        to={`/order-confirmation/${order._id}`}
                        className="text-primary hover:text-primary-dark"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage; 