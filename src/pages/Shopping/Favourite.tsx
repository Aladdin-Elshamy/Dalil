// import React from "react";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import { Heart, ShoppingCart } from "lucide-react";
// import { useFavourites } from "./FavouritesContext";

// import wh1 from "../../assets/wheelchair1.png";
// import wh2 from "../../assets/wheelchair2.png";
// import wh3 from "../../assets/wheelchair3.png";

// const Favourite: React.FC = () => {
//   const { favourites, toggleFavourite, clearFavourites } = useFavourites();

//   return (
//     <div className="flex flex-col min-h-screen bg-white">
//       <Navbar />
//       <div className="container mx-auto px-4 py-8 flex-1">
//         {/* Breadcrumb and Title */}
//         <div className="flex items-center gap-2 text-gray-500 text-base mb-4 justify-end">
//           <span className="text-blue-700 font-bold">المفضلة</span>
//           <span className="mx-2">&lt;</span>
//           <span>المنتجات</span>
//         </div>
//         {/* Remove All Button */}
//         <div className="flex justify-end mb-6">
//           <button
//             className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg font-bold text-base hover:bg-red-200 transition"
//             onClick={clearFavourites}
//             disabled={favourites.length === 0}
//           >
//             <span className="text-lg">إزالة الكل من المفضلة</span>
//             <span className="text-red-500">
//               {" "}
//               <Heart fill="red" color="red" size={20} />{" "}
//             </span>
//           </button>
//         </div>
//         {/* Favourite Products Grid */}
//         {favourites.length === 0 ? (
//           <div className="text-center text-gray-400 py-16 font-bold text-xl">
//             لا توجد منتجات في المفضلة
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
//             {favourites.map((product) => (
//               <div
//                 key={product.id}
//                 className="bg-white rounded-xl shadow p-4 flex flex-col items-center relative"
//               >
//                 {/* Favorite Heart */}
//                 <button
//                   className="absolute top-4 left-4 text-red-500 bg-white rounded-full p-1 shadow-md cursor-pointer"
//                   onClick={() => toggleFavourite(product)}
//                 >
//                   <Heart fill={"red"} color={"red"} size={24} />
//                 </button>
//                 {/* Product Image */}
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-40 h-40 object-contain mb-4"
//                 />
//                 {/* Product Name */}
//                 <div className="text-right w-full font-bold text-base mb-2 text-blue-700">
//                   {product.name}
//                 </div>
//                 {/* Product Price */}
//                 <div className="text-right w-full text-gray-500 text-sm mb-4">{`ج.م${product.price}`}</div>
//                 {/* Add to Cart Button */}
//                 <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 mt-auto">
//                   <ShoppingCart size={20} />
//                   أضف إلى عربة التسوق
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Favourite;
// src/pages/User/Favourite.tsx
// import React from 'react';
// import { useFavourites } from './FavouritesContext';
// import Navbar from '../../components/Navbar';
// import { Link } from 'react-router-dom';

// const Favourite: React.FC = () => {
//   const {
//     favouriteProducts,
//     favouriteLocations,
//     removeProductFromFavourites,
//     removeLocationFromFavourites,
//     loading,
//   } = useFavourites();

//   return (
//     <>
//       <Navbar />
//       <div className="container mt-5">
//         <h2 className="mb-4 text-center">المفضلة</h2>

//         {loading ? (
//           <p className="text-center">جاري تحميل المفضلة...</p>
//         ) : (
//           <>
//             {/* المنتجات المفضلة */}
//             <div className="mb-5">
//               <h4 className="mb-3">المنتجات المفضلة</h4>
//               {favouriteProducts.length === 0 ? (
//                 <p>لا توجد منتجات مفضلة.</p>
//               ) : (
//                 <div className="row">
//                   {favouriteProducts.map((product) => (
//                     <div key={product._id} className="col-md-4 mb-4">
//                       <div className="card h-100 shadow-sm">
//                         <img
//                           src={product.images?.[0]?.secure_url || '/placeholder-image.jpg'}
//                           className="card-img-top"
//                           alt={product.title}
//                           style={{ height: '250px', objectFit: 'cover' }}
//                         />
//                         <div className="card-body d-flex flex-column">
//                           <h5 className="card-title">{product.title}</h5>
//                           <div className="price-section mb-2">
//                             {product.discount > 0 ? (
//                               <>
//                                 <p className="text-muted text-decoration-line-through">
//                                   {product.price} ج.م
//                                 </p>
//                                 <p className="text-success fw-bold">
//                                   {product.priceAfterDiscount} ج.م
//                                 </p>
//                               </>
//                             ) : (
//                               <p className="fw-bold">{product.price} ج.م</p>
//                             )}
//                           </div>
//                           <p className="text-muted small">
//                             المتوفر: {product.stock} قطعة
//                           </p>
//                           <div className="mt-auto">
//                             <button
//                               className="btn btn-outline-danger btn-sm me-2"
//                               onClick={() => removeProductFromFavourites(product._id)}
//                             >
//                               حذف من المفضلة
//                             </button>
//                             <Link
//                               to={`/product/${product._id}`}
//                               className="btn btn-sm btn-primary"
//                             >
//                               تفاصيل
//                             </Link>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* المواقع المفضلة */}
//             <div>
//               <h4 className="mb-3">المواقع المفضلة</h4>
//               {favouriteLocations.length === 0 ? (
//                 <p>لا توجد مواقع مفضلة.</p>
//               ) : (
//                 <div className="row">
//                   {favouriteLocations.map((location) => (
//                     <div key={location._id} className="col-md-4 mb-4">
//                       <div className="card h-100 shadow-sm">
//                         <img
//                           src={location.images?.[0]?.secure_url || '/placeholder-image.jpg'}
//                           className="card-img-top"
//                           alt={location.title}
//                           style={{ height: '250px', objectFit: 'cover' }}
//                         />
//                         <div className="card-body d-flex flex-column">
//                           <h5 className="card-title">{location.title}</h5>
//                           <p className="text-muted small">{location.description}</p>
//                           <div className="mt-auto">
//                             <button
//                               className="btn btn-outline-danger btn-sm"
//                               onClick={() => removeLocationFromFavourites(location._id)}
//                             >
//                               حذف من المفضلة
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default Favourite;

