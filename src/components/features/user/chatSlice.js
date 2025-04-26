import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Assuming you forgot to import this
import { SOCKET_API as scket , API_URL as api, } from "../../../config/variable";

const getConfig = (token) => ({
  headers: { 
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
});

export const loadChat = createAsyncThunk(
  'chat/getchat',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().status.token;
      const res = await axios.get(
        `${api}/chat/`, 
        getConfig(token)
      );
      return res.data;
    } catch (err) {
      console.log("refa", err);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const refreshConnectionSlice = createSlice({
  name: "refreshConnection",
  initialState: {
    loading: false,
    error: null,
    conversations: []
  },
  reducers: {
    refc: (state) => {
      return !state;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadChat.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.conversations = action.payload;
      })
      .addCase(loadChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { refc } = refreshConnectionSlice.actions;
export default refreshConnectionSlice.reducer;
