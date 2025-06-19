import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import wh1 from "../../assets/wheelchair1.png";
import wh2 from "../../assets/wheelchair2.png";
import wh3 from "../../assets/wheelchair3.png";
import { ShoppingCart, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useFavourites } from "./FavouritesContext";
import { useCart } from "./CartContext";

// Example product data
const categories = [
  "الأطراف الصناعية",
  "الكراسي المتحركة",
  "السماعات",
  "مساعدات الحركة",
];

const products = [
  {
    id: 1,
    name: "كرسي كهربائي - خفيف الوزن يظهر متحرك",
    price: 25000,
    image: wh3,
    fav: true,
    category: "الكراسي المتحركة",
  },
  {
    id: 2,
    name: "كرسي متحرك - شديد التحمل 40 سم",
    price: 10000,
    image: wh2,
    fav: false,
    category: "الكراسي المتحركة",
  },
  {
    id: 3,
    name: "كرسي متحرك كهربائي - شديد التحمل 45 سم",
    price: 15000,
    image: wh1,
    fav: false,
    category: "الكراسي المتحركة",
  },
  {
    id: 4,
    name: "كرسي متحرك كهربائي - شديد التحمل 45 سم",
    price: 15000,
    image: wh3,
    fav: true,
    category: "الكراسي المتحركة",
  },
  {
    id: 5,
    name: "كرسي كهربائي - خفيف الوزن يظهر متحرك",
    price: 25000,
    image: wh2,
    fav: true,
    category: "الكراسي المتحركة",
  },
  {
    id: 6,
    name: "كرسي متحرك - شديد التحمل 40 سم",
    price: 10000,
    image: wh1,
    fav: false,
    category: "الكراسي المتحركة",
  },
];

const Shopping: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("الكراسي المتحركة");
  const [page, setPage] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const { toggleFavourite, isFavourite } = useFavourites();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product: any) => {
    addToCart(
      {
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.image,
      },
      1
    );
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  // Filter products by selected category
  const filteredProducts = products.filter(
    (p) => p.category === selectedCategory
  );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      {/* Toast Notification */}
      <div
        className={`fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg transition-opacity duration-300 z-50 ${
          showToast ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        تم الاضافة الى العربة
      </div>
      <div className="container mx-auto px-4 py-8 flex-1">
        {/* Category Filters */}
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
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow p-4 flex flex-col items-center relative"
            >
              {/* Favorite Heart */}
              <button
                className="absolute top-4 left-4 text-red-500 bg-white rounded-full p-1 shadow-md"
                onClick={() => {
                  toggleFavourite({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                  });
                }}
              >
                <Heart
                  fill={isFavourite(product.id) ? "red" : "none"}
                  color={isFavourite(product.id) ? "red" : "#e5e7eb"}
                  size={24}
                />
              </button>
              {/* Product Card Link */}
              <Link
                to={`/ProductDetails/${product.id}`}
                className="w-full flex flex-col items-center group"
                style={{ textDecoration: "none" }}
              >
                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-40 h-40 object-contain mb-4 group-hover:scale-105 transition-transform"
                />
                {/* Product Name */}
                <div className="text-right w-full font-bold text-base mb-2 text-blue-700 group-hover:underline">
                  {product.name}
                </div>
                {/* Product Price */}
                <div className="text-right w-full text-gray-500 text-sm mb-4">{`ج.م${product.price}`}</div>
              </Link>
              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 mt-auto"
              >
                <ShoppingCart size={20} />
                أضف إلى عربة التسوق
              </button>
            </div>
          ))}
        </div>
        {/* Pagination */}
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
          <span className="text-gray-500 text-sm ml-2">عرض 6-24 منتج</span>
        </div>
      </div>
      {/* Floating Cart Button */}
      <a
        href="/Cart"
        className="fixed bottom-6 left-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-4 flex items-center gap-2 transition-all"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.12)" }}
        title="عربة التسوق"
      >
        <ShoppingCart size={28} />
        <span className="font-bold text-lg">عربة التسوق</span>
      </a>
      <Footer />
    </div>
  );
};

export default Shopping;
