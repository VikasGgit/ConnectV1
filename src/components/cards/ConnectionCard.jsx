
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
// import DoneIcon from '@mui/icons-material/Done';
// import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
// import SearchIcon from '@mui/icons-material/Search';
// import {
//   allUser,
//   ConnectReq,
//   acceptConnection,
// } from '../features/connect/connectSlice';
// import { fetchNotifications } from '../features/connect/notificationSlice';
// import { loadChat } from '../features/user/chatSlice';

// const ConnectUserList = ({ currentUserId }) => {
//   const dispatch = useDispatch();
//   const [search, setSearch] = useState('');
//   const [filteredUsers, setFilteredUsers] = useState([]);

//   const { users, loading, acceptLoading } = useSelector(
//     (state) => state.connectionReducer
//   );
//   const { items } = useSelector((state) => state.notificationReducer);

//   useEffect(() => {
//     dispatch(allUser());
//   }, [dispatch]);

//   useEffect(() => {
//     if (search.trim() === '') {
//       setFilteredUsers(users || []);
//     } else {
//       const lowerSearch = search.toLowerCase();
//       const filtered = users?.filter((user) => {
//         const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
//         const college = user.education[0]?.collegeName?.toLowerCase() || '';
//         const degree = user.education[0]?.degree?.toLowerCase() || '';
//         return (
//           fullName.includes(lowerSearch) ||
//           college.includes(lowerSearch) ||
//           degree.includes(lowerSearch)
//         );
//       });
//       setFilteredUsers(filtered);
//     }
//   }, [search, users]);

//   const handleConnect = async (targetUserId) => {
//     await dispatch(ConnectReq({ userId: targetUserId, not_code: 1 }));
//     dispatch(fetchNotifications());
//     dispatch(allUser());
//   };

//   const handleAccept = async (reqId) => {
//     await dispatch(fetchNotifications());
//     await dispatch(acceptConnection({ reqId }));
//     await dispatch(loadChat());
//     await dispatch(allUser());
//   };

//   const getConnectionStatus = (userId) => {
//     const sentRequest = items?.find(
//       (item) => item?.user_id?._id === userId && item.not_code === 2
//     );
//     const receivedRequest = items?.find(
//       (item) => item?.user_id?._id === userId && item.not_code === 1
//     );
//     if (sentRequest) return 'pending';
//     if (receivedRequest) return 'accept';
//     return null;
//   };

//   return (
//     <div className="w-full p-4 bg-white rounded-lg shadow-md max-h-[80vh] overflow-y-auto">
//       <div className="flex items-center mb-4 overflow-hidden border border-gray-300 rounded-lg">
//         <input
//           className="flex-grow p-2 text-sm outline-none"
//           type="text"
//           placeholder="Search by name, college, or degree"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <div className="p-2 text-gray-500">
//           <SearchIcon />
//         </div>
//       </div>

//       {filteredUsers?.map((user) => {
//         const connectionStatus = getConnectionStatus(user._id)
//         return (
//           <div
//             key={user._id}
//             className="flex items-center justify-between gap-3 p-3 mb-3 rounded-lg shadow-sm bg-blue-50"
//           >
//             <div className="flex items-center w-full gap-3">
//               <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 overflow-hidden text-lg font-semibold text-white bg-blue-200 rounded-full">
//                 {user.picture ? (
//                   <img
//                     src={user.picture}
//                     alt={user.firstName}
//                     className="object-cover w-full h-full rounded-full"
//                   />
//                 ) : (
//                   <img
//                   src='/logo.svg'
//                   alt={user.firstName}
//                   className="object-cover w-full h-full rounded-full"
//                 />
//                 )}
//               </div>

//               <div className="flex-1 min-w-0">
//                 <h1 className="font-semibold truncate cursor-pointer hover:text-blue-500">
//                   {user.firstName} {user.lastName}
//                 </h1>
//                 <p className="text-sm text-gray-600 truncate">
//                   {user.education[0]?.collegeName || 'Hey I love using connect'} |{' '}
//                   {user.education[0]?.degree || 'connect.'}
//                 </p>
//               </div>
//             </div>

