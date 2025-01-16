import { baseApiSlice } from "../baseApi";

const inventoryApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSku: builder.mutation({
      query: (body) => ({
        url: "/inventory/create",
        method: "POST",
        body,
      }),
    }),
    getInventoryList: builder.query({
      query: () => ({
        url: `/inventory/get/all`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useCreateSkuMutation, useLazyGetInventoryListQuery } = inventoryApi;
