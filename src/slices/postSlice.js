import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPosts, createPost, updatePost, deletePost } from "../api/postsApi";

// 📦 Thunks for async CRUD operations
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (_, thunkAPI) => {
  try {
    const response = await getPosts();
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addPost = createAsyncThunk("posts/addPost", async (postData, thunkAPI) => {
  try {
    const response = await createPost(postData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const editPost = createAsyncThunk("posts/editPost", async (postData, thunkAPI) => {
  try {
    const response = await updatePost(postData.id, postData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const removePost = createAsyncThunk("posts/removePost", async (id, thunkAPI) => {
  try {
    await deletePost(id);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// 🧩 Slice
const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Post
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      // Edit Post
      .addCase(editPost.fulfilled, (state, action) => {
        const index = state.posts.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) state.posts[index] = action.payload;
      })
      // Delete Post
      .addCase(removePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;
