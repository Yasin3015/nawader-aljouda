// src/components/common/FormTextarea.jsx
import React from "react";

const FormTextarea = ({ 
  name, 
  placeholder, 
  value, 
  onChange, 
  error,
  required = false,
  disabled = false,
  rows = 4,
  className = ""
}) => {
  return (
    <div className="w-full">
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        rows={rows}
        className={`w-full border rounded-lg px-4 py-3 
          focus:outline-none focus:ring-2 focus:ring-green-500
          disabled:bg-gray-100 disabled:cursor-not-allowed resize-none
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${className}`}
      />
      {error && (
        <p className="text-xs text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormTextarea;