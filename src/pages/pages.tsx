import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./home/home"));
const PostsRtkQuery = lazy(() => import("../features/rtk-query-posts/postsRtkQuery"));
const PostsRtkSlice = lazy(() => import("../features/rtk-slice/postsRtkSlice"));
const PostsReactQuery = lazy(() => import("../features/react-query-posts/postsReactQuery"));
const Posts = lazy(() => import("../features/custom-query-posts/posts"));
const NotFound = lazy(() => import("./404/404"));

export default function Pages() {
   return (
      <Suspense>
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
      </Suspense>
   );
}
