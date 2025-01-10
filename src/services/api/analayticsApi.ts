import { baseApiSlice } from "../baseApi";

const analayticsApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAnalytics: builder.query({
      query: () => "/restaurant/daily",
    }),
    getPopularItemsOfThisWeek: builder.query({
      query: () => "/restaurant/popular-dishes-of-the-week",
    }),
  }),
});
export const { useGetAnalyticsQuery, useGetPopularItemsOfThisWeekQuery } =
  analayticsApi;
