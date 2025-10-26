import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Check } from 'lucide-react';

const CategoryDropdown = ({ categories, selectedCategory, onChange, error, disabled = false }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (category) => {
    onChange(category);
    setIsOpen(false);
  };

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full px-4 py-2 border rounded-md flex items-center justify-between
          focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-transparent hover:border-gray-400'}
          ${isRTL ? 'text-right' : 'text-left'}`}
      >
        <span className={selectedCategoryData ? 'text-gray-900' : 'text-gray-400'}>
          {selectedCategoryData ? selectedCategoryData.title : t('product.selectCategory')}
        </span>
        <ChevronDown 
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className={`absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto
          ${isRTL ? 'left-0' : 'right-0'}`}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => handleSelect(category.id)}
              className={`w-full px-4 py-2 flex items-center justify-between hover:bg-gray-50 transition-colors
                ${isRTL ? 'text-right flex-row-reverse' : 'text-left'}
                ${selectedCategory === category.id ? 'bg-green-50' : ''}`}
            >
              <span className={selectedCategory === category.id ? 'text-green-600 font-medium' : 'text-gray-700'}>
                {category.title}
              </span>
              {selectedCategory === category.id && (
                <Check className="w-5 h-5 text-green-600" />
              )}
            </button>
          ))}
        </div>
      )}

      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default CategoryDropdown;