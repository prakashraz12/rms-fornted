import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApiSlice } from "./services/baseApi";
import authReducer from "./features/auth/authSlice";
import posReducer from "./features/pos/posSlice";
import orderReducer from "./features/order/orderSlice";
import discountReducer from "./features/discount/discountSlice";

export const store = configureStore({
  reducer: {
    [baseApiSlice.reducerPath]: baseApiSlice.reducer,
    auth: authReducer,
    pos: posReducer,
    order: orderReducer,
    discount: discountReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(baseApiSlice.middleware)

});


setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
