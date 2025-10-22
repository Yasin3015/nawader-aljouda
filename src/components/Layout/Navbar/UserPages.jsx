import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const UserPages = ({
  toggleCart,
  totalItems,
  totalPrice,
  user,
  isRTL,
  setShowProfileMenu,
  showProfileMenu,
  handleLogout,
  cartIcon,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {/* Desktop View - من 787px وفوق */}
      <div className="hidden md:flex !flex-1 !justify-end items-center gap-4">
        <Link
          to="/wishlist"
          className="relative flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-full transition"
          title={t("wishlist") || "قائمة الأمنيات"}
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </Link>

        {/* زر الـ Cart */}
        <div
          className="cart-btn flex items-center box-border cursor-pointer p-0 gap-2 justify-end hover:opacity-80 transition"
          onClick={toggleCart}
        >
          <div className="relative flex flex-col p-0 m-0 box-border items-center">
            <img src={cartIcon} alt="Cart" className="block w-10" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[var(--color-primary)] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <div className="cart-info">
            <span className="text-xs text-[var(--color-gray-9)] p-0 m-0">
              {t("cart")}
            </span>
            <p className="text-black text-xs font-bold p-0 m-0">
              ${totalPrice.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Avatar مع القائمة المنسدلة - Desktop */}
        <div
          className="relative"
          onMouseEnter={() => setShowProfileMenu(true)}
          onMouseLeave={() => setShowProfileMenu(false)}
        >
          <button className="flex items-center justify-center w-10 h-10 bg-[var(--color-primary)] text-white rounded-full hover:bg-opacity-90 transition font-medium">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </button>

          {/* القائمة المنسدلة - Desktop */}
          {showProfileMenu && (
            <div
              className={`absolute ${
                isRTL ? "left-0" : "right-0"
              } top-8 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50`}
            >
              {/* اسم المستخدم */}
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="font-medium text-sm text-gray-900">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500">{user?.email || ""}</p>
              </div>

              {/* Profile Link */}
              <Link
                to="/profile"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition text-sm"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {t("profile") || "الملف الشخصي"}
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-red-50 transition text-sm text-red-600"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                {t("logout") || "تسجيل الخروج"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile View - تحت 786px */}
      <div className="md:hidden relative">
        <button
          className="flex items-center justify-center w-10 h-10 bg-[var(--color-primary)] text-white rounded-full hover:bg-opacity-90 transition font-medium"
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        >
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </button>

        {/* القائمة المنسدلة - Mobile */}
        {showProfileMenu && (
          <div
            className={`absolute ${
              !isRTL ? "left-0" : "right-0"
            } top-12 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50`}
          >
            {/* اسم المستخدم */}
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="font-medium text-sm text-gray-900">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500">{user?.email || ""}</p>
            </div>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
              onClick={() => setShowProfileMenu(false)}
            >
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="text-sm">{t("wishlistTitle") || "قائمة الأمنيات"}</span>
            </Link>

            {/* Cart Link */}
            <button
              onClick={() => {
                toggleCart();
                setShowProfileMenu(false);
              }}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition w-full"
            >
              <div className="relative">
                <img src={cartIcon} alt="Cart" className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[var(--color-primary)] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">{t("cart") || "السلة"}</span>
                <span className="text-xs font-bold text-[var(--color-primary)]">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </button>

            {/* Profile Link */}
            <Link
              to="/profile"
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
              onClick={() => setShowProfileMenu(false)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="text-sm">{t("profile") || "الملف الشخصي"}</span>
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 hover:bg-red-50 transition text-red-600 border-t border-gray-100 mt-1"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="text-sm">{t("logout") || "تسجيل الخروج"}</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserPages;