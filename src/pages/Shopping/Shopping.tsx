// import React, { useState } from "react";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import wh1 from "../../assets/wheelchair1.png";
// import wh2 from "../../assets/wheelchair2.png";
// import wh3 from "../../assets/wheelchair3.png";
// import { ShoppingCart, Heart } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { useFavourites } from "./FavouritesContext";
// import { useCart } from "./CartContext";

// // Example product data
// const categories = [
//   "الأطراف الصناعية",
//   "الكراسي المتحركة",
//   "السماعات",
//   "مساعدات الحركة",
// ];

// const products = [
//   {
//     id: 1,
//     name: "كرسي كهربائي - خفيف الوزن يظهر متحرك",
//     price: 25000,
//     image: wh3,
//     fav: true,
//     category: "الكراسي المتحركة",
//   },
//   {
//     id: 2,
//     name: "كرسي متحرك - شديد التحمل 40 سم",
//     price: 10000,
//     image: wh2,
//     fav: false,
//     category: "الكراسي المتحركة",
//   },
//   {
//     id: 3,
//     name: "كرسي متحرك كهربائي - شديد التحمل 45 سم",
//     price: 15000,
//     image: wh1,
//     fav: false,
//     category: "الكراسي المتحركة",
//   },
//   {
//     id: 4,
//     name: "كرسي متحرك كهربائي - شديد التحمل 45 سم",
//     price: 15000,
//     image: wh3,
//     fav: true,
//     category: "الكراسي المتحركة",
//   },
//   {
//     id: 5,
//     name: "كرسي كهربائي - خفيف الوزن يظهر متحرك",
//     price: 25000,
//     image: wh2,
//     fav: true,
//     category: "الكراسي المتحركة",
//   },
//   {
//     id: 6,
//     name: "كرسي متحرك - شديد التحمل 40 سم",
//     price: 10000,
//     image: wh1,
//     fav: false,
//     category: "الكراسي المتحركة",
//   },
// ];

// const Shopping: React.FC = () => {
//   const [selectedCategory, setSelectedCategory] = useState("الكراسي المتحركة");
//   const [page, setPage] = useState(1);
//   const [showToast, setShowToast] = useState(false);
//   const { toggleFavourite, isFavourite } = useFavourites();
//   const { addToCart } = useCart();
//   const navigate = useNavigate();

//   const handleAddToCart = (product: any) => {
//     addToCart(
//       {
//         id: product.id.toString(),
//         name: product.name,
//         price: product.price,
//         image: product.image,
//       },
//       1
//     );
//     setShowToast(true);
//     setTimeout(() => setShowToast(false), 2000);
//   };

//   // Filter products by selected category
//   const filteredProducts = products.filter(
//     (p) => p.category === selectedCategory
//   );

