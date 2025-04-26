


import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { SOCKET_API as scket , API_URL as api, } from "../../../config/variable";

// Helper function for axios config
const getConfig = (token) => ({
  headers: { 
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${token}`
  }
});

// Existing create post thunk
export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData, { getState, rejectWithValue }) => {
    try {
      const token = getState().status.token;
      const res = await axios.post(
        `${api}/post/create`, 
        postData, 
        getConfig(token)
      );
      return res.data.post;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Error posting');
    }
  }
);

// New thunk for fetching feed posts
export const fetchFeedPosts = createAsyncThunk(
  'posts/fetchFeedPosts',
  async ({ userId, page = 1, limit = 5 }, { getState, rejectWithValue }) => {
    try {
      const token = getState().status.token;
      const res = await axios.get(
        `${api}/post/feed/${userId}?page=${page}&limit=${limit}`,
        getConfig(token)
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Error fetching posts');
    }
  }
);

// New thunk for liking a post
export const likePost = createAsyncThunk(
  'posts/likePost',
  async ({ postId, userId }, { getState, rejectWithValue }) => {
    try {
      const token = getState().status.token;
      const res = await axios.post(
        `${api}/post/like/${postId}`,
        { userId },
        getConfig(token)
      );
      return { postId, likes: res.data.likes };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Error liking post');
    }
  }
);

// New thunk for adding a comment
export const addComment = createAsyncThunk(
  'posts/addComment',
  async ({ postId, userId, text }, { getState, rejectWithValue }) => {
    try {
      const token = getState().status.token;
      const res = await axios.post(
        `${api}/post/comment/${postId}`,
        { text, userId },
        {
          headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      return { postId, comment: res.data.comment };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Error adding comment');
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState: { 
    loading: false, 
    error: null, 
    posts: [],
    feed: {
      data: [],
      page: 1,
      limit: 5,
      totalPages: 1,
      totalPosts: 0,
      loading: false,
      error: null
    }
  },
  reducers: {
    clearPostError: (state) => {
      state.error = null;
    },
    clearFeedError: (state) => {
      state.feed.error = null;
    },
    resetFeed: (state) => {
      state.feed = {
        data: [],
        page: 1,
        limit: 5,
        totalPages: 1,
        totalPosts: 0,
        loading: false,
        error: null
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Post reducers
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift(action.payload);
        if (state.feed.page === 1) {
          state.feed.data.unshift(action.payload);
          state.feed.totalPosts += 1;
        }
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch Feed Posts reducers
      .addCase(fetchFeedPosts.pending, (state) => {
        state.feed.loading = true;
        state.feed.error = null;
      })
      .addCase(fetchFeedPosts.fulfilled, (state, action) => {
        state.feed.loading = false;
        // Append new posts when loading more pages
        if (action.payload.page > 1) {
          state.feed.data = [...state.feed.data, ...action.payload.posts];
        } else {
          state.feed.data = action.payload.posts;
        }
        state.feed.page = action.payload.page;
        state.feed.totalPages = action.payload.totalPages;
        state.feed.totalPosts = action.payload.totalPosts;
      })
      .addCase(fetchFeedPosts.rejected, (state, action) => {
        state.feed.loading = false;
        state.feed.error = action.payload;
      })
      
      // Like Post reducers
      .addCase(likePost.fulfilled, (state, action) => {
        // Update in main posts array
        const postIndex = state.posts.findIndex(p => p._id === action.payload.postId);
        if (postIndex !== -1) {
          state.posts[postIndex].likes = action.payload.likes;
        }
        // Update in feed array
        const feedPostIndex = state.feed.data.findIndex(p => p._id === action.payload.postId);
        if (feedPostIndex !== -1) {
          state.feed.data[feedPostIndex].likes = action.payload.likes;
        }
      })
      
      // Add Comment reducers
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        // Update in main posts array
        const postIndex = state.posts.findIndex(p => p._id === action.payload.postId);
        if (postIndex !== -1) {
          state.posts[postIndex].comments = state.posts[postIndex].comments || [];
          state.posts[postIndex].comments.push(action.payload.comment);
        }
        // Update in feed array
        const feedPostIndex = state.feed.data.findIndex(p => p._id === action.payload.postId);
        if (feedPostIndex !== -1) {
          state.feed.data[feedPostIndex].comments = state.feed.data[feedPostIndex].comments || [];
          state.feed.data[feedPostIndex].comments.push(action.payload.comment);
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPostError, clearFeedError, resetFeed } = postSlice.actions;
export default postSlice.reducer;