import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MoreVertical, TrendingUp, Edit, Trash2 } from 'lucide-react';

export   const ProductCard = ({
  product,
  onAddToBestSeller,
  onEdit,
  onDelete,
}) => {
  const { t, i18n } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuAction = (action) => {
    setDropdownOpen(false);
    switch (action) {
      case 'bestSeller':
        onAddToBestSeller?.(product.id);
        break;
      case 'edit':
        onEdit?.(product.id);
        break;
      case 'delete':
        onDelete?.(product.id);
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.category}</p>
          <p className="font-semibold text-gray-900 mt-1">${product.price.toFixed(2)}</p>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            aria-label={t('products.moreOptions')}
          >
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </button>

          {dropdownOpen && (
            <div
              className={`absolute top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 min-w-[180px] ${
                isRTL ? 'left-0' : 'right-0'
              }`}
            >
              <button
                onClick={() => handleMenuAction('bestSeller')}
                className={`w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 ${
                  isRTL ? 'flex-row-reverse text-right' : ''
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                {t('products.addToBestSeller')}
              </button>
              <button
                onClick={() => handleMenuAction('edit')}
                className={`w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 ${
                  isRTL ? 'flex-row-reverse text-right' : ''
                }`}
              >
                <Edit className="w-4 h-4" />
                {t('products.editProduct')}
              </button>
              <button
                onClick={() => handleMenuAction('delete')}
                className={`w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 ${
                  isRTL ? 'flex-row-reverse text-right' : ''
                }`}
              >
                <Trash2 className="w-4 h-4" />
                {t('products.deleteProduct')}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="mb-3">
        <h4 className="text-sm font-medium text-gray-900 mb-1">{t('products.details')}</h4>
        <p className="text-sm text-gray-500">{product.description}</p>
      </div>

      {/* Stats */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">{t('products.sales')}</span>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-gray-900">{product.sales}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">{t('products.remainingProducts')}</span>
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 rounded-full"
                style={{ width: `${Math.min((product.remainingProducts / 1500) * 100, 100)}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-900">{product.remainingProducts}</span>
          </div>
        </div>
      </div>
    </div>
  );
};