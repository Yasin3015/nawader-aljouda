import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../../UI/Container";
import MobileMenu from "./MobileMenu";
import { useCart } from "../../../contexts/CartContext";
import search from "../../../assets/icons/Search.svg";
import cartIcon from "../../../assets/icons/Bag.svg";
import menu from "../../../assets/icons/menu.svg";
import logo from "../../../assets/images/mobileLogo.svg";
import phone from "../../../assets/icons/PhoneCall.svg";
import { useAuth } from "../../../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import UserPages from "./UserPages";
import SearchComponent from "../../UI/SearchComponent";
import LanguageSwitcher from "./LanguageSwitcher";

const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const location = useLocation();
  const currentPage = location.pathname.split("/").filter(Boolean).pop() || "Home";
  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar";

  const { totalItems, totalPrice, toggleCart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate("/");
  };

  return (
    <>
      {/* 🔹 Search Slide-down */}
      <div
        className={`h-22 fixed top-0 left-0 w-full bg-white shadow-md z-50 transition-transform duration-300 ease-in-out ${
          showSearch ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="relative p-4 border-b border-gray-200 flex h-full !items-end">
          <button
            onClick={() => setShowSearch(false)}
            className={`absolute top-3 ${isRTL ? "left-4" : "right-4"} text-gray-600 text-xl`}
          >
            ✖
          </button>
          <SearchComponent />
        </div>
      </div>

      {/* 🔹 Main Nav */}
      <div className="lg:hidden bg-white border-b border-gray-200">
        <Container className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            {isAuthenticated() && (
              <UserPages
                toggleCart={toggleCart}
                totalItems={totalItems}
                totalPrice={totalPrice}
                user={user}
                isRTL={isRTL}
                setShowProfileMenu={setShowProfileMenu}
                showProfileMenu={showProfileMenu}
                handleLogout={handleLogout}
                cartIcon={cartIcon}
              />
            )}

            <img
              src={search}
              alt="Search"
              className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform duration-200"
              onClick={() => setShowSearch(true)}
            />
          </div>

          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Logo"
              className="h-8 object-contain hover:scale-105 transition-transform duration-300"
            />
          </Link>
          <button
            onClick={handleMenuToggle}
            className="transition-transform hover:scale-110 duration-200"
          >
            <img src={menu} alt="Menu" className="w-7 h-7" />
          </button>
        </Container>
      </div>

      {/* 🔹 Bottom Bar */}
      <div className="lg:hidden bg-black text-gray-300">
        <Container className="flex items-center justify-between py-2 text-sm">
          <LanguageSwitcher />
          <Link href="tel:+201234567890" className="text-gray-400 flex items-center gap-1">
            <img src={phone} alt="Phone" className="inline w-4 h-4" />
            <span className="text-white text-md">+20 123 456 7890</span>
          </Link>
        </Container>
      </div>
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/70 bg-opacity-40 z-40"
            onClick={() => setIsMenuOpen(false)}
          ></div>

          {/* القائمة نفسها */}
          <div
            className={`fixed top-0 ${
              isRTL ? "right-0" : "left-0"
            } w-4/5 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
              isMenuOpen
                ? isRTL
                  ? "translate-x-0"
                  : "translate-x-0"
                : isRTL
                ? "translate-x-full"
                : "-translate-x-full"
            }`}
          >
            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
          </div>
        </>
      )}
    </>
  );
};

export default MobileNav;
