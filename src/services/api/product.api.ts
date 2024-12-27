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
      }: {
        page: number;
        limit: number;
        search?: string;
      }) => {
        console.log(search);
        return {
          url: `/product/all?page=${page}&limit=${limit}${
            search && search.trim().length > 0
              ? `&search=${encodeURIComponent(search)}`
              : ""
          }`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useCreateProductMutation,
  useLazyGetProductByRestaurantIdQuery,
} = productApi;
