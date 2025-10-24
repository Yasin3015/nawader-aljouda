import React from "react";
import { useTranslation } from "react-i18next";

const BillingInfo = ({ billing, shipping }) => {
  const { t } = useTranslation();

  const InfoCard = ({ title, customer }) => (
    <div className="w-full md:w-1/2 border border-gray-200 rounded-md">
      <h3 className="text-sm p-4 font-semibold text-gray-400 uppercase tracking-wide mb-4 border-b border-gray-200 pb-2">
        {title}
      </h3>
      <div className="space-y-2 px-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-1">
            {customer.name}
          </h4>
          <p className="text-gray-600 text-sm">{customer.address}</p>
        </div>

        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            {t("orderDetails.billingAddress.email")}
          </p>
          <p className="text-gray-700 text-sm">{customer.email}</p>
        </div>

        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            {t("orderDetails.billingAddress.phone")}
          </p>
          <p className="text-gray-700 text-sm">{customer.phone}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row col-span-1 md:col-span-2 gap-4">
      <InfoCard
        title={t("orderDetails.billingAddress.title")}
        customer={billing}
      />
      <InfoCard
        title={t("orderDetails.shippingAddress.title")}
        customer={shipping}
      />
    </div>
  );
};

export default BillingInfo;
