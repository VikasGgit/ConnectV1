
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { SOCKET_API as scket , API_URL as api, } from "../../../config/variable";

const initialState = {
    loginStatus: false,
    userDetails: null,
    userId: null,
    userData: null,
    loading: false,
    picture:null,
    token: null,
    error: null
};

// Helper function for axios config that accepts token as parameter
const getConfig = (token) => ({
    headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
});

export const getUserDetails = createAsyncThunk(
    'users/getDetails', 
    async (userId, { getState, rejectWithValue }) => {
        try {
            const token = getState().status.token; // Get token from Redux state
            const res = await axios.get(
                `${api}/getuser/${userId}`,
                getConfig(token)
            );
            return res.data;
        }
        catch (err) {
            // console.log("error", err);
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

const statusSlice = createSlice({
    name: "status",
    initialState,
    reducers: {
        login: (state, action) => {
            state.loginStatus = true;
            state.userId = action.payload.user._id;
            state.token = action.payload.token;
            state.userData = action.payload;
            state.error = null;
        },
        sUserData: (state, action)=>{
            state.userData = action.payload;
        },
        logout: (state) => {
            state.loginStatus = false;
            state.userId = null;
            state.token = null;
            state.userData = null;
            state.userDetails = null;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.userDetails = action.payload;
            })
            .addCase(getUserDetails.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
});

// Export the actions
export const { login, logout, clearError, sUserData } = statusSlice.actions;

// Export the reducer
export default statusSlice.reducer;