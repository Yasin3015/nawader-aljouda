import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import Button from "../../UI/Button";
import arrowLeft from "../../../assets/icons/arrow-left.svg";
import { useState, useEffect } from "react";

const MobileMenu = ({ onClose, isOpen }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [lang, setLang] = useState(i18n.language);

  // 🔄 تحديث اللغة عند أي تغيير في i18n
  useEffect(() => {
    setLang(i18n.language);
  }, [i18n.language]);

  const navLinks = [
    { path: "/", label: t("home") },
    { path: "/browse", label: t("browse") },
    { path: "/about", label: t("about") },
    { path: "/contact", label: t("contact") },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col bg-white transform transition-transform duration-500 ease-in-out ${
        isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between w-full gap-3">
          <span className="font-semibold text-lg">{t("menu.title")}</span>
          <button
            onClick={onClose}
            className={`transition-transform duration-300 ${
              lang === "ar" ? "rotate-0" : "-rotate-180"
            }`}
          >
            <img src={arrowLeft} alt={t("menu.backAlt")} className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Links */}
      <div className="flex-1 px-6 py-6 flex flex-col gap-3">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              onClick={onClose}
              className={`relative flex items-center justify-between py-3 px-4 text-base transition-all duration-300 ${
                isActive
                  ? "bg-green-50 text-gray-800 font-medium"
                  : "hover:bg-gray-50 text-gray-600"
              }`}
            >
              {lang === "ar" ? (
                <>
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute left-0 top-0 h-full w-[3px] bg-green-500"></span>
                  )}
                </>
              ) : (
                <>
                  {isActive && (
                    <span className="absolute right-0 top-0 h-full w-[3px] bg-green-500"></span>
                  )}
                  <span>{link.label}</span>
                </>
              )}
            </Link>
          );
        })}

        <div className="mt-6">
          <LanguageSwitcher />
        </div>
      </div>

      {/* Footer */}
      <div className="px-10 flex justify-center gap-4 border-t border-gray-200 py-4">
        <Button
          variant="outline"
          className="w-1/2 text-gray-700 border border-gray-300"
        >
          {t("signup")}
        </Button>
        <Button variant="primary" className="w-1/2 bg-green-600 text-white">
          {t("login")}
        </Button>
      </div>
    </div>
  );
};

export default MobileMenu;
