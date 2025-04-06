// // Token management
// export const getToken = () => {
//     return localStorage.getItem('userToken');
//   };
  
//   export const setToken = (token) => {
//     localStorage.setItem('userToken', token);
//   };
  
//   export const removeToken = () => {
//     localStorage.removeItem('userToken');
//   };
  
//   // Date formatting
//   export const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
    
//     try {
//       const date = new Date(dateString);
//       return new Intl.DateTimeFormat('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       }).format(date);
//     } catch (error) {
//       console.error('Date formatting error:', error);
//       return dateString;
//     }
//   };
  
//   // Price formatting
//   export const formatPrice = (price) => {
//     if (price == null) return 'N/A';
    
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD'
//     }).format(price);
//   };
  
//   // Validation helpers
//   export const validateEmail = (email) => {
//     const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     return re.test(String(email).toLowerCase());
//   };
  
//   export const validatePassword = (password) => {
//     // At least 8 characters, one uppercase, one lowercase, one number
//     const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
//     return re.test(password);
//   };
  
//   // Storage helpers
//   export const saveToLocalStorage = (key, value) => {
//     try {
//       localStorage.setItem(key, JSON.stringify(value));
//     } catch (error) {
//       console.error('Error saving to localStorage', error);
//     }
//   };
  
//   export const getFromLocalStorage = (key) => {
//     try {
//       const item = localStorage.getItem(key);
//       return item ? JSON.parse(item) : null;
//     } catch (error) {
//       console.error('Error reading from localStorage', error);
//       return null;
//     }
//   };