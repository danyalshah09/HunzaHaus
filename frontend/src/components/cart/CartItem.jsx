import React from 'react';
import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center space-x-4">
        <img 
          src={item.imageUrl} 
          alt={item.name} 
          className="w-20 h-20 object-cover rounded"
        />
        <div>
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-gray-600">${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <input 
          type="number" 
          min="1" 
          value={item.quantity} 
          onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
          className="w-20 border rounded px-2 py-1"
        />
        <span className="font-bold">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
        <button 
          onClick={() => removeFromCart(item._id)}
          className="text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;