import { IDiscount } from "@/types/discount.type";
import { createSlice } from "@reduxjs/toolkit";


interface DiscountState {
    discounts: IDiscount[];
}


const initialState: DiscountState = {
    discounts: [],
};


const discountSlice = createSlice({
    name: "discount",
    initialState,
    reducers: {
        setDiscount: (state, action) => {
            state.discounts = action.payload;
        },
    },
});

export const { setDiscount } = discountSlice.actions;
export default discountSlice.reducer;