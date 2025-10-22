// src/components/auth/FormInput.jsx
import React from "react";

const FormInput = ({ 
  name, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  error,
  required = false,
  disabled = false,
  className = ""
}) => {
  return (
    <div className="w-full">
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`w-full border rounded-[var(--radius-md)] px-3 py-2 
          focus:outline-none focus:ring-2 focus:ring-[var(--color-soft-primary)]
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${className}`}
      />
      {error && (
        <p className="text-xs text-[var(--color-danger)] mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;