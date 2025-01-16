import { PaymentMethod } from "@/enums/paymentMethod.enum";

export interface Bill {
  id: number;
  billNumber: string;
  issuedBy: string;
  grandTotal: number;
  totalAmount: number;
  discount: number;
  serviceCharges: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  paymentMethod: PaymentMethod;
}
