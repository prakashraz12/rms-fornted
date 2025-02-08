import { BACKEND_URL } from "@/config";
import { clearAuthState } from "@/features/auth/authSlice";
import { ACCESS_TOKEN_KEY } from "@/keys";
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
  credentials: "include",
});

const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

        if (!accessToken) {
          api.dispatch(clearAuthState());
          return result;
        }

        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh/token",
            method: "POST",
            credentials: "include",
          },
          api,
          extraOptions
        );

        if (
          refreshResult.data &&
          (refreshResult.data as RefreshTokenResponse).data?.accessToken
        ) {
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(clearAuthState());
        }
      } catch (error) {
        console.error("Error during token refresh:", error);
      } finally {
        release();
      }
    } else {
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
