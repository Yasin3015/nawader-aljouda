import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp } from 'lucide-react';
import FormInput from '../auth/FormInput';

const AdditionalInfoSection = ({ 
  formData, 
  onChange, 
  errors, 
  isOpen = true, 
  onToggle 
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      onChange({ ...formData, [name]: checked });
    } else {
      onChange({ ...formData, [name]: value });
    }
  };

  return (
    <div className="" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <button
        type="button"
        onClick={onToggle}
        className={`w-full px-3 mb-3 py-2.5 bg-[var(--color-green-gray-2)] flex items-center justify-between hover:bg-[var(--color-green-gray-3)] transition-colors
          ${isRTL ? 'flex-row-reverse' : ''}`}
      >
        <h3 className="text-lg font-semibold text-green-600">
          {t('product.additionalInfo')}
        </h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {/* Content */}
      {isOpen && (
        <div className="px-3 pb-2.5 space-y-4">
          {/* Add Shipping Checkbox */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="addShipping"
              checked={formData.addShipping}
              onChange={handleChange}
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label className="text-sm font-medium text-gray-700">
              {t('product.addShipping')}
            </label>
          </div>

          {/* Shipping Amount - Only show if addShipping is checked */}
          {formData.addShipping && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('product.shippingAmount')} <span className="text-red-500">*</span>
              </label>
              <FormInput
                name="shippingAmount"
                type="number"
                placeholder={t('product.enterShippingAmount')}
                value={formData.shippingAmount}
                onChange={handleChange}
                error={errors.shippingAmount}
              />
            </div>
          )}

          {/* Discount Checkbox */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="hasDiscount"
              checked={formData.hasDiscount}
              onChange={handleChange}
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label className="text-sm font-medium text-gray-700">
              {t('product.discount')}
            </label>
          </div>

          {/* Discount Details - Only show if hasDiscount is checked */}
          {formData.hasDiscount && (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Discount Percent */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('product.discountPercent')} <span className="text-red-500">*</span>
                </label>
                <FormInput
                  name="discountPercent"
                  type="number"
                  placeholder="%"
                  value={formData.discountPercent}
                  onChange={handleChange}
                  error={errors.discountPercent}
                />
              </div>

              {/* Final Price (Auto-calculated) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('product.finalPrice')}
                </label>
                <FormInput
                  name="finalPrice"
                  type="number"
                  placeholder="0"
                  value={
                    formData.price && formData.discountPercent
                      ? (formData.price - (formData.price * formData.discountPercent / 100)).toFixed(2)
                      : formData.price || '0'
                  }
                  disabled
                />
              </div>
            </div>
            {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('product.startDate')}
              </label>
              <FormInput
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                error={errors.startDate}
              />
            </div>
            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('product.endDate')}
              </label>
              <FormInput
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                error={errors.endDate}
              />
            </div>
          </div>
            </>
          )}

          
        </div>
      )}
    </div>
  );
};

export default AdditionalInfoSection;