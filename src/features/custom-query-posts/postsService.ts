import {
   ESlices,
   postType,
   EAction,
   useMutationParameterType,
   useFetchParameterType,
} from "../../contexts/custom-query/types";

// Commands
// -- fetch all posts and cache them in context
export function fetchAllPostsCommand(): useFetchParameterType {
   return { url: "posts", sliceName: ESlices.posts };
}

// -- fetch post by id and don't cache
export function fetchPostByIdCommand(postId: number): useFetchParameterType {
   return { url: `posts/${postId}` };
}
// -- add post
export function addPostCommand(post: postType): useMutationParameterType {
   return { url: "posts", data: post, type: EAction.post, needAuth: true, sliceName: ESlices.posts };
}
// -- edit post
export function editPostCommand(post: postType): useMutationParameterType {
   return { url: `posts/${post.id}`, data: post, type: EAction.put, needAuth: true, sliceName: ESlices.posts };
}
// -- delete post
export function deletePostCommand(postId: number): useMutationParameterType {
   return { url: `posts/${postId}`, data: postId, type: EAction.delete, needAuth: true, sliceName: ESlices.posts };
}

// // Selectors
// -- select all posts
export function allPostsSelector(param: any) {
   return param;
}

// // -- select post by id
export function postByIdSelector(param: any) {
   return param;
}
