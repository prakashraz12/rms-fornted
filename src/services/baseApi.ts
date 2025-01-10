import { BACKEND_URL } from "@/config";
import { clearAuthState } from "@/features/auth/authSlice";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/keys";
import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
  BaseQueryFn,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

interface RefreshTokenResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: BACKEND_URL,
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

// Annotate return type with BaseQueryFn
const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock(); // Wait for any ongoing token refresh to complete
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

        if (!accessToken || !refreshToken) {
          api.dispatch(clearAuthState());
          return result;
        }

        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh/token",
            method: "POST",
            body: {
              refreshToken,
            },
          },
          api,
          extraOptions
        );

        if (
          refreshResult.data &&
          (refreshResult.data as RefreshTokenResponse).data?.accessToken
        ) {
          const newAccessToken = (refreshResult.data as RefreshTokenResponse)
            .data?.accessToken;

          const newRefreshToken = (refreshResult?.data as RefreshTokenResponse)
            ?.data?.refreshToken;

          // // Save new access token to cookies
          // Cookies.set(ACCESS_TOKEN_KEY, newAccessToken);

          localStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken);
          localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken);

          // Update the headers dynamically with the new access token
          args =
            typeof args === "string"
              ? {
                  url: args,
                  headers: { Authorization: `Bearer ${newAccessToken}` },
                }
              : {
                  ...args,
                  headers: {
                    ...args.headers,
                    Authorization: `Bearer ${newAccessToken}`,
                  },
                };

          // Retry the original request with updated headers
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(clearAuthState());
        }
      } catch (error) {
        console.error("Error during token refresh:", error);
      } finally {
        release(); // Ensure mutex is released
      }
    } else {
      // Wait for the ongoing refresh to complete and retry the original request
      await mutex.waitForUnlock();
      result = await baseQueryWithReAuth(args, api, extraOptions);
    }
  }

  return result;
};

export const baseApiSlice = createApi({
  reducerPath: "baseApi",
  tagTypes: [],
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
