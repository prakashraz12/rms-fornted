import { useState, useEffect } from "react";
import { useCreateProductMutation } from "@/services/api/product.api";
import { PRODUCT_TYPE } from "../enums/productType.enum";
import { toast } from "@/hooks/use-toast";
import { PRODUCT_IMAGE_KEY } from "@/keys";
import { ImageType, SelectedProductTypes } from "@/types/product.type";

export const useProductForm = () => {
  const [image, setImage] = useState<ImageType | null>(() => {
    const savedImage = sessionStorage.getItem(PRODUCT_IMAGE_KEY);
    return savedImage ? JSON.parse(savedImage) : null;
  });

  const [selectedProducts, setSelectedProducts] = useState<
    SelectedProductTypes[]
  >([]);
  const [
    createProduct,
    { isLoading: isProductLoading, isSuccess: isProductCreated },
  ] = useCreateProductMutation();

  useEffect(() => {
    if (image) {
      sessionStorage.setItem(PRODUCT_IMAGE_KEY, JSON.stringify(image));
    } else {
      sessionStorage.removeItem(PRODUCT_IMAGE_KEY);
    }
  }, [image]);

  const handleSubmit = async (values: any) => {
    try {
      await createProduct({
        name: values?.name,
        isOffer: values?.hasOffer,
        description: values?.description,
        price: values.price?.toString(),
        image,
        productType: values?.isCombo ? PRODUCT_TYPE.COMBO : PRODUCT_TYPE.SINGLE,
        isAvailable: true,
        isFeatured: false,
        isMultipleVariant: values.isMultipleVariant,
        categoryId: parseInt(values.categoryId),
        offerPrice: values?.offerPrice?.toString(),
        offerValidUntil: values.offerValidUntil,
        comboItems: selectedProducts,
        variants: values.variants,
      });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  useEffect(() => {
    if (isProductCreated) {
      toast({
        title: "Product created successfully",
        description: "Product created successfully",
        variant: "default",
      });
      sessionStorage.removeItem(PRODUCT_IMAGE_KEY);
    }
  }, [isProductCreated]);
  return {
    image,
    setImage,
    selectedProducts,
    setSelectedProducts,
    isProductLoading,
    handleSubmit,
  };
};