//   return (
//     <div className="flex flex-col min-h-screen bg-white">
//       <Navbar />
//       {/* Toast Notification */}
//       <div
//         className={`fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg transition-opacity duration-300 z-50 ${
//           showToast ? "opacity-100" : "opacity-0 pointer-events-none"
//         }`}
//       >
//         تم الاضافة الى العربة
//       </div>
//       <div className="container mx-auto px-4 py-8 flex-1">
//         {/* Category Filters */}
//         <div className="flex flex-wrap gap-4 justify-center mb-8">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               className={`px-6 py-2 rounded-lg border font-bold text-base transition-colors ${
//                 selectedCategory === cat
//                   ? "bg-blue-600 text-white border-blue-600"
//                   : "bg-white text-blue-700 border-blue-600 hover:bg-blue-50"
//               }`}
//               onClick={() => setSelectedCategory(cat)}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>
//         {/* Product Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
//           {filteredProducts.map((product) => (
//             <div
//               key={product.id}
//               className="bg-white rounded-xl shadow p-4 flex flex-col items-center relative"
//             >
//               {/* Favorite Heart */}
//               <button
//                 className="absolute top-4 left-4 text-red-500 bg-white rounded-full p-1 shadow-md"
//                 onClick={() => {
//                   toggleFavourite({
//                     id: product.id,
//                     name: product.name,
//                     price: product.price,
//                     image: product.image,
//                   });
//                 }}
//               >
//                 <Heart
//                   fill={isFavourite(product.id) ? "red" : "none"}
//                   color={isFavourite(product.id) ? "red" : "#e5e7eb"}
//                   size={24}
//                 />
//               </button>
//               {/* Product Card Link */}
//               <Link
//                 to={`/ProductDetails/${product.id}`}
//                 className="w-full flex flex-col items-center group"
//                 style={{ textDecoration: "none" }}
//               >
//                 {/* Product Image */}
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-40 h-40 object-contain mb-4 group-hover:scale-105 transition-transform"
//                 />
//                 {/* Product Name */}
//                 <div className="text-right w-full font-bold text-base mb-2 text-blue-700 group-hover:underline">
//                   {product.name}
//                 </div>
//                 {/* Product Price */}
//                 <div className="text-right w-full text-gray-500 text-sm mb-4">{`ج.م${product.price}`}</div>
//               </Link>
//               {/* Add to Cart Button */}
//               <button
//                 onClick={() => handleAddToCart(product)}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 mt-auto"
//               >
//                 <ShoppingCart size={20} />
//                 أضف إلى عربة التسوق
//               </button>
//             </div>
//           ))}
//         </div>
//         {/* Pagination */}
//         <div className="flex justify-center items-center gap-2 mt-4">
//           {[1, 2, 3, 4].map((num) => (
//             <button
//               key={num}
//               className={`w-8 h-8 rounded border text-blue-600 font-bold ${
//                 page === num
//                   ? "bg-blue-600 text-white"
//                   : "bg-white border-blue-600 hover:bg-blue-50"
//               }`}
//               onClick={() => setPage(num)}
//             >
//               {num}
//             </button>
//           ))}
//           <span className="text-gray-500 text-sm ml-2">عرض 6-24 منتج</span>
//         </div>
//       </div>
//       {/* Floating Cart Button */}
//       <a
//         href="/Cart"
//         className="fixed bottom-6 left-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-4 flex items-center gap-2 transition-all"
//         style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.12)" }}
//         title="عربة التسوق"
//       >
//         <ShoppingCart size={28} />
//         <span className="font-bold text-lg">عربة التسوق</span>
//       </a>
//       <Footer />
//     </div>
//   );
// };

// export default Shopping;
  
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useCart } from './CartContext';
// import { useFavourites } from './FavouritesContext';

// interface Product {
//   _id: string;
//   title: string;
//   slug: string;
//   userId: string;
//   categoryId: string;
//   images: Array<{ secure_url: string; public_id: string }>;
//   customid: string;
//   price: number;
//   discount: number;
//   priceAfterDiscount: number;
//   stock: number;
//   avgRate: number;
//   rateNum: number;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

// interface ApiResponse {
//   msg: string;
//   page: number;
//   products: Product[];
// }

// const Shopping: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   const { addToCart } = useCart();
//   const {
//     addProductToFavourites,
//     isProductFavourite,
//     removeProductFromFavourites,
//   } = useFavourites();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get<ApiResponse>(
//           'https://dalail-project-daoud.vercel.app/api/v1/product/all'
//         );

