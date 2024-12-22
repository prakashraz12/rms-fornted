import { baseApiSlice } from "../baseApi";

const categoryApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategoryByRestaurantId: builder.query({
      query: () => ({
        url: "/category/all",
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetCategoryByRestaurantIdQuery } = categoryApi;
