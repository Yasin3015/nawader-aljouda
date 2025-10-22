import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ProductRow from './ProductRow';
import ReviewsSection from './ReviewsSection';
import ProductVideo from './ProductVideo';

const ProductTabs = ({ product, relatedProducts = [] }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('additional-info');

  const tabs = [
    {
      id: 'additional-info',
      label: t('productInfo.tabs.additionalInfo'),
      content: <AdditionalInfoContent product={product} />
    },
    {
      id: 'reviews',
      label: t('productInfo.tabs.reviews'),
      content: <ReviewsSection reviews={product.reviews || []} />
    }
  ];

  return (
    <div className="mt-8">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-green-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="py-6">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

// Additional Info Content Component
const AdditionalInfoContent = ({ product }) => {
  const { t } = useTranslation();

  const additionalInfo = [
    {
      label: t('productInfo.additionalInfo.weight'),
      value: product.weight || '1 كيلو'
    },
    {
      label: t('productInfo.additionalInfo.type'),
      value: product.type || 'نحاس'
    },
    {
      label: t('productInfo.additionalInfo.classification'),
      value: product.classification || 'معدن'
    },
    {
      label: t('productInfo.additionalInfo.stockStatus'),
      value: product.stockStatus || 'متوفر (5413)'
    },
    {
      label: t('productInfo.additionalInfo.tags'),
      value: product.tags || 'سلوك كهرباء معدن مصري الاكثر مبيع التماس'
    }
  ];

  return (
    <>
    <div className="!w-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-20">
    <div className="!flex-1 !w-full">
      {additionalInfo.map((info, index) => (
        <ProductRow
          key={index}
          label={info.label}
          value={info.value}
        />
      ))}
    </div>
    <div className="w-full !md:w-2/3 !flex-1">
      <ProductVideo/>
    </div>
    </div>
    </>
  );
};

export default ProductTabs
