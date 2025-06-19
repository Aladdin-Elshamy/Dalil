import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Heart, ShoppingCart } from "lucide-react";
import { useFavourites } from "./FavouritesContext";

import wh1 from "../../assets/wheelchair1.png";
import wh2 from "../../assets/wheelchair2.png";
import wh3 from "../../assets/wheelchair3.png";

const Favourite: React.FC = () => {
  const { favourites, toggleFavourite, clearFavourites } = useFavourites();

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
        {/* Remove All Button */}
        <div className="flex justify-end mb-6">
          <button
            className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg font-bold text-base hover:bg-red-200 transition"
            onClick={clearFavourites}
            disabled={favourites.length === 0}
          >
            <span className="text-lg">إزالة الكل من المفضلة</span>
            <span className="text-red-500">
              {" "}
              <Heart fill="red" color="red" size={20} />{" "}
            </span>
          </button>
        </div>
        {/* Favourite Products Grid */}
        {favourites.length === 0 ? (
          <div className="text-center text-gray-400 py-16 font-bold text-xl">
            لا توجد منتجات في المفضلة
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            {favourites.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow p-4 flex flex-col items-center relative"
              >
                {/* Favorite Heart */}
                <button
                  className="absolute top-4 left-4 text-red-500 bg-white rounded-full p-1 shadow-md cursor-pointer"
                  onClick={() => toggleFavourite(product)}
                >
                  <Heart fill={"red"} color={"red"} size={24} />
                </button>
                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-40 h-40 object-contain mb-4"
                />
                {/* Product Name */}
                <div className="text-right w-full font-bold text-base mb-2 text-blue-700">
                  {product.name}
                </div>
                {/* Product Price */}
                <div className="text-right w-full text-gray-500 text-sm mb-4">{`ج.م${product.price}`}</div>
                {/* Add to Cart Button */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 mt-auto">
                  <ShoppingCart size={20} />
                  أضف إلى عربة التسوق
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Favourite;
