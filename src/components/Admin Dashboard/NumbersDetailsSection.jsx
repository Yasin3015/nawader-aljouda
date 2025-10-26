import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp } from 'lucide-react';
import FormInput from '../auth/FormInput';
import CategoryDropdown from './CategoryDropdown';
import TagInput from '../UI/TagInput';

const NumbersDetailsSection = ({ 
  formData, 
  onChange, 
  errors, 
  categories,
  isOpen = true, 
  onToggle 
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...formData, [name]: value });
  };

  const handleCategoryChange = (categoryId) => {
    onChange({ ...formData, category: categoryId });
  };

  return (
    <div className="rounded-md" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <button
        type="button"
        onClick={onToggle}
        className={`w-full px-3 py-2.5 mb-3  bg-[var(--color-green-gray-2)] flex items-center justify-between hover:bg-[var(--color-green-gray-3)] transition-colors
          ${isRTL ? 'flex-row' : ''}`}
      >
        <h3 className="text-lg font-semibold text-green-600">
          {t('product.numbersDetails')}
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
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('product.category')} <span className="text-red-500">*</span>
            </label>
            <CategoryDropdown
              categories={categories}
              selectedCategory={formData.category}
              onChange={handleCategoryChange}
              error={errors.category}
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('product.price')} <span className="text-red-500">*</span>
            </label>
            <FormInput
              name="price"
              type="number"
              placeholder={t('product.enterPrice')}
              value={formData.price}
              onChange={handleChange}
              error={errors.price}
            />
          </div>

          {/* Stock Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('product.stockQuantity')} <span className="text-red-500">*</span>
            </label>
            <FormInput
              name="stockQuantity"
              type="number"
              placeholder={t('product.enterStockQuantity')}
              value={formData.stockQuantity}
              onChange={handleChange}
              error={errors.stockQuantity}
            />
          </div>

          {/* Tag - English */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('product.tagEn')}
            </label>
            <TagInput
              name="tagEn"
              placeholder={t('product.enterTagEn')}
              value={formData.tagEn}
              onChange={handleChange}
              error={errors.tagEn}
            />
          </div>

          {/* Tag - Arabic */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('product.tagAr')}
            </label>
            <TagInput
              name="tagAr"
              placeholder={t('product.enterTagAr')}
              value={formData.tagAr}
              onChange={handleChange}
              error={errors.tagAr}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NumbersDetailsSection;