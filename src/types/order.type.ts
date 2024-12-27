import { Table } from "@/components/floor/types/floor.types";

export interface OrderType {
  id: number;
  orderNumber: string;
  status: string; // Example: 'pending', 'completed', etc.
  remarks: string | null;
  orderType: "DINE_IN" | "TAKEAWAY" | "DELIVERY"; // Assuming possible values
  orderCreatorType: "restaurant" | "user"; // Assuming possible values
  mergedWithOrderId: number | null;
  deliveryAddress: string;
  deliveryCharges: string;
  totalItems: number;
  totalAmount: string;
  tax: string;
  serviceCharges: string;
  discount: string;
  vat: string;
  paymentMethod: string | null; // Could be 'CASH', 'CARD', etc.
  tableIds: string[]; // IDs of tables
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  orderItems: OrderItem[];
  tables: Table[];
}

interface OrderItem {
  id: number;
  quantity: number;
  unitPrice: string;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
  offerPrice: string | null;
  offerValidUntil: string | null;
  description: string;
  image: {
    publicId: string;
    url: string;
  };
  productType: "SINGLE" | "COMBO";
}
