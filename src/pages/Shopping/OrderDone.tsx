// import React from "react";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import orderImg from "../../assets/OrderDone.png";
// import { useNavigate } from "react-router-dom";

// const OrderDone: React.FC = () => {
//   const navigate = useNavigate();
//   // Example order number, in real use this would come from props or context
//   const orderNumber = "#938272682782Y";

//   return (
//     <div className="flex flex-col min-h-screen bg-white">
//       <Navbar />
//       <div className="flex-1 flex flex-col items-center justify-center py-8">
//         <img
//           src={orderImg}
//           alt="تم تأكيد الطلب"
//           className=" w-auto h-auto mx-auto mb-4"
//           style={{ maxHeight: 320 }}
//         />
//         <h2 className="text-2xl md:text-3xl font-bold text-blue-700 text-center mb-4">تم تأكيد الطلب بنجاح!</h2>
//         <div className="text-center text-gray-700 mb-2 text-lg">{orderNumber} رقم الطلب</div>
//         <div className="text-center text-gray-600 mb-6 text-base">ستصلك رسالة تأكيد على بريدك الإلكتروني</div>
//         <button
//           className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg text-lg shadow transition"
//           onClick={() => navigate("/shopping")}
//         >
//           الصفحة الرئيسية
//         </button>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default OrderDone;

import React, { useState } from 'react';
import axios from 'axios';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const OrderDone: React.FC = () => {
  const { cart, clearCart } = useCart();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const token = "dalail__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzJlYzYxZDM1MTgwMDMzYzU5Y2VmMiIsImVtYWlsIjoiZGFvdWRtYWhtb3VkMzMxQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsInBob25lTnVtYmVyIjoiMDEwOTI3ODM3NzMiLCJhZGRyZXNzIjoiZGFtbmhvdXIiLCJpYXQiOjE3NDA4Mjg5NDZ9.H9NYcvad9wWyJsykbNxjgL4ShUb_5U71yjhe9mfdn78";

  const handleConfirmOrder = async () => {
    if (cart.length === 0) {
      setMessage('السلة فارغة. لا يمكن تنفيذ الطلب.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'https://dalail-project-daoud.vercel.app/api/v1/order/create',
        {}, // لا حاجة لإرسال بيانات، السيرفر بيستخدم اليوزر من التوكن
        {
          headers: {
            token,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setMessage('✅ تم تأكيد الطلب بنجاح');
        clearCart();
      } else {
        setMessage('❌ حدث خطأ أثناء تأكيد الطلب');
      }
    } catch (error) {
      console.error('Error confirming order:', error);
      setMessage('❌ حدث خطأ أثناء تأكيد الطلب');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 text-center">
        <h2 className="mb-4">تأكيد الطلب</h2>
        {message ? (
          <>
            <p className="alert alert-info">{message}</p>
            <Link to="/" className="btn btn-success">
              الرجوع للصفحة الرئيسية
            </Link>
          </>
        ) : (
          <>
            {cart.length === 0 ? (
              <p className="text-muted">السلة فارغة. لا يمكن تنفيذ الطلب.</p>
            ) : (
              <button
                className="btn btn-primary"
                onClick={handleConfirmOrder}
                disabled={loading}
              >
                {loading ? 'جاري تأكيد الطلب...' : 'تأكيد الطلب الآن'}
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default OrderDone;
