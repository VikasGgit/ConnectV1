

import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearNotification } from './features/connect/notificationSlice';
import { logout } from './features/user/statusSlice';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Photo from '../assets/man-avatar.png';
import ConnectionModal from './Modals/Connection';
import { NotificationManager } from './NotificationManager';
import NotificationIcon from './NotificationIcons';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {userData, loginStatus} = useSelector((state)=>state.status)
  

  const changeLogin = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const changeSignup = () => {
    navigate('/signup');
  };

  const logoutHandler = async () => {
    localStorage.removeItem('userData');
    await dispatch(clearNotification());
    dispatch(logout());
    navigate('/', { replace: true });
  };

  const profileHandler = () => {
    navigate(`/profile/${userData?.user?._id}`);
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={()=>navigate('/')} >
            <h1 className="text-2xl font-bold text-customBlue">connect.</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            <IconButton>
              <WorkOutlineOutlinedIcon />
            </IconButton>
            <IconButton>
              <ConnectionModal currentUserId={userData?.user?._id} />
            </IconButton>
            <IconButton>
              <NewspaperOutlinedIcon />
            </IconButton>
            {loginStatus && (
              <>
                <NotificationManager userId={userData?.user?._id} />
                <NotificationIcon />
              </>
            )}
            {!loginStatus ? (
              <>
                <Button
                  variant="contained"
                  onClick={changeLogin}
                  sx={{
                    backgroundColor: '#3F3D56',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#5a52e0' },
                  }}
                >
                  Login
                </Button>
                <Button variant="outlined" onClick={changeSignup}>
                  Sign Up
                </Button>
              </>
            ) : (
              <div 
                className="relative flex items-center space-x-2"
                onMouseEnter={() => setProfileDropdownOpen(true)}
                onMouseLeave={() => setProfileDropdownOpen(false)}
              >
                <img
                  src={userData?.user?.picture || Photo}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">
                  Hi! {userData.user?.firstName}
                </span>
                {profileDropdownOpen && (
                  <div className="absolute right-0 z-50 w-48 py-1 bg-white border border-gray-200 rounded-md shadow-lg top-full left-3">
                    <button
                      onClick={profileHandler}
                      className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </button>
                    <button
                      onClick={logoutHandler}
                      className="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <IconButton onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="bg-white shadow-lg md:hidden">
          {loginStatus && (
            <div className="flex items-center px-4 py-3 border-b border-gray-200">
              <img
                src={userData?.user?.picture || Photo }
                alt="User Avatar"
                className="w-10 h-10 mr-3 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700">
                Hi! {userData.user?.firstName}
              </span>
            </div>
          )}
          
          <div className="px-4 py-2 space-y-2">
            {/* Mobile Menu Items - Vertical Layout */}
            <div className="flex flex-col space-y-3">
              <div className="flex items-center px-2 py-2 text-gray-700 rounded hover:bg-gray-100">
                <WorkOutlineOutlinedIcon className="mr-3" />
                <span>Jobs</span>
              </div>
              
              <div className="flex items-center px-2 py-2 text-gray-700 rounded hover:bg-gray-100">
                <ConnectionModal currentUserId={userData?.user?._id} />
                <span className="ml-3">Connections</span>
              </div>
              
              <div className="flex items-center px-2 py-2 text-gray-700 rounded hover:bg-gray-100">
                <NewspaperOutlinedIcon className="mr-3" />
                <span>News</span>
              </div>
              
              {loginStatus && (
                <>
                  <div className="flex items-center py-2 text-gray-700 rounded hover:bg-gray-100">
                  <NotificationManager userId={userData?.user?._id}/>
                  <NotificationIcon/> 
                    <span className='ml-1'>Notifications</span>
                  </div>
                </>
              )}
            </div>

            {/* Auth Buttons */}
            {!loginStatus ? (
              <div className="flex flex-col mt-4 space-y-2">
                <Button
                  variant="contained"
                  onClick={changeLogin}
                  sx={{
                    backgroundColor: '#3F3D56',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#5a52e0' },
                  }}
                  fullWidth
                >
                  Login
                </Button>
                <Button variant="outlined" onClick={changeSignup} fullWidth>
                  Sign Up
                </Button>
              </div>
            ) : (
              <div className="pt-2 mt-4 border-t border-gray-200">
                <button
                  onClick={profileHandler}
                  className="block w-full px-4 py-2 text-sm text-left text-gray-700 rounded hover:bg-gray-100"
                >
                  Profile
                </button>
                <button
                  onClick={logoutHandler}
                  className="block w-full px-4 py-2 text-sm text-left text-red-600 rounded hover:bg-gray-100"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

