export interface ProductVariant {
  name: string;
  price: number;
}

export interface ComboProduct {
  productId: string;
  quantity: number;
}

export interface ProductFormValues {
  name: string;
  description: string;
  price: number;
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
};