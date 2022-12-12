import PostsList from "../../components/post/postsList";
import { useQuery, useMutation, useQueryClient } from "react-query";
import type { QueryClient } from "react-query";

// services
import {
   fetchPostsCommand,
   addPostCommand,
   deletePostCommand,
   editPostCommand,
   addPostCallback,
   editPostCallback,
   deletePostCallback,
} from "./postsReactQueryService";

// This Part is implemented with "react-query"
export default function PostsReactQuery() {
   // use query client
   const queryClient: QueryClient = useQueryClient();

   // use fetch
   const { data, isError, isLoading } = useQuery("Posts", fetchPostsCommand, { staleTime: 60000 }); // 1 minute

   // use mutation
   const { mutate: addPostMutate } = useMutation(addPostCommand, addPostCallback(queryClient));
   const { mutate: editPostMutate } = useMutation(editPostCommand, editPostCallback(queryClient));
   const { mutate: deletePostMutate } = useMutation(deletePostCommand, deletePostCallback(queryClient));

   if (isLoading) return <div>loading...</div>;
   if (isError) return <div>Error : {isError}</div>;

   return (
      <div className="flex flex-col w-full">
         <div className="text-lg pb-2 flex items-center">
            <p>This Part is implemented with</p>
            <p className="bg-gray-400 rounded-md text-xl ml-2 px-2 pb-1">react-query</p>
         </div>
         <PostsList
            data={data}
            handleAddPost={addPostMutate}
            handleDeletePost={deletePostMutate}
            handleEditPost={editPostMutate}
            key={"react-query"}
         />
      </div>
   );
}
