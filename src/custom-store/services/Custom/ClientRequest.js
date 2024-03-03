import { Tags } from "../../helper/Tags";
import { wrapperApi } from "../../helper/wrapperApi";

export const ClientRequestApi = wrapperApi.injectEndpoints({
  reducerPath: "ClientRequestApi",
  endpoints: (builder) => ({
    getAllClientRequest: builder.query({
      providesTags: [Tags.clientTags],
      query: (params = {}) => ({
        url: "/clientrequests/fetchrequests",
        method: "GET",
        params,
      }),
    }),
    updateClientRequest: builder.mutation({
      invalidatesTags: [Tags.clientTags],
      query: ({ body, id }) => ({
        url: `/clientrequests/updaterequest/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteClientRequest: builder.mutation({
      invalidatesTags: [Tags.clientTags],
      query: ({ id }) => ({
        url: `/clientrequests/deleterequest/${id}`,
        method: "Delete",
      }),
    }),
  }),
});
export const {
  useGetAllClientRequestQuery,
  useUpdateClientRequestMutation,
  useDeleteClientRequestMutation,
} = ClientRequestApi;
