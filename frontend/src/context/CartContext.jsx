import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Initialize cart from local storage
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Update local storage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(currentCart => {
      // Check if product already exists in cart
      const existingProduct = currentCart.find(item => item._id === product._id);
      
      if (existingProduct) {
        // If product exists, increase quantity
        return currentCart.map(item => 
          item._id === product._id 
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      
      // If product doesn't exist, add new product
      return [...currentCart, { ...product, quantity: product.quantity || 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(currentCart => 
      currentCart.filter(item => item._id !== productId)
    );
  };

  const updateQuantity = (productId, quantity) => {
    setCart(currentCart => 
      currentCart.map(item => 
        item._id === productId 
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculate total
  const total = cart.reduce((sum, item) => 
    sum + (item.price * item.quantity), 0
  );

  const cartCount = cart.reduce((count, item) => 
    count + item.quantity, 0
  );

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      total,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState(() => {
//     // Initialize cart from local storage
//     const savedCart = localStorage.getItem('cart');
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   // Update local storage whenever cart changes
//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);

//   const addToCart = (product) => {
//     setCart(currentCart => {
//       // Check if product already exists in cart
//       const existingProduct = currentCart.find(item => item._id === product._id);
      
//       if (existingProduct) {
//         // If product exists, increase quantity
//         return currentCart.map(item => 
//           item._id === product._id 
//             ? { ...item, quantity: item.quantity + (product.quantity || 1) }
//             : item
//         );
//       }
      
//       // If product doesn't exist, add new product
//       return [...currentCart, { ...product, quantity: product.quantity || 1 }];
//     });
//   };

//   const removeFromCart = (productId) => {
//     setCart(currentCart => 
//       currentCart.filter(item => item._id !== productId)
//     );
//   };

//   const updateQuantity = (productId, quantity) => {
//     setCart(currentCart => 
//       currentCart.map(item => 
//         item._id === productId 
//           ? { ...item, quantity: Math.max(1, quantity) }
//           : item
//       )
//     );
//   };

//   const clearCart = () => {
//     setCart([]);
//   };

//   // Calculate total
//   const total = cart.reduce((sum, item) => 
//     sum + (item.price * item.quantity), 0
//   );

//   const cartCount = cart.reduce((count, item) => 
//     count + item.quantity, 0
//   );

//   return (
//     <CartContext.Provider value={{ 
//       cart, 
//       addToCart, 
//       removeFromCart, 
//       updateQuantity, 
//       clearCart,
//       total,
//       cartCount
//     }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };