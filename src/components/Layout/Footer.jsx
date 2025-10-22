import React from "react";
import logo from "../../assets/images/mobileLogo.svg";
import applePay from "../../assets/icons/apple-pay.svg";
import visa from "../../assets/icons/visa.svg";
import discover from "../../assets/icons/discover.svg";
import mastercard from "../../assets/icons/mastercard.svg";
import secure from "../../assets/icons/secure.svg";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  // بيانات الأقسام
  const footerSections = [
    {
      key: "account",
      title: t("footer.sections.account.title"),
      links: [
        t("footer.sections.account.links.account"),
        t("footer.sections.account.links.orderHistory"),
        t("footer.sections.account.links.cart"),
        t("footer.sections.account.links.wishlist")
      ]
    },
    {
      key: "helps", 
      title: t("footer.sections.helps.title"),
      links: [
        t("footer.sections.helps.links.contact"),
        t("footer.sections.helps.links.faqs"),
        t("footer.sections.helps.links.terms"),
        t("footer.sections.helps.links.privacy")
      ]
    },
    {
      key: "proxy",
      title: t("footer.sections.proxy.title"), 
      links: [
        t("footer.sections.proxy.links.about"),
        t("footer.sections.proxy.links.shop"),
        t("footer.sections.proxy.links.product"),
        t("footer.sections.proxy.links.track")
      ]
    }
  ];

  // بيانات طرق الدفع
  const paymentMethods = [
    { src: applePay, alt: t("footer.bottom.payments.apple") },
    { src: visa, alt: t("footer.bottom.payments.visa") },
    { src: discover, alt: t("footer.bottom.payments.discover") },
    { src: mastercard, alt: t("footer.bottom.payments.master") },
    { src: secure, alt: t("footer.bottom.payments.secure") }
  ];

  return (
    <footer className="bg-[#121212] overflow-hidden text-gray-300 py-17 px-6 md:px-20 border-t border-gray-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        {/* Brand Section */}
        <div className="!flex-1 min-w-7/20">
          <div className="flex items-center mb-4">
            <img
              src={logo}
              alt={t("footer.brandName")}
              className="w-10 h-10 mr-2"
            />
            <h2 className="text-lg font-semibold text-white">
              {t("footer.brandName")}
            </h2>
          </div>
          <p className="text-sm mb-4 text-gray-400 leading-relaxed">
            {t("footer.description")}
          </p>
          <p className="text-sm">
            <span className="text-white">{t("footer.contactPhone")}</span> or{" "}
            <span className="text-green-500 underline">
              {t("footer.contactEmail")}
            </span>
          </p>
        </div>

        {/* Sections */}
        <div className="flex flex-col sm:flex-row justify-center gap-10 min-w-2/4">
          {footerSections.map((section, index) => (
            <div 
              key={section.key}
              className={`w-1/2 ${section.key === 'account' ? 'hidden md:block' : ''}`}
            >
              <h3 className="text-white font-semibold mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2 text-sm">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>{link}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>
          {t("footer.brandName")} {t("footer.bottom.year")}. {t("footer.bottom.rights")}
        </p>

        <div className="flex items-center space-x-3 mt-3 md:mt-0">
          {paymentMethods.map((method, index) => (
            <img 
              key={index}
              src={method.src} 
              alt={method.alt} 
              className="h-6" 
            />
          ))}
        </div>
      </div>
    </footer>
  );
}