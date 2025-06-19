import React from "react";
import { EyeOff } from "lucide-react";
import AuthLayout from "../../components/AuthLayout";
import InputWithIcon from "@/components/InputWithIcon";
import SubmitButton from "@/components/SubmitButton";

const UpdatePassword: React.FC = () => {
  const handlSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO add logic
    console.log("Form submitted");
  };

  return (
    <AuthLayout>
      <form onSubmit={handlSubmit} className="w-full space-y-6">
        <h2 className="text-2xl lg:text-3xl font-bold text-blue-700 mb-2 text-right">
          اعادة تعيين كلمة السر
        </h2>
        <p className="text-sm text-gray-600 mb-8 lg:mb-10">
          قم بإدخال كلمة سر جديدة
        </p>
        <InputWithIcon
          type="email"
          name="email"
          placeholder="كلمة السر"
          icon={EyeOff}
        />
        <InputWithIcon
          type="password"
          name="password"
          placeholder="تأكيد كلمة السر"
          icon={EyeOff}
        />
        <SubmitButton label="تأكيد كلمة السر" />
      </form>
    </AuthLayout>
  );
};

export default UpdatePassword;
