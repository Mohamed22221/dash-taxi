import { Tags } from "../../helper/Tags";
import { wrapperApi } from "../../helper/wrapperApi";

export const IntegrationApi = wrapperApi.injectEndpoints({
  reducerPath: "IntegrationApi",

  endpoints: (builder) => ({
    getFacebookPixel: builder.query({
      providesTags: [Tags.Social],
      query: () => "/facebook/get-facebook",
    }),
    updateFacebookPixel: builder.mutation({
      invalidatesTags: [Tags.facebookPixel],
      query: (body) => ({
        url: "/facebook/update-facebook",
        method: "POST",
        body,
      }),
    }),
    getWhatsApp: builder.query({
      providesTags: [Tags.whatsAPP],
      query: () => "/whatsapp/get-whatsapp",
    }),
    updateWhatApp: builder.mutation({
      invalidatesTags: [Tags.whatsAPP],
      query: (body) => ({
        url: "/whatsapp/update-whatsapp",
        method: "POST",
        body,
      }),
    }),
    getSnapchatPixel: builder.query({
      providesTags: [Tags.SnapchatPixel],
      query: () => "/snapchat/get-snapchat",
    }),
    updateSnapchatPixel: builder.mutation({
      invalidatesTags: [Tags.SnapchatPixel],
      query: (body) => ({
        url: "/snapchat/update-snapchat",
        method: "POST",
        body,
      }),
    }),
  }),
});
export const {
  useGetWhatsAppQuery,
  useUpdateWhatAppMutation,
  useGetFacebookPixelQuery,
  useUpdateFacebookPixelMutation,
  useGetSnapchatPixelQuery,
  useUpdateSnapchatPixelMutation,
} = IntegrationApi;
