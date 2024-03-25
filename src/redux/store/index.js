import { configureStore } from "@reduxjs/toolkit";
import { postsSlice } from "../slice/posts";

export const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
  },
});
