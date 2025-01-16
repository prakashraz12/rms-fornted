import { baseApiSlice } from "../baseApi";

const skuApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSku: builder.mutation({
      query: (body) => ({
        url: "/sku/create",
        method: "POST",
        body,
      }),
    }),
    getSkuList: builder.query({
      query: () => ({
        url: `/sku/get/all`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useCreateSkuMutation, useLazyGetSkuListQuery } = skuApi;
