import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const getToastStyles = () => {
    switch (type.appearance) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'warning':
        return 'bg-[var(--color-warning)] text-white';
      case 'info':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-green-500 text-white';
    }
  };

  return (
    <div
      className={`
        fixed top-4 right-4 z-50 max-w-sm w-full
        transform transition-all duration-300 ease-in-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
    >
      <div className={`
        ${getToastStyles()}
        rounded-sm shadow-sm p-4 flex items-center gap-3
      `}>
        {type.appearance === 'success' ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : type.appearance === 'warning' ? <AlertCircle className="w-5 h-5 flex-shrink-0" /> :type.appearance === 'info' ? <Info className="w-5 h-5 flex-shrink-0" /> : <X className="w-5 h-5 flex-shrink-0" />}
        <span className="flex-1 text-sm font-medium">{message}</span>
        <button
          onClick={handleClose}
          className="flex-shrink-0 hover:bg-black hover:bg-opacity-20 rounded-full p-1 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
