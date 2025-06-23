// import React, { useState, useEffect } from "react";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import HeroSection from "../../components/HeroSection";
// import ServiceDetails from "../../components/ServiceTemplate";
// import filler from "../../assets/filler.png";
// import dot from "../../assets/Ellipse 4.png";
// import bell from "../../assets/notification.png"; // Use your bell icon asset
// import logo from "../../assets/logo.png";
// import { DUMMY_USER } from '../outerSite/dummyUser';

// const Notification: React.FC = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [notifications, setNotifications] = useState<any[]>([]);
//   const [form, setForm] = useState({
//     title: "",
//     date: "",
//     time: "",
//     type: "",
//   });

//   // Always reset to DUMMY_USER.notifications on login as dummy user
//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
//     const userEmail = localStorage.getItem('userEmail') || DUMMY_USER.email;
//     if (isLoggedIn && userEmail === DUMMY_USER.email) {
//       setNotifications(DUMMY_USER.notifications || []);
//     } else if (isLoggedIn) {
//       // For other users, you can implement localStorage logic if needed
//       setNotifications([]);
//     } else {
//       setNotifications([]);
//     }
//   }, []);

//   const handleAddNotification = (e: React.FormEvent) => {
//     e.preventDefault();
//     setNotifications([...notifications, { ...form }]);
//     setForm({ title: "", date: "", time: "", type: "" });
//     setShowModal(false);
//   };

//   const handleRemoveNotification = (idx: number) => {
//     setNotifications(notifications.filter((_, i) => i !== idx));
//   };

//   return (
//     <div>
//       <Navbar />

//       {/* Hero Section */}
//       <HeroSection
//         backgroundImage={filler}
//         breadcrumb={
//           <span className="flex flex-row items-center gap-2 text-right text-base">
//             <span className="text-blue-600">التنبيهات</span>
//             <img src={dot} alt="dot" className="w-2 h-2" />
//             <span>الخدمات</span>
//           </span>
//         }
//       />

//       {/* Service Details */}
//       <ServiceDetails
//         serviceName="التنبيهات"
//         serviceDescription="خدمة التنبيهات هي أداة فعالة لإرسال إشعارات مخصصة وفورية إلى المستخدمين لإبقائهم على اطلاع دائم بالتحديثات أو التنبيهات الهامة. تتيح التنبيهات على نطاق واسع في التطبيقات والمواقع الإلكترونية لضمان إشعار سريع ومتجدد مع المستخدم."
//         serviceMerits={[
//           "تنبيهات صحية مثل فحص أساسي إذا تذكر بأخذ الدواء.",
//           "تنبيهات لتنبيهك لتذكّر المواعيد والمناسبات والأوقات.",
//           "تنبيهات مخصصة للمواقع أو الاجتماعات الهامة."
//         ]}
//       />

//       {/* Notifications Section */}
//       <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center">
//         <button
//           className="self-end mb-8 bg-blue-600 text-white px-6 py-2 rounded-lg font-bold"
//           onClick={() => setShowModal(true)}
//         >
//           إضافة تنبيه
//         </button>

