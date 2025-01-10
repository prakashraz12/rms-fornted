import { baseApiSlice } from "../baseApi";

const coustomersApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoustomer: builder.query({
      query: () => `/customer/restaurant`,
    }),
  }),
});

export const { useLazyGetCoustomerQuery } = coustomersApi;
