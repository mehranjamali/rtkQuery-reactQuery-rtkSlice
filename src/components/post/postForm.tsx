import { useState, useEffect } from "react";
import { postType } from "../../contexts/custom-query/types";

type postFormPropsType = {
   post?: postType | null;
   handleAddPost: (post: postType) => void;
   handleEditPost: (post: postType) => void;
};

export default function PostForm({ post, handleAddPost, handleEditPost }: postFormPropsType) {
   const [title, setTitle] = useState(post?.title || "");
   const [body, setBody] = useState(post?.body || "");

   const onSubmit = (event: any) => {
      event.preventDefault();
      if (post?.id) handleEditPost({ title: title, body: body, userId: 1, id: post.id });
      else handleAddPost({ title: title, body: body, userId: 1 });
   };

   return (
      <form onSubmit={onSubmit} className="flex flex-col w-full py-4 px-8 gap-4 text-sm">
         <input
            type="text"
            className="border rounded-md py-1 px-2"
            value={title}
            onChange={(event: any) => setTitle(event.currentTarget.value)}
         />
         <textarea
            rows={7}
            value={body}
            className="border rounded-md py-1 px-2"
            onChange={(event: any) => setBody(event.currentTarget.value)}
         ></textarea>
         <div className="flex flex-row justify-end">
            <button
               disabled={!title || !body}
               className="disabled:cursor-not-allowed bg-blue-600 text-white w-20 rounded-md py-1"
            >
               Submit
            </button>
         </div>
      </form>
   );
}
