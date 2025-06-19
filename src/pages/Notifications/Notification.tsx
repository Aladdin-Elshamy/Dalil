import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HeroSection from "../../components/HeroSection";
import ServiceDetails from "../../components/ServiceTemplate";
import filler from "../../assets/filler.png";
import dot from "../../assets/Ellipse 4.png";
import bell from "../../assets/notification.png"; // Use your bell icon asset
import logo from "../../assets/logo.png";
import { DUMMY_USER } from '../outerSite/dummyUser';

const Notification: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    type: "",
  });

  // Always reset to DUMMY_USER.notifications on login as dummy user
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userEmail = localStorage.getItem('userEmail') || DUMMY_USER.email;
    if (isLoggedIn && userEmail === DUMMY_USER.email) {
      setNotifications(DUMMY_USER.notifications || []);
    } else if (isLoggedIn) {
      // For other users, you can implement localStorage logic if needed
      setNotifications([]);
    } else {
      setNotifications([]);
    }
  }, []);

  const handleAddNotification = (e: React.FormEvent) => {
    e.preventDefault();
    setNotifications([...notifications, { ...form }]);
    setForm({ title: "", date: "", time: "", type: "" });
    setShowModal(false);
  };

  const handleRemoveNotification = (idx: number) => {
    setNotifications(notifications.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <HeroSection
        backgroundImage={filler}
        breadcrumb={
          <span className="flex flex-row items-center gap-2 text-right text-base">
            <span className="text-blue-600">التنبيهات</span>
            <img src={dot} alt="dot" className="w-2 h-2" />
            <span>الخدمات</span>
          </span>
        }
      />

      {/* Service Details */}
      <ServiceDetails
        serviceName="التنبيهات"
        serviceDescription="خدمة التنبيهات هي أداة فعالة لإرسال إشعارات مخصصة وفورية إلى المستخدمين لإبقائهم على اطلاع دائم بالتحديثات أو التنبيهات الهامة. تتيح التنبيهات على نطاق واسع في التطبيقات والمواقع الإلكترونية لضمان إشعار سريع ومتجدد مع المستخدم."
        serviceMerits={[
          "تنبيهات صحية مثل فحص أساسي إذا تذكر بأخذ الدواء.",
          "تنبيهات لتنبيهك لتذكّر المواعيد والمناسبات والأوقات.",
          "تنبيهات مخصصة للمواقع أو الاجتماعات الهامة."
        ]}
      />

      {/* Notifications Section */}
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <button
          className="self-end mb-8 bg-blue-600 text-white px-6 py-2 rounded-lg font-bold"
          onClick={() => setShowModal(true)}
        >
          إضافة تنبيه
        </button>

        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full">
            <img src={bell} alt="تنبيه" className="w-24 h-24 mb-4" />
            <div className="text-gray-500 text-2xl font-bold mb-2">لا توجد تنبيهات بعد!</div>
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6" dir="rtl">
            {Array.from({ length: Math.max(3, notifications.length) }).map((_, idx) => {
              const notif = notifications[idx];
              if (!notif) {
                // Empty card for layout consistency
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow p-6 min-h-[180px] flex flex-col items-center justify-center"
                  />
                );
              }
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow p-6 min-h-[180px] flex flex-col items-end justify-between"
                >
                  {/* Type label */}
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-xs font-bold mb-2">
                    {notif.type || "تنبيه"}
                  </span>
                  {/* Title */}
                  <div className="text-blue-700 font-bold text-xl mb-2 w-full text-right">
                    {notif.title}
                  </div>
                  {/* Date and Time */}
                  <div className="flex flex-row-reverse items-center gap-4 text-gray-500 text-sm mb-4 w-full justify-end">
                    <span>{notif.date}</span>
                    <span>{notif.time}</span>
                  </div>
                  {/* Actions */}
                  <div className="flex gap-2 w-full justify-end">
                    <button
                      className="bg-green-500 text-white px-6 py-2 rounded font-bold"
                      // onClick={() => handleEdit(idx)} // Implement edit if needed
                    >
                      تعديل
                    </button>
                    <button
                      className="bg-red-500 text-white px-6 py-2 rounded font-bold"
                      onClick={() => handleRemoveNotification(idx)}
                    >
                      حذف
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            {/* Logo and Title */}
            <div className="flex items-center justify-between mb-6">
              <img src={logo} alt="logo" className="w-12 h-12" /> {/* Replace with your logo */}
              <span className="text-blue-600 font-bold text-lg">قم بإضافة التنبيه</span>
            </div>
            <form onSubmit={handleAddNotification} className="flex flex-col gap-4">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 22s8-4 8-10V7a8 8 0 10-16 0v5c0 6 8 10 8 10z" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="أدخل التنبيه"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full border rounded-lg px-10 py-2 focus:outline-none"
                  required
                />
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                  </svg>
                </span>
                <input
                  type="date"
                  value={form.date}
                  onChange={e => setForm({ ...form, date: e.target.value })}
                  className="w-full border rounded-lg px-10 py-2 focus:outline-none"
                  required
                />
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </span>
                <input
                  type="time"
                  value={form.time}
                  onChange={e => setForm({ ...form, time: e.target.value })}
                  className="w-full border rounded-lg px-10 py-2 focus:outline-none"
                  required
                />
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
                <select
                  value={form.type}
                  onChange={e => setForm({ ...form, type: e.target.value })}
                  className="w-full border rounded-lg px-10 py-2 focus:outline-none"
                  required
                >
                  <option value="">اختر النوع</option>
                  <option value="صحي">صحي</option>
                  <option value="موعد">موعد</option>
                  <option value="اجتماعي">اجتماعي</option>
                </select>
              </div>
              <div className="flex gap-4 justify-center mt-4">
                <button
                  type="button"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold"
                  onClick={() => setShowModal(false)}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold"
                >
                  إضافة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Notification;
