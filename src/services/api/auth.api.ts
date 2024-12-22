import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/keys";
import { baseApiSlice } from "../baseApi";
import { setAuthState } from "@/features/auth/authSlice";

export const authApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (credentials) => ({
        url: "/auth/restaurant/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data?.data) {
            const { accessToken, refreshToken } = data?.data?.tokens;
            localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
            localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
            dispatch(
              setAuthState({
                user: data?.data,
                restaurantInfo: data?.data,
              })
            );
          }
        } catch (err) {
          console.error("Login failed:", err);
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const { useAdminLoginMutation } = authApi;
