// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { motion } from "framer-motion";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   Divider,
//   Avatar,
//   Chip,
//   Skeleton,
//   IconButton,
//   Button
// } from "@mui/material";
// import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
// import Photo from "../assets/man-avatar.png";
// import Mmmut from "../assets/mmmut.jpg";
// import Tech from "../assets/techsrijan.jpg";
// import { API_URL as api } from "../config/variable";

// const UserProfileView = () => {
//   const { userId } = useParams();
//   const { token } = useSelector((state) => state.status);
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [connectionStatus, setConnectionStatus] = useState(null);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         setLoading(true);
//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         };

//         const response = await axios.get(`${api}/getuser/${userId}`, config);
//         setUserData(response.data.userDetails);
        
//         // Check connection status
//         const connectionRes = await axios.get(`${api}/connection/status/${userId}`, config);
//         setConnectionStatus(connectionRes.data.status);
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//         toast.error("Failed to load user profile");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, [userId, token]);

//   const handleConnectionRequest = async () => {
//     try {
//       setLoading(true);
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true,
//       };

//       await axios.post(`${api}/connection/request/${userId}`, {}, config);
//       setConnectionStatus("pending");
//       toast.success("Connection request sent");
//     } catch (error) {
//       console.error("Error sending connection request:", error);
//       toast.error("Failed to send connection request");
//     } finally {
//       setLoading(false);
//     }
//   };

//   function formatDate(dateString) {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return date.toLocaleString("en-US", { month: "long", year: "numeric" });
//   }

//   if (loading && !userData) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Skeleton variant="circular" width={40} height={40} />
//       </div>
//     );
//   }

//   if (!userData) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p>User not found</p>
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-4xl p-4 mx-auto"
//     >
//       {/* Profile Header */}
//       <Card className="mb-6">
//         <div className="relative">
//           {/* Cover Photo */}
//           <div className="h-48 rounded-t-lg bg-gradient-to-r from-purple-500 to-pink-500" />
          
//           {/* Profile Picture and Basic Info */}
//           <div className="flex flex-col items-center px-6 pb-6 -mt-16 sm:flex-row sm:items-end sm:justify-between">
//             <div className="flex flex-col items-center sm:flex-row sm:items-end sm:gap-6">
//               <Avatar
//                 src={userData.picture || Photo}
//                 alt="Profile"
//                 className="w-32 h-32 border-4 border-white shadow-lg"
//               />
//               <div className="mt-4 text-center sm:text-left sm:mt-0">
//                 <motion.h1 
//                   className="text-2xl font-bold"
//                   initial={{ y: 20, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ delay: 0.2 }}
//                 >
//                   {userData.firstName} {userData.lastName}
//                 </motion.h1>
//                 <motion.p 
//                   className="text-gray-600"
//                   initial={{ y: 20, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ delay: 0.3 }}
//                 >
//                   {userData?.status?.position}
//                 </motion.p>
//                 <motion.p 
//                   className="text-gray-500"
//                   initial={{ y: 20, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ delay: 0.4 }}
//                 >
//                   {userData?.status?.city} {userData?.status?.state} {userData?.status?.zip}
//                 </motion.p>
//               </div>
//             </div>
            
//             {/* Connection Button */}
//             <motion.div
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.5 }}
//               className="mt-4 sm:mt-0"
//             >
//               {connectionStatus === "connected" ? (
//                 <Button variant="contained" color="success" disabled>
//                   Connected
//                 </Button>
//               ) : connectionStatus === "pending" ? (
//                 <Button variant="contained" color="info" disabled>
//                   Request Pending
//                 </Button>
//               ) : (
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   startIcon={<PersonAddAltIcon />}
//                   onClick={handleConnectionRequest}
//                   disabled={loading}
//                 >
//                   Connect
//                 </Button>
//               )}
//             </motion.div>
//           </div>
//         </div>
//       </Card>

