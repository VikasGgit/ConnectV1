import React, { useState, useEffect } from "react";
import Photo from "../assets/man-avatar.png";
import Mmmut from "../assets/mmmut.jpg";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, Skeleton, Chip } from "@mui/material";
import Tech from "../assets/techsrijan.jpg";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import Spinner from "./Spinner";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import axios from "axios";
import { ref } from "./features/user/refreshSlice";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { sUserData } from "./features/user/statusSlice";
import { motion } from "framer-motion";
import { allUser } from "./features/connect/connectSlice";
import ConnectUserCardList from "./cards/ConnectionCard";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Avatar,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { SOCKET_API as scket, API_URL as api } from "../config/variable";

const ProfileContainer = styled("div")({
  width: "100%",
  margin: "0 auto",
  padding: "0 16px", // Reduced side padding for mobile
  display: "flex",
  flexDirection: "column", // Always column on mobile
  gap: "24px",
  overflowX: "hidden",
  boxSizing: "border-box",
  "@media (min-width: 900px)": {
    flexDirection: "row",
    alignItems: "flex-start",
    maxWidth: "1200px",
    padding: "20px",
  },
});

const MainContent = styled("div")({
  marginTop:'50px',
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  order: 1, // Main content first on mobile
  "@media (min-width: 900px)": {
    flex: 1,
    maxWidth: "calc(100% - 320px)",
  },
});

const Sidebar = styled("div")({
  width: "100%",
  order: 2, // Sidebar after main content on mobile
  "@media (min-width: 900px)": {
    width: "320px",
    position: "sticky",
    top: "80px",
    order: 1, // Change order for desktop if needed
  },
});

const ProfileHeader = styled("div")({
  position: "relative",
//   marginTop: "72px", // Increased to accommodate profile picture
  width: "100%",
});

const CoverPhoto = styled("div")({
  height: "150px", // Slightly reduced for mobile
  width: "100%",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  borderRadius: "12px 12px 0 0",
  position: "relative",
  "@media (min-width: 600px)": {
    height: "200px",
  },
});


const ProfilePictureContainer = styled("div")({
  position: "absolute",
  marginTop: "-60px",
  marginBottom: "100px",
  left: "50%",
  bottom: "50px",
  transform: "translateX(-50%)",
  width: "120px",
  height: "120px",
  "@media (min-width: 600px)": {
    width: "160px",
    height: "160px",
    marginBottom: "100px",
    bottom: "70px",
    left: "24px",
    transform: "none",
  },
});

const ProfilePicture = styled(Avatar)({
  width: "100%",
  height: "100%",
  border: "4px solid white",
  marginBottom:'100px',
  cursor: "pointer",
  objectFit: "cover",
  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
});

const SectionCard = styled(Card)({
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  transition: "transform 0.2s, box-shadow 0.2s",
  width: "100%",
  boxSizing: "border-box",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
  },
});


const ProfileInfo = styled("div")({
  textAlign: "center",
  marginTop:'6px',
  padding: "16px",
  top:'10px',
  wordBreak: "break-word",
  width: "100%",
  boxSizing: "border-box",
  "@media (min-width: 600px)": {
    textAlign: "left",
    padding: "24px",
    top:'10px',
    marginTop:'60px',
    width: "100%",
  },
});

