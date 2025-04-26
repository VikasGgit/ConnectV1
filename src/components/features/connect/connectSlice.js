


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { SOCKET_API as scket , API_URL as api, } from "../../../config/variable";

// Remove the useSelector hook from here - it can't be used outside components
const getConfig = (token) => ({
  headers: { 
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
});

export const allUser = createAsyncThunk(
  'connection/all',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().status.token; // Get token from Redux state
      const res = await axios.get(
        `${api}/connection/allusers`,
        getConfig(token)
      );
      return res.data;
    } catch (err) {
      // console.log("refa", err);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const acceptConnection = createAsyncThunk(
  'connection/acceptConnection',
  async ({ reqId }, { getState, rejectWithValue }) => {
    try {
      const token = getState().status.token;
      const res = await axios.post(
        `${api}/connection/accept-connection`,
        { reqId, not_code: 2 },
        getConfig(token)
      );
      return res.data;
    } catch (err) {
      // console.log("Error accepting connection:", err);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const ConnectReq = createAsyncThunk(
  'connection/connectReg',
  async (notificationData, { getState, rejectWithValue }) => {
    try {
      const token = getState().status.token;
      const res = await axios.post(
        `${api}/notification`,
        notificationData,
        getConfig(token)
      );
      return res.data;
    } catch (err) {
      // console.log("refa", err);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const connectionSlice = createSlice({
  name: 'connection',
  initialState: {
    loading: false,
    acceptLoading: false,
    error: null,
    users: []
  },
  reducers: {
    clearConnectionError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(allUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(allUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.users = action.payload.users;
      })
      .addCase(allUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(ConnectReq.pending, (state) => {
        state.loading = true;
      })
      .addCase(ConnectReq.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(ConnectReq.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(acceptConnection.pending, (state) => {
        state.acceptLoading = true;
      })
      .addCase(acceptConnection.fulfilled, (state) => {
        state.acceptLoading = false;
        state.error = null;
      })
      .addCase(acceptConnection.rejected, (state, action) => {
        state.acceptLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearConnectionError } = connectionSlice.actions;
export default connectionSlice.reducer;