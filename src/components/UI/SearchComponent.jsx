import React from "react";
import Button from "./Button";
import searchIcon from "../../assets/icons/Search.svg";
import { useSearchLogic } from "../../hooks/useSearchLogic";
import { useTranslation } from "react-i18next";

const SearchComponent = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar"; // 🔹 لتحديد الاتجاه حسب اللغة

  const { searchTerm, results, isTyping, handleChange, handleSelect } = useSearchLogic();

  return (
    <div
      className={`flex flex-col items-center w-full max-w-96 relative `}
      dir={isRTL ? "rtl" : "ltr"} // 🔹 يغير الاتجاه الكامل
    >
      {/* حاوية الإدخال */}
      <div
        className={`flex justify-center items-center w-full gap-0.5 ${
          isRTL ? "pr-0.5" : "pl-0.5"
        } border border-neutral-400 rounded-[var(--radius-sm)] overflow-hidden bg-white`}
      >
        {/* الأيقونة */}
        <div
          className={`search-icon h-full flex items-center ${
            isRTL ? "ml-1 rotate-180" : "mr-1"
          }`}
        >
          <img src={searchIcon} alt={t("search.iconAlt")} className={`w-5 h-5 opacity-70 ${isRTL && 'rotate-180'}`} />
        </div>

        {/* حقل البحث */}
        <div className="search-input flex-1">
          <input
            type="text"
            placeholder={t("search.placeholder")}
            value={searchTerm}
            onChange={handleChange}
            className={`w-full outline-0 px-2 py-1.5 text-sm text-gray-700 placeholder-gray-400 ${
              isRTL ? "text-right" : "text-left"
            }`}
          />
        </div>

        {/* زر البحث */}
        <div className="search-button">
          <Button variant="primary" className="rounded-none text-sm px-4">
            {t("search.button")}
          </Button>
        </div>
      </div>

      {/* قائمة النتائج */}
      {searchTerm && (
        <div
          className={`absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-[var(--radius-md)] shadow-md overflow-hidden z-10 ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          {isTyping ? (
            <p className="text-center text-gray-500 py-2 text-sm">
              {t("search.loading")}
            </p>
          ) : results.length > 0 ? (
            results.map((item, index) => (
              <div
                key={index}
                onClick={() => handleSelect(item)}
                className={`px-3 py-2 text-sm text-gray-700 hover:bg-[var(--color-soft-primary)] cursor-pointer transition-all duration-200 ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {item}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-2 text-sm">
              {t("search.noResults")}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;