//       {/* Education Section */}
//       <Card className="mb-6">
//         <CardHeader title="Education" />
//         <Divider />
//         <CardContent>
//           {loading ? (
//             Array(2).fill(0).map((_, i) => (
//               <div key={i} className="mb-4">
//                 <div className="flex gap-4">
//                   <Skeleton variant="circular" width={60} height={60} />
//                   <div className="flex-1">
//                     <Skeleton variant="text" width="80%" />
//                     <Skeleton variant="text" width="60%" />
//                     <Skeleton variant="text" width="50%" />
//                   </div>
//                 </div>
//                 {i < 1 && <Divider className="my-4" />}
//               </div>
//             ))
//           ) : userData?.education?.length > 0 ? (
//             userData.education.map((edu, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ x: -20, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="mb-4"
//               >
//                 <div className="flex gap-4">
//                   <Avatar
//                     src={Mmmut}
//                     alt="College"
//                     sx={{ width: 60, height: 60 }}
//                     variant="rounded"
//                   />
//                   <div>
//                     <h2 className="font-semibold">{edu.collegeName}</h2>
//                     <p className="text-gray-600">{edu.degree}</p>
//                     <p className="text-sm text-gray-500">
//                       {formatDate(edu.from)} - {formatDate(edu.to)}
//                     </p>
//                     {edu.grade && (
//                       <p className="text-sm text-gray-500">Grade: {edu.grade}</p>
//                     )}
//                   </div>
//                 </div>
//                 {index < userData.education.length - 1 && (
//                   <Divider className="my-4" />
//                 )}
//               </motion.div>
//             ))
//           ) : (
//             <p className="text-gray-500">No education information available</p>
//           )}
//         </CardContent>
//       </Card>

//       {/* Projects Section */}
//       <Card className="mb-6">
//         <CardHeader title="Projects" />
//         <Divider />
//         <CardContent>
//           {loading ? (
//             Array(2).fill(0).map((_, i) => (
//               <div key={i} className="mb-4">
//                 <Skeleton variant="text" width="70%" />
//                 <Skeleton variant="text" width="50%" />
//                 <Skeleton variant="text" width="80%" />
//                 <Skeleton variant="text" width="60%" />
//                 {i < 1 && <Divider className="my-4" />}
//               </div>
//             ))
//           ) : userData?.projects?.length > 0 ? (
//             userData.projects.map((project, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ x: -20, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="mb-4"
//               >
//                 <h2 className="font-semibold">{project.projectName}</h2>
//                 <p className="text-sm text-gray-500">
//                   {formatDate(project.durationFrom)} - {formatDate(project.durationTo)}
//                 </p>
//                 <p className="mt-2 text-gray-600">{project.projectDescription}</p>
//                 {project.projectLink && (
//                   <a
//                     href={project.projectLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-block mt-2 text-blue-500 hover:underline"
//                   >
//                     View Project
//                   </a>
//                 )}
//                 {index < userData.projects.length - 1 && (
//                   <Divider className="my-4" />
//                 )}
//               </motion.div>
//             ))
//           ) : (
//             <p className="text-gray-500">No projects information available</p>
//           )}
//         </CardContent>
//       </Card>

//       {/* Volunteering Section */}
//       <Card className="mb-6">
//         <CardHeader title="Volunteering" />
//         <Divider />
//         <CardContent>
//           {loading ? (
//             Array(2).fill(0).map((_, i) => (
//               <div key={i} className="mb-4">
//                 <div className="flex gap-4">
//                   <Skeleton variant="circular" width={60} height={60} />
//                   <div className="flex-1">
//                     <Skeleton variant="text" width="80%" />
//                     <Skeleton variant="text" width="60%" />
//                     <Skeleton variant="text" width="70%" />
//                   </div>
//                 </div>
//                 {i < 1 && <Divider className="my-4" />}
//               </div>
//             ))
//           ) : userData?.volunteering?.length > 0 ? (
//             userData.volunteering.map((vol, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ x: -20, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="mb-4"
//               >
//                 <div className="flex gap-4">
//                   <Avatar
//                     src={Tech}
//                     alt="Volunteering"
//                     sx={{ width: 60, height: 60 }}
//                     variant="rounded"
//                   />
//                   <div>
//                     <h2 className="font-semibold">{vol.role || "Member"}</h2>
//                     <p className="text-gray-600">{vol.organization || "Organization"}</p>
//                     <p className="text-sm text-gray-500">
//                       {formatDate(vol.from)} - {formatDate(vol.to)}
//                     </p>
//                     {vol.description && (
//                       <p className="mt-2 text-gray-600">{vol.description}</p>
//                     )}
//                   </div>
//                 </div>
//                 {index < userData.volunteering.length - 1 && (
//                   <Divider className="my-4" />
//                 )}
//               </motion.div>
//             ))
//           ) : (
//             <p className="text-gray-500">No volunteering information available</p>
//           )}
//         </CardContent>
//       </Card>