//         if (res.data && res.data.products) {
//           setProducts(res.data.products);
//         } else {
//           console.warn('⚠️ Unexpected response format:', res.data);
//           setProducts([]);
//         }
//       } catch (error) {
//         console.error('حدث خطأ أثناء جلب المنتجات:', error);
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleFavouriteToggle = async (product: Product) => {
//     const isFav = isProductFavourite(product._id);
//     if (isFav) {
//       await removeProductFromFavourites(product._id);
//     } else {
//       await addProductToFavourites(product._id);
//     }
//   };

//   if (loading) return <p className="text-center">جاري تحميل المنتجات...</p>;

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4 text-center">المنتجات</h2>
//       <div className="row">
//         {products.length > 0 ? (
//           products.map((product) => (
//             <div key={product._id} className="col-md-4 mb-4">
//               <div className="card h-100 shadow-sm">
//                 <img
//                   src={product.images?.[0]?.secure_url || '/placeholder-image.jpg'}
//                   className="card-img-top"
//                   alt={product.title}
//                   style={{ objectFit: 'cover', height: '250px' }}
//                 />
//                 <div className="card-body d-flex flex-column">
//                   <h5 className="card-title">{product.title}</h5>
//                   <div className="price-section">
//                     {product.discount && product.discount > 0 ? (
//                       <>
//                         <p className="card-text text-muted text-decoration-line-through">
//                           {product.price} ج.م
//                         </p>
//                         <p className="card-text text-success fw-bold">
//                           {product.priceAfterDiscount} ج.م
//                           <span className="badge bg-danger ms-2">خصم {product.discount}%</span>
//                         </p>
//                       </>
//                     ) : (
//                       <p className="card-text fw-bold">{product.price} ج.م</p>
//                     )}
//                   </div>
//                   <p className="card-text small text-muted">
//                     المتوفر: {product.stock} قطعة
//                   </p>
//                   <div className="mt-auto">
//                     <button
//                       className="btn btn-success me-2"
//                       onClick={() => addToCart(product._id, 1)}
//                       disabled={product.stock === 0}
//                     >
//                       {product.stock === 0 ? 'غير متوفر' : 'أضف إلى السلة'}
//                     </button>
//                     <button
//                       className={`btn btn-outline-${isProductFavourite(product._id) ? 'secondary' : 'danger'} me-2`}
//                       onClick={() => handleFavouriteToggle(product)}
//                     >
//                       {isProductFavourite(product._id) ? '❤️ تمت الإضافة' : '🤍 أضف للمفضلة'}
//                     </button>
//                     <Link to={`/product/${product._id}`} className="btn btn-sm btn-primary">
//                       عرض التفاصيل
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center">لا توجد منتجات متاحة حالياً.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// // export default Shopping;  
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import { ShoppingCart, Heart } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { useFavourites } from "./FavouritesContext";
// import { useCart } from "./CartContext";

// // Product interface
// interface Product {
//   _id: string;
//   title: string;
//   slug: string;
//   userId: string;
//   categoryId: string;
//   images: Array<{ secure_url: string; public_id: string }>;
//   customid: string;
//   price: number;
//   discount: number;
//   priceAfterDiscount: number;
//   stock: number;
//   avgRate: number;
//   rateNum: number;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

// interface ApiResponse {
//   msg: string;
//   page: number;
//   products: Product[];
// }

// // Categories mapping
// const categories = [
//   { id: "all", name: "جميع المنتجات" },
//   { id: "prosthetics", name: "الأطراف الصناعية" },
//   { id: "wheelchairs", name: "الكراسي المتحركة" },
//   { id: "hearing_aids", name: "السماعات" },
//   { id: "mobility_aids", name: "مساعدات الحركة" },
// ];

// const Shopping: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [page, setPage] = useState(1);
//   const [showToast, setShowToast] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const { addToCart } = useCart();
//   const {
//     addProductToFavourites,
//     isProductFavourite,
//     removeProductFromFavourites,
//   } = useFavourites();
//   const navigate = useNavigate();

//   // Fetch products from API
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await axios.get<ApiResponse>(
//           'https://dalail-project-daoud.vercel.app/api/v1/product/all'
//         );

//         if (response.data && response.data.products) {
//           setProducts(response.data.products);
//           setFilteredProducts(response.data.products);
//         } else {
//           console.warn('⚠️ Unexpected response format:', response.data);
//           setProducts([]);
//           setFilteredProducts([]);
//         }
//       } catch (error) {
//         console.error('حدث خطأ أثناء جلب المنتجات:', error);
//         setError('حدث خطأ أثناء تحميل المنتجات');
//         setProducts([]);
//         setFilteredProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Filter products by category
//   useEffect(() => {
//     if (selectedCategory === "all") {
//       setFilteredProducts(products);
//     } else {
//       // Here you can add logic to filter by category based on your API structure
//       // For now, I'll show all products since we don't have category mapping
//       setFilteredProducts(products);
//     }
//   }, [selectedCategory, products]);

//   // Handle add to cart
//   const handleAddToCart = async (product: Product) => {
//     try {
//       await addToCart(product._id, 1);
//       setShowToast(true);
//       setTimeout(() => setShowToast(false), 2000);
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//     }
//   };

//   // Handle favourite toggle
//   const handleFavouriteToggle = async (product: Product) => {
//     try {
//       const isFav = isProductFavourite(product._id);
//       if (isFav) {
//         await removeProductFromFavourites(product._id);
//       } else {
//         await addProductToFavourites(product._id);
//       }
//     } catch (error) {
//       console.error('Error toggling favourite:', error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col min-h-screen bg-white">
//         <Navbar />
//         <div className="flex-1 flex items-center justify-center">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
//             <p className="text-blue-600 text-lg font-bold">جاري تحميل المنتجات...</p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col min-h-screen bg-white">
//         <Navbar />
//         <div className="flex-1 flex items-center justify-center">
//           <div className="text-center">
//             <p className="text-red-600 text-lg font-bold mb-4">{error}</p>
//             <button 
//               onClick={() => window.location.reload()}
//               className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//             >
//               إعادة المحاولة
//             </button>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col min-h-screen bg-white">
//       <Navbar />
      
//       {/* Toast Notification */}
//       <div
//         className={`fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg transition-opacity duration-300 z-50 ${
//           showToast ? "opacity-100" : "opacity-0 pointer-events-none"
//         }`}
//       >
//         تم الاضافة الى العربة
//       </div>

//       <div className="container mx-auto px-4 py-8 flex-1">
//         {/* Category Filters */}
//         <div className="flex flex-wrap gap-4 justify-center mb-8">
//           {categories.map((cat) => (
//             <button
//               key={cat.id}
//               className={`px-6 py-2 rounded-lg border font-bold text-base transition-colors ${
//                 selectedCategory === cat.id
//                   ? "bg-blue-600 text-white border-blue-600"
//                   : "bg-white text-blue-700 border-blue-600 hover:bg-blue-50"
//               }`}
//               onClick={() => setSelectedCategory(cat.id)}
//             >
//               {cat.name}
//             </button>
//           ))}
//         </div>

//         {/* Product Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map((product) => (
//               <div
//                 key={product._id}
//                 className="bg-white rounded-xl shadow p-4 flex flex-col items-center relative"
//               >
//                 {/* Favorite Heart */}
//                 <button
//                   className="absolute top-4 left-4 text-red-500 bg-white rounded-full p-1 shadow-md"
//                   onClick={() => handleFavouriteToggle(product)}
//                 >
//                   <Heart
//                     fill={isProductFavourite(product._id) ? "red" : "none"}
//                     color={isProductFavourite(product._id) ? "red" : "#e5e7eb"}
//                     size={24}
//                   />
//                 </button>

//                 {/* Discount Badge */}
//                 {product.discount > 0 && (
//                   <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
//                     خصم {product.discount}%
//                   </div>
//                 )}

//                 {/* Product Card Link */}
//                 <Link
//                   to={`/product/${product._id}`}
//                   className="w-full flex flex-col items-center group"
//                   style={{ textDecoration: "none" }}
//                 >
//                   {/* Product Image */}
//                   <img
//                     src={product.images?.[0]?.secure_url || '/placeholder-image.jpg'}
//                     alt={product.title}
//                     className="w-40 h-40 object-contain mb-4 group-hover:scale-105 transition-transform"
//                     onError={(e) => {
//                       (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
//                     }}
//                   />
                  
//                   {/* Product Name */}
//                   <div className="text-right w-full font-bold text-base mb-2 text-blue-700 group-hover:underline">
//                     {product.title}
//                   </div>
                  
//                   {/* Product Price */}
//                   <div className="text-right w-full mb-4">
//                     {product.discount > 0 ? (
//                       <div>
//                         <span className="text-gray-500 text-sm line-through">{`ج.م${product.price}`}</span>
//                         <div className="text-green-600 font-bold">{`ج.م${product.priceAfterDiscount}`}</div>
//                       </div>
//                     ) : (
//                       <div className="text-gray-500 text-sm">{`ج.م${product.price}`}</div>
//                     )}
//                   </div>

//                   {/* Stock Info */}
//                   <div className="text-right w-full text-xs text-gray-400 mb-2">
//                     المتوفر: {product.stock} قطعة
//                   </div>

//                   {/* Rating */}
//                   {product.avgRate > 0 && (
//                     <div className="text-right w-full text-xs text-yellow-500 mb-2">
//                       ⭐ {product.avgRate.toFixed(1)} ({product.rateNum} تقييم)
//                     </div>
//                   )}
//                 </Link>

//                 {/* Add to Cart Button */}
//                 <button
//                   onClick={() => handleAddToCart(product)}
//                   disabled={product.stock === 0}
//                   className={`w-full font-bold py-2 rounded-lg flex items-center justify-center gap-2 mt-auto transition-colors ${
//                     product.stock === 0
//                       ? "bg-gray-400 text-white cursor-not-allowed"
//                       : "bg-blue-600 hover:bg-blue-700 text-white"
//                   }`}
//                 >
//                   <ShoppingCart size={20} />
//                   {product.stock === 0 ? "غير متوفر" : "أضف إلى عربة التسوق"}
//                 </button>
//               </div>
//             ))
//           ) : (
//             <div className="col-span-full text-center py-8">
//               <p className="text-gray-500 text-lg">لا توجد منتجات متاحة حالياً</p>
//             </div>
//           )}
//         </div>

//         {/* Pagination */}
//         {filteredProducts.length > 0 && (
//           <div className="flex justify-center items-center gap-2 mt-4">
//             {[1, 2, 3, 4].map((num) => (
//               <button
//                 key={num}
//                 className={`w-8 h-8 rounded border text-blue-600 font-bold transition-colors ${
//                   page === num
//                     ? "bg-blue-600 text-white"
//                     : "bg-white border-blue-600 hover:bg-blue-50"
//                 }`}
//                 onClick={() => setPage(num)}
//               >
//                 {num}
//               </button>
//             ))}
//             <span className="text-gray-500 text-sm ml-2">
//               عرض {filteredProducts.length} منتج
//             </span>
//           </div>
//         )}
//       </div>

//       {/* Floating Cart Button */}
//       <Link
//         to="/Cart"
//         className="fixed bottom-6 left-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-4 flex items-center gap-2 transition-all"
//         style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.12)" }}
//         title="عربة التسوق"
//       >
//         <ShoppingCart size={28} />
//         <span className="font-bold text-lg">عربة التسوق</span>
//       </Link>

//       <Footer />
//     </div>
//   );
// };

// export default Shopping;

 import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ShoppingCart, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useFavourites } from "./FavouritesContext";
import { useCart } from "./CartContext";

// Product interface to match API response
interface Product {
  _id: string;
  title: string;
  slug: string;
  userId: string;
  categoryId: string;
  images: Array<{ secure_url: string; public_id: string }>;
  customid: string;
  price: number;
  discount: number;
  priceAfterDiscount: number;
  stock: number;
  avgRate: number;
  rateNum: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  msg: string;
  page: number;
  products: Product[];
}

// Categories array - using same structure as original commented code
const categories = [
  "جميع المنتجات",
  "الأطراف الصناعية", 
  "الكراسي المتحركة",
  "السماعات",
  "مساعدات الحركة",
];

const Shopping: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("جميع المنتجات");
  const [page, setPage] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use the context hooks exactly as in the original commented code
  const { addToCart } = useCart();
  const {
    addProductToFavourites,
    isProductFavourite, 
    removeProductFromFavourites,
  } = useFavourites();
  const navigate = useNavigate();

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get<ApiResponse>(
          'https://dalail-project-daoud.vercel.app/api/v1/product/all'
        );

        if (res.data && res.data.products) {
          setProducts(res.data.products);
        } else {
          console.warn('⚠️ Unexpected response format:', res.data);
          setProducts([]);
        }
      } catch (error) {
        console.error('حدث خطأ أثناء جلب المنتجات:', error);
        setError('حدث خطأ أثناء تحميل المنتجات');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle add to cart - matching original function signature but with API product
  const handleAddToCart = async (product: Product) => {
    try {
      // Convert API product to cart format
      await addToCart(product._id, 1);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Handle favourite toggle - using API functions
  const handleFavouriteToggle = async (product: Product) => {
    try {
      const isFav = isProductFavourite(product._id);
      if (isFav) {
        await removeProductFromFavourites(product._id);
      } else {
        await addProductToFavourites(product._id);
      }
    } catch (error) {
      console.error('Error toggling favourite:', error);
    }
  };

  // Filter products by selected category - enhanced filtering logic
  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "جميع المنتجات") {
      return true;
    }
    // You can enhance this filtering based on your API's category structure
    // For now, it shows all products when a category is selected
    // You might want to add category mapping based on categoryId or product title
    return true;
  });

  // Loading state with same styling as original
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-blue-600 text-lg font-bold">جاري تحميل المنتجات...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 text-lg font-bold mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              إعادة المحاولة
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      {/* Toast Notification - exactly as in original */}
      <div
        className={`fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg transition-opacity duration-300 z-50 ${
          showToast ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        تم الاضافة الى العربة
      </div>

      <div className="container mx-auto px-4 py-8 flex-1">
        {/* Category Filters - exactly as in original */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-6 py-2 rounded-lg border font-bold text-base transition-colors ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-blue-700 border-blue-600 hover:bg-blue-50"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid - using original layout with API data */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow p-4 flex flex-col items-center relative"
              >
                {/* Favorite Heart - using API functions */}
                <button
                  className="absolute top-4 left-4 text-red-500 bg-white rounded-full p-1 shadow-md"
                  onClick={() => handleFavouriteToggle(product)}
                >
                  <Heart
                    fill={isProductFavourite(product._id) ? "red" : "none"}
                    color={isProductFavourite(product._id) ? "red" : "#e5e7eb"}
                    size={24}
                  />
                </button>

                {/* Discount Badge */}
                {product.discount > 0 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                    خصم {product.discount}%
                  </div>
                )}

                {/* Product Card Link - matching original route structure */}
                <Link
                  to={`/product/${product._id}`}
                  className="w-full flex flex-col items-center group"
                  style={{ textDecoration: "none" }}
                >
                  {/* Product Image - using API image with fallback */}
                  <img
                    src={product.images?.[0]?.secure_url || '/placeholder-image.jpg'}
                    alt={product.title}
                    className="w-40 h-40 object-contain mb-4 group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                    }}
                  />
                  
                  {/* Product Name - using API title */}
                  <div className="text-right w-full font-bold text-base mb-2 text-blue-700 group-hover:underline">
                    {product.title}
                  </div>
                  
                  {/* Product Price - enhanced with discount logic */}
                  <div className="text-right w-full mb-4">
                    {product.discount > 0 ? (
                      <>
                        <div className="text-gray-500 text-sm line-through">{`ج.م${product.price}`}</div>
                        <div className="text-green-600 font-bold">{`ج.م${product.priceAfterDiscount}`}</div>
                      </>
                    ) : (
                      <div className="text-gray-500 text-sm">{`ج.م${product.price}`}</div>
                    )}
                  </div>

                  {/* Stock and Rating Info */}
                  <div className="text-right w-full text-xs text-gray-400 mb-2">
                    المتوفر: {product.stock} قطعة
                  </div>
                  {product.avgRate > 0 && (
                    <div className="text-right w-full text-xs text-yellow-500 mb-2">
                      ⭐ {product.avgRate.toFixed(1)} ({product.rateNum} تقييم)
                    </div>
                  )}
                </Link>

                {/* Add to Cart Button - exactly as original but with stock check */}
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                  className={`w-full font-bold py-2 rounded-lg flex items-center justify-center gap-2 mt-auto transition-colors ${
                    product.stock === 0
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  <ShoppingCart size={20} />
                  {product.stock === 0 ? "غير متوفر" : "أضف إلى عربة التسوق"}
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500 text-lg">لا توجد منتجات متاحة حالياً</p>
            </div>
          )}
        </div>

        {/* Pagination - exactly as original but with dynamic count */}
        <div className="flex justify-center items-center gap-2 mt-4">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              className={`w-8 h-8 rounded border text-blue-600 font-bold ${
                page === num
                  ? "bg-blue-600 text-white"
                  : "bg-white border-blue-600 hover:bg-blue-50"
              }`}
              onClick={() => setPage(num)}
            >
              {num}
            </button>
          ))}
          <span className="text-gray-500 text-sm ml-2">
            عرض {filteredProducts.length} منتج
          </span>
        </div>
      </div>

      {/* Floating Cart Button - exactly as original */}
      <Link
        to="/Cart"
        className="fixed bottom-6 left-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-4 flex items-center gap-2 transition-all"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.12)" }}
        title="عربة التسوق"
      >
        <ShoppingCart size={28} />
        <span className="font-bold text-lg">عربة التسوق</span>
      </Link>

      <Footer />
    </div>
  );
};

export default Shopping;