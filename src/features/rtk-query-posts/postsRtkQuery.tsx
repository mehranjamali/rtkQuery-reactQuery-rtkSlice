import { useGetPostsQuery, useAddPostMutation, useDeletePostMutation, useEditPostMutation } from "./postsApi";

import PostsList from "../../components/post/postsList";

// This Part is implemented with "rtk-query"
export default function PostsRtkQuery() {
   const { data, isLoading, isError } = useGetPostsQuery("");
   const [addPostMutate] = useAddPostMutation();
   const [editPostMutate] = useEditPostMutation();
   const [deletePostMutate] = useDeletePostMutation();

   if (isLoading) return <div>loading...</div>;
   if (isError) return <div>Error : {isError}</div>;

   return (
      <div className="flex flex-col w-full">
         <div className="text-lg pb-2 flex items-center">
            <p>This Part is implemented with</p>
            <p className="bg-gray-400 rounded-md text-xl ml-2 px-2 pb-1">rtk-query</p>
         </div>
         <PostsList
            data={data}
            handleAddPost={addPostMutate}
            handleDeletePost={deletePostMutate}
            handleEditPost={editPostMutate}
            key={"rtk-query"}
         />
      </div>
   );
}
