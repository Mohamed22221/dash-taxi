import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tags } from "./Tags";

export const domain = "https://admin.taxialbasha.com/dashboard";
export const url = "https://admin.taxialbasha.com/dashboard";

export const wrapperApi = createApi({
  reducerPath: "wrapperApi",
  tagTypes: Object.values(Tags),
  baseQuery: fetchBaseQuery({
    baseUrl: domain,
    prepareHeaders: (header) => {
      const token = localStorage.getItem("JWT");
      if (token) {
        header.set("Authorization", `Bearer ${token}`);
      }

      return header;
    },
  }),

  endpoints: () => ({}),
});
