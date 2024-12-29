export interface SelectedPosProductType {
  productId: number;
  quantity: number;
  price: number;
  name: string;
  variantId?: number;
  variantName?: string;
  isVariant?:boolean
}
