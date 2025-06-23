import React, { useState, useContext, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import wh1 from "../../assets/wheelchair1.png";
import wh2 from "../../assets/wheelchair2.png";
import wh3 from "../../assets/wheelchair3.png";
import { Heart, Plus, Minus, ShoppingCart, Share2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "./CartContext";

// Mock product data (should match Shopping.tsx for demo)
const mockProducts = [
  {
    id: "1",
    name: "كرسي متحرك كهربائي-45سم",
    price: 15000,
    image: wh3,
    country: "مصر",
    stock: 10,
    description:
      "كرسي كهربائي متحرك يوفر سهولة التنقل والراحة، مع تصميم عملي وإمكانية التحكم عن بعد. مثالي للاستخدام داخل المنزل وخارجه.",
  },
  {
    id: "2",
    name: "كرسي متحرك - شديد التحمل 40 سم",
    price: 10000,
    image: wh2,
    country: "مصر",
    stock: 5,
    description: "كرسي متحرك يدوي شديد التحمل، مثالي للاستخدام اليومي.",
  },
  {
    id: "3",
    name: "كرسي كهربائي - خفيف الوزن يظهر متحرك",
    price: 25000,
    image: wh1,
    country: "مصر",
    stock: 3,
    description: "كرسي كهربائي خفيف الوزن، سهل الحمل والتنقل.",
  },
];

// Simple cart context for demo (replace with global state in production)
const CartContext = React.createContext({
  cart: [],
  addToCart: (product: any, qty: number) => {},
});

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(mockProducts[0]);
  const [quantity, setQuantity] = useState(1);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    const found = mockProducts.find((p) => p.id === id);
    if (found) {
      setProduct(found);
      setQuantity(1);
    }
  }, [id]);

  if (!mockProducts.find((p) => p.id === id)) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center text-red-600 font-bold text-2xl">
          المنتج غير موجود
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      quantity
    );
    navigate("/Cart");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <div className="container flex-1 mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-center">
        {/* Product Image */}
        <div className="md:w-1/2 w-full flex justify-center">
          <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-lg bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-contain rounded-2xl"
            />
            <button
              className="absolute top-4 left-4 text-red-500 bg-white rounded-full p-2 shadow-md"
              onClick={() => setFav((f) => !f)}
            >
              <Heart
                fill={fav ? "red" : "none"}
                color={fav ? "red" : "#e5e7eb"}
                size={28}
              />
            </button>
          </div>
        </div>
        {/* Product Details */}
        <div className="md:w-1/2 w-full flex flex-col gap-4 text-right">
          <h1 className="text-2xl font-bold text-blue-700 mb-2">
            {product.name}
          </h1>
          <div className="text-gray-600 mb-2">
            بلد المنشأ: {product.country}
          </div>
          <div className="text-gray-600 mb-2">
            الكمية المتبقية: {product.stock} في المخزون
          </div>
          <div className="text-gray-700 mb-4">وصف: {product.description}</div>
          <div className="flex items-center gap-4 mb-4">
            <span className="font-bold text-lg text-gray-700">
              ج.م{product.price}
            </span>
            <span className="text-gray-600">:الكمية</span>
            <div className="flex items-center gap-2">
              <button
                className="bg-gray-100 rounded-full p-1 border border-gray-300 hover:bg-gray-200"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="نقص الكمية"
              >
                <Minus size={18} />
              </button>
              <span className="mx-2 font-bold text-lg">{quantity}</span>
              <button
                className="bg-gray-100 rounded-full p-1 border border-gray-300 hover:bg-gray-200"
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock, q + 1))
                }
                aria-label="زيادة الكمية"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-2 rounded-lg flex items-center gap-2"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={20} />
              أضف إلى العربة
            </button>
            <button className="border border-blue-600 text-blue-600 font-bold px-8 py-2 rounded-lg hover:bg-blue-50">
              إشترى الآن
            </button>
          </div>
          <div className="flex gap-4 items-center mt-2">
            <button className="text-gray-500 hover:text-blue-600">
              <Share2 size={20} />
            </button>
            <span className="text-gray-600">مشاركة</span>
          </div>
        </div>
      </div>
      <Footer />
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
    </div>
  );
};

export default ProductDetails;
