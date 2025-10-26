import React from 'react';
import { useTranslation } from 'react-i18next';

const StatusTabs = ({ activeTab, onTabChange, counts }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const tabs = [
    { id: 'all', label: t('orders.all'), count: counts.all },
    { id: 'completed', label: t('orders.completed'), count: counts.completed },
    { id: 'onTheWay', label: t('orders.onTheWay'), count: counts.onTheWay },
    { id: 'processing', label: t('orders.processing'), count: counts.processing },
    { id: 'canceled', label: t('orders.canceled'), count: counts.canceled },
  ];

  return (
    <div 
      className="flex items-center p-1 gap-1 bg-gray-200 rounded-sm w-fit overflow-x-auto scrollbar-hide"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`p-1 text-sm whitespace-nowrap transition-colors relative
            ${activeTab === tab.id 
              ? 'bg-white px-2 rounded-sm' 
              : 'text-gray-600 hover:text-gray-900'}`}
        >
          {tab.label}
        </button>
      ))}

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default StatusTabs;