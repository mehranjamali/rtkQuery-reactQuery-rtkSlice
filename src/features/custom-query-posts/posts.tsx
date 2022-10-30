import {
   fetchAllPostsCommand,
   fetchPostByIdCommand,
   addPostCommand,
   allPostsSelector,
   deletePostCommand,
   editPostCommand,
} from "./postsService";
import { useFetch } from "../../hooks/useFetch";
import { useCustomQuery } from "../../contexts/custom-query/customQueryContext";
import { ESlices } from "../../contexts/custom-query/types";
import { postType } from "../../contexts/custom-query/types";

// posts list
import PostsList from "../../components/post/postsList";

// This Part is implemented with "custom-query"
export function Posts() {
   const { mutation, select } = useCustomQuery();

   useFetch(fetchAllPostsCommand());
   const { data, loading, error } = allPostsSelector(select(ESlices.posts));

   // handle add post
   const handleAddPost = (post: postType) => {
      mutation(addPostCommand(post));
   };

   // handle edit post
   const handleEditPost = (post: postType) => {
      mutation(editPostCommand(post));
   };

   // handle delete post
   const handleDeletePost = (postId: number) => {
      mutation(deletePostCommand(postId));
   };

   if (loading) return <div>loading...</div>;
   if (error) return <div>Error : {error}</div>;

   return (
      <div className="flex flex-col w-full">
         <div className="text-lg pb-2 flex items-center">
            <p>This Part is implemented with</p>
            <p className="bg-gray-400 rounded-md text-xl ml-2 px-2 pb-1">custom-query</p>
         </div>
         <PostsList
            data={data}
            handleAddPost={handleAddPost}
            handleDeletePost={handleDeletePost}
            handleEditPost={handleEditPost}
            key={"custom-query"}
         />
      </div>
   );
}
