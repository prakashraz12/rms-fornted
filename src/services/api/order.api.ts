import { baseApiSlice } from "../baseApi";

const orderApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/order/create",
        method: "POST",
        body: data,
      }),
    }),
    getOrderByRestaurantId: builder.query({
      query: ({ page, limit, startDate, endDate, restaurantId }) => ({
        url: `/order?page=${page}&limit=${limit}&restaurantId=${restaurantId}&startDate=${startDate}&endDate=${endDate}`,
        method: "GET",
      }),
    }),
    completeOrder: builder.mutation({
      query: (data) => ({
        url: "/order/complete",
        method: "POST",
        body: data,
      }),
    }),
    updateOrder: builder.mutation({
      query: ({ data, id }) => ({
        url: `/order/update/${id}`,
        method: "PATCH",
        body: data,
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
} = orderApi;
