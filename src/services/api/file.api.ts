import { baseApiSlice } from "../baseApi";

const fileUploadApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    imageUpload: builder.mutation({
      query: (data) => ({
        url: "/file-upload/image",
        method: "POST",
        body: data,
      }),
    }),
    deleteImage: builder.mutation({
      query: (publicId: string) => ({
        url: `/file-upload/delete-image?publicId=${publicId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useImageUploadMutation, useDeleteImageMutation } = fileUploadApi;
