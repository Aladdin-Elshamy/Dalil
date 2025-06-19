import AuthLayout from "../../components/AuthLayout";
import InputWithIcon from "../../components/InputWithIcon";
import { Mail, User, Calendar, Phone, MapPin, Lock } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface ApiResponse {
  message?: string;
  err: string[];
  // Add other properties if your API returns more data
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "", // Will be split into firstName and lastName
    lastName: "",
    email: "",
    dateOfBirth: "",
    phoneNumber: "",
    responsible: "", // Maps to nameOfPersonInCharge
    Location: "", // Maps to address
    password: "",
    ConfirmPassword: "", // Maps to rePassword
    responsiblePhone: "", // New field for numberPhoneOfPersonInCharge
  });
  const [error, setError] = useState<string | null | string[]>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (formData.password !== formData.ConfirmPassword) {
      toast.error("كلمات السر غير متطابقة", {
        id: "password-mismatch",
        duration: 1000,
        position: "top-center",
      });
      return;
    }

    // Format date
    const formattedDate = formData.dateOfBirth
      .replace(/-/g, "/")
      .replace(/\/0/g, "/");

    try {
      const requestData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        rePassword: formData.ConfirmPassword,
        phoneNumber: formData.phoneNumber,
        dateOfBirth: formattedDate,
        address: formData.Location,
        nameOfPersonInCharge: formData.responsible,
        numberPhoneOfPersonInCharge: formData.responsiblePhone,
      };

      const response = await axios.post<ApiResponse>(
        "https://dalail-project-daoud.vercel.app/api/v1/auth/signUp",
        requestData
      );
      await axios.put<ApiResponse>(
        "https://dalail-project-daoud.vercel.app/api/v1/user/update",
        requestData
      );

      // Now response.data is properly typed as ApiResponse
      if (!response.data.err) {
        setError(null);
        toast.success("تم التسجيل بنجاح", {
          id: "signup-success",
          duration: 1000,
          position: "top-center",
          icon: "🎉",
        });
        navigate("/login");
      } else {
        setError(response.data.err);
        toast.error(response.data.message || "حدث خطأ أثناء التسجيل", {
          id: "signup-error",
          duration: 3000,
          position: "top-center",
        });
      }
    } catch (err) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as {
          response?: {
            data?: {
              message?: string;
            };
          };
        };
        toast.error(
          axiosError.response?.data?.message || "حدث خطأ أثناء الاتصال بالخادم",
          {
            id: "axios-error",
            duration: 1000,
            position: "top-center",
          }
        );
      } else if (err instanceof Error) {
        toast.error(err.message, {
          id: "general-error",
          duration: 1000,
          position: "top-center",
        });
      } else {
        toast.error("حدث خطأ غير متوقع", {
          id: "unexpected-error",
          duration: 1000,
          position: "top-center",
        });
      }
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl lg:text-3xl font-bold text-blue-700 mb-2 text-right">
        إنشاء حساب جديد
      </h2>
      <p className="text-sm text-gray-700 mb-6 text-right">
        هل لديك حساب بالفعل؟
        <a href="/Login" className="text-blue-700 hover:underline font-medium">
          {" "}
          تسجيل الدخول
        </a>
      </p>

      <form onSubmit={handleSubmit} className="w-full flex flex-col">
        {error && Array.isArray(error) ? (
          <ul className="bg-red-100 text-red-500 text-sm flex flex-col gap-4 p-2 text-left rounded-xl mb-4">
            {error.map((err, index) => (
              <li key={index} className="text-red-500 text-sm">
                {err}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-red-500 bg-red-100 text-sm">{error}</p>
        )}
        <div className="flex flex-col md:flex-row gap-0 md:gap-4 mb-0">
          <div className="w-full md:w-1/2 ">
            <InputWithIcon
              type="text"
              name="firstName"
              placeholder="الاسم الأول"
              icon={User}
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full md:w-1/2">
            <InputWithIcon
              type="text"
              name="lastName"
              placeholder="الاسم الأخير"
              icon={User}
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="w-full">
          <InputWithIcon
            type="email"
            name="email"
            placeholder="البريد الالكتروني"
            icon={Mail}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <InputWithIcon
          type="date"
          name="dateOfBirth"
          placeholder="تاريخ الميلاد"
          icon={Calendar}
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />
        <div className="flex flex-col md:flex-row gap-0 md:gap-4 mb-0">
          <div className="w-full md:w-1/2">
            <InputWithIcon
              type="tel"
              name="phoneNumber"
              placeholder="رقم الهاتف"
              icon={Phone}
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full md:w-1/2">
            <InputWithIcon
              type="text"
              name="responsible"
              placeholder="اسم الشخص المسؤول"
              icon={User}
              value={formData.responsible}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-0 md:gap-4 mb-0">
          <div className="w-full md:w-1/2">
            <InputWithIcon
              type="text"
              name="Location"
              placeholder="موقعك الحالي"
              icon={MapPin}
              value={formData.Location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full md:w-1/2">
            <InputWithIcon
              type="tel"
              name="responsiblePhone"
              placeholder="هاتف الشخص المسؤول"
              icon={Phone}
              value={formData.responsiblePhone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-0 md:gap-4 mb-0">
          <div className="w-full md:w-1/2">
            <InputWithIcon
              type="password"
              name="password"
              placeholder="كلمة السر"
              icon={Lock}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full md:w-1/2">
            <InputWithIcon
              type="password"
              name="ConfirmPassword"
              placeholder="تأكيد كلمة السر"
              icon={Lock}
              value={formData.ConfirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full text-center mx-auto block bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 font-semibold text-lg shadow-md"
        >
          إنشاء حساب
        </button>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
