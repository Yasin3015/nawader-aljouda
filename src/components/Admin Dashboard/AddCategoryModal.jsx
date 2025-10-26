import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import FormInput from '../auth/FormInput';
import Button from '../UI/Button';
import { z } from 'zod';

// Zod Schema for validation
const categorySchema = z.object({
  name: z.string()
    .min(2, 'Category name must be at least 2 characters')
    .max(50, 'Category name must not exceed 50 characters'),
  image: z.any()
    .refine((file) => file !== null, 'Image is required')
    .refine((file) => {
      if (!file) return false;
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
      return validTypes.includes(file.type);
    }, 'Only .jpg, .jpeg, .png and .webp formats are supported')
    .refine((file) => {
      if (!file) return false;
      return file.size <= 5000000; // 5MB
    }, 'Max file size is 5MB'),
});

const AddCategoryModal = ({ isOpen, onClose, onAdd }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const [formData, setFormData] = useState({
    name: '',
    image: null,
  });
  
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Clear image error if exists
      if (errors.image) {
        setErrors(prev => ({ ...prev, image: undefined }));
      }
    }
  };

  const handleNameChange = (e) => {
    setFormData(prev => ({ ...prev, name: e.target.value }));
    // Clear name error if exists
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      // Validate form data
      categorySchema.parse(formData);
      
      // Call onAdd callback
      await onAdd({
        name: formData.name,
        image: imagePreview,
        file: formData.image,
      });
      
      // Reset form and close modal
      handleClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error('Error adding category:', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', image: null });
    setImagePreview(null);
    setErrors({});
    setIsSubmitting(false);
    onClose();
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div 
        className={`bg-white rounded-lg shadow-xl w-full max-w-md ${isRTL ? 'rtl' : 'ltr'}`}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {t('categories.addNewCategory')}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('categories.categoryImage')} <span className="text-red-500">*</span>
            </label>
            
            <div
              onClick={handleImageClick}
              className={`relative w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors
                ${errors.image ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-green-500 bg-gray-50'}`}
            >
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage();
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <Upload className="w-12 h-12 mb-2" />
                  <p className="text-sm font-medium">{t('categories.clickToUpload')}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {t('categories.imageFormats')}
                  </p>
                </div>
              )}
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              onChange={handleImageChange}
              className="hidden"
            />
            
            {errors.image && (
              <p className="text-xs text-red-500 mt-1">{errors.image}</p>
            )}
          </div>

          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('categories.categoryName')} <span className="text-red-500">*</span>
            </label>
            <FormInput
              name="name"
              type="text"
              placeholder={t('categories.enterCategoryName')}
              value={formData.name}
              onChange={handleNameChange}
              error={errors.name}
              disabled={isSubmitting}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? t('categories.adding') : t('categories.addCategory')}
            </Button>
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={handleClose}
              disabled={isSubmitting}
            >
              {t('common.cancel')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;