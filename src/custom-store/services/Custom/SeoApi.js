import { Tags } from "../../helper/Tags";
import { wrapperApi } from "../../helper/wrapperApi";

export const seoApi = wrapperApi.injectEndpoints({
  reducerPath: "SeoApi",

  endpoints: (builder) => ({
    getSeo: builder.query({
      providesTags: [Tags.Seo],
      query: () => "/websiteseo/get-websiteseo",
    }),
    updateSeo: builder.mutation({
      invalidatesTags: [Tags.Seo],
      query: (body) => ({
        url: "/websiteseo/update-websiteseo",
        method: "POST",
        body: {
          ...body,
        },
      }),
    }),
  }),
});
export const { useGetSeoQuery, useUpdateSeoMutation } = seoApi;
