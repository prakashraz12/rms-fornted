export interface selectedOrdersType {
  productId: number;
  name: string;
  quantity: number;
  price: number;
  variantId?: number;
  variantName?: string;
  isVariant?:boolean
}
