import { createSelector, createSlice } from "@reduxjs/toolkit";
import { stateType, actionType } from "../../store/types";
import { postType } from "../../contexts/custom-query/types";
import moment from "moment";

// apiCall action
import { apiCallBegan } from "../../store/apiAction";

const initialState: stateType<postType[]> = { lastFetch: null, data: [], error: "", loading: true };

// Slice
const postsSlice = createSlice({
   name: "rtkSlicePosts",
   initialState: initialState,
   reducers: {
      postsRequested: (state: stateType<postType[]>, action: actionType<string>) => {
         state.error = "";
         state.loading = true;
      },
      postsRequestFailed: (state: stateType<postType[]>, action: actionType<string>) => {
         state.error = action.payload;
         state.data = [];
         state.lastFetch = null;
         state.loading = false;
      },
      postsRequestSuccess: (state: stateType<postType[]>, action: actionType<postType[]>) => {
         state.data = action.payload;
         state.lastFetch = Date.now();
         state.error = "";
         state.loading = false;
      },
      postAdded: (state: stateType<postType[]>, action: actionType<postType>) => {
         state.data.unshift(action.payload);
      },
      postEdited: (state: stateType<postType[]>, action: actionType<postType>) => {
         const index = state.data.findIndex((p: postType) => p.id === action.payload.id);
         state.data[index] = action.payload;
      },
      postDeleted: (state: stateType<postType[]>, action: actionType<{ data: any; id: any }>) => {
         const index = state.data.findIndex((p: postType) => p.id === action.payload.id);
         state.data.splice(index, 1);
      },
      setError: (state: stateType<postType[]>, action: actionType<string>) => {
         alert(action.payload);
         // state.error = action.payload;
      },
   },
});

// url
const url: string = "posts";

// Commands
// -- fetch posts
const fetchPostsCommand = () => (dispatch: any, getState: any) => {
   const { lastFetch } = getState().rtkSlicePosts;
   const diff = moment().diff(lastFetch, "minutes");
   if (diff < 1) {
      console.log("you can't send a new request less then 1 minutes");
      return;
   }
   return dispatch(
      apiCallBegan({
         url: url,
         method: "GET",
         onSuccess: postsSlice.actions.postsRequestSuccess.type,
         onError: postsSlice.actions.postsRequestFailed.type,
         needAuthorization: false,
      })
   );
};
// -- add post
const addPostCommand = (post: postType) => {
   return apiCallBegan({
      method: "POST",
      url: url,
      data: post,
      onSuccess: postsSlice.actions.postAdded.type,
      onError: postsSlice.actions.setError.type,
      needAuthorization: true,
   });
};
// -- edit post
const editPostCommand = (post: postType) => {
   return apiCallBegan({
      method: "PUT",
      url: `${url}/${post.id}`,
      data: post,
      onSuccess: postsSlice.actions.postEdited.type,
      onError: postsSlice.actions.setError.type,
      needAuthorization: true,
   });
};
// -- delete post
const deletePostCommand = (postId: any) => {
   return apiCallBegan({
      method: "DELETE",
      url: `${url}/${postId}`,
      data: { id: postId },
      onSuccess: postsSlice.actions.postDeleted.type,
      onError: postsSlice.actions.setError.type,
      needAuthorization: true,
   });
};

// Selectors
const allPostsSelector = createSelector(
   (state: any) => state.rtkSlicePosts,
   (posts: any) => posts
);

// export commands
export { fetchPostsCommand, addPostCommand, editPostCommand, deletePostCommand };
// export selectors
export { allPostsSelector };
// export default reducer
export default postsSlice.reducer;
