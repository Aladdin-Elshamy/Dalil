// import { LucideIcon, Eye, EyeOff } from "lucide-react";
// import { useState } from "react";

// interface InputProps {
//     type: string;
//     name: string;
//     placeholder: string;
//     icon: LucideIcon;
//     value?: string;
//     onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// const InputWithIcon = ({ type, name, placeholder, icon: Icon, value, onChange }: InputProps) => {
//     const [showPassword, setShowPassword] = useState(false);
//     const isPasswordField = type === "password";

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     return (
//         <div className="relative mb-5">
//             <input
//                 type={isPasswordField ? (showPassword ? "text" : "password") : type}
//                 name={name}
//                 required
//                 placeholder={placeholder}
//                 className="w-full p-3 pr-10 bg-white bg-opacity-0 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right placeholder-gray-500 shadow-sm"
//                 value={value}
//                 onChange={onChange}
//             />
//             <span
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 cursor-pointer"
//                 onClick={isPasswordField ? togglePasswordVisibility : undefined}
//             >
//                 {isPasswordField ? (
//                     showPassword ? <Eye size={20} /> : <EyeOff size={20} />
//                 ) : (
//                     <Icon size={20} />
//                 )}
//             </span>
//         </div>
//     );
// };

// export default InputWithIcon;
import { LucideIcon, Eye, EyeOff } from "lucide-react";
import { useState, InputHTMLAttributes } from "react";
interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  icon: LucideIcon;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Extend InputHTMLAttributes to get all standard input props
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
}

const InputWithIcon = ({
  type,
  name,
  placeholder,
  icon: Icon,
  value,
  onChange,
  required,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  console.log(required);

  return (
    <div className="relative mb-5">
      <input
        type={isPasswordField ? (showPassword ? "text" : "password") : type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full p-3 pr-10 bg-white bg-opacity-0 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right placeholder-gray-500 shadow-sm"
        value={value}
        onChange={onChange}
        {...props} // Spread all other input props
      />
      <span
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 cursor-pointer"
        onClick={isPasswordField ? togglePasswordVisibility : undefined}
      >
        {isPasswordField ? (
          showPassword ? (
            <Eye size={20} />
          ) : (
            <EyeOff size={20} />
          )
        ) : (
          <Icon size={20} />
        )}
      </span>
    </div>
  );
};

export default InputWithIcon;
