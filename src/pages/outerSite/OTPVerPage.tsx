import React, { useState, useRef, useEffect } from "react";
import AuthLayout from "../../components/AuthLayout";
import SubmitButton from "../../components/SubmitButton";
import InputWithIcon from "../../components/InputWithIcon";
import { Lock } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
interface ResetPassowrd {
  message: string;
}

const OTPVerPage: React.FC = () => {
  const OTP_LENGTH = 4;
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const location = useLocation();
  const [email, setEmail] = useState<string>(location.state.email); // Store email from previous page
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();
  const handleChange = (value: string, index: number) => {
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);
    if (index < otp.length - 1 && value) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const updated = [...otp];
        updated[index] = "";
        setOtp(updated);
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (password !== rePassword) {
      setError("كلمتا السر غير متطابقتين");
      setIsLoading(false);
      return;
    }

    try {
      console.log("hi");

      const response = await axios.patch<ResetPassowrd>(
        "https://dalail-project-daoud.vercel.app/api/v1/auth/resetePassword",
        {
          email,
          code: otp.join(""),
          password,
          rePassword,
        }
      );

      toast.success(response.data.message || "تم إعادة تعيين كلمة السر بنجاح", {
        position: "top-center",
        duration: 2000,
      });
      // Optionally redirect to login page
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "حدث خطأ أثناء إعادة تعيين كلمة السر، حاول مرة أخرى"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl lg:text-3xl font-bold text-blue-700 mb-2 text-right">
        التحقق
      </h2>
      <p className="text-sm text-gray-700 mb-6 text-right">
        أدخل الرمز المكون من 4 أرقام الذي تم إرساله على بريدك الإلكتروني
      </p>
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div dir="ltr" className="flex justify-center gap-3 mb-6">
          {[0, 1, 2, 3].map((i) => (
            <input
              key={i}
              ref={(el) => {
                inputsRef.current[i] = el;
              }}
              type="text"
              maxLength={1}
              value={otp[i]}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="w-20 h-20 text-center bg-white bg-opacity-0 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
          ))}
        </div>
        <InputWithIcon
          type="password"
          name="password"
          placeholder="كلمة السر الجديدة"
          icon={Lock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <InputWithIcon
          type="password"
          name="rePassword"
          placeholder="تأكيد كلمة السر"
          icon={Lock}
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          required
        />
        {error && (
          <p className="text-red-500 text-sm mt-2 text-right">{error}</p>
        )}
        {success && (
          <p className="text-green-500 text-sm mt-2 text-right">{success}</p>
        )}

        <SubmitButton
          label={isLoading ? "جاري الإرسال..." : "تأكيد"}
          disabled={isLoading}
          type="submit"
        />
      </form>
    </AuthLayout>
  );
};

export default OTPVerPage;
