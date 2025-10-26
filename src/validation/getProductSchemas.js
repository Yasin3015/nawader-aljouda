import { z } from "zod";

export const getProductSchema = (t) =>
  z
    .object({
      nameEn: z.string().min(2, t("errors.nameEnMin")),
      nameAr: z.string().min(2, t("errors.nameArMin")),
      descriptionEn: z.string().min(10, t("errors.descriptionEnMin")),
      descriptionAr: z.string().min(10, t("errors.descriptionArMin")),
      category: z.string().min(1, t("errors.categoryRequired")),
      price: z
        .string()
        .min(1, t("errors.priceRequired"))
        .refine(
          (val) => !isNaN(Number(val)) && Number(val) > 0,
          t("errors.pricePositive")
        ),
      stockQuantity: z
        .string()
        .min(1, t("errors.stockRequired"))
        .refine(
          (val) => !isNaN(Number(val)) && Number(val) >= 0,
          t("errors.stockNonNegative")
        ),
      shippingAmount: z.string().optional(),
      discountPercent: z.string().optional(),
      addShipping: z.boolean().optional(),
      hasDiscount: z.boolean().optional(),
    })
    .refine(
      (data) => !(data.addShipping && !data.shippingAmount),
      { message: t("errors.shippingAmountRequired"), path: ["shippingAmount"] }
    )
    .refine(
      (data) => !(data.hasDiscount && !data.discountPercent),
      { message: t("errors.discountPercentRequired"), path: ["discountPercent"] }
    );
