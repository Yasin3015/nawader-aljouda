import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductSchema } from "../validation/getProductSchemas";

export const useCreateProductLogic = (t, i18n) => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const isEditMode = !!productId;

  const [formData, setFormData] = useState({
    nameEn: "",
    nameAr: "",
    descriptionEn: "",
    descriptionAr: "",
    category: "",
    price: "",
    stockQuantity: "",
    tagEn: [],
    tagAr: [],
    addShipping: false,
    shippingAmount: "",
    hasDiscount: false,
    discountPercent: "",
    startDate: "",
    endDate: "",
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [sectionsOpen, setSectionsOpen] = useState({
    basicInfo: true,
    numbersDetails: true,
    additionalInfo: true,
  });

  const isRTL = i18n.language === "ar";

  // تحميل بيانات المنتج في حالة التعديل
  useEffect(() => {
    if (isEditMode) loadProductData(productId);
  }, [productId, isEditMode]);

  const loadProductData = useCallback(async (id) => {
    try {
      // Replace with actual API call
      const mockProduct = {
        nameEn: "Sample Product",
        nameAr: "منتج تجريبي",
        descriptionEn: "This is a sample product description",
        descriptionAr: "هذا وصف منتج تجريبي",
        category: "1",
        price: "110.40",
        stockQuantity: "100",
        tagEn: Array.isArray(mockProduct.tagEn)
        ? mockProduct.tagEn
        : mockProduct.tagEn?.split(',').map((t) => t.trim()).filter(Boolean) || [],
        tagAr: Array.isArray(mockProduct.tagAr)
        ? mockProduct.tagAr
        : mockProduct.tagAr?.split(',').map((t) => t.trim()).filter(Boolean) || [],
        addShipping: true,
        shippingAmount: "10",
        hasDiscount: true,
        discountPercent: "15",
        startDate: "2025-01-01",
        endDate: "2025-12-31",
        images: [{ id: "1", preview: "https://via.placeholder.com/300" }],
      };

      setFormData(mockProduct);
      setImages(mockProduct.images || []);
    } catch (error) {
      console.error("Error loading product:", error);
    }
  }, []);

  const handleSectionToggle = useCallback((section) => {
    setSectionsOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      const schema = getProductSchema(t);
      schema.parse(formData);

      if (images.length === 0) {
        setErrors({ images: t("errors.atLeastOneImage") });
        setIsSubmitting(false);
        return;
      }

      const productData = { ...formData, images: images.map((img) => img.file) };

      if (isEditMode) {
        console.log("Updating product:", productId, productData);
      } else {
        console.log("Creating product:", productData);
      }

      navigate("/dashboard/products");
    } catch (error) {
      if (error.errors) {
        const fieldErrors = {};
        error.errors.forEach((err) => (fieldErrors[err.path[0]] = err.message));
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = useCallback(() => navigate("/dashboard/products"), [navigate]);

  return {
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
  };
};
