import { baseApiSlice } from "../baseApi";

const coustomersApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoustomer: builder.query({
      query: ({
        customerName,
        address,
        phone,
        sortBy,
        startDate,
        endDate,
        page,
        limit,
      }) =>
        `/customer/restaurant?page=${page}&limit=${limit}${
          customerName && customerName.trim().length > 0
            ? `&customerName=${encodeURIComponent(customerName)}`
            : ""
        }${
          address && address.trim().length > 0
            ? `&address=${encodeURIComponent(address)}`
            : ""
        }${
          phone && phone.trim().length > 0
            ? `&phone=${encodeURIComponent(phone)}`
            : ""
        }${sortBy ? `&sortBy=${sortBy}` : ""}${startDate ? `&startDate=${startDate}` : ""}${endDate ? `&endDate=${endDate}` : ""}`,
    }),
  }),
});

export const { useLazyGetCoustomerQuery } = coustomersApi;
