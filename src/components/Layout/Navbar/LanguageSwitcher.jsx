import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "en", label: "English", dir: "ltr", font: "var(--font-en)" },
    { code: "ar", label: "العربية", dir: "rtl", font: "var(--font-ar)" },
  ];

  // ✅ تحميل اللغة المحفوظة أول ما الصفحة تفتح
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("appLanguage") || i18n.language || "en";
  });

  useEffect(() => {
    const selectedLang = languages.find((l) => l.code === lang);
    if (selectedLang) {
      i18n.changeLanguage(selectedLang.code);
      document.documentElement.dir = selectedLang.dir;
      document.body.style.fontFamily = selectedLang.font;
    }
  }, [lang]);

  const handleLanguageChange = (selectedLang) => {
    setLang(selectedLang.code);
    i18n.changeLanguage(selectedLang.code);

    document.documentElement.dir = selectedLang.dir;
    document.body.style.fontFamily = selectedLang.font;

    // ✅ حفظ اللغة المختارة في localStorage
    localStorage.setItem("appLanguage", selectedLang.code);

    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-23 bg-auto">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-gray-300 justify-between px-3 py-2 cursor-pointer select-none"
      >
        <span className="text-sm font-medium text-gray-300">
          {languages.find((l) => l.code === lang)?.label}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isOpen && (
        <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-md z-50">
          {languages.map((language) => (
            <li
              key={language.code}
              onClick={() => handleLanguageChange(language)}
              className={`text-black rounded-sm px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                lang === language.code ? "bg-gray-200 font-semibold" : ""
              }`}
            >
              {language.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;