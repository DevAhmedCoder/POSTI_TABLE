import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPosts } from "../../crud";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isLoading: false,
    error: false,
  },
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    editePost: (state, action) => {
      console.log({ post: action.payload });
      state.posts.map((post) => {
        if (post.id === action.payload.id) {
          post.title = action.payload.title;
          post.desc = action.payload.desc;
          post.color = action.payload.color;
          post.doIt = action.payload.doIt;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(allPostsAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(allPostsAction.fulfilled, (state, action) => {
      state.isLoading = false;

      state.posts = action.payload;
    });
    builder.addCase(allPostsAction.rejected, (state, action) => {
      state.error = true;
    });
  },
});
export const { addPost, deletePost, editePost } = postsSlice.actions;
export default postsSlice.reducer;

export const allPostsAction = createAsyncThunk("allPosts", async () => {
  const resp = await getPosts();
  return resp;
});
