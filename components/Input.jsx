import React, { useState } from "react";
import { useField } from "formik";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Input = ({ placeholder, type = "text", name, className, ...props }) => {
  const [field, meta] = useField({ name, ...props });
  const [showPassword, setShowPassword] = useState(false);

  // Decide the actual type (toggle if password)
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
  
    <div className="mb-4 relative">
      <input
        {...field} // connects Formik state
        type={inputType}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-4 py-2 pr-10 focus:outline-none focus:ring-2 
          ${meta.touched && meta.error 
            ? "border-red-500 focus:ring-red-400" 
            : "border-gray-300 focus:ring-sky-400"} 
          ${className || ""}`}
        {...props}
      />

      {/* 👁 Eye toggle only for password fields */}
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-center text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </button>
      )}

      {meta.touched && meta.error && (
        <span className="text-red-500 text-sm ">{meta.error}</span>
      )}
    </div>
  );
};

export default Input;
