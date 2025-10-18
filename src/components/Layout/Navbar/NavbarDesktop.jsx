import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Container from "../../UI/Container";
import Button from "../../UI/Button";
import logoEn from "../../../assets/images/logo-en.svg";
import logoAr from "../../../assets/images/logo-ar.svg";
import cartIcon from "../../../assets/icons/bag.svg";
import LanguageSwitcher from "./LanguageSwitcher";
import SearchComponent from "../../UI/SearchComponent";
import NavLinks from "./NavLinks";
import { useCart } from "../../../contexts/CartContext";

const NavbarDesktop = () => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  const isRTL = currentLang === "ar";
  const { totalItems, totalPrice, toggleCart } = useCart();
  return (
    <nav
      dir={isRTL ? "rtl" : "ltr"}
      className="w-full border-b border-[var(--color-gray-2)] bg-[var(--color-white)]"
    >
      <Container className="flex items-center justify-between py-3 gap-6 relative">
        <div className="flex-shrink-0">
          <img
            src={isRTL ? logoAr : logoEn}
            alt="Nawader Al-Jouda Logo"
            className="h-8 w-auto"
          />
        </div>
        <div className="w-[45%]">
          <SearchComponent />
        </div>
        <div className="flex items-end gap-4 ml-auto">
            <div 
              className="cart-btn flex items-center box-border w-34 cursor-pointer p-0 gap-2 justify-end"
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
                    <p className="text-black text-xs font-bold p-0 m-0">${totalPrice.toFixed(2)}</p>
                </div>
            </div>
          <Button variant="primary" className="cursor-pointer" size="md">
            {t("login")}
          </Button>

          <Button variant="outline" className="cursor-pointer" size="md">
            {t("signup")}
          </Button>
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
