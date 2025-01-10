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
                sortBy
            }) =>
                `/bill?page=${page}&limit=${limit}${billNumber && billNumber.trim().length > 0
                    ? `&billNumber=${encodeURIComponent(billNumber)}`
                    : ""
                }${startDate ? `&startDate=${startDate}` : ""}${endDate ? `&endDate=${endDate}` : ""
                }${minGrandTotal ? `&minGrandTotal=${minGrandTotal}` : ""}${maxGrandTotal ? `&maxGrandTotal=${maxGrandTotal}` : ""
                }${sortBy ? `&sortBy=${sortBy}` : ""}`,
        }),
    }),

    overrideExisting: true,
});

export const { useLazyGetBillQuery } = billApi;
