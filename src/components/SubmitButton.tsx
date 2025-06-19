// import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../utilies";

interface SubmitButtonProps {
  label: string; // Changed from 'lable' to 'label' (correct spelling)
  link?: string; // Made optional
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  label, // Using correct spelling
  link,
  className,
  type = "button",
  disabled = false,
  onClick,
}) => {
  const buttonClasses = cn(
    "w-full text-center mx-auto block bg-blue-600 text-white py-3 rounded-md",
    "hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2",
    "focus:ring-blue-500 transition duration-200 font-semibold text-lg shadow-md",
    disabled ? "opacity-50 cursor-not-allowed" : "",
    className
  );

  if (link) {
    return (
      <Link to={link} className={buttonClasses}>
        {label}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default SubmitButton;