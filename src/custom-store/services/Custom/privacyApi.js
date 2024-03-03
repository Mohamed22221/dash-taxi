import { Tags } from "../../helper/Tags";
import { wrapperApi } from "../../helper/wrapperApi";

export const privacyApi = wrapperApi.injectEndpoints({
  reducerPath: "privacyApi",

  endpoints: (builder) => ({
    getPrivacy: builder.query({
      providesTags: [Tags.privacy],
      query: () => "/privacypolicy/fetchpolicy",
    }),
    updatePrivacy: builder.mutation({
      invalidatesTags: [Tags.privacy],
      query: (body) => ({
        url: "/privacypolicy/addpolicy",
        method: "POST",
        body: {
          ...body,
        },
      }),
    }),
  }),
});
export const { useGetPrivacyQuery, useUpdatePrivacyMutation } = privacyApi;