//         {notifications.length === 0 ? (
//           <div className="flex flex-col items-center justify-center w-full">
//             <img src={bell} alt="تنبيه" className="w-24 h-24 mb-4" />
//             <div className="text-gray-500 text-2xl font-bold mb-2">لا توجد تنبيهات بعد!</div>
//           </div>
//         ) : (
//           <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6" dir="rtl">
//             {Array.from({ length: Math.max(3, notifications.length) }).map((_, idx) => {
//               const notif = notifications[idx];
//               if (!notif) {
//                 // Empty card for layout consistency
//                 return (
//                   <div
//                     key={idx}
//                     className="bg-white rounded-xl shadow p-6 min-h-[180px] flex flex-col items-center justify-center"
//                   />
//                 );
//               }
//               return (
//                 <div
//                   key={idx}
//                   className="bg-white rounded-xl shadow p-6 min-h-[180px] flex flex-col items-end justify-between"
//                 >
//                   {/* Type label */}
//                   <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-xs font-bold mb-2">
//                     {notif.type || "تنبيه"}
//                   </span>
//                   {/* Title */}
//                   <div className="text-blue-700 font-bold text-xl mb-2 w-full text-right">
//                     {notif.title}
//                   </div>
//                   {/* Date and Time */}
//                   <div className="flex flex-row-reverse items-center gap-4 text-gray-500 text-sm mb-4 w-full justify-end">
//                     <span>{notif.date}</span>
//                     <span>{notif.time}</span>
//                   </div>
//                   {/* Actions */}
//                   <div className="flex gap-2 w-full justify-end">
//                     <button
//                       className="bg-green-500 text-white px-6 py-2 rounded font-bold"
//                       // onClick={() => handleEdit(idx)} // Implement edit if needed
//                     >
//                       تعديل
//                     </button>
//                     <button
//                       className="bg-red-500 text-white px-6 py-2 rounded font-bold"
//                       onClick={() => handleRemoveNotification(idx)}
//                     >
//                       حذف
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
//           <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
//             {/* Logo and Title */}
//             <div className="flex items-center justify-between mb-6">
//               <img src={logo} alt="logo" className="w-12 h-12" /> {/* Replace with your logo */}
//               <span className="text-blue-600 font-bold text-lg">قم بإضافة التنبيه</span>
//             </div>
//             <form onSubmit={handleAddNotification} className="flex flex-col gap-4">
//               <div className="relative">
//                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//                   <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path d="M12 22s8-4 8-10V7a8 8 0 10-16 0v5c0 6 8 10 8 10z" />
//                   </svg>
//                 </span>
//                 <input
//                   type="text"
//                   placeholder="أدخل التنبيه"
//                   value={form.title}
//                   onChange={e => setForm({ ...form, title: e.target.value })}
//                   className="w-full border rounded-lg px-10 py-2 focus:outline-none"
//                   required
//                 />
//               </div>
//               <div className="relative">
//                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//                   <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <rect x="3" y="4" width="18" height="18" rx="2" />
//                   </svg>
//                 </span>
//                 <input
//                   type="date"
//                   value={form.date}
//                   onChange={e => setForm({ ...form, date: e.target.value })}
//                   className="w-full border rounded-lg px-10 py-2 focus:outline-none"
//                   required
//                 />
//               </div>
//               <div className="relative">
//                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//                   <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <circle cx="12" cy="12" r="10" />
//                     <path d="M12 6v6l4 2" />
//                   </svg>
//                 </span>
//                 <input
//                   type="time"
//                   value={form.time}
//                   onChange={e => setForm({ ...form, time: e.target.value })}
//                   className="w-full border rounded-lg px-10 py-2 focus:outline-none"
//                   required
//                 />
//               </div>
//               <div className="relative">
//                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//                   <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path d="M6 9l6 6 6-6" />
//                   </svg>
//                 </span>
//                 <select
//                   value={form.type}
//                   onChange={e => setForm({ ...form, type: e.target.value })}
//                   className="w-full border rounded-lg px-10 py-2 focus:outline-none"
//                   required
//                 >
//                   <option value="">اختر النوع</option>
//                   <option value="صحي">صحي</option>
//                   <option value="موعد">موعد</option>
//                   <option value="اجتماعي">اجتماعي</option>
//                 </select>
//               </div>
//               <div className="flex gap-4 justify-center mt-4">
//                 <button
//                   type="button"
//                   className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold"
//                   onClick={() => setShowModal(false)}
//                 >
//                   إلغاء
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold"
//                 >
//                   إضافة
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </div>
//   );
// };

// export default Notification;
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HeroSection from "../../components/HeroSection";
import ServiceDetails from "../../components/ServiceTemplate";
import filler from "../../assets/filler.png";
import dot from "../../assets/Ellipse 4.png";
import logo from "../../assets/logo.png";
import bell from "../../assets/notification.png";

