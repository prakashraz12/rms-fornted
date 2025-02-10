import { baseApiSlice } from "../baseApi";

const userApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/user/restaurant/staffs",
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/user/update",
        method: "PATCH",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/user/change-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = userApi;
