

import React, { useState, useEffect } from 'react';
import Photo from '../assets/man-avatar.png';
import Mmmut from '../assets/mmmut.jpg';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Skeleton, Chip } from '@mui/material';
import Tech from '../assets/techsrijan.jpg';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Spinner from './Spinner';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import axios from 'axios';
import { ref } from './features/user/refreshSlice';
import { useSelector, useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import {toast} from 'react-toastify';
import { sUserData } from './features/user/statusSlice';
import { motion } from 'framer-motion';
import { allUser } from './features/connect/connectSlice';
import ConnectUserCardList from './cards/ConnectionCard';
import { Card, CardContent, CardHeader, Divider, Avatar, Button } from '@mui/material';
import { styled } from '@mui/system';
import { CircularProgress } from '@mui/material';
import { SOCKET_API as scket , API_URL as api, } from "../config/variable";


const ProfileContainer = styled('div')({
  maxWidth: '1400px',
  margin: '0 auto',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  '@media (min-width: 900px)': {
    flexDirection: 'row',
    alignItems: 'flex-start'
  }
});

// const MainContent = styled('div')({
//   flex: 1,
//   display: 'flex',
//   flexDirection: 'column',
//   gap: '24px',
//   '@media (min-width: 900px)': {
//     maxWidth: 'calc(100% - 320px)'
//   }
// });

const MainContent = styled('div')({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    overflowY: 'hidden', // Allow scrolling only for main content
    height: 'calc(100vh - 40px)', // Adjust height considering padding
    '@media (min-width: 900px)': {
      maxWidth: 'calc(100% - 320px)',
      height: 'auto', // Reset height on desktop
      overflowY: 'hidden' // Reset overflow on desktop
    }
  });

const Sidebar = styled('div')({
  width: '100%',
  '@media (min-width: 900px)': {
    width: '320px',
    position: 'sticky',
    top: '80px'
  }
});

const SectionCard = styled(Card)({
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(0,0,0,0.1)'
  }
});

const ProfileHeader = styled('div')({
  position: 'relative',
  marginBottom: '24px'
});

const CoverPhoto = styled('div')({
  height: '180px',
  width: '100%',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '12px 12px 0 0',
  '@media (min-width: 600px)': {
    height: '220px'
  }
});

// const ProfilePictureContainer = styled('div')({
//   display: 'flex',
//   justifyContent: 'center',
//   marginTop: '-60px',
//   '@media (min-width: 600px)': {
//     justifyContent: 'flex-start',
//     marginLeft: '24px',
//     marginTop: '-80px'
//   }
// });
const ProfilePictureContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '-60px',
    '@media (min-width: 600px)': {
      justifyContent: 'flex-start',
      marginLeft: '24px',
      marginTop: '-80px'
    }
  });

// const ProfilePicture = styled(Avatar)({
//   width: '120px',
//   height: '120px',
//   border: '4px solid white',
//   cursor: 'pointer',
//   '@media (min-width: 600px)': {
//     width: '160px',
//     height: '160px'
//   }
// });
const ProfilePicture = styled(Avatar)({
    width: '120px',
    height: '120px',
    border: '4px solid white',
    cursor: 'pointer',
    '@media (min-width: 600px)': {
      width: '160px',
      height: '160px'
    }
  });

const ProfileInfo = styled('div')({
  textAlign: 'center',
  padding: '16px',
  '@media (min-width: 600px)': {
    textAlign: 'left',
    padding: '24px'
  }
});

const SkillChip = styled(Chip)({
  margin: '4px',
  backgroundColor: '#f0f4ff',
  '&:hover': {
    backgroundColor: '#e0e8ff'
  }
});

