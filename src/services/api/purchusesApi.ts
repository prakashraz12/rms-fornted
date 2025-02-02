import { baseApiSlice } from "../baseApi";

const purchusesApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    entryPurchuse: builder.mutation({
      query: (data) => ({
        url: "/purchases/create",
        method: "POST",
        body: data,
      }),
    }),
    getPurchuse: builder.query({
      query: ({ page, limit, name, category, maxAmount, minAmount }) => ({
        url: `/purchases/getAll?page=${page}&limit=${limit}${name ? `&name=${name}` : ""}${
          category ? `&category=${category}` : ""
        }${maxAmount ? `&maxAmount=${maxAmount}` : ""}${
          minAmount ? `&minAmount=${minAmount}` : ""
        }`,
        method: "GET",
      }),
    }),
  }),
});

export const { useEntryPurchuseMutation, useLazyGetPurchuseQuery } =
  purchusesApi;
