import { OrderType } from "@/enums/orderType.enum";
import { ProductType } from "@/types/product.type";
import { createSlice } from "@reduxjs/toolkit";

interface POSState {
  selectedOrders: OrderType | null;
  seletedProducts: ProductType[];
  selectOrderType: OrderType | null;
  isOderSelctorOpen: boolean;
  isOrderConfirmOpen: boolean;
  selectedTableIds: number[];
  selectedDeliveryAddress: string;
  selectedFloorId: string;
  posSelectionType: "NEW" | "EXISTING";
}

const initialState: POSState = {
  selectedOrders: null,
  seletedProducts: [],
  selectOrderType: OrderType.DINE_IN || "",
  isOderSelctorOpen: false,
  isOrderConfirmOpen: false,
  selectedTableIds: [],
  selectedDeliveryAddress: "",
  selectedFloorId: "",
  posSelectionType: "NEW",
};

const posSlice = createSlice({
  name: "pos",
  initialState,
  reducers: {
    setSeletedProducts(state, action) {
      state.seletedProducts = action.payload;
    },
    setSelectedOrders(state, action) {
      state.selectedOrders = action.payload;
    },

    setSelectOrderType(state, action) {
      state.selectOrderType = action.payload;
    },
    setIsOderSelctorOpen(state, action) {
      state.isOderSelctorOpen = action.payload;
    },
    setIsOrderConfirmOpen(state, action) {
      state.isOrderConfirmOpen = action.payload;
    },
    setSelectedTableId(state, action) {
      state.selectedTableIds = action.payload;
    },
    setSelectedDeliveryAddress(state, action) {
      state.selectedDeliveryAddress = action.payload;
    },
    setSelectedFloorId(state, action) {
      state.selectedFloorId = action.payload;
    },
    setPosSelectionType(state, action) {
      state.posSelectionType = action.payload;
    },
  },
});

export const {
  setSeletedProducts,
  setSelectedOrders,
  setSelectOrderType,
  setIsOderSelctorOpen,
  setIsOrderConfirmOpen,
  setSelectedTableId,
  setSelectedDeliveryAddress,
  setSelectedFloorId,
  setPosSelectionType,
} = posSlice.actions;

export default posSlice.reducer;
