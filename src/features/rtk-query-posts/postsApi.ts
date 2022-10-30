import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { postType } from "../../contexts/custom-query/types";

export const postsApi = createApi({
   reducerPath: "rtkQueryPostsApi",
   baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
   //    keepUnusedDataFor: 120, // global configuration for the api
   tagTypes: ["Posts"],
   endpoints: (builder) => ({
      getPosts: builder.query({
         query: () => ({ url: "posts" }),
         providesTags: (result) =>
            result
               ? [...result.map(({ id }: { id: any }) => ({ type: "Posts", id })), { type: "Posts", id: "all" }]
               : [{ type: "Posts", id: "all" }],
      }),
      getPost: builder.query({
         query: (postId: any) => `posts/${postId}`,
         providesTags: (result, error, id) => [{ type: "Posts", id }],
         //  keepUnusedDataFor: 80, // configuration for an individual endpoint
      }),
      addPost: builder.mutation({
         query: (data: postType) => {
            const post: postType = { body: data.body, title: data.title, userId: 10 };
            return { url: "posts", method: "POST", body: post };
         },
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            try {
               const { data } = await queryFulfilled;
               dispatch(
                  postsApi.util.updateQueryData("getPosts", "", (draft: any) => {
                     draft.unshift(data);
                  })
               );
            } catch {}
         },
         // invalidatesTags: [{ type: "Posts", id: "all" }],
      }),
      editPost: builder.mutation({
         query: (post: postType) => ({ url: `posts/${post.id}`, method: "PUT", body: post }),
         // invalidatesTags: (result, error, arg) => [{ type: "Posts", id: arg.id }],
         async onQueryStarted(arg, { dispatch, queryFulfilled }) {
            try {
               const { data } = await queryFulfilled;
               dispatch(
                  postsApi.util.updateQueryData("getPosts", "", (draft: any) => {
                     const index = draft.findIndex((x: postType) => x.id === arg.id);
                     draft[index] = data;
                  })
               );
            } catch (error: any) {}
         },
      }),
      deletePost: builder.mutation({
         query: (postId: any) => ({ url: `posts/${postId}`, method: "DELETE" }),
         async onQueryStarted(arg, { dispatch, queryFulfilled }) {
            try {
               await queryFulfilled;
               dispatch(
                  postsApi.util.updateQueryData("getPosts", "", (draft: any) => {
                     const index = draft.findIndex((x: postType) => x.id === arg);
                     draft.splice(index, 1);
                  })
               );
            } catch {}
         },
         // invalidatesTags: (result, error, id) => [{ type: "Posts", id: id }],
      }),
   }),
});

export const { useGetPostsQuery, useGetPostQuery, useAddPostMutation, useEditPostMutation, useDeletePostMutation } =
   postsApi;
