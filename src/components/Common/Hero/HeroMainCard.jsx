import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../../UI//Button";
import heroImage from "../../../assets/images/mainCard.jpg"; // استبدلها بمسارك

const HeroMainCard = () => {
  const { t } = useTranslation();

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

        <div className="mt-4">
          <p className="text-sm md:text-base text-gray-200">
            {t("saleUpTo")}{" "}
            <span className="bg-[var(--color-primary)] text-white px-2 py-1 rounded-md text-sm md:text-base font-semibold">
              30% OFF
            </span>
          </p>
          <p className="text-xs md:text-sm text-gray-300 mt-1">
            Verified sellers. Compliance-ready documents
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          className="mt-6 w-fit bg-[var(--color-soft-primary)] text-[var(--color-white)] hover:bg-[var(--color-hard-primary)]"
        >
          {t("browseNow")}
        </Button>
      </div>
    </div>
  );
};

export default HeroMainCard;