//       {/* Skills Section */}
//       <Card className="mb-6">
//         <CardHeader title="Skills" />
//         <Divider />
//         <CardContent>
//           {loading ? (
//             <div className="flex flex-wrap gap-2">
//               {Array(5).fill(0).map((_, i) => (
//                 <Skeleton key={i} variant="rounded" width={80} height={32} />
//               ))}
//             </div>
//           ) : userData?.skills?.length > 0 ? (
//             <div className="flex flex-wrap gap-2">
//               {userData.skills.map((skill, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ delay: index * 0.05 }}
//                 >
//                   <Chip
//                     label={skill}
//                     className="text-blue-800 bg-blue-100"
//                   />
//                 </motion.div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500">No skills information available</p>
//           )}
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// };

// export default UserProfileView;


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Avatar,
  Chip,
  Skeleton,
  Button,
  CircularProgress,
  IconButton
} from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Photo from "../assets/man-avatar.png";
import Mmmut from "../assets/mmmut.jpg";
import Tech from "../assets/techsrijan.jpg";
import { styled } from "@mui/system";
import { API_URL as api } from "../config/variable";

// Reuse all the same styled components from your Profile component
const ProfileContainer = styled("div")({
  width: "100%",
  margin: "0 auto",
  padding: "0 16px",
  display: "flex",
  flexDirection: "column",
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
  marginTop: '50px',
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  order: 1,
  "@media (min-width: 900px)": {
    flex: 1,
    maxWidth: "calc(100% - 320px)",
  },
});

const Sidebar = styled("div")({
  width: "100%",
  order: 2,
  "@media (min-width: 900px)": {
    width: "320px",
    position: "sticky",
    top: "80px",
    order: 1,
  },
});

const ProfileHeader = styled("div")({
  position: "relative",
  width: "100%",
});

