import React from "react";
import Button from "./Button";
import seachIcon from "../../assets/icons/Search.svg";
import { useSearchLogic } from "../../hooks/useSearchLogic";
import { useTranslation } from "react-i18next";

const SearchComponent = () => {
  const { t, i18n } = useTranslation();
  const {
    searchTerm,
    results,
    isTyping,
    handleChange,
    handleSelect,
  } = useSearchLogic();

  return (
    <div className="flex flex-col items-center w-full max-w-96 relative">
      <div className="flex justify-center items-center w-full gap-0.5 pl-0.5 border border-neutral-400 rounded-[var(--radius-sm)] overflow-hidden bg-white">
        <div className="search-icon h-full">
          <img src={seachIcon} alt="Search Icon" className="w-5 h-5 opacity-70" />
        </div>
        <div className="search-input flex-1">
          <input
            type="text"
            placeholder={t("search.placeholder")}
            value={searchTerm}
            onChange={handleChange}
            className="w-full outline-0 px-2 py-1.5 text-sm text-gray-700 placeholder-gray-400"
          />
        </div>
        <div className="search-button">
          <Button variant="primary" className="rounded-none text-sm px-4">
            {t("search.button")}
          </Button>
        </div>
      </div>

      {searchTerm && (
        <div
          className={`absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-[var(--radius-md)] shadow-md overflow-hidden z-10 
          ${i18n.language === "ar" ? "text-right" : "text-left"}`}
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
                className="px-3 py-2 text-sm text-gray-700 hover:bg-[var(--color-soft-primary)] cursor-pointer transition-all duration-200"
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