const Profile = () => {
    const navigate = useNavigate();
    const path = useLocation();
    const dispatch = useDispatch();
    const refreshKey = useSelector((state) => state.refresh).refreshKey;    
    const {userData, token}= useSelector((state)=>state.status)
    const {  error, users, acceptLoading } = useSelector(state => state.connectionReducer)
    const [userDetails, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [profilePhoto, setProfilePhoto] = useState(Photo);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [cropper, setCropper] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    

    useEffect(() => {
        if (!userData) {
            navigate('/login');
        }
        dispatch(allUser())
    }, []);

    if (!userData) {
        return <Spinner />
    }
    
    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            
            const reader = new FileReader();
            reader.onload = () => {
                setUploadedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // const handleCrop = async () => {
    //     try {
    //         if (!cropper) return;
        
    //         const canvas = cropper.getCroppedCanvas();
    //         if (!canvas) return;
        
    //         canvas.toBlob(async (blob) => {
    //             const formData = new FormData();
    //             formData.append("picture", blob);
        
    //             const response = await axios.post(
    //                 `http://localhost:3000/api/v1/profile/picture`,
    //                 formData,
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${userData.token}`,
    //                         'Content-Type': 'multipart/form-data',
    //                     },
    //                     withCredentials: true,
    //                 }
    //             );
        
    //             console.log("Upload Success:", response.data);
    //             sUserData(response?.data?.user)
    //             let d = JSON.parse(localStorage.getItem('userData'));
    //             d.user = response?.data?.user;
    //             localStorage.setItem('userData', JSON.stringify(d));
    //             setProfilePhoto(URL.createObjectURL(blob));
    //             setUploadedImage(null);
    //         });
    //     } catch (error) {
    //         console.error("Crop/Upload error:", error);
    //     }
    // };
    const handleCrop = async () => {
        try {
            if (!cropper) return;
            setIsUploading(true);
            setUploadProgress(0);
    
            const canvas = cropper.getCroppedCanvas();
            if (!canvas) return;
    
            canvas.toBlob(async (blob) => {
                const formData = new FormData();
                formData.append("picture", blob);
    
                const response = await axios.post(
                    `${api}/profile/picture`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${userData.token}`,
                            'Content-Type': 'multipart/form-data',
                        },
                        withCredentials: true,
                        onUploadProgress: (progressEvent) => {
                            const progress = Math.round(
                                (progressEvent.loaded * 100) / progressEvent.total
                            );
                            setUploadProgress(progress);
                        },
                    }
                );
    
                console.log("Upload Success:", response.data);
                sUserData(response?.data?.user);
                let d = JSON.parse(localStorage.getItem('userData'));
                d.user = response?.data?.user;
                localStorage.setItem('userData', JSON.stringify(d));
                setProfilePhoto(URL.createObjectURL(blob));
                setUploadedImage(null);
                setIsUploading(false);
                setUploadProgress(0);
                toast.success('Profile picture updated successfully!');
            });
        } catch (error) {
            console.error("Crop/Upload error:", error);
            setIsUploading(false);
            setUploadProgress(0);
            toast.error('Failed to upload profile picture');
        }
    };
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                setLoading(true);
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                };

                const response = await axios.get(
                    `${api}/getuser/${userData.user._id}`,
                    config
                );
                
                console.log("userData details", response.data)
                setUserData(response.data.userDetails);
                sUserData(response?.data?.userDetails)
                let d = JSON.parse(localStorage.getItem('userData'));
                d.user = response?.data?.userDetails;
                localStorage.setItem('userData', JSON.stringify(d));
                setProfilePhoto(response?.data?.userDetails?.picture || Photo);
            } catch (error) {
                console.error("Error fetching user details:", error);
                toast.error("Error in fetching User Details, Please Login Again");
            } finally {
                setLoading(false);
            }
        };
        fetchUserDetails();
    }, [refreshKey]);
    
    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    }

    return (
        <ProfileContainer>
            <MainContent>
                <SectionCard>
                    <CoverPhoto />
                    <ProfileHeader>
                        <ProfilePictureContainer>
                            <motion.div 
                                initial={{ y: -100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                <div className="relative group">
                                    <ProfilePicture
                                        src={profilePhoto}
                                        alt="Profile"
                                    />
                                    <label
                                        htmlFor="upload-photo"
                                        className="absolute inset-0 flex items-center justify-center text-white transition-opacity duration-300 bg-black rounded-full opacity-0 cursor-pointer bg-opacity-40 group-hover:opacity-100"
                                    >
                                        <AddAPhotoIcon sx={{ fontSize: "1.5rem" }} />
                                    </label>
                                    <input
                                        type="file"
                                        id="upload-photo"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handlePhotoUpload}
                                    />
                                </div>
                            </motion.div>
                        </ProfilePictureContainer>

                        <ProfileInfo>
                            <motion.div 
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                            >
                                {loading ? (
                                    <>
                                        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '100%' }} />
                                        <Skeleton variant="text" sx={{ fontSize: '1rem', width: '80%' }} />
                                        <Skeleton variant="text" sx={{ fontSize: '1rem', width: '70%' }} />
                                    </>
                                ) : (
                                    <>
                                        <h1 className='text-2xl font-bold sm:text-3xl'>{userData.user.firstName} {userData.user.lastName}</h1>
                                        <p className='text-lg font-semibold text-gray-700'>{userDetails?.status?.position}</p>
                                        <p className='text-gray-600'>{userDetails?.status?.city} {userDetails?.status?.state} {userDetails?.status?.zip}</p>
                                        <div className='flex items-center justify-between mt-4'>
                                            <span className='text-lg font-semibold'>{userDetails?.status?.organization}</span>
                                            <IconButton 
                                                onClick={() => navigate(`${path.pathname}/details?edit=1`)}
                                                color="primary"
                                            >
                                                <ModeEditIcon />
                                            </IconButton>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        </ProfileInfo>
                    </ProfileHeader>
                </SectionCard>

                {/* Education Section */}
                <SectionCard>
                    <CardHeader
                        title="Education"
                        action={
                            <IconButton 
                                onClick={() => navigate(`${path.pathname}/education`)}
                                color="primary"
                            >
                                <AddIcon />
                            </IconButton>
                        }
                    />
                    <Divider />
                    <CardContent>
                        {loading ? (
                            Array(2).fill(0).map((_, i) => (
                                <div key={i} className='flex justify-between mb-4'>
                                    <div className='flex w-full gap-4'>
                                        <Skeleton variant="circular" width={60} height={60} />
                                        <div className='flex-1'>
                                            <Skeleton variant="text" width="80%" />
                                            <Skeleton variant="text" width="60%" />
                                            <Skeleton variant="text" width="50%" />
                                        </div>
                                    </div>
                                    <div className='flex gap-2'>
                                        <Skeleton variant="circular" width={40} height={40} />
                                        <Skeleton variant="circular" width={40} height={40} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            userDetails?.education?.map((edu, index) => (
                                <div key={index} className='mb-4'>
                                    <div className='flex justify-between'>
                                        <div className='flex gap-4'>
                                            <Avatar 
                                                src={Mmmut} 
                                                alt="College" 
                                                sx={{ width: 60, height: 60 }}
                                                variant="rounded"
                                            />
                                            <div>
                                                <h1 className='font-semibold cursor-pointer hover:text-blue-400'>{edu?.collegeName}</h1>
                                                <p className='text-gray-600'>{edu?.degree}</p>
                                                <p className='text-sm text-gray-500'>{`${formatDate(edu?.from)} - ${formatDate(edu?.to)}`}</p>
                                                {edu?.grade && <p>{`Grade - ${edu?.grade}`}</p>}
                                            </div>
                                        </div>
                                        <div className='flex gap-2'>
                                            <IconButton 
                                                onClick={() => navigate(`${path.pathname}/education?educationId=${edu?._id}&edit=1`)}
                                                color="primary"
                                            >
                                                <ModeEditIcon />
                                            </IconButton>
                                            <IconButton 
                                                onClick={async () => {
                                                    try {
                                                        setLoading(true);
                                                        const config = {
                                                            headers: {
                                                                Authorization: `Bearer ${userData.token}`,
                                                            },
                                                            withCredentials: true,
                                                        };
                                                        await axios.delete(`${api}/education/${edu?._id}`, config);
                                                        toast.success('Successfully Deleted');
                                                        dispatch(ref());
                                                    } catch (error) {
                                                        console.log(error);
                                                        toast.warning("Failed to delete");
                                                    } finally {
                                                        setLoading(false);
                                                    }
                                                }}
                                                color="error"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    </div>
                                    {index < userDetails.education.length - 1 && <Divider sx={{ my: 2 }} />}
                                </div>
                            ))
                        )}
                    </CardContent>
                </SectionCard>

                {/* Projects Section */}
                <SectionCard>
                    <CardHeader
                        title="Projects"
                        action={
                            <IconButton 
                                onClick={() => navigate(`${path.pathname}/projectDetails`)}
                                color="primary"
                            >
                                <AddIcon />
                            </IconButton>
                        }
                    />
                    <Divider />
                    <CardContent>
                        {loading ? (
                            Array(2).fill(0).map((_, i) => (
                                <div key={i} className='mb-4'>
                                    <div className='flex justify-between'>
                                        <div className='w-full'>
                                            <Skeleton variant="text" width="70%" />
                                            <Skeleton variant="text" width="50%" />
                                            <Skeleton variant="text" width="80%" />
                                            <Skeleton variant="text" width="60%" />
                                        </div>
                                        <div className='flex gap-2'>
                                            <Skeleton variant="circular" width={40} height={40} />
                                            <Skeleton variant="circular" width={40} height={40} />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            userDetails?.projects?.map((project, index) => (
                                <div key={index} className='mb-4'>
                                    <div className='flex justify-between'>
                                        <div className='flex-1'>
                                            <h1 className='font-semibold cursor-pointer hover:text-blue-400'>{project.projectName}</h1>
                                            <p className='text-gray-600'>{`${formatDate(project?.durationFrom)} - ${formatDate(project?.durationTo)}`}</p>
                                            <p className='text-sm text-gray-500'>{project.projectDescription}</p>
                                            {project.projectLink && (
                                                <p className='text-sm'>
                                                    Project Link: <a href={project.projectLink} className='text-blue-500 hover:underline' target="_blank" rel="noopener noreferrer">
                                                        {project.projectLink}
                                                    </a>
                                                </p>
                                            )}
                                        </div>
                                        <div className='flex gap-2'>
                                            <IconButton 
                                                onClick={() => navigate(`${path.pathname}/projectDetails?projectId=${project?._id}&edit=1`)}
                                                color="primary"
                                            >
                                                <ModeEditIcon />
                                            </IconButton>
                                            <IconButton 
                                                onClick={async () => {
                                                    try {
                                                        setLoading(true);
                                                        const config = {
                                                            headers: {
                                                                Authorization: `Bearer ${userData.token}`,
                                                            },
                                                            withCredentials: true,
                                                        };
                                                        await axios.delete(`${api}/project/${project?._id}`, config);
                                                        toast.success('Successfully Deleted');
                                                        dispatch(ref());
                                                    } catch (error) {
                                                        console.log(error);
                                                        toast.warning("Failed to delete");
                                                    } finally {
                                                        setLoading(false);
                                                    }
                                                }}
                                                color="error"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    </div>
                                    {index < userDetails.projects.length - 1 && <Divider sx={{ my: 2 }} />}
                                </div>
                            ))
                        )}
                    </CardContent>
                </SectionCard>

                {/* Volunteering Section */}
                <SectionCard>
                    <CardHeader
                        title="Volunteering"
                        action={
                            <IconButton 
                                onClick={() => navigate(`${path.pathname}/volunteer`)}
                                color="primary"
                            >
                                <AddIcon />
                            </IconButton>
                        }
                    />
                    <Divider />
                    <CardContent>
                        {loading ? (
                            Array(2).fill(0).map((_, i) => (
                                <div key={i} className='flex justify-between mb-4'>
                                    <div className='flex w-full gap-4'>
                                        <Skeleton variant="circular" width={60} height={60} />
                                        <div className='flex-1'>
                                            <Skeleton variant="text" width="80%" />
                                            <Skeleton variant="text" width="60%" />
                                            <Skeleton variant="text" width="70%" />
                                            <Skeleton variant="text" width="50%" />
                                        </div>
                                    </div>
                                    <div className='flex gap-2'>
                                        <Skeleton variant="circular" width={40} height={40} />
                                        <Skeleton variant="circular" width={40} height={40} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            userDetails?.volunteering?.map((vol, index) => (
                                <div key={index} className='mb-4'>
                                    <div className='flex justify-between'>
                                        <div className='flex gap-4'>
                                            <Avatar 
                                                src={Tech} 
                                                alt="Volunteering" 
                                                sx={{ width: 60, height: 60 }}
                                                variant="rounded"
                                            />
                                            <div>
                                                <h1 className='font-semibold cursor-pointer hover:text-blue-400'>{vol?.role || 'Executive Member'}</h1>
                                                <p className='text-gray-600'>{vol?.organization || 'Techsrijan\'2023'}</p>
                                                <p className='text-sm text-gray-500'>
                                                    {`${formatDate(vol?.from)} - ${formatDate(vol?.to)}` || 'Jul 2021 - Jul 2025'}
                                                </p>
                                                {vol?.description && <p className='text-sm text-gray-500'>{vol.description}</p>}
                                            </div>
                                        </div>
                                        <div className='flex gap-2'>
                                            <IconButton 
                                                onClick={() => navigate(`${path.pathname}/volunteer?volunteerId=${vol?._id}&edit=1`)}
                                                color="primary"
                                            >
                                                <ModeEditIcon />
                                            </IconButton>
                                            <IconButton 
                                                onClick={async () => {
                                                    try {
                                                        setLoading(true);
                                                        const config = {
                                                            headers: {
                                                                Authorization: `Bearer ${userData.token}`,
                                                            },
                                                            withCredentials: true,
                                                        };
                                                        await axios.delete(`${api}/volunteer/${vol?._id}`, config);
                                                        toast.success('Successfully Deleted');
                                                        dispatch(ref());
                                                    } catch (error) {
                                                        console.log(error);
                                                        toast.warning("Failed to delete");
                                                    } finally {
                                                        setLoading(false);
                                                    }
                                                }}
                                                color="error"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    </div>
                                    {index < userDetails.volunteering.length - 1 && <Divider sx={{ my: 2 }} />}
                                </div>
                            ))
                        )}
                    </CardContent>
                </SectionCard>

                {/* Skills Section */}
                <SectionCard>
                    <CardHeader
                        title="Skills"
                        action={
                            <div className='flex gap-1'>
                                <IconButton 
                                    onClick={() => navigate(`${path.pathname}/skills?edit=1`)}
                                    color="primary"
                                >
                                    <ModeEditIcon />
                                </IconButton>
                                <IconButton 
                                    onClick={() => navigate(`${path.pathname}/skills`)}
                                    color="primary"
                                >
                                    <AddIcon />
                                </IconButton>
                            </div>
                        }
                    />
                    <Divider />
                    <CardContent>
                        <div className='flex flex-wrap'>
                            {loading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <Skeleton key={i} variant="rounded" width={80} height={32} sx={{ m: 1 }} />
                                ))
                            ) : (
                                userDetails?.skills?.map((skill, index) => (
                                    <SkillChip 
                                        key={index} 
                                        label={skill}
                                        clickable
                                    />
                                ))
                            )}
                        </div>
                    </CardContent>
                </SectionCard>
            </MainContent>

            <Sidebar>
                <SectionCard>
                    <CardHeader
                        title="People You May Know"
                        subheader="Suggested connections"
                    />
                    <Divider />
                    <CardContent>
                        <div className='flex flex-col gap-4'>
                            {loading ? (
                                Array(3).fill(0).map((_, i) => (
                                    <div key={i} className='flex items-center gap-3 p-3 rounded-lg bg-blue-50'>
                                        <Skeleton variant="circular" width={56} height={56} />
                                        <div className='flex-1'>
                                            <Skeleton variant="text" width="70%" />
                                            <Skeleton variant="text" width="50%" />
                                        </div>
                                        <Skeleton variant="circular" width={40} height={40} />
                                    </div>
                                ))
                            ) : (
                                <ConnectUserCardList/>
                            )}
                        </div>
                    </CardContent>
                </SectionCard>
            </Sidebar>

            {/* Image Cropper Modal */}
            {/* {uploadedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md p-4 mx-4 bg-white rounded-lg shadow-xl">
                        <h2 className="mb-4 text-xl font-bold">Crop Your Image</h2>
                        <div className="w-full h-64 mb-4">
                            <Cropper
                                src={uploadedImage}
                                style={{ height: '100%', width: '100%' }}
                                aspectRatio={1}
                                guides={false}
                                viewMode={1}
                                dragMode="move"
                                onInitialized={(instance) => setCropper(instance)}
                            />
                        </div>
                        <div className="flex justify-end gap-4">
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => setUploadedImage(null)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCrop}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            )} */}

{uploadedImage && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-full max-w-md p-4 mx-4 bg-white rounded-lg shadow-xl">
            <h2 className="mb-4 text-xl font-bold">Crop Your Image</h2>
            <div className="w-full h-64 mb-4">
                <Cropper
                    src={uploadedImage}
                    style={{ height: '100%', width: '100%' }}
                    aspectRatio={1}
                    guides={false}
                    viewMode={1}
                    dragMode="move"
                    onInitialized={(instance) => setCropper(instance)}
                />
            </div>
            
            {/* Add progress indicator */}
            {isUploading && (
                <div className="w-full mb-4">
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                            Uploading...
                        </span>
                        <span className="text-sm font-medium text-gray-700">
                            {uploadProgress}%
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${uploadProgress}%` }}
                        ></div>
                    </div>
                </div>
            )}
            
            <div className="flex justify-end gap-4">
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => setUploadedImage(null)}
                    disabled={isUploading}
                >
                    Cancel
                </Button>
                <Button
    variant="contained"
    color="primary"
    onClick={handleCrop}
    disabled={isUploading}
    startIcon={isUploading && <CircularProgress size={20} color="inherit" />}
>
    {isUploading ? 'Uploading...' : 'Save'}
</Button>
            </div>
        </div>
    </div>
)}

            <Outlet />
        </ProfileContainer>
    );
};

export default Profile;