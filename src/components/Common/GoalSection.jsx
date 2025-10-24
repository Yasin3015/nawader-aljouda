import React from "react";
import { useTranslation } from "react-i18next";
import ceo from '../../assets/images/ceo.png'

export default function GoalSection({ bg }) {
  const { t } = useTranslation();

  return (
    <section className="relative py-10 px-6">
      {/* الخلفية */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="absolute inset-0 bg-white/60" />

      {/* المحتوى */}
      <div className="relative max-w-4xl mx-auto text-center z-10">
        <h2 className="text-2xl mb-2 sm:text-3xl md:text-4xl font-bold !text-[var(--color-gray-9)]">
          {t("goalSection.title")}
        </h2>

        <div>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed mb-2 !text-[var(--color-gray-9)]">
            "
            <span>{t("goalSection.quote.text1")}</span>
            <span className="text-[var(--color-warning)] uppercase font-semibold">
              {t("goalSection.quote.text2")}
            </span>
            <span>{t("goalSection.quote.text3")}</span>
            "
          </p>

          <div className="flex flex-col items-center">
            <img
              src={ceo}
              alt={t("goalSection.quote.author.name")}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover bg-[var(--color-avatar-bg)] border-2 border-white"
            />
            <div className="text-center">
              <p className="font-semibold text-base sm:text-lg text-dark">
                {t("goalSection.quote.author.name")}
              </p>
              <p className="text-[var(--color-hard-primary)] text-sm sm:text-base">
                {t("goalSection.quote.author.position")},{" "}
                {t("goalSection.quote.author.company")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
