import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addNewNotification, fetchNotifications } from './features/connect/notificationSlice';
import io from 'socket.io-client';
import {loadChat, refc} from './features/user/chatSlice';
import { SOCKET_API as scket , API_URL as api, } from "../config/variable";

const socket = io( `${scket}`,{
  withCredentials: true
});

export const NotificationManager = () => {
  const {userId}= useSelector((state)=>state.status)
 
  const dispatch = useDispatch();


  useEffect(() => {
    if (!userId) return;
   
    // Join user's room
    socket.emit('joinUserRoom', userId);
    dispatch(loadChat());
    // Handle new notifications
    const handleNewNotification = (notification) => {
      
      dispatch(fetchNotifications())
      dispatch(loadChat())
    };

    socket.on('newNotification', handleNewNotification);
    dispatch(fetchNotifications())
    return () => {
      socket.off('newNotification', handleNewNotification);
    };
  }, [userId, dispatch]);

  return null;
};