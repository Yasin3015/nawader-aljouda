import React from "react";
import { useTranslation } from "react-i18next";
import { useCreateProductLogic } from "../../hooks/useCreateProductLogic";
import { categories } from "../../FakeData/Categories";

import Button from "../UI/Button";
import BasicInfoSection from "./BasicInfoSection";
import NumbersDetailsSection from "./NumbersDetailsSection";
import AdditionalInfoSection from "./AdditionalInfoSection";
import ImageUploader from "./ImageUploader";

const CreateProductPage = () => {
  const { t, i18n } = useTranslation();
  const {
    isRTL,
    formData,
    setFormData,
    images,
    setImages,
    errors,
    isSubmitting,
    handleSubmit,
    handleCancel,
    handleSectionToggle,
    sectionsOpen,
    isEditMode,
  } = useCreateProductLogic(t, i18n);

  return (
    <div className={`min-h-screen !min-w-full ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <div className="w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditMode ? t("product.editProduct") : t("product.createProduct")}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {isEditMode
              ? t("product.editProductDescription")
              : t("product.createProductDescription")}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <BasicInfoSection
                formData={formData}
                onChange={setFormData}
                errors={errors}
                isOpen={sectionsOpen.basicInfo}
                onToggle={() => handleSectionToggle("basicInfo")}
              />

              <NumbersDetailsSection
                formData={formData}
                onChange={setFormData}
                errors={errors}
                categories={categories}
                isOpen={sectionsOpen.numbersDetails}
                onToggle={() => handleSectionToggle("numbersDetails")}
              />

              <AdditionalInfoSection
                formData={formData}
                onChange={setFormData}
                errors={errors}
                isOpen={sectionsOpen.additionalInfo}
                onToggle={() => handleSectionToggle("additionalInfo")}
              />
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t("product.productGallery")}
                </h3>
                <ImageUploader
                  images={images}
                  onChange={setImages}
                  maxImages={5}
                  error={errors.images}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4 justify-end">
            <Button type="button" variant="secondary" onClick={handleCancel} disabled={isSubmitting}>
              {t("common.cancel")}
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting
                ? t("product.saving")
                : isEditMode
                ? t("product.updateProduct")
                : t("product.createProduct")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(CreateProductPage);
