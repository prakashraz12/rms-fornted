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
  selectPaymentMethod: string | null;
  isSelectPaymentMethodOpen: boolean;
  isPaymentSuccess: boolean;
  billOrderData: any;
  holdOrder: any | null;
  discount: any;
  taxRate: number;
  vatRate: number;
  serviceChargeRate: number;
  discountType: any;
}

const initialState: POSState = {
  selectedOrders: null,
  seletedProducts: [],
  selectOrderType: null,
  isOderSelctorOpen: false,
  isOrderConfirmOpen: false,
  selectedTableIds: [],
  selectedDeliveryAddress: "",
  selectedFloorId: "",
  posSelectionType: "NEW",
  selectPaymentMethod: null,
  isSelectPaymentMethodOpen: false,
  isPaymentSuccess: false,
  billOrderData: null,
  holdOrder: null,
  discount: null,
  taxRate: 0,
  vatRate: 0,
  serviceChargeRate: 0,
  discountType: null,
};

const posSlice = createSlice({
  name: "pos",
  initialState,
  reducers: {
    setSelectedProducts(state, action) {
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
    setSelectPaymentMethod(state, action) {
      state.selectPaymentMethod = action.payload;
    },
    setIsSelectPaymentMethodOpen(state, action) {
      state.isSelectPaymentMethodOpen = action.payload;
    },
    setIsPaymentSuccess(state, action) {
      state.isPaymentSuccess = action.payload;
    },
    setBillOrderData(state, action) {
      state.billOrderData = action.payload;
    },
    setHoldOrder(state, action) {
      state.holdOrder = action.payload;
    },
    applyDiscountOnOrder(state, action) {
      state.discount = action.payload;
    },
    setTaxRate(state, action) {
      state.taxRate = action.payload;
    },
    setVatRate(state, action) {
      state.vatRate = action.payload;
    },
    setServiceChargeRate(state, action) {
      state.serviceChargeRate = action.payload;
    },
    setDiscountType(state, action) {
      state.discountType = action.payload;
    },
  },
});

export const {
  setSelectedProducts,
  setSelectedOrders,
  setSelectOrderType,
  setIsOderSelctorOpen,
  setIsOrderConfirmOpen,
  setSelectedTableId,
  setSelectedDeliveryAddress,
  setSelectedFloorId,
  setPosSelectionType,
  setSelectPaymentMethod,
  setIsSelectPaymentMethodOpen,
  setIsPaymentSuccess,
  setBillOrderData,
  setHoldOrder,
  applyDiscountOnOrder,
  setTaxRate,
  setVatRate,
  setServiceChargeRate,
  setDiscountType,
} = posSlice.actions;

export default posSlice.reducer;
