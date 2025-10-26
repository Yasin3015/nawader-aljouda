import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp } from 'lucide-react';
import FormInput from '../auth/FormInput';
import FormTextarea from '../auth/FormTextarea';

const BasicInfoSection = ({ 
  formData, 
  onChange, 
  errors, 
  isOpen = true, 
  onToggle 
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...formData, [name]: value });
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
        <h3 className="text-lg font-semibold text-green-600 flex items-center gap-2">
          {t('product.basicInfo')}
        </h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {/* Content */}
      {isOpen && (
        <div className="px-3 pb-6 space-y-4">
          {/* Product Name - English */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('product.productNameEn')} <span className="text-red-500">*</span>
            </label>
            <FormInput
              name="nameEn"
              type="text"
              placeholder={t('product.enterProductNameEn')}
              value={formData.nameEn}
              onChange={handleChange}
              error={errors.nameEn}
            />
          </div>

          {/* Product Name - Arabic */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('product.productNameAr')} <span className="text-red-500">*</span>
            </label>
            <FormInput
              name="nameAr"
              type="text"
              placeholder={t('product.enterProductNameAr')}
              value={formData.nameAr}
              onChange={handleChange}
              error={errors.nameAr}
              className={isRTL ? 'text-right' : ''}
            />
          </div>

          {/* Description - English */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('product.descriptionEn')} <span className="text-red-500">*</span>
            </label>
            <FormTextarea
              name="descriptionEn"
              placeholder={t('product.enterDescriptionEn')}
              value={formData.descriptionEn}
              onChange={handleChange}
              error={errors.descriptionEn}
              rows={4}
            />
          </div>

          {/* Description - Arabic */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('product.descriptionAr')} <span className="text-red-500">*</span>
            </label>
            <FormTextarea
              name="descriptionAr"
              placeholder={t('product.enterDescriptionAr')}
              value={formData.descriptionAr}
              onChange={handleChange}
              error={errors.descriptionAr}
              rows={4}
              className={isRTL ? 'text-right' : ''}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicInfoSection;