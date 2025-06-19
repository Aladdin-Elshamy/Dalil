import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import wh1 from '../../assets/wheelchair1.png';
import wh2 from '../../assets/wheelchair2.png';
import wh3 from '../../assets/wheelchair3.png';
import { X, Plus, Minus } from 'lucide-react';
import { useCart } from './CartContext'; // Make sure this path is correct
import { useNavigate } from 'react-router-dom';

// Placeholder cart items (to be replaced with real data from product details page)
// const initialCart = [
//   {
//     id: 1,
//     name: 'كرسي كهربائي متحرك',
//     price: 15000,
//     image: wh3,
//     quantity: 1,
//   },
//   {
//     id: 2,
//     name: 'إسكوتر كهربائي',
//     price: 10000,
//     image: wh1,
//     quantity: 2,
//   },
// ];

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 'يحدد عند اختيار العنوان';
  const total = subtotal; // For now, shipping is not added

  const handleCompleteOrder = () => {
    navigate('/Complete', { state: { cart, subtotal, total } });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Cart Summary */}
        <div className="md:w-1/3 w-full order-2 md:order-1 mb-8 md:mb-0">
          <div className="bg-white rounded-xl shadow p-6 border">
            <h2 className="text-xl font-bold text-right mb-4 border-b pb-2">إجمالي سلة المشتريات</h2>
            <div className="flex flex-col gap-2 text-right text-gray-700">
              <div className="flex justify-between mb-2">
                <span>المجموع</span>
                <span>ج.م{subtotal.toLocaleString()}</span> {/* Added toLocaleString for better number formatting */}
              </div>
              <div className="flex justify-between mb-2">
                <span>الشحن</span>
                <span>{shipping}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>الإجمالي</span>
                <span>ج.م{total.toLocaleString()}</span> {/* Added toLocaleString */}
              </div>
            </div>
            <button
              onClick={handleCompleteOrder}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg mt-6"
            >
              إتمام الطلب
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="md:w-2/3 w-full order-1 md:order-2">
          <div className="flex items-center gap-2 text-gray-500 text-base mb-4">
            <span className="text-blue-700 font-bold">عربة التسوق</span>
            <span className="mx-2">&lt;</span>
            <span>المنتجات</span>
          </div>

          {/* Hide table headers on mobile, show on md and up */}
          <div className="hidden md:block overflow-x-auto mb-4"> {/* Added mb-4 for spacing */}
            <table className="w-full text-right border-separate border-spacing-y-0"> {/* Adjusted border-spacing for desktop */}
              <thead>
                <tr className="text-gray-600 text-base">
                  <th className="font-bold p-2 text-right">المنتج</th> {/* Added p-2 and text-right */}
                  <th className="font-bold p-2 text-right">السعر</th>
                  <th className="font-bold p-2 text-center">الكمية</th> {/* text-center for quantity */}
                  <th className="font-bold p-2 text-right">المجموع</th>
                  <th className="p-2"></th> {/* Empty header for delete button column */}
                </tr>
              </thead>
            </table>
          </div>

          {/* Cart items container */}
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow border p-4 md:p-0 md:shadow-none md:border-none md:rounded-none">
                {/* Mobile Layout (hidden on md and up) */}
                <div className="md:hidden flex flex-row-reverse gap-4">
                  <div className="w-1/3 flex-shrink-0"> {/* Image container */}
                    <img src={item.image} alt={item.name} className="w-full h-auto object-contain rounded-lg border" />
                  </div>
                  <div className="w-2/3 flex flex-col justify-between text-right">
                    <div>
                      <h3 className="font-bold text-gray-700 mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-500 mb-1">السعر: ج.م{item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center justify-end gap-2 my-2">
                      <button
                        className="bg-gray-100 rounded-full p-1 border border-gray-300 hover:bg-gray-200"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        aria-label="نقص الكمية"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-bold text-base">{item.quantity}</span>
                      <button
                        className="bg-gray-100 rounded-full p-1 border border-gray-300 hover:bg-gray-200"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="زيادة الكمية"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <p className="font-bold text-gray-800 mb-2">المجموع: ج.م{(item.price * item.quantity).toLocaleString()}</p>
                    <button
                      className="self-end text-red-500 hover:text-red-700 bg-gray-100 rounded-full p-1"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="حذف المنتج"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Desktop Table Row (hidden on screens smaller than md) */}
                {/* This structure attempts to mimic a table row for md screens and up */}
                <div className="hidden md:flex items-center bg-white rounded-xl shadow md:border md:border-gray-200 p-2"> {/* md:border for clarity */}
                  <div className="w-2/5 flex items-center gap-4 py-2 px-2"> {/* Product name and image */}
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-contain rounded-lg border" />
                    <span className="font-bold text-gray-700">{item.name}</span>
                  </div>
                  <div className="w-1/5 py-2 px-2 text-right">ج.م{item.price.toLocaleString()}</div> {/* Price */}
                  <div className="w-1/5 py-2 px-2"> {/* Quantity */}
                    <div className="flex items-center gap-2 justify-center">
                      <button
                        className="bg-gray-100 rounded-full p-1 border border-gray-300 hover:bg-gray-200"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        aria-label="نقص الكمية"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="mx-2 font-bold text-lg">{item.quantity}</span>
                      <button
                        className="bg-gray-100 rounded-full p-1 border border-gray-300 hover:bg-gray-200"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="زيادة الكمية"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="w-1/5 py-2 px-2 font-bold text-right">ج.م{(item.price * item.quantity).toLocaleString()}</div> {/* Subtotal */}
                  <div className="w-auto py-2 px-2 flex justify-end"> {/* Delete button */}
                    <button
                      className="text-red-500 hover:text-red-700 bg-gray-100 rounded-full p-1"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="حذف المنتج"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {cart.length === 0 && (
              <div className="text-center text-gray-400 py-8 font-bold md:col-span-5"> {/* md:col-span-5 for table case */}
                سلة التسوق فارغة
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;