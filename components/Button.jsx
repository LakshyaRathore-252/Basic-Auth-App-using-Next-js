import React from "react";

const Button = ({ children, className, ...props }) => {
  return (
    <button

      className={`w-full py-2 rounded-lg font-medium text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