import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Heart, ShoppingCart } from "lucide-react";
import { useFavourites } from "./FavouritesContext";
import { Link } from "react-router-dom";

const Favourite: React.FC = () => {
  const {
    favouriteProducts,
    favouriteLocations,
    removeProductFromFavourites,
    removeLocationFromFavourites,
    loading,
  } = useFavourites();

  const clearAllFavourites = async () => {
    // حذف جميع المنتجات
    for (const product of favouriteProducts) {
      await removeProductFromFavourites(product._id);
    }
    // حذف جميع المواقع
    for (const location of favouriteLocations) {
      await removeLocationFromFavourites(location._id);
    }
  };

  const totalFavourites = favouriteProducts.length + favouriteLocations.length;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        {/* Breadcrumb and Title */}
        <div className="flex items-center gap-2 text-gray-500 text-base mb-4 justify-end">
          <span className="text-blue-700 font-bold">المفضلة</span>
          <span className="mx-2">&lt;</span>
          <span>المنتجات</span>
        </div>

        {loading ? (
          <div className="text-center text-gray-400 py-16 font-bold text-xl">
            جاري تحميل المفضلة...
          </div>
        ) : (
          <>
            {/* Remove All Button */}
            <div className="flex justify-end mb-6">
              <button
                className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg font-bold text-base hover:bg-red-200 transition"
                onClick={clearAllFavourites}
                disabled={totalFavourites === 0}
              >
                <span className="text-lg">إزالة الكل من المفضلة</span>
                <span className="text-red-500">
                  <Heart fill="red" color="red" size={20} />
                </span>
              </button>
            </div>

            {/* Check if no favourites */}
            {totalFavourites === 0 ? (
              <div className="text-center text-gray-400 py-16 font-bold text-xl">
                لا توجد منتجات في المفضلة
              </div>
            ) : (
              <>
                {/* المنتجات المفضلة */}
                {favouriteProducts.length > 0 && (
                  <div className="mb-12">
                    <h3 className="text-right text-blue-700 font-bold text-xl mb-6">
                      المنتجات المفضلة
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                      {favouriteProducts.map((product) => (
                        <div
                          key={product._id}
                          className="bg-white rounded-xl shadow p-4 flex flex-col items-center relative"
                        >
                          {/* Favorite Heart */}
                          <button
                            className="absolute top-4 left-4 text-red-500 bg-white rounded-full p-1 shadow-md cursor-pointer"
                            onClick={() => removeProductFromFavourites(product._id)}
                          >
                            <Heart fill={"red"} color={"red"} size={24} />
                          </button>

                          {/* Product Image */}
                          <img
                            src={product.images?.[0]?.secure_url || '/placeholder-image.jpg'}
                            alt={product.title}
                            className="w-40 h-40 object-contain mb-4"
                          />

                          {/* Product Name */}
                          <div className="text-right w-full font-bold text-base mb-2 text-blue-700">
                            {product.title}
                          </div>

                          {/* Product Price */}
                          <div className="text-right w-full text-gray-500 text-sm mb-2">
                            {product.discount > 0 ? (
                              <div>
                                <span className="text-gray-400 line-through">
                                  ج.م{product.price}
                                </span>
                                <span className="text-green-600 font-bold mr-2">
                                  ج.م{product.priceAfterDiscount}
                                </span>
                              </div>
                            ) : (
                              `ج.م${product.price}`
                            )}
                          </div>

                          {/* Stock Info */}
                          <div className="text-right w-full text-gray-400 text-xs mb-4">
                            المتوفر: {product.stock} قطعة
                          </div>

                          {/* Buttons */}
                          <div className="w-full mt-auto space-y-2">
                            <Link
                              to={`/product/${product._id}`}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2"
                            >
                              <ShoppingCart size={20} />
                              أضف إلى عربة التسوق
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* المواقع المفضلة */}
                {favouriteLocations.length > 0 && (
                  <div>
                    <h3 className="text-right text-blue-700 font-bold text-xl mb-6">
                      المواقع المفضلة
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                      {favouriteLocations.map((location) => (
                        <div
                          key={location._id}
                          className="bg-white rounded-xl shadow p-4 flex flex-col items-center relative"
                        >
                          {/* Favorite Heart */}
                          <button
                            className="absolute top-4 left-4 text-red-500 bg-white rounded-full p-1 shadow-md cursor-pointer"
                            onClick={() => removeLocationFromFavourites(location._id)}
                          >
                            <Heart fill={"red"} color={"red"} size={24} />
                          </button>

                          {/* Location Image */}
                          <img
                            src={location.images?.[0]?.secure_url || '/placeholder-image.jpg'}
                            alt={location.title}
                            className="w-40 h-40 object-contain mb-4"
                          />

                          {/* Location Name */}
                          <div className="text-right w-full font-bold text-base mb-2 text-blue-700">
                            {location.title}
                          </div>

                          {/* Location Description */}
                          <div className="text-right w-full text-gray-500 text-sm mb-4">
                            {location.description}
                          </div>

                          {/* Location Details Button */}
                          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 mt-auto">
                            عرض التفاصيل
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Favourite;