//             <div className="flex-shrink-0">
//               {user?.isPending === true || connectionStatus === 'pending' ? (
//                 <HourglassBottomIcon className="text-gray-400" />
//               ) : connectionStatus === 'accept' ? (
//                 <DoneIcon
//                   className="text-green-600 cursor-pointer"
//                   onClick={() => handleAccept(user._id)}
//                 />
//               ) : (
//                 <PersonAddAltIcon
//                   className="text-blue-600 cursor-pointer"
//                   onClick={() => handleConnect(user._id)}
//                 />
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ConnectUserList;



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip
} from '@mui/material';
import {
  PersonAddAlt as PersonAddAltIcon,
  Done as DoneIcon,
  HourglassBottom as HourglassBottomIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import {
  allUser,
  ConnectReq,
  acceptConnection,
} from '../features/connect/connectSlice';
import { fetchNotifications } from '../features/connect/notificationSlice';
import { loadChat } from '../features/user/chatSlice';
import { useNavigate } from 'react-router-dom';

const ConnectUserList = ({ currentUserId }) => {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});

  const { users, loading, acceptLoading } = useSelector(
    (state) => state.connectionReducer
  );
  const { items } = useSelector((state) => state.notificationReducer);

  useEffect(() => {
    dispatch(allUser());
  }, [dispatch]);

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredUsers(users || []);
    } else {
      const lowerSearch = search.toLowerCase();
      const filtered = users?.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        const college = user.education[0]?.collegeName?.toLowerCase() || '';
        const degree = user.education[0]?.degree?.toLowerCase() || '';
        return (
          fullName.includes(lowerSearch) ||
          college.includes(lowerSearch) ||
          degree.includes(lowerSearch)
        );
      });
      setFilteredUsers(filtered);
    }
  }, [search, users]);

  const handleConnect = async (targetUserId) => {
    setLoadingStates(prev => ({ ...prev, [targetUserId]: true }));
    try {
      await dispatch(ConnectReq({ userId: targetUserId, not_code: 1 }));
      dispatch(fetchNotifications());
      dispatch(allUser());
    } finally {
      setLoadingStates(prev => ({ ...prev, [targetUserId]: false }));
    }
  };

  const handleAccept = async (reqId) => {
    setLoadingStates(prev => ({ ...prev, [reqId]: true }));
    try {
      await dispatch(fetchNotifications());
      await dispatch(acceptConnection({ reqId }));
      await dispatch(loadChat());
      await dispatch(allUser());
    } finally {
      setLoadingStates(prev => ({ ...prev, [reqId]: false }));
    }
  };

  const getConnectionStatus = (userId) => {
    const sentRequest = items?.find(
      (item) => item?.user_id?._id === userId && item.not_code === 2
    );
    const receivedRequest = items?.find(
      (item) => item?.user_id?._id === userId && item.not_code === 1
    );
    if (sentRequest) return 'pending';
    if (receivedRequest) return 'accept';
    return null;
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md max-h-[80vh] overflow-y-auto">
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder="Search by name, college, or degree"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      {loading && (
        <div className="flex justify-center p-4">
          <CircularProgress size={24} />
        </div>
      )}

      {filteredUsers?.map((user) => {
        const connectionStatus = getConnectionStatus(user._id);
        const isLoading = loadingStates[user._id] || false;

        return (
          <div
            key={user._id}
            onClick={()=>{navigate(`/userProfile/${user._id}`)}}
            className="flex items-center justify-between gap-3 p-3 mb-3 transition-all duration-200 rounded-lg shadow-sm hover:shadow-md bg-blue-50 hover:bg-blue-100"
          >
            <div className="flex items-center flex-1 min-w-0 gap-3">
              <Avatar
                src={user.picture || '/logo.svg'}
                alt={`${user.firstName} ${user.lastName}`}
                sx={{ width: 48, height: 48 }}
              />

              <div className="flex-1 min-w-0">
                <h2 className="font-semibold truncate cursor-pointer hover:text-blue-500">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-gray-600 truncate">
                  {user.education[0]?.collegeName || 'Hey I love using connect'} |{' '}
                  {user.education[0]?.degree || 'connect.'}
                </p>
              </div>
            </div>

            <div className="flex-shrink-0 ml-2">
              {isLoading ? (
                <CircularProgress size={24} />
              ) : user?.isPending === true || connectionStatus === 'pending' ? (
                <Tooltip title="Request Pending">
                  <IconButton disabled>
                    <HourglassBottomIcon color="disabled" />
                  </IconButton>
                </Tooltip>
              ) : connectionStatus === 'accept' ? (
                <Tooltip title="Accept Connection">
                  <IconButton
                    color="success"
                    onClick={() => handleAccept(user._id)}
                    sx={{ 
                      backgroundColor: 'rgba(46, 125, 50, 0.08)',
                      '&:hover': { backgroundColor: 'rgba(46, 125, 50, 0.12)' }
                    }}
                  >
                    <DoneIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Connect">
                  <IconButton
                    color="primary"
                    onClick={() => handleConnect(user._id)}
                    sx={{ 
                      backgroundColor: 'rgba(25, 118, 210, 0.08)',
                      '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.12)' }
                    }}
                  >
                    <PersonAddAltIcon />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          </div>
        );
      })}

      {!loading && filteredUsers?.length === 0 && (
        <div className="p-4 text-center text-gray-500">
          No users found matching your search
        </div>
      )}
    </div>
  );
};

export default ConnectUserList;