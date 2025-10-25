import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SearchComponent from '../UI/SearchComponent';

const SearchBar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ✅ لو الشاشة كبيرة (≥768) يعرض الكمبوننت بالكامل
  if (!isMobile) {
    return (
      <div className="max-w-3xl w-full">
        <SearchComponent />
      </div>
    );
  }

  // ✅ لو الشاشة صغيرة يظهر الزر فقط
  return (
    <div className="relative ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Search className="w-5 h-5 text-gray-600" />
      </button>

      {isOpen && (
        <>
          {/* overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setIsOpen(false)}
          />
          <div className=" top-0 !min-w-screen !transition-all !fixed !left-0 bg-white shadow-lg border-t animate-slideDown z-50">
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            <div className="max-w-3xl mx-auto p-4">
              <SearchComponent />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;
