import { DISCOUNT_TYPE } from "@/enums/discountType.enum";

export interface IDiscount {
  id: number;
  name: string;
  value: number;
  type: DISCOUNT_TYPE;
  createdAt: Date;
  updatedAt: Date;
}
