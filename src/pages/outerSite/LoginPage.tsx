// import React, { useState } from "react";
// import { Mail, EyeOff } from "lucide-react";
// import AuthLayout from "../../components/AuthLayout";
// import InputWithIcon from "@/components/InputWithIcon";
// import SubmitButton from "@/components/SubmitButton";
// import { useNavigate } from "react-router-dom";
// import { DUMMY_USER } from "./dummyUser";
// import { Link } from "react-router-dom";

// const LoginPage: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handlSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // Check credentials
//     if (email === DUMMY_USER.email && password === DUMMY_USER.password) {
//       // Store login state (for demo, use localStorage)
//       localStorage.setItem("isLoggedIn", "true");
//       localStorage.setItem("userName", DUMMY_USER.name);
//       // Redirect to home or dashboard
//       navigate("/");
//     } else {
//       setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
//     }
//   };

//   return (
//     <AuthLayout>
//       <form onSubmit={handlSubmit} className="w-full space-y-6">
//         <h2 className="text-2xl lg:text-3xl font-bold text-blue-700 mb-2 text-right">
//           تسجيل الدخول
//         </h2>
//         {error && <div className="text-red-600 text-right">{error}</div>}
//         <p className="text-sm text-gray-600 mb-8 lg:mb-10">
//           ليس لديك حساب؟{" "}
//           <Link
//             to="/SignUp"
//             className="text-blue-700 hover:underline font-medium"
//           >
//             إنشاء حساب
//           </Link>
//         </p>
//         <InputWithIcon
//           type="email"
//           name="email"
//           placeholder="البريد الالكتروني"
//           icon={Mail}
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <InputWithIcon
//           type="password"
//           name="password"
//           placeholder="كلمة السر"
//           icon={EyeOff}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <div className="text-left mb-6">
//           {" "}
//           {/* Align link to the left (start in LTR) */}
//           <a
//             href="/forgot-password"
//             className="text-sm text-black hover:underline hover:text-blue-700"
//           >
//             هل نسيت كلمة السر؟
//           </a>
//         </div>
//         <SubmitButton lable="ارسال" className="text-center w-full" />
//       </form>
//     </AuthLayout>
//   );
// };

// export default LoginPage;

import React, { useState } from "react";
import { Mail, EyeOff } from "lucide-react";
import AuthLayout from "../../components/AuthLayout";
import InputWithIcon from "@/components/InputWithIcon";
import SubmitButton from "@/components/SubmitButton";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

interface LoginResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  message?: string;
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post<LoginResponse>(
        "https://dalail-project-daoud.vercel.app/api/v1/auth/signIn",
        { email, password }
      );

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        toast.success("تم تسجيل الدخول بنجاح", {
          position: "top-center",
          duration: 1000,
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setError(response.data.message || "فشل تسجيل الدخول");
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiError = (err: unknown) => {
    // Universal type-safe error handling
    if (err && typeof err === "object" && "isAxiosError" in err) {
      const axiosError = err as {
        response?: {
          data?: {
            message?: string;
            err?: string;
          };
        };
      };
      setError(axiosError.response?.data?.err || "حدث خطأ غير متوقع");
    } else if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("حدث خطأ غير متوقع");
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <h2 className="text-2xl lg:text-3xl font-bold text-blue-700 mb-2 text-right">
          تسجيل الدخول
        </h2>
        {error && <div className="text-red-600 text-right">{error}</div>}
        <p className="text-sm text-gray-600 mb-8 lg:mb-10">
          ليس لديك حساب؟{" "}
          <Link
            to="/SignUp"
            className="text-blue-700 hover:underline font-medium"
          >
            إنشاء حساب
          </Link>
        </p>
        <InputWithIcon
          type="email"
          name="email"
          placeholder="البريد الالكتروني"
          icon={Mail}
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputWithIcon
          type="password"
          name="password"
          placeholder="كلمة السر"
          icon={EyeOff}
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="text-left mb-6">
          {" "}
          {/* Align link to the left (start in LTR) */}
          <a
            href="/forgot-password"
            className="text-sm text-black hover:underline hover:text-blue-700"
          >
            هل نسيت كلمة السر؟
          </a>
        </div>
        <SubmitButton
          type="submit"
          label="ارسال"
          className="text-center w-full"
        />
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
