import { postType } from "../../contexts/custom-query/types";

type postPropsType = {
   post: postType;
   handleDeletePost: (postId: number) => void;
   handlePostForm: (post: postType) => void;
};

function Post({ post, handleDeletePost, handlePostForm }: postPropsType) {
   return (
      <div className="bg-gray-100 border border-gray-200 rounded-md p-2 flex flex-row items-center justify-between gap-2 text-sm">
         <div className="text-ellipsis whitespace-nowrap overflow-hidden basis-2/12">{post.title}</div>
         <div className="text-ellipsis whitespace-nowrap overflow-hidden basis-8/12">{post.body}</div>
         <div className="basis-2/12 flex flex-row justify-between gap-1">
            <button onClick={() => handlePostForm(post)} className="w-12 h-6 rounded-md bg-yellow-400">
               edit
            </button>
            <button onClick={() => post.id && handleDeletePost(post.id)} className="w-12 h-6 rounded-md bg-red-400">
               delete
            </button>
         </div>
      </div>
   );
}

export default Post;
