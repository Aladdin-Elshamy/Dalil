import AuthLayout from "../../components/AuthLayout";
import InputWithIcon from "../../components/InputWithIcon";
import { Mail } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

interface ForgotPasswordResponse {
  message: string;
}

const ForgotPassworPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await axios.patch<ForgotPasswordResponse>(
        "https://dalail-project-daoud.vercel.app/api/v1/auth/forgetPassword",
        { email }
      );

      setSuccess(
        response.data.message || "تم إرسال كود التحقق إلى بريدك الإلكتروني"
      );
      toast.success(
        response.data.message || "تم إرسال كود التحقق إلى بريدك الإلكتروني",
        {
          duration: 2000,
          position: "top-center",
        }
      );
      setTimeout(() => {
        navigate("/verify", { state: { email } });
      }, 2000);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "حدث خطأ أثناء معالجة الطلب، حاول مرة أخرى"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl lg:text-3xl font-bold text-blue-700 mb-2 text-right">
        نسيت كلمة السر
      </h2>
      <p className="text-sm text-gray-700 mb-6 text-right">
        ادخل بريدك الالكتروني لارسال كود التحقق لاعادة تعيين كلمة السر
      </p>
      <form onSubmit={handleSubmit} className="w-full">
        <InputWithIcon
          type="email"
          name="email"
          placeholder="البريد الالكتروني"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {error && (
          <p className="text-red-500 text-sm mt-2 text-right">{error}</p>
        )}
        {success && (
          <p className="text-green-500 text-sm mt-2 text-right">{success}</p>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full text-center mx-auto block bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 font-semibold text-lg shadow-md ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "جاري الإرسال..." : "ارسال"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassworPage;
