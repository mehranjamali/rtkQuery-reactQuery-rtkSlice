import { postType } from "./../../contexts/custom-query/types";
import httpService from "../../services/httpService";
import type { QueryClient } from "react-query";

const url: string = `${process.env.REACT_APP_BASE_URL}posts`;

// Command
// -- fetch posts
export async function fetchPostsCommand() {
   const { data } = await httpService.get(url);
   return data;
}

// -- fetch post by id
export async function fetchPostByIdCommand(postId: number) {
   const { data } = await httpService.get(`${url}/${postId}`);
   return data;
}

// -- add post
export async function addPostCommand(post: postType) {
   const { data } = await httpService.post(`${url}`, post);
   return data;
}

// -- edit post
export async function editPostCommand(post: postType) {
   const { data } = await httpService.put(`${url}/${post.id}`, post);
   return data;
}

// -- delete post
export async function deletePostCommand(postId: number) {
   const response = await httpService.delete(`${url}/${postId}`);
   return response.status;
}

// Mutation -> callback
// -- add post
export function addPostCallback(queryClient: QueryClient) {
   return {
      onSuccess: (data: any, args: any) => {
         const dataInCache: any = queryClient.getQueryData("Posts");
         queryClient.setQueryData("Posts", [data, ...dataInCache]);
         // queryClient.invalidateQueries('Posts')
      },
      onError: () => {
         alert("error");
      },
   };
}

// -- edit post
export function editPostCallback(queryClient: QueryClient) {
   return {
      onSuccess: (data: any, args: any) => {
         const dataInCache: any = queryClient.getQueryData("Posts");
         const index = dataInCache.findIndex((x: postType) => x.id === args.id);
         dataInCache[index] = { ...data };
         queryClient.setQueryData("Posts", dataInCache);
         // queryClient.invalidateQueries('Posts')
      },
      onError: () => {
         alert("error");
      },
   };
}
// -- delete post
export function deletePostCallback(queryClient: QueryClient) {
   return {
      onSuccess: (_: any, args: any) => {
         const dataInCache: any = queryClient.getQueryData("Posts");
         const newData = dataInCache.filter((x: postType) => x.id !== args);
         queryClient.setQueryData("Posts", newData);
         // queryClient.invalidateQueries('Posts')
      },
      onError: () => {
         alert("error");
      },
   };
}
