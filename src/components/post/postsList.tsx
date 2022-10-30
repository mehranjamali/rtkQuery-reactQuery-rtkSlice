import { useEffect, useState } from "react";

import { postType } from "../../contexts/custom-query/types";
import Post from "./post";
import PostForm from "./postForm";

type PostsContainerPropsType = {
   data: postType[];
   handleAddPost: any;
   handleEditPost: any;
   handleDeletePost: any;
};

export default function PostsList({ data, handleAddPost, handleDeletePost, handleEditPost }: PostsContainerPropsType) {
   const [postForEdit, setPostForEdit] = useState<postType | null>(null);
   const [isHidePostForm, setIsHidePostForm] = useState<boolean>(true);

   // handle post form
   const handlePostForm = (post: postType | null = null) => {
      if (post?.id) setPostForEdit(post);
      else setPostForEdit(null);
      setIsHidePostForm(false);
   };

   return (
      <div className="w-full flex flex-col items-center bg-white rounded-md p-2 shadow-lg border border-slate-200">
         <div className="flex flex-row items-center justify-between w-full border-b border-slate-400 pb-2 text-base">
            <p>Posts: {data.length}</p>
            <button className="py-1 p-2 bg-blue-600 text-white rounded-md text-sm" onClick={() => handlePostForm()}>
               Add New Post
            </button>
         </div>
         <div
            className={`w-full flex flex-col items-center bg-white border-b border-slate-400 ${
               isHidePostForm && "hidden"
            }`}
         >
            <PostForm
               key={postForEdit?.id}
               post={postForEdit}
               handleAddPost={handleAddPost}
               handleEditPost={handleEditPost}
            />
         </div>
         <div className="w-full pt-2 pb-3 px-4 flex flex-col gap-2">
            {data.map((post: postType, index: number) => {
               return (
                  <Post post={post} key={index} handleDeletePost={handleDeletePost} handlePostForm={handlePostForm} />
               );
            })}
         </div>
      </div>
   );
}
