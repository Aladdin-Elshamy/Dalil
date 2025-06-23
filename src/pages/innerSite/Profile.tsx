import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import HeroSection from "../../components/HeroSection";
import Footer from "../../components/Footer";
import filler from "../../assets/filler.png";
import dot from "../../assets/Ellipse 4.png";
import { EyeOff } from "lucide-react";
import SubmitButton from "@/components/SubmitButton";
import axios from "axios";

const Profile: React.FC = () => {
  const [profileImage, setProfileImage] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Profile fields state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [nameOfPersonInCharge, setNameOfPersonInCharge] = useState("");
  const [numberPhoneOfPersonInCharge, setNumberPhoneOfPersonInCharge] =
    useState("");
  const [success, setSuccess] = useState("");

  // Location state
  const [locLoading, setLocLoading] = useState(false);
  const [locError, setLocError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("No auth token found");
          return;
        }

        const response = await axios.get(
          "https://dalail-project-daoud.vercel.app/api/v1/user/profile",
          {
            headers: {
              token,
            },
          }
        );

        const userData = response.data.data;
        console.log("User profile data:", userData);

        // Set the state with the API data
        setFirstName(userData.firstName || "");
        setLastName(userData.lastName || "");
        setEmail(userData.email || "");
        setPhoneNumber(userData.phoneNumber || "");
        setAddress(userData.address || "");
        setNameOfPersonInCharge(userData.nameOfPersonInCharge || "");
        setNumberPhoneOfPersonInCharge(
          userData.numberPhoneOfPersonInCharge || ""
        );
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

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No auth token found");
        return;
      }

      const response = await axios.put(
        "https://dalail-project-daoud.vercel.app/api/v1/user/update",
        {
          firstName,
          lastName,
          phoneNumber,
          address,
          nameOfPersonInCharge,
          numberPhoneOfPersonInCharge,
        },
        {
          headers: {
            token,
          },
        }
      );

      console.log("Update response:", response.data);
      setSuccess("تم تحديث البيانات بنجاح!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setSuccess("حدث خطأ أثناء تحديث البيانات");
    }
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
        setAddress(coords);
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
        <div className="lg:space-x-12 space-y-8 lg:space-y-0 rtl:space-x-reverse">
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
                  name="firstName"
                  placeholder="الاسم الأول"
                  className="w-full p-4 border border-gray-400 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right placeholder-gray-500"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="الاسم الأخير"
                  className="w-full p-4 border border-gray-400 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right placeholder-gray-500"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="البريد الإلكتروني"
                  className="w-full p-4 border border-gray-400 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right placeholder-gray-500"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled // Email might be read-only if it's used as username
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="رقم الهاتف"
                  className="w-full p-4 border border-gray-400 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right placeholder-gray-500"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <div className="relative flex items-center">
                  <input
                    type="text"
                    name="address"
                    placeholder="العنوان"
                    className="w-full p-4 border border-gray-400 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right placeholder-gray-500"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
                  name="nameOfPersonInCharge"
                  placeholder="اسم الشخص المسؤول"
                  className="w-full p-4 border border-gray-400 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right placeholder-gray-500"
                  value={nameOfPersonInCharge}
                  onChange={(e) => setNameOfPersonInCharge(e.target.value)}
                />
                <input
                  type="tel"
                  name="numberPhoneOfPersonInCharge"
                  placeholder="رقم هاتف الشخص المسؤول"
                  className="w-full p-4 border border-gray-400 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right placeholder-gray-500"
                  value={numberPhoneOfPersonInCharge}
                  onChange={(e) =>
                    setNumberPhoneOfPersonInCharge(e.target.value)
                  }
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
