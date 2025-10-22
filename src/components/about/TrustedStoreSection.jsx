import React from "react";
import { Star, Headphones, Truck, CreditCard } from "lucide-react";
import { useTranslation } from "react-i18next";
import image from "../../assets/images/about-img2.jpg";

const TrustedStoreSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const features = [
    {
      icon: <Star className="w-5 h-5 text-green-600" />,
      title: t("about.trustedStore.features.support.title"),
      description: t("about.trustedStore.features.support.description"),
    },
    {
      icon: <Headphones className="w-5 h-5 text-green-600" />,
      title: t("about.trustedStore.features.support.title"),
      description: t("about.trustedStore.features.support.description"),
    },
    {
      icon: <Truck className="w-5 h-5 text-green-600" />,
      title: t("about.trustedStore.features.shipping.title"),
      description: t("about.trustedStore.features.shipping.description"),
    },
    {
      icon: <CreditCard className="w-5 h-5 text-green-600" />,
      title: t("about.trustedStore.features.payment.title"),
      description: t("about.trustedStore.features.payment.description"),
    },
  ];

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="py-16 relative overflow-hidden bg-white"
    >
      {/* ✅ الخلفية تظهر فقط على الشاشات الكبيرة */}
      <div
        className="hidden lg:block absolute inset-0 bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to ${
            isRTL ? "left" : "right"
          }, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 20%, rgba(255,255,255,0) 100%), url(${image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "44%",
          backgroundPosition: isRTL ? "left 40%" : "right 40%",
        }}
      />

      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* النص */}
          <div
            className={`space-y-8 flex flex-col relative z-10 ${
              isRTL
                ? "lg:order-2 items-end text-right ml-auto"
                : "lg:order-1 text-left"
            }`}
          >
            {/* ===== الموبايل ===== */}
            <div className="block lg:hidden text-center space-y-6 relative">
              <h2 className="text-3xl md:text-4xl font-bold text-green-900 leading-snug">
                {t("about.trustedStore.title")} <br />
                {t("about.trustedStore.subtitle")}
              </h2>

              <p className="text-gray-600 text-base leading-relaxed max-w-xl mx-auto">
                {t("about.trustedStore.description")}
              </p>

              <div className="w-full max-w-md mx-auto relative overflow-hidden bg-white rounded-sm">
                <img
                  src={image}
                  alt="trusted"
                  className="w-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-transparent to-white" />
              </div>

              <div className="flex flex-col space-y-5 w-full max-w-md mx-auto">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-start gap-3 shadow-sm p-3 rounded-sm ${
                      isRTL
                        ? "flex-row-reverse text-right"
                        : "flex-row text-left"
                    }`}
                  >
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">
                        {feature.title}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ===== الديسكتوب ===== */}
            <div className="hidden lg:block space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                {t("about.trustedStore.title")}
              </h2>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {t("about.trustedStore.subtitle")}
              </h3>

              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                {t("about.trustedStore.description")}
              </p>

              <div className="grid grid-cols-2 gap-4 w-full">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 p-4 justify-start`}
                  >
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {feature.title}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedStoreSection;
