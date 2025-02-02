import { baseApiSlice } from "../baseApi";

export const productApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/product/create",
        method: "POST",
        body: data,
      }),
    }),
    getProductByRestaurantId: builder.query({
      query: ({
        page,
        limit,
        search,
        category,
        type,
        from,
        to,
      }: {
        page: number;
        limit: number;
        search?: string;
        category?: string;
        type?: string;
        from?: string;
        to?: string;
      }) => {
        return {
          url: `/product/all?page=${page}&limit=${limit}${
            search && search.trim().length > 0
              ? `&search=${encodeURIComponent(search)}`
              : ""
          }${category && category.trim().length > 0 ? `&categoryId=${encodeURIComponent(category)}` : ""}${
            type && type.trim().length > 0
              ? `&type=${encodeURIComponent(type)}`
              : ""
          }${from && from.trim().length > 0 ? `&startDate=${encodeURIComponent(from)}` : ""}${
            to && to.trim().length > 0
              ? `&endDate=${encodeURIComponent(to)}`
              : ""
          }`,
          method: "GET",
        };
      },
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ data, id }) => ({
        url: `/product/update/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useLazyGetProductByRestaurantIdQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} = productApi;
