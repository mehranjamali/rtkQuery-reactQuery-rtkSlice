import { Routes, Route } from "react-router-dom";
import { Posts } from "../features/custom-query-posts/posts";
import { PostsReactQuery } from "../features/react-query-posts/postsReactQuery";
import PostsRtkQuery from "../features/rtk-query-posts/postsRtkQuery";
import PostsRtkSlice from "../features/rtk-slice/postsRtkSlice";
import NotFound from "./404/404";
import Home from "./home/home";

export default function Pages() {
   return (
      <Routes>
         <Route path="/" element={<Home />}>
            <Route index element={<Posts />} />
            <Route path="custom-query" element={<Posts />} />
            <Route path="react-query" element={<PostsReactQuery />} />
            <Route path="rtk-query" element={<PostsRtkQuery />} />
            <Route path="rtk-slice" element={<PostsRtkSlice />} />
         </Route>
         <Route path="*" element={<NotFound />} />
      </Routes>
   );
}
