import { baseApiSlice } from "../baseApi";

const floorApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFloorByRestaurantId: builder.query({
      query: (id) => `/floor/restaurant/${id}`,
    }),
  }),
});

export const { useLazyGetFloorByRestaurantIdQuery } = floorApi;
