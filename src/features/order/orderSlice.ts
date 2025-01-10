import { OrderType } from "@/enums/orderType.enum";
import { createSlice } from "@reduxjs/toolkit";
interface OrderState {
  orders: OrderType[];
  selectedCustomer: string;
  remarks: string;
}
const initialState: OrderState = {
  orders: sessionStorage.getItem("orders")
    ? JSON.parse(sessionStorage.getItem("orders") as string)
    : [],
  selectedCustomer: "",
  remarks: "",
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.orders = action.payload;
      sessionStorage.setItem("orders", JSON.stringify(action.payload));
    },
    setSelectedCustomers: (state, action) => {
      state.selectedCustomer = action.payload;
    },
    setRemarks: (state, action) => {
      state.remarks = action.payload;
    },
  },
});

export const { setOrder, setSelectedCustomers, setRemarks } =
  orderSlice.actions;
export default orderSlice.reducer;
