
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import DoneIcon from '@mui/icons-material/Done';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import SearchIcon from '@mui/icons-material/Search';
import {
  allUser,
  ConnectReq,
  acceptConnection,
} from '../features/connect/connectSlice';
import { fetchNotifications } from '../features/connect/notificationSlice';
import { loadChat } from '../features/user/chatSlice';

const ConnectUserList = ({ currentUserId }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

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
    await dispatch(ConnectReq({ userId: targetUserId, not_code: 1 }));
    dispatch(fetchNotifications());
    dispatch(allUser());
  };

  const handleAccept = async (reqId) => {
    await dispatch(fetchNotifications());
    await dispatch(acceptConnection({ reqId }));
    await dispatch(loadChat());
    await dispatch(allUser());
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
      <div className="flex items-center mb-4 overflow-hidden border border-gray-300 rounded-lg">
        <input
          className="flex-grow p-2 text-sm outline-none"
          type="text"
          placeholder="Search by name, college, or degree"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="p-2 text-gray-500">
          <SearchIcon />
        </div>
      </div>

      {filteredUsers?.map((user) => {
        const connectionStatus = getConnectionStatus(user._id);
        const initials = user.firstName?.charAt(0)?.toUpperCase() || '?';

        return (
          <div
            key={user._id}
            className="flex items-center justify-between gap-3 p-3 mb-3 rounded-lg shadow-sm bg-blue-50"
          >
            <div className="flex items-center w-full gap-3">
              <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 overflow-hidden text-lg font-semibold text-white bg-blue-200 rounded-full">
                {user.picture ? (
                  <img
                    src={user.picture}
                    alt={user.firstName}
                    className="object-cover w-full h-full rounded-full"
                  />
                ) : (
                  initials
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h1 className="font-semibold truncate cursor-pointer hover:text-blue-500">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-sm text-gray-600 truncate">
                  {user.education[0]?.collegeName || ''} |{' '}
                  {user.education[0]?.degree || ''}
                </p>
              </div>
            </div>

            <div className="flex-shrink-0">
              {user?.isPending === true || connectionStatus === 'pending' ? (
                <HourglassBottomIcon className="text-gray-400" />
              ) : connectionStatus === 'accept' ? (
                <DoneIcon
                  className="text-green-600 cursor-pointer"
                  onClick={() => handleAccept(user._id)}
                />
              ) : (
                <PersonAddAltIcon
                  className="text-blue-600 cursor-pointer"
                  onClick={() => handleConnect(user._id)}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ConnectUserList;
