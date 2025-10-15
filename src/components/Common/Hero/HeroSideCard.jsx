import React from "react";
import { useTranslation } from "react-i18next";

const HeroSideCard = ({ titleKey, subtitleKey, buttonKey, bg }) => {
  const { t } = useTranslation();

  return (
    <div
      className={`relative rounded-[var(--radius-lg)] overflow-hidden flex-1 bg-cover bg-center`}
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className={`absolute inset-0 ${bg==='../../../assets/images/sideCard2.jpg'?'bg-[var(--color-primary-layer)]':"bg-black/5"}  flex flex-col justify-center p-6 text-white`}>
        <p className="text-xs uppercase tracking-wide text-[var(--color-soft-primary)] font-medium">
          {t(titleKey)}
        </p>
        <h3 className="text-lg md:text-xl font-semibold leading-snug">
          {t(subtitleKey)}
        </h3>
        <button className="mt-3 text-sm md:text-base text-[var(--color-soft-primary)] font-medium hover:underline transition-all w-fit">
          {t(buttonKey)}
        </button>
      </div>
    </div>
  );
};

export default HeroSideCard;
