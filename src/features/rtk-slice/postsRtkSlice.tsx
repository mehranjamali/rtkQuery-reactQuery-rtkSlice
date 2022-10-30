import { useEffect } from "react";
import PostsList from "../../components/post/postsList";
import { postType } from "../../contexts/custom-query/types";
import { useDispatch, useSelector } from "../../store/hooks";
import { fetchPostsCommand, addPostCommand, deletePostCommand, editPostCommand, allPostsSelector } from "./postsSlice";

export default function PostsRtkSlice() {
   // dispatch hook
   const dispatch = useDispatch();
   // selector hook -> select all posts
   const { loading, error, data } = useSelector((state: any) => allPostsSelector(state));

   // dispatch -> fetch posts command
   useEffect(() => {
      dispatch(fetchPostsCommand());
   }, [dispatch]);

   const addPostMutate = (post: postType) => {
      dispatch(addPostCommand(post));
   };

   const editPostMutate = (post: postType) => {
      dispatch(editPostCommand(post));
   };

   const deletePostMutate = (postId: any) => {
      dispatch(deletePostCommand(postId));
   };

   if (loading) return <div>loading...</div>;
   if (error) return <div>Error : {error}</div>;

   return (
      <div className="flex flex-col w-full">
         <div className="text-lg pb-2 flex items-center">
            <p>This Part is implemented with</p>
            <p className="bg-gray-400 rounded-md text-xl ml-2 px-2 pb-1">rtk slice</p>
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
