import React from "react";
import { useTranslation } from "react-i18next";
import arrow from '../../../assets/icons/softPrimaryArrow.svg'
import { useNavigate } from "react-router-dom";

const HeroSideCard = ({ titleKey, subtitleKey, buttonKey, bg, number }) => {
  const { t } = useTranslation();
  const navigate = useNavigate()

  return (
    <div
      className={`relative rounded-[var(--radius-lg)] overflow-hidden flex-1 bg-cover bg-center`}
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className={`absolute inset-0 ${number===2?'bg-[var(--color-primary-layer)] !text-center':"bg-black/60"}  flex flex-col justify-center p-6 text-white`}>
        <p className={`text-xs uppercase tracking-wide text-[var(--color-white)] font-medium ${number===2&&'text-[var(--color-white)]'}`}>
          {t(titleKey)}
        </p>
        <h3 className={`text-lg md:text-xl font-semibold leading-snug ${number===2&&'w-3/4 mx-auto !text-2xl'} ${number===1&&'!text-4xl'}`}>
          {t(subtitleKey)}
        </h3>
        <button onClick={()=>{navigate('/browse')}} className={`mt-3 text-sm md:text-base text-[var(--color-soft-primary)] font-medium hover:underline flex items-center justify-center transition-all w-fit cursor-pointer ${number===2&&'mx-auto'}`}>
          {t(buttonKey)}
          <img src={arrow} alt={t("directionArrow")} className="px-1 h-3"/>
        </button>
      </div>
    </div>
  );
};

export default HeroSideCard;
