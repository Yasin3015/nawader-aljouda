// src/components/auth/PasswordInput.jsx
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({ 
  name, 
  placeholder = "Password", 
  value, 
  onChange, 
  error,
  required = false,
  disabled = false,
  isRTL = false,
  className = ""
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full">
      <div className="relative">
        <input
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          dir={isRTL ? "rtl" : "ltr"}
          className={`w-full border rounded-[var(--radius-md)] px-3 py-2 
            ${isRTL ? 'pl-10 pr-3' : 'pr-10 pl-3'}
            focus:outline-none focus:ring-2 focus:ring-[var(--color-soft-primary)]
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${className}`}
        />
        <button 
          type="button" 
          onClick={() => setShowPassword((v) => !v)} 
          className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 
            text-gray-400 hover:text-gray-600 transition-colors focus:outline-none`}
          tabIndex={-1}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>
      {error && (
        <p className={`text-xs text-red-600 mt-1 ${isRTL ? 'text-right' : 'text-left'}`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default PasswordInput;