import { Table } from "@/components/floor/types/floor.types";
import { ProductType } from "./product.type";
import { OrderType } from "@/enums/orderType.enum";

export interface OrderResponse {
  id: number;
  orderNumber: string;
  status: string;
  remarks: string | null;
  orderType: OrderType;
  orderCreatorType: "restaurant" | "user";
  mergedWithOrderId: number | null;
  deliveryAddress: string;
  deliveryCharges: string;
  totalItems: number;
  totalAmount: string;
  paymentMethod: string | null;
  tableIds: string[];
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
  tables: Table[];
  restaurant: {
    restaurantName: string;
  };
}

export interface OrderItem {
  id: number;
  quantity: number;
  unitPrice: string;
  name: string;
  productName: string;
  isComplete: boolean;
  product: ProductType;
  variantName: string;
  price: string;
  remarks: string | null;
}
