import { OrderType } from "@/enums/orderType.enum";
import { createSlice } from "@reduxjs/toolkit";



interface OrderState {
    orders: OrderType[];
}
const initialState: OrderState = {
    orders: sessionStorage.getItem("orders") ? JSON.parse(sessionStorage.getItem("orders") as string) : [],
};
const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrder: (state, action) => {
            state.orders = action.payload;
            sessionStorage.setItem("orders", JSON.stringify(action.payload));
        },
    },
});

export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;