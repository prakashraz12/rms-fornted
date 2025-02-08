import { clearAuthState } from "@/features/auth/authSlice";
import { baseApiSlice } from "../baseApi";

export const authApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (credentials) => ({
        url: "/auth/restaurant/login",
        method: "POST",
        body: credentials,
      }),
    }),
    sendForgotPasswordEmailToRestaurant: builder.mutation({
      query: (email) => ({
        url: "/restaurant/forgot-password",
        method: "POST",
        body: email,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/user/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logoutRestaurant: builder.mutation({
      query: () => ({
        url: "/auth/restaurant/logout",
        method: "POST",
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(clearAuthState());
          }
        } catch (err) {
          console.error("Logout failed:", err);
        }
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/user/logout",
        method: "POST",
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(clearAuthState());
          }
        } catch (err) {
          console.error("Logout failed:", err);
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useAdminLoginMutation,
  useSendForgotPasswordEmailToRestaurantMutation,
  useLoginUserMutation,
  useLogoutRestaurantMutation,
  useLogoutUserMutation,
} = authApi;
