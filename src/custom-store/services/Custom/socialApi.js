import { Tags } from "../../helper/Tags";
import { wrapperApi } from "../../helper/wrapperApi";

export const SocialApi = wrapperApi.injectEndpoints({
  reducerPath: "SeoApi",

  endpoints: (builder) => ({
    getSocial: builder.query({
      providesTags: [Tags.Social],
      query: () => "/social/get-social",
    }),
    updateSocial: builder.mutation({
      invalidatesTags: [Tags.Social],
      query: (body) => ({
        url: "/social/update-social",
        method: "POST",
        body,
      }),
    }),
  }),
});
export const { useGetSocialQuery, useUpdateSocialMutation } = SocialApi;