interface Reminder {
  _id: string;
  title: string;
  date: string;
  time: string;
  repetition?: string;
  status?: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ApiResponse {
  message?: string;
  reminders?: Reminder[];
  newReminder?: Reminder;
  data?: Reminder[];
}

const Notification: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    repetition: "",
  });

  const API_TOKEN =
    "dalail__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzJlYzYxZDM1MTgwMDMzYzU5Y2VmMiIsImVtYWlsIjoiZGFvdWRtYWhtb3VkMzMxQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsInBob25lTnVtYmVyIjoiMDEwOTI3ODM3NzMiLCJhZGRyZXNzIjoiZGFtbmhvdXIiLCJpYXQiOjE3NDA4Mjg5NDZ9.H9NYcvad9wWyJsykbNxjgL4ShUb_5U71yjhe9mfdn78";

  // Fetch reminders function
  const fetchReminders = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://dalail-project-daoud.vercel.app/api/v1/reminder/all",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("authToken"),
          },
        }
      );

      // Handle specific error responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("API Error Response:", errorData);

        if (response.status === 404) {
          // No reminders found or access denied
          setReminders([]);
          setError(
            "لا توجد تنبيهات أو انتهت صلاحية الجلسة. جرب تسجيل الدخول مرة أخرى."
          );
          setLoading(false);
          return;
        }

        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      console.log("API Response:", data); // For debugging

      // Handle different response structures
      let remindersList: Reminder[] = [];

      if (data.reminders && Array.isArray(data.reminders)) {
        remindersList = data.reminders;
      } else if (data.data && Array.isArray(data.data)) {
        remindersList = data.data;
      } else if (Array.isArray(data)) {
        remindersList = data as Reminder[];
      } else {
        remindersList = [];
      }

      setReminders(remindersList);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching reminders:", err);
      setError("فشل في تحميل التنبيهات. تأكد من الاتصال بالإنترنت.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim() || !form.date || !form.time) {
      alert("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setIsSubmitting(true);

    try {
      if (editingReminder) {
        // Update existing reminder
        const response = await fetch(
          `https://dalail-project-daoud.vercel.app/api/v1/reminder/update/${editingReminder._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("authToken"),
            },
            body: JSON.stringify({
              title: form.title.trim(),
              date: form.date,
              time: form.time,
              repetition: form.repetition || "none",
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Update Error:", errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Update Response:", result);

        // Update the reminder in state
        setReminders((prevReminders) =>
          prevReminders.map((r) =>
            r._id === editingReminder._id
              ? {
                  ...r,
                  title: form.title,
                  date: form.date,
                  time: form.time,
                  repetition: form.repetition || "none",
                }
              : r
          )
        );

        alert("تم تحديث التنبيه بنجاح");
      } else {
        // Create new reminder
        const response = await fetch(
          "https://dalail-project-daoud.vercel.app/api/v1/reminder/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: API_TOKEN,
            },
            body: JSON.stringify({
              title: form.title.trim(),
              date: form.date,
              time: form.time,
              repetition: form.repetition || "none",
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("API Error:", errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse = await response.json();
        console.log("Create Response:", result);

        // Handle the response based on the structure you provided
        if (result.newReminder) {
          // Add the new reminder to the state
          setReminders((prevReminders) => [
            ...prevReminders,
            result.newReminder!,
          ]);
        } else {
          // If the structure is different, create a basic reminder object
          const newReminder: Reminder = {
            _id: Date.now().toString(),
            title: form.title,
            date: form.date,
            time: form.time,
            repetition: form.repetition || "none",
          };
          setReminders((prevReminders) => [...prevReminders, newReminder]);
        }

        alert("تم إضافة التنبيه بنجاح");
      }

      // Reset form and close modal
      setForm({ title: "", date: "", time: "", repetition: "" });
      setEditingReminder(null);
      setShowModal(false);

      // Refresh the list after a short delay
      setTimeout(() => {
        fetchReminders();
      }, 1000);
    } catch (err) {
      console.error("Error submitting reminder:", err);
      alert(
        editingReminder
          ? "فشل في تحديث التنبيه. حاول مرة أخرى."
          : "فشل في إضافة التنبيه. حاول مرة أخرى."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا التنبيه؟")) {
      return;
    }

    try {
      const response = await fetch(
        `https://dalail-project-daoud.vercel.app/api/v1/reminder/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: API_TOKEN,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Delete Error:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Remove the reminder from state immediately
      setReminders((prevReminders) =>
        prevReminders.filter((r) => r._id !== id)
      );
      alert("تم حذف التنبيه بنجاح");
    } catch (err) {
      console.error("Error deleting reminder:", err);
      alert("فشل في حذف التنبيه. حاول مرة أخرى.");
    }
  };

  const handleUpdate = (reminder: Reminder) => {
    // Fill the form with existing reminder data
    setForm({
      title: reminder.title,
      date: reminder.date,
      time: reminder.time,
      repetition: reminder.repetition || "",
    });
    setEditingReminder(reminder);
    setShowModal(true);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("ar-EG");
    } catch {
      return dateString;
    }
  };

  // Format time for display
  const formatTime = (timeString: string) => {
    try {
      const [hours, minutes] = timeString.split(":");
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? "م" : "ص";
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes} ${ampm}`;
    } catch {
      return timeString;
    }
  };

  return (
    <div>
      <Navbar />

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

      <ServiceDetails
        serviceName="التنبيهات"
        serviceDescription="خدمة التنبيهات هي أداة فعالة لإرسال إشعارات مخصصة وفورية إلى المستخدمين لإبقائهم على اطلاع دائم بالتحديثات أو التنبيهات الهامة."
        serviceMerits={[
          "تنبيهات صحية مثل فحص أساسي إذا تذكر بأخذ الدواء.",
          "تنبيهات لتنبيهك لتذكّر المواعيد والمناسبات والأوقات.",
          "تنبيهات مخصصة للمواقع أو الاجتماعات الهامة.",
        ]}
      />

      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="w-full flex justify-end items-center mb-8">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            onClick={() => {
              setForm({ title: "", date: "", time: "", repetition: "" });
              setEditingReminder(null);
              setShowModal(true);
            }}
          >
            إضافة تنبيه
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center w-full py-12">
            <div className="text-gray-500 text-lg">جاري التحميل...</div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center w-full py-12">
            <div className="text-red-500 text-lg mb-4">{error}</div>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={fetchReminders}
            >
              إعادة المحاولة
            </button>
          </div>
        ) : reminders.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full py-12">
            <img src={bell} alt="تنبيه" className="w-24 h-24 mb-4 opacity-50" />
            <div className="text-gray-500 text-2xl font-bold mb-2">
              لا توجد تنبيهات بعد!
            </div>
            <div className="text-gray-400 text-sm">
              اضغط على "إضافة تنبيه" لإنشاء أول تنبيه لك
            </div>
          </div>
        ) : (
          <div
            className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            dir="rtl"
          >
            {reminders.map((reminder) => (
              <div
                key={reminder._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 min-h-[200px] flex flex-col justify-between border border-gray-100"
              >
                <div>
                  {/* Type/Repetition label */}
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold mb-3 inline-block">
                    {reminder.repetition === "daily"
                      ? "يومي"
                      : reminder.repetition === "weekly"
                      ? "أسبوعي"
                      : reminder.repetition === "monthly"
                      ? "شهري"
                      : "مرة واحدة"}
                  </span>

                  {/* Title */}
                  <div className="text-gray-800 font-bold text-lg mb-3 w-full text-right leading-relaxed">
                    {reminder.title}
                  </div>

                  {/* Date and Time */}
                  <div className="flex flex-row-reverse items-center gap-4 text-gray-500 text-sm mb-4 w-full justify-end">
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span>{formatDate(reminder.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span>{formatTime(reminder.time)}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 w-full justify-end pt-2 border-t border-gray-100">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
                    onClick={() => handleUpdate(reminder)}
                  >
                    تحديث
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
                    onClick={() => handleDelete(reminder._id)}
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md relative animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <img src={logo} alt="logo" className="w-10 h-10" />
              <span className="text-gray-800 font-bold text-lg">
                {editingReminder ? "تحديث التنبيه" : "إضافة تنبيه جديد"}
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Title Input */}
              <div className="relative">
                <label className="block text-gray-700 text-sm font-semibold mb-2 text-right">
                  عنوان التنبيه *
                </label>
                <input
                  type="text"
                  placeholder="أدخل عنوان التنبيه"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Date Input */}
              <div className="relative">
                <label className="block text-gray-700 text-sm font-semibold mb-2 text-right">
                  التاريخ *
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Time Input */}
              <div className="relative">
                <label className="block text-gray-700 text-sm font-semibold mb-2 text-right">
                  الوقت *
                </label>
                <input
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Repetition Select */}
              <div className="relative">
                <label className="block text-gray-700 text-sm font-semibold mb-2 text-right">
                  نوع التكرار
                </label>
                <select
                  value={form.repetition}
                  onChange={(e) =>
                    setForm({ ...form, repetition: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                  disabled={isSubmitting}
                >
                  <option value="">اختر نوع التكرار</option>
                  <option value="none">مرة واحدة</option>
                  <option value="daily">يومي</option>
                  <option value="weekly">أسبوعي</option>
                  <option value="monthly">شهري</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 justify-center pt-4">
                <button
                  type="button"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
                  onClick={() => {
                    setShowModal(false);
                    setForm({ title: "", date: "", time: "", repetition: "" });
                    setEditingReminder(null);
                  }}
                  disabled={isSubmitting}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? editingReminder
                      ? "جاري التحديث..."
                      : "جاري الإضافة..."
                    : editingReminder
                    ? "تحديث التنبيه"
                    : "إضافة التنبيه"}
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
