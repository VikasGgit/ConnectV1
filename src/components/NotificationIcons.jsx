import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchNotifications,
  markNotificationRead,
  markAllNotificationsRead
} from './features/connect/notificationSlice';
import {
  Badge,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Divider,
  Box,
  CircularProgress,
  Alert
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckIcon from '@mui/icons-material/Check';
import { acceptConnection } from './features/connect/connectSlice';
import { allUser } from './features/connect/connectSlice';
import {loadChat, refc} from './features/user/chatSlice';

const NotificationIcon = ({text}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const { items, unreadCount, status, error } = useSelector(
    (state) => state.notificationReducer
  );

  // console.log("items", items, 'status', status)
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (status === 'idle') {
      dispatch(fetchNotifications());
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = async(notificationId) => {
    if (!items.find(n => n._id === notificationId)?.read) {

      await dispatch(fetchNotifications())
      dispatch(markNotificationRead(notificationId));

    }
  };
  const handleAccept = async (reqId, notificationId ) => {
    if (!items.find(n => n._id === notificationId)?.read) {
      await dispatch(markNotificationRead(notificationId))
    }
     await dispatch(acceptConnection({ reqId }));
   await dispatch(loadChat())
     await dispatch(allUser());
     await dispatch(fetchNotifications())
  };

  // const handleMarkAllRead = () => {
  //   if (unreadCount > 0) {
  //     dispatch(markAllNotificationsRead());
    
  //   }
  // };

  return (
    <>
      {/* <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={unreadCount} color="error" max={99}>
          <NotificationsIcon />
          <span>{text}</span>
        </Badge>
      </IconButton> */}
    <IconButton   sx={text ? { gap: 1.5 } : {}} onClick={handleClick}  >
  <Badge 
    badgeContent={unreadCount} 
    color="error" 
    max={99}
   
  >
    <NotificationsIcon   />
    
  </Badge>
  <span className='text-sm ' >{text}</span>
</IconButton>


      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiPaper-root': {
            width: 350,
            maxHeight: 400
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 1
            }}
          >
            <Typography variant="h6">Notifications</Typography>
           
          </Box>
          <Divider />

          {status === 'loading' && (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <CircularProgress size={24} />
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Failed to load notifications
            </Alert>
          )}

          <List sx={{ overflow: 'auto', maxHeight: 300 }}>
            {status === 'succeeded' && items.length === 0 ? (
              <ListItem>
                <ListItemText primary="No notifications yet" />
              </ListItem>
            ) : (
             
              items.map((notification) => {
                const { user_id, not_code, createdAt, read, _id } = notification;
                const senderName = `${user_id?.firstName || ''} ${user_id?.lastName || ''}`.trim();
                const educationInfo = Array.isArray(user_id?.education)
                  ? user_id.education.join(', ')
                  : user_id?.education || 'N/A';
              
                const message = not_code === 1
                  ? `${senderName} requested to connect with you.`
                  : `${senderName} accepted your invitation.`;
              
                return (
                  <ListItem
                    key={_id}
                    sx={{
                      bgcolor: read ? 'background.paper' : 'action.hover',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'action.selected'
                      },
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start'
                    }}
                    onClick={() => handleNotificationClick(_id)}
                  >
                    <ListItemText
                      primary={message}
                      secondary={
                        <>
                          <Typography variant="body2" color="textSecondary">
                            Education: {educationInfo}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {new Date(createdAt).toLocaleString()}
                          </Typography>
                        </>
                      }
                    />
              
                    {!read && not_code === 1 && (
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        startIcon={<CheckIcon />}
                        sx={{ mt: 1 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          // console.log("notification users", notification)
                           handleAccept(user_id?._id, _id)
                          // console.log("Accepting connection from", user_id?._id);
                        }}
                      >
                        Accept
                      </Button>
                    )}
              
                    {!read && (
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          bgcolor: 'primary.main',
                          borderRadius: '50%',
                          alignSelf: 'flex-end',
                          mt: 1
                        }}
                      />
                    )}
                  </ListItem>
                );
              })
              
            )}
          </List>
        </Box>
      </Popover>
    </>
  );
};

export default NotificationIcon;