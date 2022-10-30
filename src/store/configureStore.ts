import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { postsApi } from "../features/rtk-query-posts/postsApi";
import postsReducer from "../features/rtk-slice/postsSlice";
import authMiddleware from "./middlewares/auth";
import apiMiddleware from "./middlewares/api";

export const store = configureStore({
   reducer: {
      [postsApi.reducerPath]: postsApi.reducer,
      rtkSlicePosts: postsReducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(postsApi.middleware, authMiddleware, apiMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
