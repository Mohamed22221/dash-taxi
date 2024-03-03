import { wrapperApi } from "../../helper/wrapperApi";

// Define a service using a base URL and expected endpoints
export const authApi = wrapperApi.injectEndpoints({
  reducerPath: "authApi",
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
