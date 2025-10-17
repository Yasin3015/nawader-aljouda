import React from "react";
import { useTranslation } from "react-i18next";
import ceo from '../../assets/images/ceo.png'

export default function GoalSection({ bg }) {
  const { t } = useTranslation();

  return (
    <section className="relative py-20 px-6">
      <div
        className="absolute !text-[var(--color-gray-9)] inset-0 bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="absolute inset-0 bg-white/60" />
      <div className="relative max-w-4xl mx-auto text-center z-10">
        <h2 className="text-3xl md:text-4xl !text-[var(--color-gray-9)] font-bold mb-12">
          {t("goalSection.title")}
        </h2>

        <div className="">
          <p className="!text-3xl !text-[var(--color-gray-9)] font-medium md:text-2xl leading-relaxed mb-8">
            "<span>{t("goalSection.quote.text1")}</span>
            <span className="text-[var(--color-warning)] uppercase font-semibold">{t("goalSection.quote.text2")}</span>
            <span>{t("goalSection.quote.text3")}</span>"
          </p>
          <div className="flex flex-col items-center">
            <img
              src={ceo}
              alt={t("goalSection.quote.author.name")}
              className="w-16 h-16 rounded-full object-cover bg-[var(--color-avatar-bg)] border-2 border-white mb-2"
            />
            <div className="text-center">
              <p className="font-semibold text-lg text-dark">
                {t("goalSection.quote.author.name")}
              </p>
              <p className="text-[var(--color-hard-primary)]">
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
