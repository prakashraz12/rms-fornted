export interface CustomerOrder {
  orderId: string;
  orderDate: string;
  totalAmount: number;
  isPaid: boolean;
  isCredit: boolean;
}

export interface Customer {
  id: string;
  customerName: string;
  address: string;
  phone: string;
  orders: CustomerOrder[];
  totalCredit: number;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerState {
  customers: Customer[];
  loading: boolean;
  error: string | null;
  selectedCustomer: Customer | null;
}
