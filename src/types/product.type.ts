import { Category } from "./category.type";

export interface ProductVariant {
  name: string;
  id?: string;

  price: number;
}

export interface ComboProduct {
  productId: string;
  quantity: number;
}

export interface ProductFormValues {
  name: string;
  description: string;
  price?: number;
  hasOffer: boolean;
  offerPrice?: number;
  offerValidUntil?: Date | null;
  isMultipleVariant: boolean;
  variants: ProductVariant[];
  isCombo: boolean;
  comboProducts: ComboProduct[];
  categoryId: string;
}

export interface ImageType {
  publicId: string;
  url: string;
}

export interface SelectedProductTypes {
  productId: number;
  quantity: number;
}

export interface ProductType {
  id: number;
  name: string;
  description: string;
  price?: number;
  image: ImageType;
  productType: string;
  isAvailable: boolean;
  isFeatured: boolean;
  isMultipleVariant: boolean;
  category: Category;
  offerPrice: number;
  offerValidUntil: Date | null;
  comboItems: SelectedProductTypes[];
  variants: ProductVariant[];
}

export const initialValues: ProductFormValues = {
  name: "",
  description: "",
  price: 0,
  hasOffer: false,
  isMultipleVariant: false,
  variants: [],
  isCombo: false,
  comboProducts: [],
  offerValidUntil: null,
  categoryId: "",
  isSKUEnabled: true,
  skuId:1,
};
