import { setDiscount } from "@/features/discount/discountSlice";
import { baseApiSlice } from "../baseApi";

const discountApi = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDiscount: builder.mutation({
            query: ({ isActive }) => ({
                url: "/discount/getAll",
                method: "POST",
                body: { isActive }
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    if (data?.data) {
                        dispatch(setDiscount(data?.data));
                    }
                } catch (err) {
                    console.error("Get discount failed:", err);
                }
            },
        }),
        createDiscount: builder.mutation({
            query: (data) => ({
                url: "/discount/create",
                method: "POST",
                body: data
            })
        })
    }),
});

export const { useGetDiscountMutation, useCreateDiscountMutation } = discountApi;