import React from "react";
import { useTranslation } from "react-i18next";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) rangeWithDots.push(1, "…");
    else rangeWithDots.push(1);

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1)
      rangeWithDots.push("…", totalPages);
    else rangeWithDots.push(totalPages);

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="flex items-center justify-center gap-2"
    >
      {/* Previous Button */}
      <button
        onClick={() =>
          onPageChange(isRTL ? currentPage + 1 : currentPage - 1)
        }
        disabled={isRTL ? currentPage === totalPages : currentPage === 1}
        className={`p-2 rounded-lg transition-colors ${
          (isRTL && currentPage === totalPages) ||
          (!isRTL && currentPage === 1)
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <svg
          className={`w-5 h-5 transform ${
            isRTL ? "rotate-180" : ""
          } transition-transform`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) => (
          <React.Fragment key={index}>
            {page === "…" ? (
              <span className="px-3 py-2 text-gray-500">…</span>
            ) : (
              <button
                onClick={() => onPageChange(page)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentPage === page
                    ? "bg-green-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() =>
          onPageChange(isRTL ? currentPage - 1 : currentPage + 1)
        }
        disabled={isRTL ? currentPage === 1 : currentPage === totalPages}
        className={`p-2 rounded-lg transition-colors ${
          (isRTL && currentPage === 1) ||
          (!isRTL && currentPage === totalPages)
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <svg
          className={`w-5 h-5 transform ${
            isRTL ? "rotate-180" : ""
          } transition-transform`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
