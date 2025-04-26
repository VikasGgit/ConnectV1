import {configureStore} from '@reduxjs/toolkit';
import userSlice from '../features/user/userSlice';
import statusSlice from '../features/user/statusSlice'
import refreshSlice from '../features/user/refreshSlice';
import postSlice from '../features/post/postSlice';
import connectSlice from '../features/connect/connectSlice';
import notificationSlice from '../features/connect/notificationSlice';
import chatSlice from '../features/user/chatSlice';
export const store = configureStore({
    reducer:{
        user:userSlice,
        status:statusSlice,
        refresh:refreshSlice, 
        postReducer:postSlice,
        connectionReducer: connectSlice,
        notificationReducer: notificationSlice,
        chatReducer:chatSlice
    }
})