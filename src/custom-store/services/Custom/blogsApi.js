import { Tags } from "../../helper/Tags";
import { wrapperApi } from "../../helper/wrapperApi";

export const blogsApi = wrapperApi.injectEndpoints({
  reducerPath: "blogApi",
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      providesTags: [Tags.blogs],
      query: () => "/blog/fetchblogs",
    }),
    getOneBlog: builder.query({
      providesTags: [Tags.blogs],
      query: (id) => `/blog/fetchblog/${id}`,
    }),
    deleteBlog: builder.mutation({
      invalidatesTags: [Tags.blogs],
      query: (id) => ({
        url: `/blog/deleteblog/${id}`,
        method: "DELETE",
      }),
    }),
    addBlog: builder.mutation({
      invalidatesTags: [Tags.blogs],
      query: (body) => ({
        url: `/blog/addblog`,
        method: "POST",
        body,
      }),
    }),
    editBlog: builder.mutation({
      invalidatesTags: [Tags.blogs],
      query: ({ body, id }) => ({
        url: `/blog/updateblog/${id}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});
export const {
  useGetAllBlogsQuery,
  useGetOneBlogQuery,
  useDeleteBlogMutation,
  useEditBlogMutation,
  useAddBlogMutation,
} = blogsApi;
