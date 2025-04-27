
import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  CircularProgress,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { ConnectReq, allUser, acceptConnection } from '../features/connect/connectSlice';
import { fetchNotifications } from '../features/connect/notificationSlice';
import { loadChat, refc } from '../features/user/chatSlice';

const userData = JSON.parse(localStorage.getItem("userData"));

const UserConnectModal = ({ open, handleClose, currentUserId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  let { loading, error, users, acceptLoading } = useSelector(state => state.connectionReducer)
  const { items } = useSelector(state => state.notificationReducer)
  const dispatch = useDispatch();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? '95%' : isTablet ? '85%' : '60%',
    maxWidth: '800px',
    maxHeight: '80vh',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: isMobile ? 2 : 4,
    borderRadius: 2,
  };

  // Fetch users once when modal opens
  useEffect(() => {
    if (open) {
      dispatch(allUser())
    }
  }, [open, dispatch]);

  // Filter users locally based on search term
  useEffect(() => {
    if (search.trim() === '') {
      setFilteredUsers(users || []);
    } else {
      const filtered = users.filter(user => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        const college = user.education[0]?.collegeName?.toLowerCase() || '';
        const degree = user.education[0]?.degree?.toLowerCase() || '';
        
        return (
          fullName.includes(search.toLowerCase()) ||
          college.includes(search.toLowerCase()) ||
          degree.includes(search.toLowerCase())
        );
      });
      setFilteredUsers(filtered);
    }
  }, [search, users]);

  const handleConnect = async (targetUserId) => {
    const data = {
      userId: targetUserId,
      not_code:1
    }
    await dispatch(ConnectReq(data))
    await dispatch(allUser())
    dispatch(fetchNotifications())
  };

  const handleAccept = async (reqId) => {
    await dispatch(fetchNotifications());
    await dispatch(acceptConnection({ reqId }));
    await dispatch(loadChat())
    await dispatch(allUser());
  };

  const getConnectionStatus = (userId) => {
    if (!items || !Array.isArray(items)) return null;
    
    const sentRequest = items.find(item => 
      item?.user_id?._id === userId && item.not_code === 2 
    );
    
    const receivedRequest = items.find(item => 
      item?.user_id?._id === userId && item.not_code === 1
    );
    
    if (sentRequest) return 'pending';
    if (receivedRequest) return 'accept';
    return null;
  };

  const renderButton = (status, userId, firstName, lastName) => {
    if (status === 'pending') {
      return (
        <Button variant="outlined" disabled size={isMobile ? 'small' : 'medium'}>
          Pending
        </Button>
      );
    }
    
    if (status === 'accept') {
      return (
        <Button 
          variant="contained" 
          color="success"
          onClick={() => handleAccept(userId, firstName, lastName)}
          disabled={acceptLoading}
          size={isMobile ? 'small' : 'medium'}
        >
          {acceptLoading ? <CircularProgress size={24} /> : 'Accept'}
        </Button>
      );
    }
    
    return (
      <Button
        variant="contained"
        onClick={() => handleConnect(userId, firstName, lastName)}
        size={isMobile ? 'small' : 'medium'}
      >
        Connect
      </Button>
    );
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant={isMobile ? 'h6' : 'h5'} gutterBottom>
          Connect with Users
        </Typography>
        
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name, college, or degree"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 2 }}
          size={isMobile ? 'small' : 'medium'}
        />

        {loading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        ) : (
          <List dense={isMobile}>
            {filteredUsers?.map((user) => {
              const connectionStatus = getConnectionStatus(user._id);
              return (
                <React.Fragment key={user._id}>
                  <ListItem
                    secondaryAction={renderButton(
                      user?.isPending ? 'pending' : connectionStatus,
                      user._id,
                      user.firstName,
                      user.lastName
                    )}
                  >
                    <ListItemAvatar>
                    {user.picture ?(  <Avatar 
                        src={user.picture} 
                        sx={{ width: isMobile ? 40 : 56, height: isMobile ? 40 : 56 }}
                      />) : (  <Avatar 
                        src='/logo.svg' 
                        sx={{ width: isMobile ? 40 : 56, height: isMobile ? 40 : 56 }}
                      />)}
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${user.firstName} ${user.lastName}`}
                      primaryTypographyProps={{
                        variant: isMobile ? 'body1' : 'subtitle1',
                        fontWeight: 'medium'
                      }}
                      secondary={`${user.education[0]?.collegeName || ''} ${user.education[0]?.degree || ''}`}
                      secondaryTypographyProps={{
                        variant: isMobile ? 'caption' : 'body2',
                        noWrap: isMobile,
                        textOverflow: 'ellipsis'
                      }}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              );
            })}
          </List>
        )}
      </Box>
    </Modal>
  );
};

const ConnectionModal = ({ currentUserId }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <IconButton onClick={() => setOpen(true)} size={isMobile ? 'small' : 'medium'}>
        <PeopleOutlineOutlinedIcon fontSize={isMobile ? 'medium' : 'large'} />
      </IconButton>
      <UserConnectModal 
        open={open} 
        handleClose={() => setOpen(false)} 
        currentUserId={currentUserId} 
      />
    </>
  );
};

export default ConnectionModal;