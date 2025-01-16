import { baseApiSlice } from "../baseApi";

const analayticsApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAnalytics: builder.query({
      query: () => "/restaurant/daily",
    }),
    getPopularItems: builder.query({
      query: ({ startDate, endDate }) =>
        `/restaurant/popular-dishes?startDate=${startDate}&endDate=${endDate}`,
    }),
  }),
});
export const { useGetAnalyticsQuery, useLazyGetPopularItemsQuery } =
  analayticsApi;