const SkillChip = styled(Chip)({
  margin: "4px",
  backgroundColor: "#f0f4ff",
  maxWidth: "100%",
  "& .MuiChip-label": {
    whiteSpace: "normal",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  "&:hover": {
    backgroundColor: "#e0e8ff",
  },
});

const Profile = () => {
  const navigate = useNavigate();
  const path = useLocation();
  const dispatch = useDispatch();
  const refreshKey = useSelector((state) => state.refresh).refreshKey;
  const { userData, token } = useSelector((state) => state.status);
  const { error, users, acceptLoading } = useSelector(
    (state) => state.connectionReducer
  );
  const [userDetails, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState(Photo);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [cropper, setCropper] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
    dispatch(allUser());
  }, []);

  if (!userData) {
    return <Spinner />;
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

        const response = await axios.post(`${api}/profile/picture`, formData, {
          headers: {
            Authorization: `Bearer ${userData.token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          },
        });

        // console.log("Upload Success:", response.data);
        sUserData(response?.data?.user);
        let d = JSON.parse(localStorage.getItem("userData"));
        d.user = response?.data?.user;
        localStorage.setItem("userData", JSON.stringify(d));
        setProfilePhoto(URL.createObjectURL(blob));
        setUploadedImage(null);
        setIsUploading(false);
        setUploadProgress(0);
        toast.success("Profile picture updated successfully!");
      });
    } catch (error) {
      // console.error("Crop/Upload error:", error);
      setIsUploading(false);
      setUploadProgress(0);
      toast.error("Failed to upload profile picture");
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

        // console.log("userData details", response.data)
        setUserData(response.data.userDetails);
        sUserData(response?.data?.userDetails);
        let d = JSON.parse(localStorage.getItem("userData"));
        d.user = response?.data?.userDetails;
        localStorage.setItem("userData", JSON.stringify(d));
        setProfilePhoto(response?.data?.userDetails?.picture || Photo);
      } catch (error) {
        // console.error("Error fetching user details:", error);
        toast.error("Error in fetching User Details, Please Login Again");
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [refreshKey]);

  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", { month: "long", year: "numeric" });
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
                  <ProfilePicture src={profilePhoto} alt="Profile" />
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
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "2rem", width: "100%" }}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem", width: "80%" }}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem", width: "70%" }}
                    />
                  </>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold sm:text-3xl">
                      {userData.user.firstName} {userData.user.lastName}
                    </h1>
                    <p className="text-lg font-semibold text-gray-700">
                      {userDetails?.status?.position}
                    </p>
                    <p className="text-gray-600">
                      {userDetails?.status?.city} {userDetails?.status?.state}{" "}
                      {userDetails?.status?.zip}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-lg font-semibold">
                        {userDetails?.status?.organization}
                      </span>
                      <IconButton
                        onClick={() =>
                          navigate(`${path.pathname}/details?edit=1`)
                        }
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
            {loading
              ? Array(2)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex justify-between mb-4">
                      <div className="flex w-full gap-4">
                        <Skeleton variant="circular" width={60} height={60} />
                        <div className="flex-1">
                          <Skeleton variant="text" width="80%" />
                          <Skeleton variant="text" width="60%" />
                          <Skeleton variant="text" width="50%" />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="circular" width={40} height={40} />
                      </div>
                    </div>
                  ))
              : userDetails?.education?.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between">
                      <div className="flex gap-4">
                        <Avatar
                          src={Mmmut}
                          alt="College"
                          sx={{ width: 60, height: 60 }}
                          variant="rounded"
                        />
                        <div>
                          <h1 className="font-semibold cursor-pointer hover:text-blue-400">
                            {edu?.collegeName}
                          </h1>
                          <p className="text-gray-600">{edu?.degree}</p>
                          <p className="text-sm text-gray-500">{`${formatDate(
                            edu?.from
                          )} - ${formatDate(edu?.to)}`}</p>
                          {edu?.grade && <p>{`Grade - ${edu?.grade}`}</p>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <IconButton
                          onClick={() =>
                            navigate(
                              `${path.pathname}/education?educationId=${edu?._id}&edit=1`
                            )
                          }
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
                              await axios.delete(
                                `${api}/education/${edu?._id}`,
                                config
                              );
                              toast.success("Successfully Deleted");
                              dispatch(ref());
                            } catch (error) {
                              // console.log(error);
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
                    {index < userDetails.education.length - 1 && (
                      <Divider sx={{ my: 2 }} />
                    )}
                  </div>
                ))}
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
            {loading
              ? Array(2)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="mb-4">
                      <div className="flex justify-between">
                        <div className="w-full">
                          <Skeleton variant="text" width="70%" />
                          <Skeleton variant="text" width="50%" />
                          <Skeleton variant="text" width="80%" />
                          <Skeleton variant="text" width="60%" />
                        </div>
                        <div className="flex gap-2">
                          <Skeleton variant="circular" width={40} height={40} />
                          <Skeleton variant="circular" width={40} height={40} />
                        </div>
                      </div>
                    </div>
                  ))
              : userDetails?.projects?.map((project, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between">
                      <div className="flex-1">
                        <h1 className="font-semibold cursor-pointer hover:text-blue-400">
                          {project.projectName}
                        </h1>
                        <p className="text-gray-600">{`${formatDate(
                          project?.durationFrom
                        )} - ${formatDate(project?.durationTo)}`}</p>
                        <p className="text-sm text-gray-500">
                          {project.projectDescription}
                        </p>
                        {project.projectLink && (
                          <p className="text-sm">
                            Project Link:{" "}
                            <a
                              href={project.projectLink}
                              className="text-blue-500 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {project.projectLink}
                            </a>
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <IconButton
                          onClick={() =>
                            navigate(
                              `${path.pathname}/projectDetails?projectId=${project?._id}&edit=1`
                            )
                          }
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
                              await axios.delete(
                                `${api}/project/${project?._id}`,
                                config
                              );
                              toast.success("Successfully Deleted");
                              dispatch(ref());
                            } catch (error) {
                              // console.log(error);
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
                    {index < userDetails.projects.length - 1 && (
                      <Divider sx={{ my: 2 }} />
                    )}
                  </div>
                ))}
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
            {loading
              ? Array(2)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex justify-between mb-4">
                      <div className="flex w-full gap-4">
                        <Skeleton variant="circular" width={60} height={60} />
                        <div className="flex-1">
                          <Skeleton variant="text" width="80%" />
                          <Skeleton variant="text" width="60%" />
                          <Skeleton variant="text" width="70%" />
                          <Skeleton variant="text" width="50%" />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="circular" width={40} height={40} />
                      </div>
                    </div>
                  ))
              : userDetails?.volunteering?.map((vol, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between">
                      <div className="flex gap-4">
                        <Avatar
                          src={Tech}
                          alt="Volunteering"
                          sx={{ width: 60, height: 60 }}
                          variant="rounded"
                        />
                        <div>
                          <h1 className="font-semibold cursor-pointer hover:text-blue-400">
                            {vol?.role || "Executive Member"}
                          </h1>
                          <p className="text-gray-600">
                            {vol?.organization || "Techsrijan'2023"}
                          </p>
                          <p className="text-sm text-gray-500">
                            {`${formatDate(vol?.from)} - ${formatDate(
                              vol?.to
                            )}` || "Jul 2021 - Jul 2025"}
                          </p>
                          {vol?.description && (
                            <p className="text-sm text-gray-500">
                              {vol.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <IconButton
                          onClick={() =>
                            navigate(
                              `${path.pathname}/volunteer?volunteerId=${vol?._id}&edit=1`
                            )
                          }
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
                              await axios.delete(
                                `${api}/volunteer/${vol?._id}`,
                                config
                              );
                              toast.success("Successfully Deleted");
                              dispatch(ref());
                            } catch (error) {
                              // console.log(error);
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
                    {index < userDetails.volunteering.length - 1 && (
                      <Divider sx={{ my: 2 }} />
                    )}
                  </div>
                ))}
          </CardContent>
        </SectionCard>

        {/* Skills Section */}
        <SectionCard>
          <CardHeader
            title="Skills"
            action={
              <div className="flex gap-1">
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
            <div className="flex flex-wrap">
              {loading
                ? Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton
                        key={i}
                        variant="rounded"
                        width={80}
                        height={32}
                        sx={{ m: 1 }}
                      />
                    ))
                : userDetails?.skills?.map((skill, index) => (
                    <SkillChip key={index} label={skill} clickable />
                  ))}
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
            <div className="flex flex-col gap-4">
              {loading ? (
                Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg bg-blue-50"
                    >
                      <Skeleton variant="circular" width={56} height={56} />
                      <div className="flex-1">
                        <Skeleton variant="text" width="70%" />
                        <Skeleton variant="text" width="50%" />
                      </div>
                      <Skeleton variant="circular" width={40} height={40} />
                    </div>
                  ))
              ) : (
                <ConnectUserCardList />
              )}
            </div>
          </CardContent>
        </SectionCard>
      </Sidebar>

      {uploadedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-4 mx-4 bg-white rounded-lg shadow-xl">
            <h2 className="mb-4 text-xl font-bold">Crop Your Image</h2>
            <div className="w-full h-64 mb-4">
              <Cropper
                src={uploadedImage}
                style={{ height: "100%", width: "100%" }}
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
                startIcon={
                  isUploading && <CircularProgress size={20} color="inherit" />
                }
              >
                {isUploading ? "Uploading..." : "Save"}
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

// import React, { useState, useEffect } from 'react';
// import Photo from '../assets/man-avatar.png';
// import Mmmut from '../assets/mmmut.jpg';
// import ModeEditIcon from '@mui/icons-material/ModeEdit';
// import AddIcon from '@mui/icons-material/Add';
// import { IconButton, Skeleton } from '@mui/material';
// import Tech from '../assets/techsrijan.jpg';
// import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
// import { Outlet, useNavigate, useLocation } from 'react-router-dom';
// import CancelIcon from '@mui/icons-material/Cancel';
// import { Cropper } from 'react-cropper';
// import 'cropperjs/dist/cropper.css';
// import Spinner from './Spinner';
// import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
// import axios from 'axios';
// import { ref } from './features/user/refreshSlice';
// import { useSelector, useDispatch } from 'react-redux';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { toast } from 'react-toastify';
// import { sUserData } from './features/user/statusSlice';
// import { API_URL as api } from "../config/variable";

// const Profile = () => {
//     const navigate = useNavigate();
//     const path = useLocation();
//     const dispatch = useDispatch();
//     const refreshKey = useSelector((state) => state.refresh).refreshKey;
//     const { userData, token } = useSelector((state) => state.status);
//     const [userDetails, setUserDetails] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [profilePhoto, setProfilePhoto] = useState(Photo);
//     const [uploadedImage, setUploadedImage] = useState(null);
//     const [cropper, setCropper] = useState(null);
//     const [isUploading, setIsUploading] = useState(false);

//     useEffect(() => {
//         if (!userData) {
//             navigate('/login');
//         }
//     }, [userData, navigate]);

//     useEffect(() => {
//         const fetchUserDetails = async () => {
//             try {
//                 setLoading(true);
//                 const config = {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                     withCredentials: true,
//                 };

//                 const response = await axios.get(
//                     `${api}/getuser/${userData.user._id}`,
//                     config
//                 );

//                 setUserDetails(response.data.userDetails);
//                 setProfilePhoto(response.data.userDetails?.picture || Photo);

//                 // Update local storage and redux state
//                 const updatedUserData = {
//                     ...userData,
//                     user: response.data.userDetails
//                 };
//                 localStorage.setItem('userData', JSON.stringify(updatedUserData));
//                 dispatch(sUserData(response.data.userDetails));

//             } catch (error) {
//                 console.error("Error fetching user details:", error);
//                 toast.error("Error in fetching User Details, Please Login Again");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (userData) {
//             fetchUserDetails();
//         }
//     }, [refreshKey, userData, token, dispatch]);

//     const handlePhotoUpload = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = () => {
//                 setUploadedImage(reader.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleCrop = async () => {
//         try {
//             if (!cropper) return;
//             setIsUploading(true);

//             const canvas = cropper.getCroppedCanvas();
//             if (!canvas) return;

//             canvas.toBlob(async (blob) => {
//                 const formData = new FormData();
//                 formData.append("picture", blob);

//                 const config = {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         'Content-Type': 'multipart/form-data',
//                     },
//                     withCredentials: true,
//                 };

//                 const response = await axios.post(
//                     `${api}/profile/picture`,
//                     formData,
//                     config
//                 );

//                 // Update state and local storage
//                 setProfilePhoto(URL.createObjectURL(blob));
//                 setUploadedImage(null);

//                 const updatedUserData = {
//                     ...userData,
//                     user: {
//                         ...userData.user,
//                         picture: URL.createObjectURL(blob)
//                     }
//                 };
//                 localStorage.setItem('userData', JSON.stringify(updatedUserData));
//                 dispatch(sUserData(updatedUserData.user));
//                 dispatch(ref());

//                 toast.success('Profile picture updated successfully!');
//             }, 'image/jpeg');
//         } catch (error) {
//             console.error("Error uploading profile picture:", error);
//             toast.error('Failed to update profile picture');
//         } finally {
//             setIsUploading(false);
//         }
//     };

//     const handleDelete = async (type, id) => {
//         try {
//             setLoading(true);
//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//                 withCredentials: true,
//             };

//             await axios.delete(`${api}/${type}/${id}`, config);
//             toast.success('Successfully Deleted');
//             dispatch(ref());
//         } catch (error) {
//             console.error("Error deleting:", error);
//             toast.warning("Failed to delete");
//         } finally {
//             setLoading(false);
//         }
//     };

//     function formatDate(dateString) {
//         if (!dateString) return '';
//         const date = new Date(dateString);
//         return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
//     }

//     if (!userData) {
//         return <Spinner />;
//     }

//     return (
//         <div className='gap-4 mt-20 profile-container'>
//             <Outlet />
//             <div className='head h-50 bg-white rounded-lg flex-[0.7]'>
//                 <div className='bg-purple-400 rounded-lg h-44'></div>
//                 <div className='relative flex justify-between mt-3 h-52'>
//                     <div className='ml-8'>
//                         <div className="relative group">
//                             <div className="w-[11rem] h-[11rem] flex items-center justify-center rounded-full bg-white absolute -top-24 left-14">
//                                 <div className="w-[10rem] h-[10rem] rounded-full overflow-hidden relative">
//                                     <img
//                                         src={profilePhoto}
//                                         alt="Profile"
//                                         className="object-cover w-full h-full transition-opacity duration-300 group-hover:opacity-50"
//                                     />
//                                     <label
//                                         htmlFor="upload-photo"
//                                         className="absolute inset-0 flex items-center justify-center text-white transition-opacity duration-300 bg-black opacity-0 cursor-pointer bg-opacity-40 group-hover:opacity-100"
//                                     >
//                                         <AddAPhotoIcon sx={{ fontSize: "2rem" }} />
//                                     </label>
//                                     <input
//                                         type="file"
//                                         id="upload-photo"
//                                         className="hidden"
//                                         accept="image/*"
//                                         onChange={handlePhotoUpload}
//                                     />
//                                 </div>
//                             </div>
//                         </div>

//                         <div className='mt-20'>
//                             {loading ? (
//                                 <>
//                                     <Skeleton variant="text" sx={{ fontSize: '2rem', width: '20rem' }} />
//                                     <Skeleton variant="text" sx={{ fontSize: '1rem', width: '20rem' }} />
//                                     <Skeleton variant="text" sx={{ fontSize: '1rem', width: '20rem' }} />
//                                 </>
//                             ) : (
//                                 <>
//                                     <h1 className='text-2xl font-bold text-center'>{userData?.user?.firstName} {userData?.user?.lastName}</h1>
//                                     <p className='font-semibold text-center'>{userDetails?.status?.position}</p>
//                                     <p className='text-center'>{userDetails?.status?.city} {userDetails?.status?.state} {userDetails?.status?.zip}</p>
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                     <div className='mr-5'>
//                         {loading ? (
//                             <div className='flex items-center gap-2'>
//                                 <Skeleton variant="circular" width={45} height={45} />
//                                 <Skeleton variant="text" sx={{ fontSize: '3rem', width: '20rem' }} />
//                             </div>
//                         ) : (
//                             <>
//                                 <img src="" alt="" />
//                                 <span className='mr-3 text-lg font-semibold'>{userDetails?.status?.organization}</span>
//                                 <IconButton onClick={() => navigate(`${path.pathname}/details?edit=1`)}>
//                                     <ModeEditIcon />
//                                 </IconButton>
//                             </>
//                         )}
//                     </div>
//                 </div>
//                 <div className='flex flex-col gap-5'>
//                     {/* Education Section */}
//                     <div className='mx-4 overflow-auto rounded-lg eduaction min-h-16 bg-blue-50'>
//                         <div className='flex justify-between mx-4 mt-3'>
//                             <h1 className='text-2xl font-bold'>Education</h1>
//                             <IconButton className='h-10' onClick={() => navigate(`${path.pathname}/education`)}>
//                                 <AddIcon />
//                             </IconButton>
//                         </div>
//                         {loading ? (
//                             <div className='flex justify-between mx-4 mt-4'>
//                                 <div className='flex gap-6'>
//                                     <Skeleton variant="circular" sx={{ fontSize: '3rem', width: '4rem' }} />
//                                     <div>
//                                         <Skeleton variant="text" sx={{ fontSize: '2rem', width: '20rem' }} />
//                                         <Skeleton variant="text" sx={{ fontSize: '1rem', width: '20rem' }} />
//                                         <Skeleton variant="text" sx={{ fontSize: '1rem', width: '20rem' }} />
//                                     </div>
//                                 </div>
//                                 <div className='flex gap-3'>
//                                     <Skeleton variant="circular" sx={{ fontSize: '2rem', width: '2.5rem' }} />
//                                     <Skeleton variant="circular" sx={{ fontSize: '2rem', width: '2.5rem' }} />
//                                 </div>
//                             </div>
//                         ) : (
//                             userDetails?.education?.map((edu, index) => (
//                                 <React.Fragment key={index}>
//                                     <div className='flex justify-between mx-4 mt-4'>
//                                         <div className='flex gap-6'>
//                                             <div className='w-[4rem] h-[4rem] rounded-full overflow-hidden'>
//                                                 <img src={Mmmut} alt="College" />
//                                             </div>
//                                             <div>
//                                                 <h1 className='font-semibold cursor-pointer hover:underline hover:text-blue-400'>{edu?.collegeName}</h1>
//                                                 <p className='text-md opacity-3'>{edu?.degree}</p>
//                                                 <p className='text-sm text-gray-500'>{`${formatDate(edu?.from)} - ${formatDate(edu?.to)}`}</p>
//                                                 {edu?.grade && <p>{`Grade - ${edu?.grade}`}</p>}
//                                             </div>
//                                         </div>
//                                         <div className='flex gap-3'>
//                                             <IconButton
//                                                 className='h-10'
//                                                 onClick={() => navigate(`${path.pathname}/education?educationId=${edu?._id}&edit=1`)}
//                                             >
//                                                 <ModeEditIcon />
//                                             </IconButton>
//                                             <IconButton
//                                                 className='h-10'
//                                                 onClick={() => handleDelete('education', edu?._id)}
//                                             >
//                                                 <DeleteIcon />
//                                             </IconButton>
//                                         </div>
//                                     </div>
//                                     <hr className='mx-4 mt-1 font-bold' />
//                                 </React.Fragment>
//                             ))
//                         )}
//                     </div>

//                     {/* Projects Section */}
//                     <div className='mx-4 rounded-lg project min-h-16 bg-blue-50'>
//                         <div className='flex items-center justify-between mx-4 mt-3'>
//                             <h1 className='text-2xl font-bold'>Projects</h1>
//                             <IconButton className='h-10' onClick={() => navigate(`${path.pathname}/projectDetails`)}>
//                                 <AddIcon />
//                             </IconButton>
//                         </div>
//                         {loading ? (
//                             <div className='flex justify-between'>
//                                 <div className='flex flex-col mx-4 mt-4'>
//                                     <Skeleton variant="text" sx={{ fontSize: '2rem', width: '20rem' }} />
//                                     <Skeleton variant="text" sx={{ fontSize: '1rem', width: '20rem' }} />
//                                     <Skeleton variant="text" sx={{ fontSize: '1rem', width: '20rem' }} />
//                                     <Skeleton variant="text" sx={{ fontSize: '1rem', width: '20rem' }} />
//                                 </div>
//                                 <div className='flex justify-between mx-4 mt-3'>
//                                     <div className='flex gap-3'>
//                                         <Skeleton variant="circular" sx={{ fontSize: '2rem', width: '2.5rem' }} />
//                                         <Skeleton variant="circular" sx={{ fontSize: '2rem', width: '2.5rem' }} />
//                                     </div>
//                                 </div>
//                             </div>
//                         ) : (
//                             userDetails?.projects?.map((project, index) => (
//                                 <React.Fragment key={index}>
//                                     <div className='flex justify-between'>
//                                         <div className='flex flex-col mx-4 my-3'>
//                                             <h1 className='font-semibold cursor-pointer hover:underline hover:text-blue-400'>{project.projectName}</h1>
//                                             <p className='text-md opacity-3'>{`${formatDate(project?.durationFrom)} - ${formatDate(project?.durationTo)}`}</p>
//                                             <p className='text-sm text-gray-500'>{project.projectDescription}</p>
//                                             {project.projectLink && (
//                                                 <a
//                                                     href={project.projectLink}
//                                                     target="_blank"
//                                                     rel="noopener noreferrer"
//                                                     className="text-blue-500 hover:underline"
//                                                 >
//                                                     View Project
//                                                 </a>
//                                             )}
//                                         </div>
//                                         <div className='flex justify-between mx-4 mt-3'>
//                                             <div className='flex'>
//                                                 <IconButton
//                                                     className='h-10'
//                                                     onClick={() => navigate(`${path.pathname}/projectDetails?projectId=${project?._id}&edit=1`)}
//                                                 >
//                                                     <ModeEditIcon />
//                                                 </IconButton>
//                                                 <IconButton
//                                                     className='h-10'
//                                                     onClick={() => handleDelete('project', project?._id)}
//                                                 >
//                                                     <DeleteIcon />
//                                                 </IconButton>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <hr />
//                                 </React.Fragment>
//                             ))
//                         )}
//                     </div>

//                     {/* Volunteering Section */}
//                     <div className='mx-4 rounded-lg Volunteering min-h-16 bg-blue-50'>
//                         <div className='flex justify-between mx-4 mt-3'>
//                             <h1 className='text-2xl font-bold'>Volunteering</h1>
//                             <IconButton className='h-10' onClick={() => navigate(`${path.pathname}/volunteer`)}>
//                                 <AddIcon />
//                             </IconButton>
//                         </div>
//                         {loading ? (
//                             <div className='flex justify-between'>
//                                 <div className='flex gap-6 mx-4 mt-3'>
//                                     <div className='w-[4rem] h-[4rem] rounded-full overflow-hidden'>
//                                         <Skeleton variant="circular" sx={{ fontSize: '3rem', width: '4rem' }} />
//                                     </div>
//                                     <div>
//                                         <Skeleton variant="text" sx={{ fontSize: '2rem', width: '20rem' }} />
//                                         <Skeleton variant="text" sx={{ fontSize: '1rem', width: '20rem' }} />
//                                         <Skeleton variant="text" sx={{ fontSize: '1rem', width: '20rem' }} />
//                                         <Skeleton variant="text" sx={{ fontSize: '1rem', width: '20rem' }} />
//                                     </div>
//                                 </div>
//                                 <div className='flex justify-between mx-4 mt-3'>
//                                     <div className='flex gap-3'>
//                                         <Skeleton variant="circular" sx={{ fontSize: '2rem', width: '2.5rem' }} />
//                                         <Skeleton variant="circular" sx={{ fontSize: '2rem', width: '2.5rem' }} />
//                                     </div>
//                                 </div>
//                             </div>
//                         ) : (
//                             userDetails?.volunteering?.map((vol, index) => (
//                                 <React.Fragment key={index}>
//                                     <div className='flex justify-between'>
//                                         <div className='flex gap-6 mx-4 my-3'>
//                                             <div className='w-[4rem] h-[4rem] rounded-full overflow-hidden'>
//                                                 <img src={Tech} alt="Volunteering" />
//                                             </div>
//                                             <div>
//                                                 <h1 className='font-semibold cursor-pointer hover:underline hover:text-blue-400'>{vol?.role || 'Executive Member'}</h1>
//                                                 <p className='text-md opacity-3'>{vol?.organization || 'Techsrijan\'2023'}</p>
//                                                 <p className='text-sm text-gray-500'>
//                                                     {`${formatDate(vol?.from)} - ${formatDate(vol?.to)}` || 'Jul 2021 - Jul 2025'}
//                                                 </p>
//                                                 {vol?.description && <p className='text-sm text-gray-500'>{vol.description}</p>}
//                                             </div>
//                                         </div>
//                                         <div className='flex justify-between mx-4 mt-3'>
//                                             <div className='flex gap-3'>
//                                                 <IconButton
//                                                     className='h-10'
//                                                     onClick={() => navigate(`${path.pathname}/volunteer?volunteerId=${vol?._id}&edit=1`)}
//                                                 >
//                                                     <ModeEditIcon />
//                                                 </IconButton>
//                                                 <IconButton
//                                                     className='h-10'
//                                                     onClick={() => handleDelete('volunteer', vol?._id)}
//                                                 >
//                                                     <DeleteIcon />
//                                                 </IconButton>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <hr />
//                                 </React.Fragment>
//                             ))
//                         )}
//                     </div>

//                     {/* Skills Section */}
//                     <div className='mx-4 mb-4 rounded-lg skills min-h-16 bg-blue-50'>
//                         <div className='flex justify-between mx-4 mt-3'>
//                             <h1 className='text-2xl font-bold'>Skills</h1>
//                             <div className='flex gap-3'>
//                                 <IconButton onClick={() => navigate(`${path.pathname}/skills?edit=1`)}>
//                                     <ModeEditIcon />
//                                 </IconButton>
//                                 <IconButton onClick={() => navigate(`${path.pathname}/skills`)}>
//                                     <AddIcon />
//                                 </IconButton>
//                             </div>
//                         </div>
//                         <div className='flex flex-col gap-6 mx-4 mt-3 mb-4'>
//                             {loading ? (
//                                 <Skeleton variant="text" sx={{ fontSize: '2rem', width: '20rem' }} />
//                             ) : (
//                                 userDetails?.skills?.map((skill, index) => (
//                                     <React.Fragment key={index}>
//                                         <h1 className='font-semibold cursor-pointer hover:underline hover:text-blue-400'>{skill}</h1>
//                                         <hr />
//                                     </React.Fragment>
//                                 ))
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Connections Sidebar */}
//             <div className='flex-[0.3] bg-white rounded-lg h-screen min-h-screen'>
//                 <h1 className='mt-3 ml-4 text-xl font-semibold'>You may also know them</h1>
//                 <p className='mb-3 ml-5 text-sm text-gray-500'>Suggested to you</p>
//                 <hr />
//                 <div className='flex flex-col'>
//                     {loading ? (
//                         <div className='flex items-center justify-center w-full h-screen'>
//                             <Spinner />
//                         </div>
//                     ) : (
//                         userDetails?.connection?.map((member, index) => (
//                             <div key={index} className='relative flex items-center h-24 gap-4 pl-3 mx-4 mt-2 rounded-lg bg-blue-50'>
//                                 <div className='w-[4rem] h-[4rem] rounded-full overflow-hidden'>
//                                     <img src={Mmmut} alt="User" />
//                                 </div>
//                                 <div>
//                                     <h1 className='font-semibold cursor-pointer hover:underline hover:text-blue-400'>Abhishek Srivastava</h1>
//                                     <p className='text-md opacity-3'>Full stack developer || Mern || DSA</p>
//                                 </div>
//                                 <div className='absolute right-2 top-2'>
//                                     <IconButton>
//                                         <PersonAddAltIcon />
//                                     </IconButton>
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                 </div>
//             </div>

//             {/* Image Cropper Modal */}
//             {uploadedImage && (
//                 <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
//                     <div className="p-4 bg-white rounded-lg shadow-lg">
//                         <h2 className="mb-4 text-xl font-bold">Crop Your Image</h2>
//                         <Cropper
//                             src={uploadedImage}
//                             style={{ height: 300, width: '100%' }}
//                             aspectRatio={1}
//                             guides={false}
//                             viewMode={1}
//                             dragMode="move"
//                             onInitialized={(instance) => setCropper(instance)}
//                         />
//                         <div className="flex justify-end gap-4 mt-4">
//                             <button
//                                 className="px-4 py-2 text-white bg-red-500 rounded-lg"
//                                 onClick={() => setUploadedImage(null)}
//                                 disabled={isUploading}
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 className="px-4 py-2 text-white bg-blue-500 rounded-lg"
//                                 onClick={handleCrop}
//                                 disabled={isUploading}
//                             >
//                                 {isUploading ? 'Uploading...' : 'Save'}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Profile;

// import React, { useState, useEffect } from 'react';
// import Photo from '../assets/man-avatar.png';
// import Mmmut from '../assets/mmmut.jpg';
// import ModeEditIcon from '@mui/icons-material/ModeEdit';
// import AddIcon from '@mui/icons-material/Add';
// import { IconButton, Skeleton } from '@mui/material';
// import Tech from '../assets/techsrijan.jpg';
// import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
// import { Outlet, useNavigate, useLocation } from 'react-router-dom';
// import CancelIcon from '@mui/icons-material/Cancel';
// import { Cropper } from 'react-cropper';
// import 'cropperjs/dist/cropper.css';
// import Spinner from './Spinner';
// import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
// import axios from 'axios';
// import { ref } from './features/user/refreshSlice';
// import { useSelector, useDispatch } from 'react-redux';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { toast } from 'react-toastify';
// import { sUserData } from './features/user/statusSlice';
// import { API_URL as api } from "../config/variable";
// import { motion } from 'framer-motion';

// const Profile = () => {
//     const navigate = useNavigate();
//     const path = useLocation();
//     const dispatch = useDispatch();
//     const refreshKey = useSelector((state) => state.refresh).refreshKey;
//     const { userData, token } = useSelector((state) => state.status);
//     const [userDetails, setUserDetails] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [profilePhoto, setProfilePhoto] = useState(Photo);
//     const [uploadedImage, setUploadedImage] = useState(null);
//     const [cropper, setCropper] = useState(null);
//     const [isUploading, setIsUploading] = useState(false);

//     useEffect(() => {
//         if (!userData) {
//             navigate('/login');
//         }
//     }, [userData, navigate]);

//     useEffect(() => {
//         const fetchUserDetails = async () => {
//             try {
//                 setLoading(true);
//                 const config = {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                     withCredentials: true,
//                 };

//                 const response = await axios.get(
//                     `${api}/getuser/${userData.user._id}`,
//                     config
//                 );

//                 setUserDetails(response.data.userDetails);
//                 setProfilePhoto(response.data.userDetails?.picture || Photo);

//                 const updatedUserData = {
//                     ...userData,
//                     user: response.data.userDetails
//                 };
//                 localStorage.setItem('userData', JSON.stringify(updatedUserData));
//                 dispatch(sUserData(response.data.userDetails));

//             } catch (error) {
//                 console.error("Error fetching user details:", error);
//                 toast.error("Error in fetching User Details, Please Login Again");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (userData) {
//             fetchUserDetails();
//         }
//     }, [refreshKey, userData, token, dispatch]);

//     const handlePhotoUpload = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = () => {
//                 setUploadedImage(reader.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleCrop = async () => {
//         try {
//             if (!cropper) return;
//             setIsUploading(true);

//             const canvas = cropper.getCroppedCanvas();
//             if (!canvas) return;

//             canvas.toBlob(async (blob) => {
//                 const formData = new FormData();
//                 formData.append("picture", blob);

//                 const config = {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         'Content-Type': 'multipart/form-data',
//                     },
//                     withCredentials: true,
//                 };

//                 const response = await axios.post(
//                     `${api}/profile/picture`,
//                     formData,
//                     config
//                 );

//                 setProfilePhoto(URL.createObjectURL(blob));
//                 setUploadedImage(null);

//                 const updatedUserData = {
//                     ...userData,
//                     user: {
//                         ...userData.user,
//                         picture: URL.createObjectURL(blob)
//                     }
//                 };
//                 localStorage.setItem('userData', JSON.stringify(updatedUserData));
//                 dispatch(sUserData(updatedUserData.user));
//                 dispatch(ref());

//                 toast.success('Profile picture updated successfully!');
//             }, 'image/jpeg');
//         } catch (error) {
//             console.error("Error uploading profile picture:", error);
//             toast.error('Failed to update profile picture');
//         } finally {
//             setIsUploading(false);
//         }
//     };

//     const handleDelete = async (type, id) => {
//         try {
//             setLoading(true);
//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//                 withCredentials: true,
//             };

//             await axios.delete(`${api}/${type}/${id}`, config);
//             toast.success('Successfully Deleted');
//             dispatch(ref());
//         } catch (error) {
//             console.error("Error deleting:", error);
//             toast.warning("Failed to delete");
//         } finally {
//             setLoading(false);
//         }
//     };

//     function formatDate(dateString) {
//         if (!dateString) return '';
//         const date = new Date(dateString);
//         return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
//     }

//     if (!userData) {
//         return <Spinner />;
//     }

//     // Animation variants
//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: { staggerChildren: 0.1, delayChildren: 0.2 }
//         }
//     };

//     const itemVariants = {
//         hidden: { y: 20, opacity: 0 },
//         visible: {
//             y: 0,
//             opacity: 1,
//             transition: { duration: 0.5 }
//         }
//     };

//     return (
//         <motion.div
//             className='fixed top-0 left-0 flex w-full h-full overflow-y-auto'
//             initial="hidden"
//             animate="visible"
//             variants={containerVariants}
//         >
//             <Outlet />
//             {/* Main Content */}
//             <motion.div
//                 className='w-[70%] h-full p-4 overflow-y-auto bg-gray-100'
//                 variants={itemVariants}
//             >
//                 {/* Header with purple background */}
//                 <motion.div
//                     className='bg-purple-500 rounded-lg h-44'
//                     whileHover={{ scale: 1.01 }}
//                 >
//                     <div className='relative flex justify-between h-full'>
//                         {/* Profile Picture */}
//                         <motion.div
//                             className='absolute -bottom-16 left-8'
//                             whileHover={{ scale: 1.05 }}
//                         >
//                             <div className="relative group">
//                                 <div className="flex items-center justify-center w-40 h-40 bg-white border-4 border-white rounded-full shadow-lg">
//                                     <div className="relative w-full h-full overflow-hidden rounded-full">
//                                         <img
//                                             src={profilePhoto}
//                                             alt="Profile"
//                                             className="object-cover w-full h-full transition-opacity duration-300 group-hover:opacity-50"
//                                         />
//                                         <label
//                                             htmlFor="upload-photo"
//                                             className="absolute inset-0 flex items-center justify-center text-white transition-opacity duration-300 bg-black opacity-0 cursor-pointer bg-opacity-40 group-hover:opacity-100"
//                                         >
//                                             <AddAPhotoIcon sx={{ fontSize: "2rem" }} />
//                                         </label>
//                                         <input
//                                             type="file"
//                                             id="upload-photo"
//                                             className="hidden"
//                                             accept="image/*"
//                                             onChange={handlePhotoUpload}
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </motion.div>

//                         {/* User Info */}
//                         <motion.div
//                             className='absolute bottom-4 left-56'
//                             variants={itemVariants}
//                         >
//                             {loading ? (
//                                 <>
//                                     <Skeleton variant="text" sx={{ fontSize: '2rem', width: '20rem' }} />
//                                     <Skeleton variant="text" sx={{ fontSize: '1rem', width: '20rem' }} />
//                                     <Skeleton variant="text" sx={{ fontSize: '1rem', width: '20rem' }} />
//                                 </>
//                             ) : (
//                                 <>
//                                     <h1 className='text-3xl font-bold text-white'>{userData?.user?.firstName} {userData?.user?.lastName}</h1>
//                                     <p className='text-xl font-semibold text-white'>{userDetails?.status?.position}</p>
//                                     <p className='text-white'>{userDetails?.status?.city} {userDetails?.status?.state} {userDetails?.status?.zip}</p>
//                                 </>
//                             )}
//                         </motion.div>

//                         {/* Organization */}
//                         <motion.div
//                             className=''
//                             variants={itemVariants}
//                         >
//                             {loading ? (
//                                 <div className='flex items-center gap-2'>
//                                     <Skeleton variant="circular" width={45} height={45} />
//                                     <Skeleton variant="text" sx={{ fontSize: '3rem', width: '20rem' }} />
//                                 </div>
//                             ) : (
//                                 <>
//                                     <img src="" alt="" />
//                                     <span className='mr-3 text-xl font-semibold text-white'>{userDetails?.status?.organization}  viagkladbhdvkjcmvnkljfz ekhbvfffffffffffffffffffffffffx zmbvmbjdfzms,nfdkjna,m
//                                     </span>
//                                     <IconButton onClick={() => navigate(`${path.pathname}/details?edit=1`)}>
//                                         <ModeEditIcon sx={{ color: 'white' }} />
//                                     </IconButton>
//                                 </>
//                             )}
//                         </motion.div>
//                     </div>
//                 </motion.div>

//                 {/* Sections */}
//                 <motion.div
//                     className='mt-20 space-y-6'
//                     variants={containerVariants}
//                 >
//                     {/* Education Section */}
//                     <motion.div
//                         className='p-6 bg-white rounded-lg shadow-md'
//                         variants={itemVariants}
//                         whileHover={{ scale: 1.005 }}
//                     >
//                         <div className='flex justify-between'>
//                             <h1 className='text-2xl font-bold'>Education</h1>
//                             <IconButton onClick={() => navigate(`${path.pathname}/education`)}>
//                                 <AddIcon />
//                             </IconButton>
//                         </div>

//                         {loading ? (
//                             <div className='flex justify-between mt-4'>
//                                 <div className='flex gap-6'>
//                                     <Skeleton variant="circular" sx={{ fontSize: '3rem', width: '4rem' }} />
//                                     <div>
//                                         <Skeleton variant="text" sx={{ fontSize: '2rem', width: '20rem' }} />
//                                         <Skeleton variant="text" sx={{ fontSize: '1rem', width: '20rem' }} />
//                                         <Skeleton variant="text" sx={{ fontSize: '1rem', width: '20rem' }} />
//                                     </div>
//                                 </div>
//                                 <div className='flex gap-3'>
//                                     <Skeleton variant="circular" sx={{ fontSize: '2rem', width: '2.5rem' }} />
//                                     <Skeleton variant="circular" sx={{ fontSize: '2rem', width: '2.5rem' }} />
//                                 </div>
//                             </div>
//                         ) : (
//                             userDetails?.education?.map((edu, index) => (
//                                 <motion.div
//                                     key={index}
//                                     className='flex justify-between mt-4'
//                                     variants={itemVariants}
//                                     whileHover={{ x: 5 }}
//                                 >
//                                     <div className='flex gap-6'>
//                                         <div className='w-16 h-16 overflow-hidden rounded-full'>
//                                             <img src={Mmmut} alt="College" className='object-cover w-full h-full' />
//                                         </div>
//                                         <div>
//                                             <h1 className='text-xl font-semibold cursor-pointer hover:text-blue-500'>{edu?.collegeName}</h1>
//                                             <p className='text-lg'>{edu?.degree}</p>
//                                             <p className='text-gray-500'>{`${formatDate(edu?.from)} - ${formatDate(edu?.to)}`}</p>
//                                             {edu?.grade && <p className='text-gray-500'>{`Grade - ${edu?.grade}`}</p>}
//                                         </div>
//                                     </div>
//                                     <div className='flex gap-3'>
//                                         <IconButton
//                                             onClick={() => navigate(`${path.pathname}/education?educationId=${edu?._id}&edit=1`)}
//                                         >
//                                             <ModeEditIcon />
//                                         </IconButton>
//                                         <IconButton
//                                             onClick={() => handleDelete('education', edu?._id)}
//                                         >
//                                             <DeleteIcon />
//                                         </IconButton>
//                                     </div>
//                                 </motion.div>
//                             ))
//                         )}
//                     </motion.div>

//                     {/* Projects Section */}
//                     <motion.div
//                         className='p-6 bg-white rounded-lg shadow-md'
//                         variants={itemVariants}
//                         whileHover={{ scale: 1.005 }}
//                     >
//                         <div className='flex justify-between'>
//                             <h1 className='text-2xl font-bold'>Projects</h1>
//                             <IconButton onClick={() => navigate(`${path.pathname}/projectDetails`)}>
//                                 <AddIcon />
//                             </IconButton>
//                         </div>

//                         {loading ? (
//                             <div className='flex justify-between mt-4'>
//                                 <div>
//                                     <Skeleton variant="text" sx={{ fontSize: '2rem', width: '20rem' }} />
//                                     <Skeleton variant="text" sx={{ fontSize: '1rem', width: '20rem' }} />
//                                     <Skeleton variant="text" sx={{ fontSize: '1rem', width: '20rem' }} />
//                                     <Skeleton variant="text" sx={{ fontSize: '1rem', width: '20rem' }} />
//                                 </div>
//                                 <div className='flex gap-3'>
//                                     <Skeleton variant="circular" sx={{ fontSize: '2rem', width: '2.5rem' }} />
//                                     <Skeleton variant="circular" sx={{ fontSize: '2rem', width: '2.5rem' }} />
//                                 </div>
//                             </div>
//                         ) : (
//                             userDetails?.projects?.map((project, index) => (
//                                 <motion.div
//                                     key={index}
//                                     className='mt-4'
//                                     variants={itemVariants}
//                                     whileHover={{ x: 5 }}
//                                 >
//                                     <div className='flex justify-between'>
//                                         <div>
//                                             <h1 className='text-xl font-semibold cursor-pointer hover:text-blue-500'>{project.projectName}</h1>
//                                             <p className='text-gray-500'>{`${formatDate(project?.durationFrom)} - ${formatDate(project?.durationTo)}`}</p>
//                                             <p className='mt-2'>{project.projectDescription}</p>
//                                             {project.projectLink && (
//                                                 <a
//                                                     href={project.projectLink}
//                                                     target="_blank"
//                                                     rel="noopener noreferrer"
//                                                     className="text-blue-500 hover:underline"
//                                                 >
//                                                     View Project
//                                                 </a>
//                                             )}
//                                         </div>
//                                         <div className='flex gap-3'>
//                                             <IconButton
//                                                 onClick={() => navigate(`${path.pathname}/projectDetails?projectId=${project?._id}&edit=1`)}
//                                             >
//                                                 <ModeEditIcon />
//                                             </IconButton>
//                                             <IconButton
//                                                 onClick={() => handleDelete('project', project?._id)}
//                                             >
//                                                 <DeleteIcon />
//                                             </IconButton>
//                                         </div>
//                                     </div>
//                                     {index < userDetails.projects.length - 1 && <hr className='my-3' />}
//                                 </motion.div>
//                             ))
//                         )}
//                     </motion.div>

//                     {/* Volunteering Section */}
//                     <motion.div
//                         className='p-6 bg-white rounded-lg shadow-md'
//                         variants={itemVariants}
//                         whileHover={{ scale: 1.005 }}
//                     >
//                         <div className='flex justify-between'>
//                             <h1 className='text-2xl font-bold'>Volunteering</h1>
//                             <IconButton onClick={() => navigate(`${path.pathname}/volunteer`)}>
//                                 <AddIcon />
//                             </IconButton>
//                         </div>

//                         {loading ? (
//                             <div className='flex justify-between mt-4'>
//                                 <div className='flex gap-6'>
//                                     <Skeleton variant="circular" sx={{ fontSize: '3rem', width: '4rem' }} />
//                                     <div>
//                                         <Skeleton variant="text" sx={{ fontSize: '2rem', width: '20rem' }} />
//                                         <Skeleton variant="text" sx={{ fontSize: '1rem', width: '20rem' }} />
//                                         <Skeleton variant="text" sx={{ fontSize: '1rem', width: '20rem' }} />
//                                         <Skeleton variant="text" sx={{ fontSize: '1rem', width: '20rem' }} />
//                                     </div>
//                                 </div>
//                                 <div className='flex gap-3'>
//                                     <Skeleton variant="circular" sx={{ fontSize: '2rem', width: '2.5rem' }} />
//                                     <Skeleton variant="circular" sx={{ fontSize: '2rem', width: '2.5rem' }} />
//                                 </div>
//                             </div>
//                         ) : (
//                             userDetails?.volunteering?.map((vol, index) => (
//                                 <motion.div
//                                     key={index}
//                                     className='flex justify-between mt-4'
//                                     variants={itemVariants}
//                                     whileHover={{ x: 5 }}
//                                 >
//                                     <div className='flex gap-6'>
//                                         <div className='w-16 h-16 overflow-hidden rounded-full'>
//                                             <img src={Tech} alt="Volunteering" className='object-cover w-full h-full' />
//                                         </div>
//                                         <div>
//                                             <h1 className='text-xl font-semibold cursor-pointer hover:text-blue-500'>{vol?.role || 'Executive Member'}</h1>
//                                             <p className='text-lg'>{vol?.organization || 'Techsrijan\'2023'}</p>
//                                             <p className='text-gray-500'>
//                                                 {`${formatDate(vol?.from)} - ${formatDate(vol?.to)}` || 'Jul 2021 - Jul 2025'}
//                                             </p>
//                                             {vol?.description && <p className='mt-2 text-gray-500'>{vol.description}</p>}
//                                         </div>
//                                     </div>
//                                     <div className='flex gap-3'>
//                                         <IconButton
//                                             onClick={() => navigate(`${path.pathname}/volunteer?volunteerId=${vol?._id}&edit=1`)}
//                                         >
//                                             <ModeEditIcon />
//                                         </IconButton>
//                                         <IconButton
//                                             onClick={() => handleDelete('volunteer', vol?._id)}
//                                         >
//                                             <DeleteIcon />
//                                         </IconButton>
//                                     </div>
//                                 </motion.div>
//                             ))
//                         )}
//                     </motion.div>

//                     {/* Skills Section */}
//                     <motion.div
//                         className='p-6 bg-white rounded-lg shadow-md'
//                         variants={itemVariants}
//                         whileHover={{ scale: 1.005 }}
//                     >
//                         <div className='flex justify-between'>
//                             <h1 className='text-2xl font-bold'>Skills</h1>
//                             <div className='flex gap-3'>
//                                 <IconButton onClick={() => navigate(`${path.pathname}/skills?edit=1`)}>
//                                     <ModeEditIcon />
//                                 </IconButton>
//                                 <IconButton onClick={() => navigate(`${path.pathname}/skills`)}>
//                                     <AddIcon />
//                                 </IconButton>
//                             </div>
//                         </div>

//                         <div className='flex flex-wrap gap-4 mt-4'>
//                             {loading ? (
//                                 <Skeleton variant="text" sx={{ fontSize: '2rem', width: '20rem' }} />
//                             ) : (
//                                 userDetails?.skills?.map((skill, index) => (
//                                     <motion.span
//                                         key={index}
//                                         className='px-4 py-2 text-white bg-blue-500 rounded-full'
//                                         variants={itemVariants}
//                                         whileHover={{ scale: 1.1 }}
//                                     >
//                                         {skill}
//                                     </motion.span>
//                                 ))
//                             )}
//                         </div>
//                     </motion.div>
//                 </motion.div>
//             </motion.div>

//             {/* Connections Sidebar */}
//             <motion.div
//                 className='w-[30%] h-full p-4 overflow-y-auto bg-white border-l border-gray-200'
//                 initial={{ x: 100, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//             >
//                 <h1 className='text-2xl font-bold'>You may also know them</h1>
//                 <p className='mb-4 text-gray-500'>Suggested to you</p>
//                 <hr className='mb-4' />

//                 <div className='space-y-4'>
//                     {loading ? (
//                         <div className='flex items-center justify-center h-full'>
//                             <Spinner />
//                         </div>
//                     ) : (
//                         userDetails?.connection?.map((member, index) => (
//                             <motion.div
//                                 key={index}
//                                 className='flex items-center p-4 rounded-lg shadow-sm bg-gray-50 hover:shadow-md'
//                                 whileHover={{ scale: 1.02 }}
//                             >
//                                 <div className='w-16 h-16 overflow-hidden rounded-full'>
//                                     <img src={Mmmut} alt="User" className='object-cover w-full h-full' />
//                                 </div>
//                                 <div className='ml-4'>
//                                     <h1 className='text-lg font-semibold cursor-pointer hover:text-blue-500'>Abhishek Srivastava</h1>
//                                     <p className='text-gray-500'>Full stack developer || Mern || DSA</p>
//                                 </div>
//                                 <div className='ml-auto'>
//                                     <IconButton>
//                                         <PersonAddAltIcon />
//                                     </IconButton>
//                                 </div>
//                             </motion.div>
//                         ))
//                     )}
//                 </div>
//             </motion.div>

//             {/* Image Cropper Modal */}
//             {uploadedImage && (
//                 <motion.div
//                     className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                 >
//                     <motion.div
//                         className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl"
//                         initial={{ scale: 0.9, opacity: 0 }}
//                         animate={{ scale: 1, opacity: 1 }}
//                     >
//                         <h2 className="mb-4 text-2xl font-bold">Crop Your Image</h2>
//                         <Cropper
//                             src={uploadedImage}
//                             style={{ height: 300, width: '100%' }}
//                             aspectRatio={1}
//                             guides={false}
//                             viewMode={1}
//                             dragMode="move"
//                             onInitialized={(instance) => setCropper(instance)}
//                         />
//                         <div className="flex justify-end gap-4 mt-4">
//                             <motion.button
//                                 className="px-6 py-2 text-white bg-red-500 rounded-lg"
//                                 onClick={() => setUploadedImage(null)}
//                                 disabled={isUploading}
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                             >
//                                 Cancel
//                             </motion.button>
//                             <motion.button
//                                 className="px-6 py-2 text-white bg-blue-500 rounded-lg"
//                                 onClick={handleCrop}
//                                 disabled={isUploading}
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                             >
//                                 {isUploading ? 'Uploading...' : 'Save'}
//                             </motion.button>
//                         </div>
//                     </motion.div>
//                 </motion.div>
//             )}
//         </motion.div>
//     );
// };

// export default Profile;
