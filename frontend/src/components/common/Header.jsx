import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-primary text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          Dry Fruits Store
        </Link>
        <nav className="space-x-4">
          <Link to="/products" className="text-white hover:text-gray-200">Products</Link>
          {user ? (
            <>
              <Link to="/account" className="text-white hover:text-gray-200">My Account</Link>
              <button 
                onClick={logout} 
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="bg-white text-primary px-4 py-2 rounded hover:bg-gray-100"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;