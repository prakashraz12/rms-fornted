import {
  applyDiscountOnOrder,
  setBillOrderData,
  setIsPaymentSuccess,
  setPosSelectionType,
  setSelectedOrders,
  setSelectedProducts,
  setSelectPaymentMethod,
} from "@/features/pos/posSlice";
import { baseApiSlice } from "../baseApi";
import { setOrder } from "@/features/order/orderSlice";
import { OrderResponse } from "@/types/order.type";

const orderApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/order/create",
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (_, { getState, dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          const previousOrders = getState() as any;

          if (data?.data) {
            dispatch(setSelectedProducts([]));
            dispatch(setOrder([...previousOrders?.order?.orders, data?.data]));
          }
        } catch (err) {
          console.error("Create order failed:", err);
        }
      },
    }),
    getOrderByRestaurantId: builder.query({
      query: ({
        page,
        limit,
        startDate,
        endDate,
        status,
        orderType,
        orderNumber,
        minOrderAmount,
        maxOrderAmount,
        sortBy,
      }) => ({
        url: `/order?page=${page}&limit=${limit}${startDate ? `&startDate=${startDate}` : ""}${endDate ? `&endDate=${endDate}` : ""}${status?.length ? `&status=${status}` : ""}${orderType?.length ? `&orderType=${orderType}` : ""}${orderNumber ? `&orderNumber=${orderNumber}` : ""}${minOrderAmount ? `&minOrderAmount=${minOrderAmount}` : ""}${maxOrderAmount ? `&maxOrderAmount=${maxOrderAmount}` : ""}${sortBy ? `&sortBy=${sortBy}` : ""}`,
        method: "GET",
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data?.data) {
            dispatch(setOrder(data?.data?.orders));
          }
        } catch (err) {
          console.error("Get order failed:", err);
        }
      },
    }),
    completeOrder: builder.mutation({
      query: (data) => ({
        url: "/order/complete",
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (_, { getState, dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const previousOrders = getState() as any;

          if (data?.data) {
            dispatch(setBillOrderData(data?.data));
            dispatch(setIsPaymentSuccess(true));
            dispatch(
              setOrder(
                previousOrders?.order?.orders?.map((i: OrderResponse) =>
                  i?.id === data?.data?.id
                    ? { ...i, status: data?.data?.status }
                    : i
                )
              )
            );
            dispatch(setSelectedProducts([]));
            dispatch(setPosSelectionType("NEW"));
            dispatch(setSelectedOrders(null));
            dispatch(applyDiscountOnOrder(null));
            dispatch(setSelectPaymentMethod(""));
          }
        } catch (err) {
          console.error("Complete order failed:", err);
        }
      },
    }),
    updateOrder: builder.mutation({
      query: ({ data, id }) => ({
        url: `/order/update/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    dailyOrderTypeMapping: builder.query({
      query: () => ({
        url: "/order/daily-order-mapping",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderByRestaurantIdQuery,
  useLazyGetOrderByRestaurantIdQuery,
  useCompleteOrderMutation,
  useUpdateOrderMutation,
  useDailyOrderTypeMappingQuery,
} = orderApi;
