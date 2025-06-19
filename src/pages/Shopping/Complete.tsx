import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";

const Complete: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, subtotal, total } = location.state || { cart: [], subtotal: 0, total: 0 };
  const shipping = 100;
  const finalTotal = total + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the order submission
    // For now, we'll just show an alert
    alert('تم تأكيد الطلب بنجاح!');
    navigate('/'); // Redirect to home page after order completion
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="flex items-center gap-2 text-gray-500 text-base mb-4 justify-end">
          <span className="text-blue-700 font-bold">تأكيد الطلب</span>
          <span className="mx-2">&lt;</span>
          <span>عربة التسوق</span>
          <span className="mx-2">&lt;</span>
          <span>المنتجات</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Invoice Summary */}
          <div className="bg-white rounded-xl shadow p-6 border md:order-1 order-2">
            <h2 className="text-xl font-bold text-right mb-4 border-b pb-2">الفاتورة</h2>
            <div className="flex flex-col gap-2 text-right text-gray-700">
              <div className="flex flex-col gap-4 mb-4">
                {cart.map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-contain rounded-lg border" />
                      <span className="font-bold text-gray-700">{item.name}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span>{item.price}م.ج</span>
                      <span className="text-xs text-gray-400">x{item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mb-2">
                <span>الشحن</span>
                <span>{shipping}م.ج</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>الإجمالي</span>
                <span>{finalTotal.toLocaleString()}م.ج</span>
              </div>
            </div>
            <button 
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg mt-6"
            >
              تأكيد الطلب
            </button>
          </div>
          {/* Order Form */}
          <div className="bg-white rounded-xl shadow p-6 border md:order-2 order-1">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex gap-4">
                <input type="text" placeholder="الاسم" className="w-full border border-gray-400 rounded-lg px-4 py-3 text-right placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                <input type="email" placeholder="البريد الالكتروني" className="w-full border border-gray-400 rounded-lg px-4 py-3 text-right placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div className="flex gap-4">
                <input type="text" placeholder="رقم الهاتف" className="w-full border border-gray-400 rounded-lg px-4 py-3 text-right placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                <input type="text" placeholder="المحافظة" className="w-full border border-gray-400 rounded-lg px-4 py-3 text-right placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <input type="text" placeholder="العنوان (المدينة - الشارع - رقم العقار - رقم الطابق - رقم الشقة)" className="w-full border border-gray-400 rounded-lg px-4 py-3 text-right placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              <textarea placeholder="ملاحظات إضافية (اختياري)" className="w-full p-2 border rounded-md text-right" rows={3}></textarea>
            </form>
            <div className="mt-6 text-right">
              <span className="text-green-600 font-bold">ملاحظة:</span>
              <span className="text-gray-700"> الدفع لدينا عند الإستلام فقط.</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Complete;