// import { useState, useEffect } from 'react';
// import { getCurrentUser } from '../utils/api';

// export const useAuth = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (token) {
//           const userData = await getCurrentUser();
//           setUser(userData);
//         }
//       } catch (error) {
//         localStorage.removeItem('token');
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   const login = async (credentials) => {
//     // Implement login logic
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   return { user, login, logout, loading };
// };