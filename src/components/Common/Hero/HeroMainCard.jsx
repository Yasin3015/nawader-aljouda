import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../../UI//Button";
import arrow from '../../../assets/icons/primaryArrow.svg'
import heroImage from "../../../assets/images/mainCard.jpg"; 
import { useNavigate } from "react-router-dom";

const HeroMainCard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate()

  return (
    <div className="relative rounded-[var(--radius-lg)] overflow-hidden h-[450px] md:h-[520px]">
      <img
        src={heroImage}
        alt="Hero"
        className="w-full h-full object-cover"
      />
      <div
        className="absolute inset-0 bg-black/50 flex flex-col justify-center pl-8 pr-4 md:pl-12"
        dir="ltr"
      >
        <h1 className="text-white text-[28px] md:text-[40px] font-semibold leading-tight max-w-md">
          {t("buyIndustrialWaste")}{" "}
          <span className="text-[var(--color-warning)] font-semibold">
            {t("safelyAndEfficiently")}
          </span>
        </h1>

        <div className="mt-4 border-l-2 border-l-[var(--color-soft-primary)] px-2">
          <p className="text-sm md:text-base text-gray-200">
            {t("saleUpTo")}{" "}
            <span className="bg-[var(--color-hard-primary)] text-white px-2 rounded-md text-xl font-semibold">
              {t("off")}
            </span>
          </p>
          <p className="text-xs md:text-sm text-gray-300 mt-1">
            Verified sellers. Compliance-ready documents
          </p>
        </div>

        <Button
          onClick={()=>navigate('/browse')}
          size="md"
          className="cursor-pointer mt-6 w-fit bg-[var(--color-white)] !text-[var(--color-primary)] rounded-full"
        >
          {t("browseNow")}
          <img src={arrow} alt={t("directionArrow")} className="px-1 h-3" />
        </Button>
      </div>
    </div>
  );
};

export default HeroMainCard;

