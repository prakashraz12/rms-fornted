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
      query: ({
        page,
        limit,
        startDate,
        endDate,
        status,
        miniMumStock,
        maximumStock,
        productName,
      }) => ({
        url: `/inventory/get/all?page=${page}&limit=${limit}${startDate ? `&startDate=${startDate}` : ""}${
          endDate ? `&endDate=${endDate}` : ""
        }${status ? `&level=${status}` : ""}${
          miniMumStock ? `&minimumStockLevel=${miniMumStock}` : ""
        }${maximumStock ? `&maxStockLevel=${maximumStock}` : ""}${
          productName ? `&productName=${productName}` : ""
        }`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useCreateSkuMutation, useLazyGetInventoryListQuery } =
  inventoryApi;
