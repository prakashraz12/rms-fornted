import { baseApiSlice } from "../baseApi";

const userApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/user/restaurant/staffs",
    }),
  }),
});

export const { useGetUserQuery } = userApi;
