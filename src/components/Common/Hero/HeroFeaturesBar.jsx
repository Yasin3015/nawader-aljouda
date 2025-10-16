import React from "react";
import { useTranslation } from "react-i18next";
import car from "../../../assets/icons/car.svg";
import headphones from "../../../assets/icons/headphones.svg";
import shoppingBag from "../../../assets/icons/shopping-bag.svg";
import box from "../../../assets/icons/package.svg";

const features = [
  { icon: car, titleKey: "freeShipping", descKey: "freeShippingDesc" },
  { icon: headphones, titleKey: "support247", descKey: "supportDesc" },
  { icon: shoppingBag, titleKey: "securePayment", descKey: "securePaymentDesc" },
  { icon: box, titleKey: "moneyBack", descKey: "moneyBackDesc" },
];

const HeroFeaturesBar = () => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 bg-[var(--color-white)] rounded-[var(--radius-md)] shadow-[0_4px_25px_rgba(0,0,0,0.05)] px-4 py-8 md:px-8 md:py-10 transition-all duration-300">
      {features.map(({ icon, titleKey, descKey }) => (
        <div
          key={titleKey}
          className="flex items-center gap-4 text-[var(--color-gray-9)]"
        >
          <div className="w-12 h-12 flex items-center justify-center bg-[var(--color-soft-primary)]/10 rounded-full">
            <img src={icon} alt={t(titleKey)} className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-sm md:text-base">
              {t(titleKey)}
            </h4>
            <p className="text-xs md:text-sm text-[var(--color-gray-6)] leading-snug">
              {t(descKey)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroFeaturesBar;
