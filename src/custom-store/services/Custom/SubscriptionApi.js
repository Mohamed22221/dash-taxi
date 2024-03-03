import { Tags } from "../../helper/Tags";
import { wrapperApi } from "../../helper/wrapperApi";

export const ClientSubscriptionApi = wrapperApi.injectEndpoints({
  reducerPath: "ClientSubscriptionApi",
  endpoints: (builder) => ({
    getAllClientSubscription: builder.query({
      providesTags: [Tags.clientSubscription],
      query: (params = {}) => ({
        url: "/clientsubscription/get-all-clientsubscriptions",
        method: "GET",
        params,
      }),
    }),
    exportFile: builder.mutation({
      providesTags: [Tags.clientSubscription],
      query: (params = {}) => ({
        url: "/clientsubscription/exportexcell",
        method: "GET",
        cache: "no-cache",
        responseHandler: async (response) =>
          window.location.assign(
            window.URL.createObjectURL(await response.blob())
          ),
        params,
      }),
    }),
  }),
});
export const { useGetAllClientSubscriptionQuery, useExportFileMutation } =
  ClientSubscriptionApi;
