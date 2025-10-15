import React from "react";
import { useTranslation } from "react-i18next";
import { Truck, Headphones, Lock, RotateCcw } from "lucide-react";

const features = [
  { icon: Truck, titleKey: "freeShipping", descKey: "freeShippingDesc" },
  { icon: Headphones, titleKey: "support247", descKey: "supportDesc" },
  { icon: Lock, titleKey: "securePayment", descKey: "securePaymentDesc" },
  { icon: RotateCcw, titleKey: "moneyBack", descKey: "moneyBackDesc" },
];

const HeroFeaturesBar = () => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 bg-[var(--color-white)] rounded-[var(--radius-lg)] shadow-sm p-4 md:p-6">
      {features.map(({ icon: Icon, titleKey, descKey }) => (
        <div
          key={titleKey}
          className="flex items-center gap-3 text-[var(--color-gray-9)]"
        >
          <div className="w-10 h-10 rounded-full bg-[var(--color-soft-primary)] flex items-center justify-center text-white">
            <Icon size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-sm md:text-base">{t(titleKey)}</h4>
            <p className="text-xs md:text-sm text-[var(--color-gray-6)]">
              {t(descKey)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroFeaturesBar;