const CoverPhoto = styled("div")({
  height: "150px",
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
  marginBottom: '100px',
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
  marginTop: '6px',
  padding: "16px",
  top: '10px',
  wordBreak: "break-word",
  width: "100%",
  boxSizing: "border-box",
  "@media (min-width: 600px)": {
    textAlign: "left",
    padding: "24px",
    top: '10px',
    marginTop: '60px',
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

const UserProfileView = () => {
  const { userId } = useParams();
  const { token } = useSelector((state) => state.status);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [connectionLoading, setConnectionLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        };

        // Fetch user profile
        const response = await axios.get(`${api}/getuser/${userId}`, config);
        setUserData(response.data.userDetails);
        
        // Check connection status
        const connectionRes = await axios.get(`${api}/connection/status/${userId}`, config);
        setConnectionStatus(connectionRes.data.status);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId, token]);

  const handleConnectionRequest = async () => {
    try {
      setConnectionLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };

      await axios.post(`${api}/connection/request/${userId}`, {}, config);
      setConnectionStatus("pending");
      toast.success("Connection request sent");
    } catch (error) {
      console.error("Error sending connection request:", error);
      toast.error("Failed to send connection request");
    } finally {
      setConnectionLoading(false);
    }
  };

  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", { month: "long", year: "numeric" });
  }

  if (loading && !userData) {
    return (
      <ProfileContainer>
        <MainContent>
          <SectionCard>
            <CoverPhoto />
            <ProfileHeader>
              <ProfilePictureContainer>
                <Skeleton variant="circular" width="100%" height="100%" />
              </ProfilePictureContainer>
              <ProfileInfo>
                <Skeleton variant="text" sx={{ fontSize: "2rem", width: "100%" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem", width: "80%" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem", width: "70%" }} />
              </ProfileInfo>
            </ProfileHeader>
          </SectionCard>
          
          {/* Loading skeletons for all sections */}
          {[1, 2, 3, 4].map((section) => (
            <SectionCard key={section}>
              <CardHeader
                title={<Skeleton variant="text" width="30%" />}
              />
              <Divider />
              <CardContent>
                {Array(2).fill(0).map((_, i) => (
                  <div key={i} className="mb-4">
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="50%" />
                  </div>
                ))}
              </CardContent>
            </SectionCard>
          ))}
        </MainContent>
        
        <Sidebar>
          <SectionCard>
            <CardHeader
              title={<Skeleton variant="text" width="60%" />}
              subheader={<Skeleton variant="text" width="40%" />}
            />
            <Divider />
            <CardContent>
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-3">
                  <Skeleton variant="circular" width={56} height={56} />
                  <div className="flex-1">
                    <Skeleton variant="text" width="70%" />
                    <Skeleton variant="text" width="50%" />
                  </div>
                </div>
              ))}
            </CardContent>
          </SectionCard>
        </Sidebar>
      </ProfileContainer>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>User not found</p>
      </div>
    );
  }

  return (
    <ProfileContainer>
      <MainContent>
        {/* Profile Header */}
        <SectionCard>
          <CoverPhoto />
          <ProfileHeader>
            <ProfilePictureContainer>
              <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <ProfilePicture src={userData.picture || Photo} alt="Profile" />
              </motion.div>
            </ProfilePictureContainer>

            <ProfileInfo>
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              >
                <h1 className="text-2xl font-bold sm:text-3xl">
                  {userData.firstName} {userData.lastName}
                </h1>
                <p className="text-lg font-semibold text-gray-700">
                  {userData?.status?.position}
                </p>
                <p className="text-gray-600">
                  {userData?.status?.city} {userData?.status?.state}{" "}
                  {userData?.status?.zip}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-semibold">
                    {userData?.status?.organization}
                  </span>
                  {connectionStatus === "connected" ? (
                    <Button variant="contained" color="success" disabled>
                      Connected
                    </Button>
                  ) : connectionStatus === "pending" ? (
                    <Button variant="contained" color="info" disabled>
                      Request Sent
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<PersonAddAltIcon />}
                      onClick={handleConnectionRequest}
                      disabled={connectionLoading}
                    >
                      {connectionLoading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Connect"
                      )}
                    </Button>
                  )}
                </div>
              </motion.div>
            </ProfileInfo>
          </ProfileHeader>
        </SectionCard>

        {/* Education Section */}
        <SectionCard>
          <CardHeader title="Education" />
          <Divider />
          <CardContent>
            {userData?.education?.length > 0 ? (
              userData.education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-4"
                >
                  <div className="flex gap-4">
                    <Avatar
                      src={Mmmut}
                      alt="College"
                      sx={{ width: 60, height: 60 }}
                      variant="rounded"
                    />
                    <div>
                      <h1 className="font-semibold hover:text-blue-400">
                        {edu.collegeName}
                      </h1>
                      <p className="text-gray-600">{edu.degree}</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(edu.from)} - {formatDate(edu.to)}
                      </p>
                      {edu.grade && <p>{`Grade - ${edu.grade}`}</p>}
                    </div>
                  </div>
                  {index < userData.education.length - 1 && (
                    <Divider sx={{ my: 2 }} />
                  )}
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500">No education information available</p>
            )}
          </CardContent>
        </SectionCard>

        {/* Projects Section */}
        <SectionCard>
          <CardHeader title="Projects" />
          <Divider />
          <CardContent>
            {userData?.projects?.length > 0 ? (
              userData.projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-4"
                >
                  <div>
                    <h1 className="font-semibold hover:text-blue-400">
                      {project.projectName}
                    </h1>
                    <p className="text-gray-600">
                      {formatDate(project.durationFrom)} - {formatDate(project.durationTo)}
                    </p>
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
                  {index < userData.projects.length - 1 && (
                    <Divider sx={{ my: 2 }} />
                  )}
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500">No projects information available</p>
            )}
          </CardContent>
        </SectionCard>

        {/* Volunteering Section */}
        <SectionCard>
          <CardHeader title="Volunteering" />
          <Divider />
          <CardContent>
            {userData?.volunteering?.length > 0 ? (
              userData.volunteering.map((vol, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-4"
                >
                  <div className="flex gap-4">
                    <Avatar
                      src={Tech}
                      alt="Volunteering"
                      sx={{ width: 60, height: 60 }}
                      variant="rounded"
                    />
                    <div>
                      <h1 className="font-semibold hover:text-blue-400">
                        {vol.role || "Executive Member"}
                      </h1>
                      <p className="text-gray-600">
                        {vol.organization || "Techsrijan'2023"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(vol.from)} - {formatDate(vol.to)}
                      </p>
                      {vol.description && (
                        <p className="text-sm text-gray-500">
                          {vol.description}
                        </p>
                      )}
                    </div>
                  </div>
                  {index < userData.volunteering.length - 1 && (
                    <Divider sx={{ my: 2 }} />
                  )}
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500">No volunteering information available</p>
            )}
          </CardContent>
        </SectionCard>

        {/* Skills Section */}
        <SectionCard>
          <CardHeader title="Skills" />
          <Divider />
          <CardContent>
            <div className="flex flex-wrap">
              {userData?.skills?.length > 0 ? (
                userData.skills.map((skill, index) => (
                  <SkillChip key={index} label={skill} />
                ))
              ) : (
                <p className="text-gray-500">No skills information available</p>
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
            <div className="flex flex-col gap-4">
              {loading ? (
                Array(3).fill(0).map((_, i) => (
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
                <p className="text-gray-500">No suggestions available</p>
              )}
            </div>
          </CardContent>
        </SectionCard>
      </Sidebar>
    </ProfileContainer>
  );
};

export default UserProfileView;