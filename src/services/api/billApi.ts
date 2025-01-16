import { baseApiSlice } from "../baseApi";

export const billApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBill: builder.query({
      query: ({
        page,
        limit,
        billNumber,
        startDate,
        endDate,
        minGrandTotal,
        maxGrandTotal,
        sortBy,
        paymentMethod,
        billStatus,
      }) =>
        `/bill?page=${page}&limit=${limit}${
          billNumber && billNumber.trim().length > 0
            ? `&billNumber=${encodeURIComponent(billNumber)}`
            : ""
        }${startDate ? `&startDate=${startDate}` : ""}${
          endDate ? `&endDate=${endDate}` : ""
        }${minGrandTotal ? `&minGrandTotal=${minGrandTotal}` : ""}${maxGrandTotal ? `&maxGrandTotal=${maxGrandTotal}` : ""}${sortBy ? `&sortBy=${sortBy}` : ""}${paymentMethod ? `&paymentMethod=${paymentMethod}` : ""}${billStatus?.length ? `&billStatus=${billStatus}` : ""}`,
    }),
  }),

  overrideExisting: true,
});

export const { useLazyGetBillQuery } = billApi;
