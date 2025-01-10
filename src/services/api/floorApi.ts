import { baseApiSlice } from "../baseApi";

const floorApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFloorByRestaurantId: builder.query({
      query: () => `/floor/restaurant`,
    }),
    createFloor: builder.mutation({
      query: (data) => ({
        url: `/floor`,
        method: "POST",
        body: data,
      }),
    }),
    createTable: builder.mutation({
      query: (data) => ({
        url: `/floor/table/create`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLazyGetFloorByRestaurantIdQuery,
  useCreateFloorMutation,
  useCreateTableMutation,
} = floorApi;
