// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import ProductList from '../components/products/ProductList';

// const ProductsPage = () => {
//   const { category } = useParams();
//   const [sortBy, setSortBy] = useState('default');
//   const [priceFilter, setPriceFilter] = useState({ min: 0, max: 1000 });

//   const sortOptions = [
//     { value: 'default', label: 'Default Sorting' },
//     { value: 'price-low', label: 'Price: Low to High' },
//     { value: 'price-high', label: 'Price: High to Low' },
//     { value: 'newest', label: 'Newest Arrivals' }
//   ];

//   return (
//     <div className="container mx-auto px-4">
//       <h1 className="text-3xl font-bold mb-6">
//         {category ? `${category} Products` : 'All Products'}
//       </h1>

//       {/* Filters and Sorting */}
//       <div className="flex justify-between mb-6">
//         <div className="flex items-center space-x-4">
//           <select 
//             value={sortBy} 
//             onChange={(e) => setSortBy(e.target.value)}
//             className="border rounded px-3 py-2"
//           >
//             {sortOptions.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>

//           <div className="flex items-center space-x-2">
//             <label>Price Range:</label>
//             <input 
//               type="number" 
//               placeholder="Min" 
//               value={priceFilter.min}
//               onChange={(e) => setPriceFilter(prev => ({ 
//                 ...prev, 
//                 min: Number(e.target.value) 
//               }))}
//               className="w-24 border rounded px-2 py-1"
//             />
//             <span>-</span>
//             <input 
//               type="number" 
//               placeholder="Max" 
//               value={priceFilter.max}
//               onChange={(e) => setPriceFilter(prev => ({ 
//                 ...prev, 
//                 max: Number(e.target.value) 
//               }))}
//               className="w-24 border rounded px-2 py-1"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Product List */}
//       <ProductList 
//         category={category} 
//         sortBy={sortBy}
//         priceFilter={priceFilter}
//       />
//     </div>
//   );
// };

// export default ProductsPage;