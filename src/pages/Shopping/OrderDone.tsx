import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import orderImg from "../../assets/OrderDone.png";
import { useNavigate } from "react-router-dom";

const OrderDone: React.FC = () => {
  const navigate = useNavigate();
  // Example order number, in real use this would come from props or context
  const orderNumber = "#938272682782Y";

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center py-8">
        <img
          src={orderImg}
          alt="تم تأكيد الطلب"
          className=" w-auto h-auto mx-auto mb-4"
          style={{ maxHeight: 320 }}
        />
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 text-center mb-4">تم تأكيد الطلب بنجاح!</h2>
        <div className="text-center text-gray-700 mb-2 text-lg">{orderNumber} رقم الطلب</div>
        <div className="text-center text-gray-600 mb-6 text-base">ستصلك رسالة تأكيد على بريدك الإلكتروني</div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg text-lg shadow transition"
          onClick={() => navigate("/shopping")}
        >
          الصفحة الرئيسية
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default OrderDone;

