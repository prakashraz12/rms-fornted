import * as z from "zod";

export const productSchema = z
  .object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().optional(),
    price: z.number().min(0, "Price must be a positive number").optional(),
    categoryId: z.string().min(1, "Category is required"),
    hasOffer: z.boolean(),
    offerPrice: z
      .number()
      .min(0, "Offer price must be a positive number")
      .optional(),
    offerValidUntil: z.date().optional(),
    inventoryId: z.string().optional(),
    isMultipleVariant: z.boolean(),
    variants: z
      .array(
        z.object({
          name: z.string().min(1, "Variant name is required"),
          price: z.number().min(0, "Variant price must be a positive number"),
        })
      )
      .optional(),
    isCombo: z.boolean(),
    isInventoryManagementEnabled: z.boolean(),
    minimumStockLevel: z.number().optional(),
    currentStockLevel: z.number().optional(),
    measurementUnit: z.enum(["kg", "ml", "pcs"]).optional(),
    comboProducts: z.array(
      z.object({
        productId: z.string().min(1, "Combo product is required"),
        quantity: z.number().min(1, "Quantity must be at least 1"),
      })
    ),
  })
  .superRefine((data, ctx) => {
    if (data.hasOffer) {
      if (data.offerPrice === undefined) {
        ctx.addIssue({
          code: "custom",
          path: ["offerPrice"],
          message: "Offer price is required when offer is enabled",
        });
      }

      if (!data.offerValidUntil) {
        ctx.addIssue({
          code: "custom",
          path: ["offerValidUntil"],
          message: "Offer valid until date is required when offer is enabled",
        });
      }
    }

    if (data.isCombo) {
      if (!data.comboProducts || data.comboProducts.length === 0) {
        ctx.addIssue({
          code: "custom",
          path: ["comboProducts"],
          message:
            "At least one combo product is required when combo is enabled",
        });
      }
    }
    if (data.isMultipleVariant) {
      if (!data.variants || data.variants.length === 0) {
        ctx.addIssue({
          code: "custom",
          path: ["variants"],
          message:
            "At least one variant is required when multiple variants are enabled",
        });
      } else {
        data.variants?.forEach((variant, index) => {
          if (variant.name.trim() === "") {
            ctx.addIssue({
              code: "custom",
              path: ["variants", index, "name"],
              message: "Variant name is required",
            });
          }
          if (variant.price === 0) {
            ctx.addIssue({
              code: "custom",
              path: ["variants", index, "price"],
              message: "Variant price must be a positive number",
            });
          }
        });
      }
    } else {
      if (data.price === undefined || data.price === 0) {
        ctx.addIssue({
          code: "custom",
          path: ["price"],
          message: "Price is required when multiple variants are not enabled",
        });
      }
    }
  });
