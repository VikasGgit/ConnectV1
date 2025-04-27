import React, { useEffect } from 'react';
import Photo from '../assets/man-avatar.png';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Fab from '@mui/material/Fab';
import BusinessIcon from '@mui/icons-material/Business';
import GroupsIcon from '@mui/icons-material/Groups';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useNavigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from './features/user/statusSlice';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from './Spinner';
import PostFeed from './PostFeed';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChatIcon from '@mui/icons-material/Chat';
import { useMediaQuery } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { motion, AnimatePresence } from "framer-motion";
const UserContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(1);
    const [showMobileProfile, setShowMobileProfile] = useState(false);
    const [showMobileMessages, setShowMobileMessages] = useState(false);
    const isMobile = useMediaQuery('(max-width: 768px)');

    const { conversations } = useSelector((state) => state.chatReducer);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const loginStatus = useSelector((state) => state.status).loginStatus;

    // Mobile view handlers
    const toggleMobileProfile = () => {
        setShowMobileProfile(!showMobileProfile);
        setShowMobileMessages(false);
    };

    const toggleMobileMessages = () => {
        setShowMobileMessages(!showMobileMessages);
        setShowMobileProfile(false);
    };
    const toggleOneHandler = () => {
        if (toggle != 1) {
            setToggle(1)
        }
    }
    const toggleTwoHandler = () => {
        if (toggle != 2) {
            setToggle(2)
        }
    }

    // console.log("converstation ", conversations);

    const postHandler = () => {
        navigate(`/post/${userData.user._id}`);
    }
    const viewmoreHandler = () => {
        navigate(`/profile/${userData.user._id}`);
    }
    useEffect(() => {

        const userData = JSON.parse(localStorage.getItem("userData"));
        dispatch(login(userData))
        if (!userData) {
            navigate('/login');
        } else {
            if (!loginStatus) {
                toast.success("Login success!");
                // console.log("userData", userData);
                dispatch(login(userData));
            }
        }

    }, []);
    // ... rest of your existing handlers and effects

    if (!userData) {
        return <Spinner />;
    }

    return (
        <div className='mt-20 user-container'>
            <div>
                <Outlet />
            </div>

            {/* Desktop Layout */}
            {!isMobile && (
                <>
                    <div className='relative user-profile bg-white rounded-xl shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] h-min'>
                        {/* Wave Design Header */}
                        <div className="relative h-32 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                            <div className="custom-shape-divider-top-1733409435">
                                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill fill-white/20"></path>
                                </svg>
                            </div>
                        </div>

                        {/* Profile Picture with Glow Effect */}
                        <div className='absolute w-32 h-32 p-1 transform -translate-x-1/2 bg-white border-4 border-white rounded-full shadow-xl top-16 left-1/2'>
                            <div className='flex items-center justify-center w-full h-full overflow-hidden rounded-full bg-gradient-to-br from-indigo-100 to-purple-100'>
                                <img
                                    src={userData?.user?.picture  || Photo}
                                    alt="Profile"
                                    className='object-cover w-full h-full transition-transform duration-500 hover:scale-110'
                                />
                            </div>
                            <div className='absolute inset-0 border-2 rounded-full pointer-events-none border-white/30'></div>
                        </div>

                        {/* Profile Info */}
                        <div className='px-6 pt-20 pb-6 text-center'>
                            <h1 className='text-2xl font-bold text-gray-800'>{userData?.user?.firstName} {userData?.user?.lastName}</h1>
                            <p className='font-medium text-purple-600'>{userData?.user?.status?.positon || "Not Updated"}</p>

                            {/* Stats Bar */}
                            <div className='flex justify-center gap-6 mt-3'>
                                <div className='text-center'>
                                    <p className='text-2xl font-bold text-indigo-600'>{userData?.user.connection?.length || "0"}</p>
                                    <p className='text-xs text-gray-500'>Connections</p>
                                </div>
                                <div className='text-center'>
                                    <p className='text-2xl font-bold text-indigo-600'>{userData?.user.projects?.length || "0"}</p>
                                    <p className='text-xs text-gray-500'>Projects</p>
                                </div>
                                <div className='text-center'>
                                    <p className='text-2xl font-bold text-indigo-600'>5</p>
                                    <p className='text-xs text-gray-500'>Endorsements</p>
                                </div>
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className='px-6 pb-3'>
                            {/* Detail Items */}
                            <div className='flex items-center px-3 py-2 transition-colors duration-200 rounded-lg hover:bg-gray-50'>
                                <BusinessIcon sx={{ color: '#6C63FF', fontSize: '1.5rem' }} />
                                <div className='flex-1 ml-4'>
                                    <p className='text-sm text-gray-500'>Company</p>
                                    <p className='font-medium'>{userData?.user?.status?.organization || "Not Updated"}</p>
                                </div>
                            </div>

                            <div className='flex items-center px-3 py-2 transition-colors duration-200 rounded-lg hover:bg-gray-50'>
                                <MyLocationIcon sx={{ color: '#6C63FF', fontSize: '1.5rem' }} />
                                <div className='flex-1 ml-4'>
                                    <p className='text-sm text-gray-500'>Location</p>
                                    <p className='font-medium'>{userData?.user?.status?.city || "Not Updated"}, {userData?.user?.status?.state || "Not Updated"} </p>
                                </div>
                            </div>

                            <div className='flex items-center px-3 py-2 transition-colors duration-200 rounded-lg hover:bg-gray-50'>
                                <SchoolIcon sx={{ color: '#6C63FF', fontSize: '1.5rem' }} />
                                <div className='flex-1 ml-4'>
                                    <p className='text-sm text-gray-500'>Education</p>
                                    <p className='font-medium'>{userData?.user?.education[0]?.degree || "Not Updated"}, {userData?.user?.education[0]?.collegeName || "Not Updated"}</p>
                                </div>
                            </div>
                        </div>

                        {/* Skills Section */}
                        <div className='px-6 pb-6'>
                            <h3 className='mb-3 text-lg font-semibold text-gray-800'>Skills</h3>
                            <div className='flex flex-wrap gap-2'>
                               {userData?.user?.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className='px-3 py-1 text-sm font-medium text-indigo-600 transition-colors duration-200 rounded-full bg-indigo-50 hover:bg-indigo-100'
                                    >
                                        {skill}
                                    </span>
                                )) || "Not Updated"}
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className='px-6 pb-6'>
                            <button
                                onClick={viewmoreHandler}
                                className='flex items-center justify-center w-full gap-2 py-3 font-medium text-white transition-all duration-300 rounded-lg shadow-md bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-lg'
                            >
                                View Full Profile
                                <OpenInNewIcon sx={{ fontSize: '1rem' }} />
                            </button>
                        </div>
                    </div>

                    <div className='post-container'>
                        <div className='flex items-center justify-center overflow-hidden post-create'>
                            <div className='w-[13%] h-[114%] bg-gray-200 rounded-full flex items-center justify-center'>

                                <Fab sx={{ backgroundColor: '#6C63FF', color: '#fff', '&:hover': { backgroundColor: '#5a52e0' } }} onClick={postHandler} aria-label="add">

                                    <AddIcon />
                                </Fab>


                            </div>
                        </div>
                        {/* posts section start here */}

                        <PostFeed />
                        {/* posts section ends here */}
                    </div>

                    <div className='overflow-hidden bg-white border border-gray-100 shadow-md message-container rounded-xl'>
                        {/* Toggle Switch with Working Behavior */}
                        <div className='flex justify-center p-4'>
                            <div className='relative flex items-center w-full h-16 max-w-md p-1 bg-gray-100 rounded-full'>
                                {/* Background Slider */}
                                <div
                                    className={`absolute h-14 rounded-full bg-[#6C63FF] transition-all duration-300 ease-in-out ${toggle === 1 ? 'left-1 w-1/2' : 'left-[calc(50%-2px)] w-1/2'
                                        }`}
                                ></div>

                                {/* Trending Button */}
                                <button
                                    className={`relative flex-1 h-14 rounded-full flex items-center justify-center z-10 transition-colors duration-200 ${toggle === 1 ? 'text-white' : 'text-gray-600'
                                        }`}
                                    onClick={toggleOneHandler}
                                >
                                    <TrendingUpIcon className="mr-2" />
                                    <span className='font-medium'>Trending</span>
                                </button>

                                {/* Connections Button */}
                                <button
                                    className={`relative flex-1 h-14 rounded-full flex items-center justify-center z-10 transition-colors duration-200 ${toggle === 2 ? 'text-white' : 'text-gray-600'
                                        }`}
                                    onClick={toggleTwoHandler}
                                >
                                    <PeopleIcon className="mr-2" />
                                    <span className='font-medium'>Connections</span>
                                </button>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className='p-4'>
                            {toggle === 2 && (
                                <div className='space-y-3 max-h-[500px] h-min overflow-y-auto custom-scrollbar'>
                                    {conversations.map((conversation, index) => {
                                        let chatName = "";
                                        conversation.users.forEach((user) => {
                                            if (user?._id !== userData?.user._id) {
                                                chatName = `${user?.firstName} ${user.lastName}`;
                                            }
                                        });

                                        return (
                                            <div
                                                key={index}
                                                className="flex items-center p-3 transition-colors duration-200 rounded-lg cursor-pointer hover:bg-indigo-50"
                                                onClick={() => navigate(`chat/${conversation._id}&${chatName}`)}
                                            >
                                                <div className="relative">
                                                    <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-indigo-600 bg-indigo-100 rounded-full">
                                                        {chatName[0]}
                                                    </div>
                                                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${conversation.latestMessage ? 'bg-green-500' : 'bg-gray-400'
                                                        } border-2 border-white`}></div>
                                                </div>
                                                <div className="flex-1 min-w-0 ml-4">
                                                    <div className="flex items-baseline justify-between">
                                                        <h3 className="text-lg font-semibold text-gray-800 truncate">{chatName}</h3>
                                                        <span className="ml-2 text-xs text-gray-500 whitespace-nowrap">
                                                            {conversation.latestMessage?.createdAt ? formatDate(conversation.latestMessage.createdAt) : ''}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 truncate">
                                                        {conversation.latestMessage?.content || "No messages yet. Start chatting!"}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {toggle === 1 && (
                                <div className='space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar'>
                                    {[1, 2, 3, 4].map((item) => (
                                        <div
                                            key={item}
                                            className="p-4 transition-colors duration-200 border border-gray-200 rounded-lg hover:border-indigo-300"
                                        >
                                            <div className='flex items-start gap-4'>
                                                <div className="p-2 text-indigo-600 bg-indigo-100 rounded-lg">
                                                    <TrendingUpIcon />
                                                </div>
                                                <div className='flex-1'>
                                                    <h3 className='mb-1 font-semibold text-gray-800'>
                                                        Trending Post Title #{item} - Latest Industry News
                                                    </h3>
                                                    <p className='mb-2 text-sm text-gray-600 line-clamp-2'>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.
                                                    </p>
                                                    <div className='flex items-center justify-between'>
                                                        <span className='text-xs text-gray-500'>2d ago • 1.2k views</span>
                                                        <button
                                                            className='text-[#6C63FF] hover:text-indigo-700 text-sm font-medium flex items-center'
                                                            onClick={() => { }}
                                                        >
                                                            Read More
                                                            <ArrowForwardIcon sx={{ fontSize: '1rem', marginLeft: '4px' }} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )
            }

            {/* Mobile Layout */}
            {
                isMobile && (
                    <>
                        <div className='post-container'>
                            <div className='flex items-center justify-center overflow-hidden post-create'>
                                <div className='w-[13%] h-[114%] bg-gray-200 rounded-full flex items-center justify-center'>

                                    <Fab sx={{ backgroundColor: '#6C63FF', color: '#fff', '&:hover': { backgroundColor: '#5a52e0' } }} onClick={postHandler} aria-label="add">

                                        <AddIcon />
                                    </Fab>


                                </div>
                            </div>
                            {/* posts section start here */}

                            <PostFeed />
                        </div>

                        {/* Mobile Profile Overlay */}
                        <AnimatePresence>
                            {showMobileProfile && (
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 50 }}
                                    transition={{ duration: 0.3 }}
                                    className='fixed inset-x-0 z-50 mx-4 bottom-20'
                                >
                                    <div className='relative user-profile bg-white rounded-xl shadow-xl border border-gray-100 p-4 max-h-[70vh] overflow-y-auto'>
                                        <div className="relative h-32 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                                            <div className="custom-shape-divider-top-1733409435">
                                                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                                                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill fill-white/20"></path>
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Profile Picture with Glow Effect */}
                                        <div className='absolute w-32 h-32 p-1 transform -translate-x-1/2 bg-white border-4 border-white rounded-full shadow-xl top-16 left-1/2'>
                                            <div className='flex items-center justify-center w-full h-full overflow-hidden rounded-full bg-gradient-to-br from-indigo-100 to-purple-100'>
                                                <img
                                                    src={userData?.user?.picture || Photo}
                                                    alt="Profile"
                                                    className='object-cover w-full h-full transition-transform duration-500 hover:scale-110'
                                                />
                                            </div>
                                            <div className='absolute inset-0 border-2 rounded-full pointer-events-none border-white/30'></div>
                                        </div>

                                        {/* Profile Info */}
                                        <div className='px-6 pt-20 pb-6 text-center'>
                                            <h1 className='text-2xl font-bold text-gray-800'>{userData?.user?.firstName} {userData?.user?.lastName}</h1>
                                            <p className='font-medium text-purple-600'>{userData?.user?.status?.position || "Not Updated"}</p>

                                            {/* Stats Bar */}
                                            <div className='flex justify-center gap-6 mt-3'>
                                                <div className='text-center'>
                                                    <p className='text-2xl font-bold text-indigo-600'>{userData?.user?.connection?.length || 0}</p>
                                                    <p className='text-xs text-gray-500'>Connections</p>
                                                </div>
                                                <div className='text-center'>
                                                    <p className='text-2xl font-bold text-indigo-600'>{userData?.user?.projects?.length|| 0}</p>
                                                    <p className='text-xs text-gray-500'>Projects</p>
                                                </div>
                                                <div className='text-center'>
                                                    <p className='text-2xl font-bold text-indigo-600'>5</p>
                                                    <p className='text-xs text-gray-500'>Endorsements</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Details Section */}
                                        <div className='px-6 pb-3'>
                                            {/* Detail Items */}
                                            <div className='flex items-center px-3 py-2 transition-colors duration-200 rounded-lg hover:bg-gray-50'>
                                                <BusinessIcon sx={{ color: '#6C63FF', fontSize: '1.5rem' }} />
                                                <div className='flex-1 ml-4'>
                                                    <p className='text-sm text-gray-500'>Company</p>
                                                    <p className='font-medium'>{userData?.user?.status?.organization ||  "Not Updated"}</p>
                                                </div>
                                            </div>

                                            <div className='flex items-center px-3 py-2 transition-colors duration-200 rounded-lg hover:bg-gray-50'>
                                                <MyLocationIcon sx={{ color: '#6C63FF', fontSize: '1.5rem' }} />
                                                <div className='flex-1 ml-4'>
                                                    <p className='text-sm text-gray-500'>Location</p>
                                                    <p className='font-medium'>{userData?.user?.status?.city ||  "Not Updated"}, {userData?.user?.status?.state||  "Not Updated"}</p>
                                                </div>
                                            </div>

                                            <div className='flex items-center px-3 py-2 transition-colors duration-200 rounded-lg hover:bg-gray-50'>
                                                <SchoolIcon sx={{ color: '#6C63FF', fontSize: '1.5rem' }} />
                                                <div className='flex-1 ml-4'>
                                                    <p className='text-sm text-gray-500'>Education</p>
                                                    <p className='font-medium'>{userData?.user?.education[0]?.degree ||  "Not Updated"}, {userData?.user?.education[0]?.collegeName ||  "Not Updated"}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Skills Section */}
                                        <div className='px-6 pb-6'>
                                            <h3 className='mb-3 text-lg font-semibold text-gray-800'>Skills</h3>
                                            <div className='flex flex-wrap gap-2'>
                                                {userData?.user?.skills.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className='px-3 py-1 text-sm font-medium text-indigo-600 transition-colors duration-200 rounded-full bg-indigo-50 hover:bg-indigo-100'
                                                    >
                                                        {skill}
                                                    </span>
                                                )) ||   "Not Updated"}
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <div className='px-6 pb-6'>
                                            <button
                                                onClick={viewmoreHandler}
                                                className='flex items-center justify-center w-full gap-2 py-3 font-medium text-white transition-all duration-300 rounded-lg shadow-md bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-lg'
                                            >
                                                View Full Profile
                                                <OpenInNewIcon sx={{ fontSize: '1rem' }} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Mobile Messages Overlay */}
                        <AnimatePresence>
                            {showMobileMessages && (
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 50 }}
                                    transition={{ duration: 0.3 }}
                                    className='fixed inset-x-0 z-50 mx-4 bottom-20'
                                >
                                    <div className='message-container bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 max-h-[70vh] overflow-y-auto'>
                                        <div className='flex justify-center p-4'>
                                            <div className='relative flex items-center w-full h-16 max-w-md p-1 bg-gray-100 rounded-full'>
                                                {/* Background Slider */}
                                                <div
                                                    className={`absolute h-14 rounded-full bg-[#6C63FF] transition-all duration-300 ease-in-out ${toggle === 1 ? 'left-1 w-1/2' : 'left-[calc(50%-2px)] w-1/2'
                                                        }`}
                                                ></div>

                                                {/* Trending Button */}
                                                <button
                                                    className={`relative flex-1 h-14 rounded-full flex items-center justify-center z-10 transition-colors duration-200 ${toggle === 1 ? 'text-white' : 'text-gray-600'
                                                        }`}
                                                    onClick={toggleOneHandler}
                                                >
                                                    <TrendingUpIcon className="mr-2" />
                                                    <span className='font-medium'>Trending</span>
                                                </button>

                                                {/* Connections Button */}
                                                <button
                                                    className={`relative flex-1 h-14 rounded-full flex items-center justify-center z-10 transition-colors duration-200 ${toggle === 2 ? 'text-white' : 'text-gray-600'
                                                        }`}
                                                    onClick={toggleTwoHandler}
                                                >
                                                    <PeopleIcon className="mr-2" />
                                                    <span className='font-medium'>Connections</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Content Area */}
                                        <div className='p-4'>
                                            {toggle === 2 && (
                                                <div className='space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar'>
                                                    {conversations.map((conversation, index) => {
                                                        let chatName = "";
                                                        conversation.users.forEach((user) => {
                                                            if (user?._id !== userData?.user._id) {
                                                                chatName = `${user?.firstName} ${user.lastName}`;
                                                            }
                                                        });

                                                        return (
                                                            <div
                                                                key={index}
                                                                className="flex items-center p-3 transition-colors duration-200 rounded-lg cursor-pointer hover:bg-indigo-50"
                                                                onClick={() => navigate(`chat/${conversation._id}&${chatName}`)}
                                                            >
                                                                <div className="relative">
                                                                    <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-indigo-600 bg-indigo-100 rounded-full">
                                                                        {chatName[0]}
                                                                    </div>
                                                                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${conversation.latestMessage ? 'bg-green-500' : 'bg-gray-400'
                                                                        } border-2 border-white`}></div>
                                                                </div>
                                                                <div className="flex-1 min-w-0 ml-4">
                                                                    <div className="flex items-baseline justify-between">
                                                                        <h3 className="text-lg font-semibold text-gray-800 truncate">{chatName}</h3>
                                                                        <span className="ml-2 text-xs text-gray-500 whitespace-nowrap">
                                                                            {conversation.latestMessage?.createdAt ? formatDate(conversation.latestMessage.createdAt) : ''}
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-sm text-gray-600 truncate">
                                                                        {conversation.latestMessage?.content || "No messages yet. Start chatting!"}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}

                                            {toggle === 1 && (
                                                <div className='space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar'>
                                                    {[1].map((item) => (
                                                        <div
                                                            key={item}
                                                            className="p-4 transition-colors duration-200 border border-gray-200 rounded-lg hover:border-indigo-300"
                                                        >
                                                            <div className='flex items-start gap-4'>
                                                                <div className="p-2 text-indigo-600 bg-indigo-100 rounded-lg">
                                                                    <TrendingUpIcon />
                                                                </div>
                                                                <div className='flex-1'>
                                                                    <h3 className='mb-1 font-semibold text-gray-800'>
                                                                        Trending Post Title #{item} - Latest Industry News
                                                                    </h3>
                                                                    <p className='mb-2 text-sm text-gray-600 line-clamp-2'>
                                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.
                                                                    </p>
                                                                    <div className='flex items-center justify-between'>
                                                                        <span className='text-xs text-gray-500'>2d ago • 1.2k views</span>
                                                                        <button
                                                                            className='text-[#6C63FF] hover:text-indigo-700 text-sm font-medium flex items-center'
                                                                            onClick={() => { }}
                                                                        >
                                                                            Read More
                                                                            <ArrowForwardIcon sx={{ fontSize: '1rem', marginLeft: '4px' }} />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Mobile Floating Action Buttons */}
                        <div className='fixed z-40 flex gap-3 bottom-4 right-4'>
                            <Fab
                                color="primary"
                                onClick={toggleMobileProfile}
                                sx={{
                                    bgcolor: '#6C63FF',
                                    '&:hover': { bgcolor: '#5a52e0' }
                                }}
                            >
                                <AccountCircleIcon />
                            </Fab>
                            <Fab
                                color="primary"
                                onClick={toggleMobileMessages}
                                sx={{
                                    bgcolor: '#6C63FF',
                                    '&:hover': { bgcolor: '#5a52e0' }
                                }}
                            >
                                <ChatIcon />
                            </Fab>
                        </div>
                    </>
                )
            }
        </div >
    );
};

export default UserContainer;