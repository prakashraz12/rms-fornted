import { Category } from "./category.type";

export interface ProductType {
  id: number;
  name: string;
  price: string;
  offerPrice: string | null;
  offerValidUntil: string | null;
  description: string;
  isAvailable: boolean;
  isFeatured: boolean;
  isMultipleVariant: boolean;
  isOffer: boolean;
  productType: string;
  createdAt: string;
  updatedAt: string;
  image: {
    publicId: string;
    url: string;
  } | null;
  category: Category;
}
