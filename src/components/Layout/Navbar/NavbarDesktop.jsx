import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Container from "../../UI/Container";
import Button from "../../UI/Button";
import logoEn from "../../../assets/images/Logo-en.svg";
import logoAr from "../../../assets/images/Logo-ar.svg";
import cartIcon from "../../../assets/icons/bag.svg";
import LanguageSwitcher from "./LanguageSwitcher";
import SearchComponent from "../../UI/SearchComponent";
import NavLinks from "./NavLinks";
import { useCart } from "../../../contexts/CartContext";
import { useAuth } from "../../../contexts/AuthContext";
import UserPages from "./UserPages";

const NavbarDesktop = () => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  const isRTL = currentLang === "ar";
  const { totalItems, totalPrice, toggleCart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate('/');
  };

  return (
    <nav
      dir={isRTL ? "rtl" : "ltr"}
      className="w-full border-b border-[var(--color-gray-2)] bg-[var(--color-white)]"
    >
      <Container className="flex items-center justify-between py-3 gap-6 relative">
        <div className="flex-shrink-0">
          <Link to="/">
            <img
              src={isRTL ? logoAr : logoEn}
              alt="Nawader Al-Jouda Logo"
              className="h-8 w-auto"
            />
          </Link>
        </div>
        
        <div className="w-[45%]">
          <SearchComponent />
        </div>
        
        <div className="flex !justify-end gap-4">
          {/* إذا المستخدم مسجل دخول */}
          {isAuthenticated() ? (
            <>
              {/* زر الـ Wishlist */}
              <UserPages toggleCart={toggleCart} totalItems={totalItems} totalPrice={totalPrice} user={user} isRTL={isRTL} setShowProfileMenu={setShowProfileMenu} showProfileMenu={showProfileMenu} handleLogout={handleLogout} cartIcon={cartIcon} />
            </>
          ) : (
            /* إذا المستخدم غير مسجل دخول */
            <>
              <Link to="/auth/login">
                <Button variant="primary" className="cursor-pointer" size="md">
                  {t("login")}
                </Button>
              </Link>

              <Link to="/auth/signup">
                <Button variant="outline" className="cursor-pointer" size="md">
                  {t("signup")}
                </Button>
              </Link>
            </>
          )}
        </div>
      </Container>
      
      <div className="bg-[var(--color-gray-9)] text-[var(--color-white)]">
        <Container className="flex justify-between items-center py-2 text-sm">
          <NavLinks />
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <span className="font-medium text-gray-300">+966 50 123 4567</span>
          </div>
        </Container>
      </div>
    </nav>
  );
};

export default NavbarDesktop;