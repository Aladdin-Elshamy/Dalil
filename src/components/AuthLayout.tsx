import React from "react";
import logo from "../assets/logo.png";
import illus from "../assets/image.png";

const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <div
    dir="rtl"
    className="flex flex-col items-center justify-center min-h-screen bg-[linear-gradient(244.96deg,_#E1F1F5_48.32%,_#5F8089_100%)]"
  >
    <div className="absolute top-6">
      <img src={logo} alt="DALIL Logo" className="h-16 lg:h-20 w-auto" />
    </div>
    <div className="flex flex-col md:flex-row items-center justify-center mt-20 px-4 w-full max-w-7xl">
      <div className="w-full md:w-2/5 p-6">{children}</div>
      <div className="hidden md:flex w-full md:w-3/5 justify-center">
        <img
          src={illus}
          alt="Illustration"
          className="w-full h-auto max-w-2xl 2xl:max-w-2xl object-contain"
        />
      </div>
    </div>
  </div>
);

export default AuthLayout;
