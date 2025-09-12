import React from "react";
import { useField } from "formik";

const Select = ({ label, name, options = [], className, ...props }) => {
  const [field, meta, helpers] = useField({ name });

  return (
    <div className="mb-4">
      {label && <label className="block mb-1 font-medium">{label}</label>}

      <select
        {...props}
        name={name}
        value={field.value || ""} // <-- Controlled value
        onChange={(e) => helpers.setValue(e.target.value)} // <-- Formik aware
        onBlur={() => helpers.setTouched(true)}
        className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 
          ${meta.touched && meta.error
            ? "border-red-500 focus:ring-red-400"
            : "border-gray-300 focus:ring-sky-400"} 
          ${className || ""}`}
      >
        <option value="">-- Select {name} --</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default Select;
