import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import HeroSection from "../../components/HeroSection";
import Footer from "../../components/Footer";
import filler from "../../assets/filler.png";
import dot from "../../assets/Ellipse 4.png";
import { EyeOff } from "lucide-react";
import SubmitButton from "@/components/SubmitButton";
import { DUMMY_USER } from "../outerSite/dummyUser";
import axios from "axios";
const Profile: React.FC = () => {
  const [profileImage, setProfileImage] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Profile fields state
  const [userProfile, setUserProfile] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [responsible, setResponsible] = useState("");
  const [responsiblePhone, setResponsiblePhone] = useState("");
  const [location, setLocation] = useState("");
  const [success, setSuccess] = useState("");
  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [locLoading, setLocLoading] = useState(false);
  const [locError, setLocError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (localStorage.getItem("authToken")) {
          const token = localStorage.getItem("authToken");

          const response = await axios.get(
            "https://dalail-project-daoud.vercel.app/api/v1/user/profile",
            {
              headers: {
                token,
              },
            }
          );
          console.log("User profile response:", response.data);

          // Dummy fallback if needed
          setName(localStorage.getItem("userName") || DUMMY_USER.name);
          setEmail(DUMMY_USER.email);
          setBirthdate(DUMMY_USER.dateOfBirth);
          setResponsible(DUMMY_USER.responsibleName);
          setResponsiblePhone(DUMMY_USER.responsiblePhone);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setProfileImage(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("هل أنت متأكد أنك تريد إزالة الصورة؟")) {
      setProfileImage(null);
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg("");
    // Get stored password or fallback to DUMMY_USER
    const storedPassword =
      localStorage.getItem("userPassword") || DUMMY_USER.password;
    if (currentPassword !== storedPassword) {
      setPasswordMsg("كلمة السر الحالية غير صحيحة");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMsg("كلمة السر الجديدة يجب أن تكون 6 أحرف على الأقل");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg("كلمة السر الجديدة وتأكيد كلمة السر غير متطابقتين");
      return;
    }
    // Save new password
    localStorage.setItem("userPassword", newPassword);
    setPasswordMsg("تم تغيير كلمة السر بنجاح!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Update dummy user data in localStorage
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userBirthdate", birthdate);
    localStorage.setItem("userResponsible", responsible);
    localStorage.setItem("userResponsiblePhone", responsiblePhone);
    localStorage.setItem("userLocation", location);
    setSuccess("تم تحديث البيانات بنجاح!");
  };

  const handleGetLocation = () => {
    setLocLoading(true);
    setLocError("");
    if (!navigator.geolocation) {
      setLocError("المتصفح لا يدعم تحديد الموقع");
      setLocLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = `${pos.coords.latitude.toFixed(
          6
        )}, ${pos.coords.longitude.toFixed(6)}`;
        setLocation(coords);
        setLocLoading(false);
      },
      (err) => {
        setLocError("تعذر الحصول على الموقع");
        setLocLoading(false);
      }
    );
  };

  return (
    <div>
      <Navbar />
      <HeroSection
        backgroundImage={filler}
        breadcrumb={
          <span className="flex flex-row items-center gap-2 text-right text-base">
            <span className="text-blue-600">الملف الشخصي</span>
            <img src={dot} alt="dot" className="w-2 h-2" />
            <span>الرئيسية</span>
          </span>
        }
      />
      <div className="container mx-auto px-4 py-12 p-8 text-right">
        <div className="  lg:space-x-12 space-y-8 lg:space-y-0 rtl:space-x-reverse">
          {/* Change Password Card */}

          {/* Profile Info Card */}
          <div className="w-full">
            <form
              onSubmit={handleProfileUpdate}
              className="bg-gray-50 p-8 rounded-xl shadow-lg shadow-gray-500 flex flex-col gap-4"
            >
              {success && (
                <div className="text-green-600 text-right font-bold">
                  {success}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="الاسم"
                  className="w-full p-4 border border-gray-400 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right placeholder-gray-500"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="البريد الإلكتروني"
                  className="w-full p-4 border border-gray-400 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right placeholder-gray-500"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="date"
                  name="birthdate"
                  placeholder="تاريخ الميلاد"
                  className="w-full p-4 border border-gray-400 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right placeholder-gray-500"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                />
                <div className="relative flex items-center">
                  <input
                    type="text"
                    name="location"
                    placeholder="الموقع الحال"
                    className="w-full p-4 border border-gray-400 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right placeholder-gray-500"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white rounded px-3 py-1 text-xs hover:bg-blue-700 transition"
                    onClick={handleGetLocation}
                    disabled={locLoading}
                    title="تحديد الموقع الحالي"
                  >
                    {locLoading ? "..." : "موقعي"}
                  </button>
                </div>
                {locError && (
                  <div className="text-red-600 text-xs col-span-2 text-right">
                    {locError}
                  </div>
                )}
                <input
                  type="text"
                  name="responsible"
                  placeholder="اسم الشخص المسؤول"
                  className="w-full p-4 border border-gray-400 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right placeholder-gray-500"
                  value={responsible}
                  onChange={(e) => setResponsible(e.target.value)}
                />
                <input
                  type="tel"
                  name="responsiblePhone"
                  placeholder="رقم هاتف الشخص المسؤول"
                  className="w-full p-4 border border-gray-400 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right placeholder-gray-500"
                  value={responsiblePhone}
                  onChange={(e) => setResponsiblePhone(e.target.value)}
                />
              </div>
              <SubmitButton label="تحديث" />
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
