import { Table } from "@/components/floor/types/floor.types";
import { ProductType } from "./product.type";

export interface OrderResponse {
  id: number;
  orderNumber: string;
  status: string;
  remarks: string | null;
  orderType: "DINE_IN" | "DELIVERY" | "TAKEAWAY";
  orderCreatorType: "restaurant" | "user"; 
  mergedWithOrderId: number | null;
  deliveryAddress: string;
  deliveryCharges: string;
  totalItems: number;
  totalAmount: string;
  tax: string;
  serviceCharges: string;
  discount: string;
  vat: string;
  paymentMethod: string | null; 
  tableIds: string[];
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
  tables: Table[];
}

interface OrderItem {
  id: number;
  quantity: number;
  unitPrice: string;
  name: string;
  productName: string;
  isComplete: boolean;
  product: ProductType;
}


