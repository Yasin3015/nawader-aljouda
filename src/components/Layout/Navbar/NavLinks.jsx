// src/components/Navbar/NavLinks.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NavLinks = ({ onClick }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const links = [
    { to: "/", label: t("home") },
    { to: "/browse", label: t("browse") },
    { to: "/about", label: t("about_us") },
    { to: "/contact", label: t("contact_us") },
  ];

  return (
    <ul className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-[var(--color-gray-9)]">
      {links.map((link) => (
        <li key={link.to}>
          <Link
            to={link.to}
            onClick={onClick}
            className={`text-gray-400 transition-colors duration-300 hover:text-[var(--color-primary)] ${
              location.pathname === link.to ? "text-white font-semibold" : ""
            }`}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
