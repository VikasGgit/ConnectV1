// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Container,
//   Grid,
//   Typography,
//   useMediaQuery,
//   useTheme,
//   Avatar,
//   Divider,
//   Chip,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Paper,
//   Alert,
//   TextField
// } from '@mui/material';
// import {
//   People,
//   Notifications,
//   Lock,
//   Public,
//   Email,
//   Chat,
//   ThumbUp,
//   Comment,
//   Work,
//   School,
//   LocationOn,
//   Build,
//   Share,
//   Group,
//   GroupAdd,
//   VerifiedUser,
//   Crop,
//   CloudUpload
// } from '@mui/icons-material';

// const FeatureShowcase = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const navigate = useNavigate();
//   const [demoCreds, setDemoCreds] = React.useState(null);

//   const features = [
//     {
//       icon: <People fontSize="large" />,
//       title: "Professional Networking",
//       description: "Connect with professionals, expand your network, and discover opportunities.",
//       tech: ["MERN", "Redux"]
//     },
//     {
//       icon: <Notifications fontSize="large" />,
//       title: "Real-time Notifications",
//       description: "Instant updates for connections, messages, and interactions using Socket.io.",
//       tech: ["Socket.io", "Redux"]
//     },
//     {
//       icon: <Lock fontSize="large" />,
//       title: "Secure Authentication",
//       description: "JWT authentication with email OTP verification during signup.",
//       tech: ["JWT", "NodeMailer"]
//     },
//     {
//       icon: <Chat fontSize="large" />,
//       title: "Real-time Chat",
//       description: "Instant messaging with your connections with Socket.io integration.",
//       tech: ["Socket.io", "MongoDB"]
//     },
//     {
//       icon: <Public fontSize="large" />,
//       title: "Content Sharing",
//       description: "Post with privacy levels: Public, Connections, or Connections of connections.",
//       tech: ["React", "Redux"]
//     },
//     {
//       icon: <Crop fontSize="large" />,
//       title: "Image Cropping",
//       description: "Profile picture cropping tool for perfect images every time.",
//       tech: ["Cropper.js", "Cloudinary"]
//     },
//     {
//       icon: <CloudUpload fontSize="large" />,
//       title: "Media Uploads",
//       description: "Upload and share images with Cloudinary integration.",
//       tech: ["Cloudinary", "React"]
//     },
//     {
//       icon: <Group fontSize="large" />,
//       title: "Connection Management",
//       description: "Send/accept connection requests with real-time updates.",
//       tech: ["Socket.io", "MongoDB"]
//     },
//     {
//       icon: <ThumbUp fontSize="large" />,
//       title: "Post Interactions",
//       description: "Like, comment, and share posts with pagination support.",
//       tech: ["React", "Redux"]
//     },
//     {
//       icon: <Work fontSize="large" />,
//       title: "Professional Profile",
//       description: "Showcase experience, education, skills, and projects.",
//       tech: ["MongoDB", "React"]
//     },
//     {
//       icon: <VerifiedUser fontSize="large" />,
//       title: "Email Verification",
//       description: "Secure OTP-based email verification for new accounts.",
//       tech: ["NodeMailer", "JWT"]
//     },
//     {
//       icon: <Share fontSize="large" />,
//       title: "Extended Network Visibility",
//       description: "See posts from your connections and their connections.",
//       tech: ["MongoDB", "Redux"]
//     }
//   ];

//   const demoAccounts = [
//     {
//       email: "Vikas.college001@gmail.com",
//       password: "Test@123"
//     },
//     {
//       email: "shivsrivas123456@gmail.com",
//       password: "Test@123"
//     }
//   ];

//   const handleNavigate = () => {
//     navigate('/'); // Change this to your main app route
//   };

//   const setDemoCredentials = (account) => {
//     setDemoCreds(account);
//   };

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Paper elevation={3} sx={{ p: 4, mb: 4, textAlign: 'center', backgroundColor: theme.palette.primary.main, color: 'white' }}>
//         <Typography variant="h3" component="h1" gutterBottom>
//           Connect Professional Network
//         </Typography>
//         <Typography variant="h5" component="h2" gutterBottom>
//           Connect with Advanced Features
//         </Typography>
//         <Button 
//           variant="contained" 
//           color="secondary" 
//           size="large" 
//           onClick={handleNavigate}
//           sx={{ mt: 2, fontWeight: 'bold' }}
//         >
//           Go to Main Application
//         </Button>
//       </Paper>

//       <Grid container spacing={4}>
//         <Grid item xs={12} md={6}>
//           <Card elevation={3} sx={{ height: '100%' }}>
//             <CardContent>
//               <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
//                 <Build sx={{ mr: 1 }} /> Technology Stack
//               </Typography>
//               <Divider sx={{ my: 2 }} />
//               <Grid container spacing={2}>
//                 {['MongoDB', 'Express', 'React', 'Node.js', 'Redux', 'JWT', 'Socket.io', 'Cloudinary', 'Cropper.js', 'NodeMailer'].map((tech) => (
//                   <Grid item key={tech}>
//                     <Chip label={tech} color="primary" variant="outlined" />
//                   </Grid>
//                 ))}
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Card elevation={3}>
//             <CardContent>
//               <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
//                 <Email sx={{ mr: 1 }} /> Demo Accounts
//               </Typography>
//               <Divider sx={{ my: 2 }} />
//               <Typography variant="body1" paragraph>
//                 Try these pre-configured accounts to explore the app:
//               </Typography>
//               <List>
//                 {demoAccounts.map((account, index) => (
//                   <ListItem 
//                     key={index} 
//                     button 
//                     onClick={() => setDemoCredentials(account)}
//                     sx={{ 
//                       backgroundColor: demoCreds?.email === account.email ? theme.palette.action.selected : 'inherit',
//                       borderRadius: 1
//                     }}
//                   >
//                     <ListItemIcon>
//                       <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
//                         {index + 1}
//                       </Avatar>
//                     </ListItemIcon>
//                     <ListItemText
//                       primary={account.email}
//                       secondary={`Password: ${account.password}`}
//                     />
//                   </ListItem>
//                 ))}
//               </List>
//               {demoCreds && (
//                 <Alert severity="info" sx={{ mt: 2 }}>
//                   Ready to login as <strong>{demoCreds.email}</strong>. Click the button above to go to the app.
//                 </Alert>
//               )}
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       <Typography variant="h4" component="h2" sx={{ mt: 6, mb: 4, textAlign: 'center' }}>
//         Key Features
//       </Typography>

//       <Grid container spacing={4}>
//         {features.map((feature, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//               <CardContent sx={{ flexGrow: 1 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                   <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
//                     {feature.icon}
//                   </Avatar>
//                   <Typography variant="h6" component="h3">
//                     {feature.title}
//                   </Typography>
//                 </Box>
//                 <Typography variant="body1" paragraph>
//                   {feature.description}
//                 </Typography>
//                 <Box sx={{ mt: 'auto' }}>
//                   {feature.tech.map((tech) => (
//                     <Chip 
//                       key={tech} 
//                       label={tech} 
//                       size="small" 
//                       sx={{ mr: 1, mb: 1 }} 
//                       color="secondary"
//                     />
//                   ))}
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       <Box sx={{ mt: 6, textAlign: 'center' }}>
//         <Button 
//           variant="contained" 
//           size="large" 
//           onClick={handleNavigate}
//           sx={{ px: 6, py: 2, fontSize: '1.1rem' }}
//         >
//           Launch MyConnect
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default FeatureShowcase;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   Box, Button, Card, CardContent, Container, Grid, Typography, 
//   useMediaQuery, useTheme, Avatar, Divider, Chip, List, 
//   ListItem, ListItemIcon, ListItemText, Paper, Alert, TextField 
// } from '@mui/material';
// import { 
//   People, Notifications, Lock, Public, Email, Chat, 
//   ThumbUp, Comment, Work, School, LocationOn, Build, 
//   Share, Group, GroupAdd, VerifiedUser, Crop, CloudUpload 
// } from '@mui/icons-material';
// import { motion } from 'framer-motion';
// import vikasImage from '../../assets/vikas.png'; // Add your image
// import adarshImage from '../../assets/adarsh.jpeg'; // Add your image

// // Animation variants
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//       delayChildren: 0.3
//     }
//   }
// };

// const itemVariants = {
//   hidden: { y: 20, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       duration: 0.5,
//       ease: "easeOut"
//     }
//   }
// };

// const FeatureShowcase = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const navigate = useNavigate();
//   const [demoCreds, setDemoCreds] = React.useState(null);
//   const [hoveredFeature, setHoveredFeature] = React.useState(null);

//   const features = [
//     {
//       icon: <People fontSize="large" />,
//       title: "Professional Networking",
//       description: "Connect with professionals, expand your network, and discover opportunities.",
//       tech: ["MERN", "Redux"]
//     },
//     {
//       icon: <Notifications fontSize="large" />,
//       title: "Real-time Notifications",
//       description: "Instant updates for connections, messages, and interactions using Socket.io.",
//       tech: ["Socket.io", "Redux"]
//     },
//     {
//       icon: <Lock fontSize="large" />,
//       title: "Secure Authentication",
//       description: "JWT authentication with email OTP verification during signup.",
//       tech: ["JWT", "NodeMailer"]
//     },
//     {
//       icon: <Chat fontSize="large" />,
//       title: "Real-time Chat",
//       description: "Instant messaging with your connections with Socket.io integration.",
//       tech: ["Socket.io", "MongoDB"]
//     },
//     {
//       icon: <Public fontSize="large" />,
//       title: "Content Sharing",
//       description: "Post with privacy levels: Public, Connections, or Connections of connections.",
//       tech: ["React", "Redux"]
//     },
//     {
//       icon: <Crop fontSize="large" />,
//       title: "Image Cropping",
//       description: "Profile picture cropping tool for perfect images every time.",
//       tech: ["Cropper.js", "Cloudinary"]
//     },
//     {
//       icon: <CloudUpload fontSize="large" />,
//       title: "Media Uploads",
//       description: "Upload and share images with Cloudinary integration.",
//       tech: ["Cloudinary", "React"]
//     },
//     {
//       icon: <Group fontSize="large" />,
//       title: "Connection Management",
//       description: "Send/accept connection requests with real-time updates.",
//       tech: ["Socket.io", "MongoDB"]
//     },
//     {
//       icon: <ThumbUp fontSize="large" />,
//       title: "Post Interactions",
//       description: "Like, comment, and share posts with pagination support.",
//       tech: ["React", "Redux"]
//     },
//     {
//       icon: <Work fontSize="large" />,
//       title: "Professional Profile",
//       description: "Showcase experience, education, skills, and projects.",
//       tech: ["MongoDB", "React"]
//     },
//     {
//       icon: <VerifiedUser fontSize="large" />,
//       title: "Email Verification",
//       description: "Secure OTP-based email verification for new accounts.",
//       tech: ["NodeMailer", "JWT"]
//     },
//     {
//       icon: <Share fontSize="large" />,
//       title: "Extended Network Visibility",
//       description: "See posts from your connections and their connections.",
//       tech: ["MongoDB", "Redux"]
//     }
//   ];

//   const demoAccounts = [
//     {
//       email: "Vikas.college001@gmail.com",
//       password: "Test@123"
//     },
//     {
//       email: "shivsrivas123456@gmail.com",
//       password: "Test@123"
//     }
//   ];

//   const creators = [
//     {
//       name: "Vikas Gupta",
//       role: "Full Stack Developer",
//       education: "B.Tech in Computer Science",
//       bio: "Passionate about building scalable web applications with modern technologies.",
//       image: vikasImage,
//       link: "/profile/vikas"
//     },
//     {
//       name: "Adarsh Srivastava",
//       role: "Backend Specialist",
//       education: "B.Tech in Information Technology",
//       bio: "Expert in Node.js, MongoDB, and building robust backend systems.",
//       image: adarshImage,
//       link: "/profile/adarsh"
//     }
//   ];

//   const handleNavigate = () => {
//     navigate('/');
//   };

//   const setDemoCredentials = (account) => {
//     setDemoCreds(account);
//   };

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       {/* Hero Section */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         <Paper elevation={3} sx={{ 
//           p: 4, 
//           mb: 4, 
//           textAlign: 'center', 
//           background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
//           color: 'white',
//           borderRadius: 4
//         }}>
//           <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
//             Connect Professional Network
//           </Typography>
//           <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4 }}>
//             Where Professionals Meet, Collaborate, and Grow
//           </Typography>
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Button 
//               variant="contained" 
//               color="secondary" 
//               size="large" 
//               onClick={handleNavigate}
//               sx={{ 
//                 mt: 2, 
//                 fontWeight: 'bold',
//                 px: 6,
//                 py: 1.5,
//                 fontSize: '1.1rem',
//                 borderRadius: 2
//               }}
//             >
//               Launch Application
//             </Button>
//           </motion.div>
//         </Paper>
//       </motion.div>

//       {/* Tech Stack and Demo Accounts */}
//       <Grid container spacing={4} sx={{ mb: 6 }}>
//         <Grid item xs={12} md={6}>
//           <motion.div variants={itemVariants}>
//             <Card elevation={3} sx={{ 
//               height: '100%',
//               borderRadius: 3,
//               transition: 'transform 0.3s',
//               '&:hover': {
//                 transform: 'translateY(-5px)'
//               }
//             }}>
//               <CardContent>
//                 <Typography variant="h4" component="h2" gutterBottom sx={{ 
//                   display: 'flex', 
//                   alignItems: 'center',
//                   fontWeight: 600
//                 }}>
//                   <Build sx={{ mr: 1.5 }} /> Technology Stack
//                 </Typography>
//                 <Divider sx={{ my: 3 }} />
//                 <Grid container spacing={2}>
//                   {['MongoDB', 'Express', 'React', 'Node.js', 'Redux', 'JWT', 'Socket.io', 'Cloudinary', 'Cropper.js', 'NodeMailer'].map((tech) => (
//                     <Grid item key={tech}>
//                       <motion.div whileHover={{ scale: 1.1 }}>
//                         <Chip 
//                           label={tech} 
//                           color="primary" 
//                           variant="outlined" 
//                           sx={{ 
//                             fontWeight: 500,
//                             px: 1.5,
//                             py: 1.5
//                           }} 
//                         />
//                       </motion.div>
//                     </Grid>
//                   ))}
//                 </Grid>
//               </CardContent>
//             </Card>
//           </motion.div>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <motion.div variants={itemVariants}>
//             <Card elevation={3} sx={{ 
//               borderRadius: 3,
//               transition: 'transform 0.3s',
//               '&:hover': {
//                 transform: 'translateY(-5px)'
//               }
//             }}>
//               <CardContent>
//                 <Typography variant="h4" component="h2" gutterBottom sx={{ 
//                   display: 'flex', 
//                   alignItems: 'center',
//                   fontWeight: 600
//                 }}>
//                   <Email sx={{ mr: 1.5 }} /> Demo Accounts
//                 </Typography>
//                 <Divider sx={{ my: 3 }} />
//                 <Typography variant="body1" paragraph sx={{ mb: 3 }}>
//                   Try these pre-configured accounts to explore all features:
//                 </Typography>
//                 <List>
//                   {demoAccounts.map((account, index) => (
//                     <motion.div
//                       key={index}
//                       whileHover={{ x: 5 }}
//                     >
//                       <ListItem 
//                         button 
//                         onClick={() => setDemoCredentials(account)}
//                         sx={{ 
//                           backgroundColor: demoCreds?.email === account.email ? 
//                             theme.palette.action.selected : 'inherit',
//                           borderRadius: 2,
//                           mb: 1,
//                           transition: 'all 0.2s'
//                         }}
//                       >
//                         <ListItemIcon>
//                           <Avatar sx={{ 
//                             bgcolor: theme.palette.primary.main,
//                             color: 'white'
//                           }}>
//                             {index + 1}
//                           </Avatar>
//                         </ListItemIcon>
//                         <ListItemText
//                           primary={<Typography fontWeight={500}>{account.email}</Typography>}
//                           secondary={`Password: ${account.password}`}
//                         />
//                       </ListItem>
//                     </motion.div>
//                   ))}
//                 </List>
//                 {demoCreds && (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                   >
//                     <Alert severity="info" sx={{ 
//                       mt: 2,
//                       borderRadius: 2
//                     }}>
//                       Ready to login as <strong>{demoCreds.email}</strong>. Click the button above to go to the app.
//                     </Alert>
//                   </motion.div>
//                 )}
//               </CardContent>
//             </Card>
//           </motion.div>
//         </Grid>
//       </Grid>

//       {/* Features Section */}
//       <Typography variant="h3" component="h2" sx={{ 
//         mt: 6, 
//         mb: 6, 
//         textAlign: 'center',
//         fontWeight: 700
//       }}>
//         Key Features
//       </Typography>

//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <Grid container spacing={4} sx={{ mb: 8 }}>
//           {features.map((feature, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <motion.div
//                 variants={itemVariants}
//                 whileHover={{ scale: 1.03 }}
//                 onHoverStart={() => setHoveredFeature(index)}
//                 onHoverEnd={() => setHoveredFeature(null)}
//               >
//                 <Card elevation={hoveredFeature === index ? 6 : 2} sx={{ 
//                   height: '100%', 
//                   display: 'flex', 
//                   flexDirection: 'column',
//                   borderRadius: 3,
//                   transition: 'all 0.3s',
//                   border: hoveredFeature === index ? `2px solid ${theme.palette.primary.main}` : 'none'
//                 }}>
//                   <CardContent sx={{ 
//                     flexGrow: 1,
//                     p: 3
//                   }}>
//                     <Box sx={{ 
//                       display: 'flex', 
//                       alignItems: 'center', 
//                       mb: 3
//                     }}>
//                       <Avatar sx={{ 
//                         bgcolor: theme.palette.primary.main, 
//                         mr: 2,
//                         width: 56,
//                         height: 56
//                       }}>
//                         {feature.icon}
//                       </Avatar>
//                       <Typography variant="h5" component="h3" sx={{ fontWeight: 600 }}>
//                         {feature.title}
//                       </Typography>
//                     </Box>
//                     <Typography variant="body1" paragraph sx={{ mb: 2 }}>
//                       {feature.description}
//                     </Typography>
//                     <Box sx={{ mt: 'auto' }}>
//                       {feature.tech.map((tech) => (
//                         <motion.div
//                           key={tech}
//                           whileHover={{ scale: 1.1 }}
//                           style={{ display: 'inline-block' }}
//                         >
//                           <Chip 
//                             label={tech} 
//                             size="small" 
//                             sx={{ 
//                               mr: 1, 
//                               mb: 1,
//                               fontWeight: 500
//                             }} 
//                             color="secondary"
//                           />
//                         </motion.div>
//                       ))}
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             </Grid>
//           ))}
//         </Grid>
//       </motion.div>

//       {/* Creators Section */}
//       <Typography variant="h3" component="h2" sx={{ 
//         mt: 8, 
//         mb: 6, 
//         textAlign: 'center',
//         fontWeight: 700
//       }}>
//         Meet The Creators
//       </Typography>

//       <Grid container spacing={4} justifyContent="center" sx={{ mb: 8 }}>
//         {creators.map((creator, index) => (
//           <Grid item xs={12} md={6} key={index}>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.2 }}
//               whileHover={{ scale: 1.02 }}
//             >
//               <Card elevation={4} sx={{ 
//                 borderRadius: 3,
//                 height: '100%',
//                 p: 3,
//                 background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[100]} 100%)`
//               }}>
//                 <Box sx={{ 
//                   display: 'flex', 
//                   flexDirection: isMobile ? 'column' : 'row',
//                   alignItems: 'center',
//                   mb: 3
//                 }}>
//                   <Avatar
//                     src={creator.image}
//                     sx={{ 
//                       width: 120, 
//                       height: 120,
//                       mr: isMobile ? 0 : 4,
//                       mb: isMobile ? 3 : 0,
//                       border: `3px solid ${theme.palette.primary.main}`
//                     }}
//                   />
//                   <Box>
//                     <Typography variant="h4" component="h3" sx={{ 
//                       fontWeight: 700,
//                       mb: 1
//                     }}>
//                       {creator.name}
//                     </Typography>
//                     <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
//                       {creator.role}
//                     </Typography>
//                     <Typography variant="body1" sx={{ 
//                       display: 'flex',
//                       alignItems: 'center',
//                       mb: 1
//                     }}>
//                       <School sx={{ mr: 1, color: theme.palette.text.secondary }} />
//                       {creator.education}
//                     </Typography>
//                   </Box>
//                 </Box>
//                 <Typography variant="body1" paragraph sx={{ mb: 3 }}>
//                   {creator.bio}
//                 </Typography>
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Button 
//                     variant="contained" 
//                     color="primary" 
//                     fullWidth
//                     onClick={() => navigate(creator.link)}
//                     sx={{ 
//                       borderRadius: 2,
//                       py: 1.5,
//                       fontWeight: 600
//                     }}
//                   >
//                     View Profile
//                   </Button>
//                 </motion.div>
//               </Card>
//             </motion.div>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Final CTA */}
//       <Box sx={{ 
//         mt: 6, 
//         mb: 8,
//         textAlign: 'center'
//       }}>
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5 }}
//         >
//           <Typography variant="h4" component="h2" sx={{ 
//             mb: 4,
//             fontWeight: 700
//           }}>
//             Ready to Join Our Professional Network?
//           </Typography>
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Button 
//               variant="contained" 
//               size="large" 
//               onClick={handleNavigate}
//               sx={{ 
//                 px: 8, 
//                 py: 2, 
//                 fontSize: '1.2rem',
//                 borderRadius: 2,
//                 fontWeight: 700
//               }}
//             >
//               Get Started Now
//             </Button>
//           </motion.div>
//         </motion.div>
//       </Box>
//     </Container>
//   );
// };

// export default FeatureShowcase;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   Box, Button, Card, CardContent, Container, Grid, Typography, 
//   useMediaQuery, useTheme, Avatar, Divider, Chip, List, 
//   ListItem, ListItemIcon, ListItemText, Paper, Alert, TextField,
//   Grow, Zoom, Fade, Slide, useScrollTrigger
// } from '@mui/material';
// import { 
//   People, Notifications, Lock, Public, Email, Chat, 
//   ThumbUp, Comment, Work, School, LocationOn, Build, 
//   Share, Group, GroupAdd, VerifiedUser, Crop, CloudUpload,
//   Rocket, ConnectWithoutContact, Handshake, TrendingUp
// } from '@mui/icons-material';
// import vikasImage from '../../assets/vikas.png';
// import adarshImage from '../../assets/adarsh.jpeg';

// const FeatureShowcase = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const navigate = useNavigate();
//   const [demoCreds, setDemoCreds] = useState(null);
//   const [hoveredFeature, setHoveredFeature] = useState(null);
//   const [checked, setChecked] = useState(false);

//   // Initialize all animations to show
//   React.useEffect(() => {
//     setChecked(true);
//   }, []);

//   const features = [
//     {
//       icon: <People fontSize="large" />,
//       title: "Professional Networking",
//       description: "Connect with professionals, expand your network, and discover opportunities.",
//       tech: ["MERN", "Redux"]
//     },
//     {
//       icon: <Notifications fontSize="large" />,
//       title: "Real-time Notifications",
//       description: "Instant updates for connections, messages, and interactions using Socket.io.",
//       tech: ["Socket.io", "Redux"]
//     },
//     {
//       icon: <Lock fontSize="large" />,
//       title: "Secure Authentication",
//       description: "JWT authentication with email OTP verification during signup.",
//       tech: ["JWT", "NodeMailer"]
//     },
//     {
//       icon: <Chat fontSize="large" />,
//       title: "Real-time Chat",
//       description: "Instant messaging with your connections with Socket.io integration.",
//       tech: ["Socket.io", "MongoDB"]
//     },
//     {
//       icon: <Public fontSize="large" />,
//       title: "Content Sharing",
//       description: "Post with privacy levels: Public, Connections, or Connections of connections.",
//       tech: ["React", "Redux"]
//     },
//     {
//       icon: <Crop fontSize="large" />,
//       title: "Image Cropping",
//       description: "Profile picture cropping tool for perfect images every time.",
//       tech: ["Cropper.js", "Cloudinary"]
//     },
//     {
//       icon: <CloudUpload fontSize="large" />,
//       title: "Media Uploads",
//       description: "Upload and share images with Cloudinary integration.",
//       tech: ["Cloudinary", "React"]
//     },
//     {
//       icon: <Group fontSize="large" />,
//       title: "Connection Management",
//       description: "Send/accept connection requests with real-time updates.",
//       tech: ["Socket.io", "MongoDB"]
//     },
//     {
//       icon: <ThumbUp fontSize="large" />,
//       title: "Post Interactions",
//       description: "Like, comment, and share posts with pagination support.",
//       tech: ["React", "Redux"]
//     },
//     {
//       icon: <Work fontSize="large" />,
//       title: "Professional Profile",
//       description: "Showcase experience, education, skills, and projects.",
//       tech: ["MongoDB", "React"]
//     },
//     {
//       icon: <VerifiedUser fontSize="large" />,
//       title: "Email Verification",
//       description: "Secure OTP-based email verification for new accounts.",
//       tech: ["NodeMailer", "JWT"]
//     },
//     {
//       icon: <Share fontSize="large" />,
//       title: "Extended Network Visibility",
//       description: "See posts from your connections and their connections.",
//       tech: ["MongoDB", "Redux"]
//     }
//   ];

//   const demoAccounts = [
//     {
//       email: "Vikas.college001@gmail.com",
//       password: "Test@123"
//     },
//     {
//       email: "shivsrivas123456@gmail.com",
//       password: "Test@123"
//     }
//   ];

//   const creators = [
//     {
//       name: "Vikas Gupta",
//       role: "Full Stack Developer",
//       education: "B.Tech",
//       bio: "EXPERT MERN SQL JAVASCRIPT C++ DSA ",
//       image: vikasImage,
//       link: "/"
//     },
//     {
//       name: "Adarsh Srivastava",
//       role: "Full Stack Developer",
//       education: "B.Tech ",
//       bio: "Expert in MERN SQL , and building robust backend systems.",
//       image: adarshImage,
//       link: "/" 
//     }
//   ];

//   const handleNavigate = () => {
//     navigate('/');
//   };

//   const setDemoCredentials = (account) => {
//     setDemoCreds(account);
//   };

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       {/* Hero Section */}
//       <Slide direction="down" in={checked} timeout={800}>
//         <Paper elevation={3} sx={{ 
//           p: 4, 
//           mb: 4, 
//           textAlign: 'center', 
//           background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
//           color: 'white',
//           borderRadius: 4,
//           position: 'relative',
//           overflow: 'hidden',
//           '&:before': {
//             content: '""',
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 70%)',
//             zIndex: 0
//           }
//         }}>
//           <Box position="relative" zIndex={1}>
//             <Typography variant="h2" component="h1" gutterBottom sx={{ 
//               fontWeight: 800,
//               fontSize: isMobile ? '2.5rem' : '3.5rem',
//               lineHeight: 1.2,
//               textShadow: '0 2px 4px rgba(0,0,0,0.2)'
//             }}>
//               Connect Professional Network
//             </Typography>
//             <Typography variant="h5" component="h2" gutterBottom sx={{ 
//               mb: 4,
//               fontWeight: 400,
//               opacity: 0.9
//             }}>
//               Where Professionals Meet, Collaborate, and Grow
//             </Typography>
//             <Button 
//               variant="contained" 
//               color="secondary" 
//               size="large" 
//               onClick={handleNavigate}
//               startIcon={<Rocket />}
//               sx={{ 
//                 mt: 2, 
//                 fontWeight: 'bold',
//                 px: 6,
//                 py: 1.5,
//                 fontSize: '1.1rem',
//                 borderRadius: 2,
//                 boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
//                 transition: 'all 0.3s',
//                 '&:hover': {
//                   transform: 'translateY(-2px)',
//                   boxShadow: '0 6px 16px rgba(0,0,0,0.3)'
//                 }
//               }}
//             >
//               Launch Application
//             </Button>
//           </Box>
//         </Paper>
//       </Slide>

//       {/* Tech Stack and Demo Accounts */}
//       <Grid container spacing={4} sx={{ mb: 6 }}>
//         <Grid item xs={12} md={6}>
//           <Grow in={checked} timeout={1000}>
//             <Card elevation={3} sx={{ 
//               height: '100%',
//               borderRadius: 3,
//               transition: 'all 0.3s ease',
//               '&:hover': {
//                 transform: 'translateY(-5px)',
//                 boxShadow: '0 10px 20px rgba(0,0,0,0.15)'
//               }
//             }}>
//               <CardContent>
//                 <Typography variant="h4" component="h2" gutterBottom sx={{ 
//                   display: 'flex', 
//                   alignItems: 'center',
//                   fontWeight: 700,
//                   color: theme.palette.primary.dark
//                 }}>
//                   <Build sx={{ mr: 1.5, fontSize: '2rem' }} /> Technology Stack
//                 </Typography>
//                 <Divider sx={{ 
//                   my: 3,
//                   background: `linear-gradient(to right, transparent, ${theme.palette.primary.main}, transparent)`,
//                   height: '2px'
//                 }} />
//                 <Grid container spacing={2}>
//                   {['MongoDB', 'Express', 'React', 'Node.js', 'Redux', 'JWT', 'Socket.io', 'Cloudinary', 'Cropper.js', 'NodeMailer'].map((tech) => (
//                     <Grid item key={tech}>
//                       <Chip 
//                         label={tech} 
//                         color="primary" 
//                         variant="outlined" 
//                         sx={{ 
//                           fontWeight: 600,
//                           px: 1.5,
//                           py: 1.5,
//                           transition: 'all 0.2s',
//                           '&:hover': {
//                             backgroundColor: theme.palette.primary.light,
//                             color: 'white',
//                             transform: 'scale(1.1)'
//                           }
//                         }} 
//                       />
//                     </Grid>
//                   ))}
//                 </Grid>
//               </CardContent>
//             </Card>
//           </Grow>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Grow in={checked} timeout={1000} style={{ transitionDelay: checked ? '200ms' : '0ms' }}>
//             <Card elevation={3} sx={{ 
//               borderRadius: 3,
//               transition: 'all 0.3s ease',
//               '&:hover': {
//                 transform: 'translateY(-5px)',
//                 boxShadow: '0 10px 20px rgba(0,0,0,0.15)'
//               }
//             }}>
//               <CardContent>
//                 <Typography variant="h4" component="h2" gutterBottom sx={{ 
//                   display: 'flex', 
//                   alignItems: 'center',
//                   fontWeight: 700,
//                   color: theme.palette.primary.dark
//                 }}>
//                   <Email sx={{ mr: 1.5, fontSize: '2rem' }} /> Demo Accounts
//                 </Typography>
//                 <Divider sx={{ 
//                   my: 3,
//                   background: `linear-gradient(to right, transparent, ${theme.palette.primary.main}, transparent)`,
//                   height: '2px'
//                 }} />
//                 <Typography variant="body1" paragraph sx={{ 
//                   mb: 3,
//                   fontSize: '1.1rem'
//                 }}>
//                   Try these pre-configured accounts to explore all features:
//                 </Typography>
//                 <List>
//                   {demoAccounts.map((account, index) => (
//                     <Grow in={checked} timeout={1000} key={index} style={{ transitionDelay: checked ? `${index * 100}ms` : '0ms' }}>
//                       <ListItem 
//                         button 
//                         onClick={() => setDemoCredentials(account)}
//                         sx={{ 
//                           backgroundColor: demoCreds?.email === account.email ? 
//                             theme.palette.action.selected : 'inherit',
//                           borderRadius: 2,
//                           mb: 1,
//                           transition: 'all 0.3s',
//                           '&:hover': {
//                             transform: 'translateX(5px)',
//                             backgroundColor: theme.palette.action.hover
//                           }
//                         }}
//                       >
//                         <ListItemIcon>
//                           <Avatar sx={{ 
//                             bgcolor: theme.palette.primary.main,
//                             color: 'white',
//                             fontWeight: 'bold'
//                           }}>
//                             {index + 1}
//                           </Avatar>
//                         </ListItemIcon>
//                         <ListItemText
//                           primary={<Typography fontWeight={600}>{account.email}</Typography>}
//                           secondary={<Typography variant="body2" color="text.secondary">Password: {account.password}</Typography>}
//                         />
//                       </ListItem>
//                     </Grow>
//                   ))}
//                 </List>
//                 {demoCreds && (
//                   <Fade in={demoCreds !== null}>
//                     <Alert severity="info" sx={{ 
//                       mt: 2,
//                       borderRadius: 2,
//                       borderLeft: `4px solid ${theme.palette.info.main}`
//                     }}>
//                       Ready to login as <strong>{demoCreds.email}</strong>. Click the button above to go to the app.
//                     </Alert>
//                   </Fade>
//                 )}
//               </CardContent>
//             </Card>
//           </Grow>
//         </Grid>
//       </Grid>

//       {/* Features Section */}
//       <Box sx={{ textAlign: 'center', mb: 8 }}>
//         <Zoom in={checked} timeout={800}>
//           <Box>
//             <Typography variant="h3" component="h2" sx={{ 
//               mb: 2,
//               fontWeight: 800,
//               color: theme.palette.primary.dark,
//               position: 'relative',
//               display: 'inline-block',
//               '&:after': {
//                 content: '""',
//                 position: 'absolute',
//                 bottom: -10,
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//                 width: '60%',
//                 height: '4px',
//                 background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                 borderRadius: '2px'
//               }
//             }}>
//               Key Features
//             </Typography>
//             <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
//               Discover the powerful features that make our professional network stand out
//             </Typography>
//           </Box>
//         </Zoom>
//       </Box>

//       <Grid container spacing={4} sx={{ mb: 8 }}>
//         {features.map((feature, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <Grow in={checked} timeout={1000} style={{ transitionDelay: checked ? `${index * 100}ms` : '0ms' }}>
//               <Card elevation={hoveredFeature === index ? 1: 2} sx={{ 
//                 height: '100%', 
//                 display: 'flex', 
//                 flexDirection: 'column',
//                 borderRadius: 3,
//                 transition: 'all 0.7s cubic-bezier(.25,.8,.25,1)',
//                 border: hoveredFeature === index ? `2px solid ${theme.palette.primary.main}` : 'none',
//                 '&:hover': {
//                   boxShadow: '0 14px 28px rgba(0,0,0,0.1)',
//                   transform: 'translateY(-5px)'
//                 }
//               }}
//                 onMouseEnter={() => setHoveredFeature(index)}
//                 onMouseLeave={() => setHoveredFeature(null)}
//               >
//                 <CardContent sx={{ 
//                   flexGrow: 1,
//                   p: 3,
//                   background: hoveredFeature === index ? 
//                     `linear-gradient(to bottom right, ${theme.palette.background.paper}, ${theme.palette.grey[50]})` : 
//                     theme.palette.background.paper
//                 }}>
//                   <Box sx={{ 
//                     display: 'flex', 
//                     alignItems: 'center', 
//                     mb: 3
//                   }}>
//                     <Avatar sx={{ 
//                       bgcolor: hoveredFeature === index ? theme.palette.primary.dark : theme.palette.primary.main, 
//                       mr: 2,
//                       width: 56,
//                       height: 56,
//                       transition: 'all 0.3s'
//                     }}>
//                       {React.cloneElement(feature.icon, {
//                         sx: { 
//                           color: 'white',
//                           fontSize: hoveredFeature === index ? '1.8rem' : '1.5rem',
//                           transition: 'all 0.3s'
//                         }
//                       })}
//                     </Avatar>
//                     <Typography variant="h5" component="h3" sx={{ 
//                       fontWeight: 600,
//                       color: hoveredFeature === index ? theme.palette.primary.dark : 'inherit'
//                     }}>
//                       {feature.title}
//                     </Typography>
//                   </Box>
//                   <Typography variant="body1" paragraph sx={{ 
//                     mb: 2,
//                     color: theme.palette.text.secondary
//                   }}>
//                     {feature.description}
//                   </Typography>
//                   <Box sx={{ mt: 'auto', pt: 2 }}>
//                     {feature.tech.map((tech) => (
//                       <Chip 
//                         key={tech} 
//                         label={tech} 
//                         size="small" 
//                         sx={{ 
//                           mr: 1, 
//                           mb: 1,
//                           fontWeight: 600,
//                           backgroundColor: theme.palette.secondary.light,
//                           color: theme.palette.secondary.contrastText,
//                           transition: 'all 0.2s',
//                           '&:hover': {
//                             backgroundColor: theme.palette.secondary.main,
//                             transform: 'scale(1.1)'
//                           }
//                         }} 
//                       />
//                     ))}
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grow>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Creators Section */}
//       <Box sx={{ textAlign: 'center', mb: 6 }}>
//         <Zoom in={checked} timeout={800}>
//           <Box>
//             <Typography variant="h3" component="h2" sx={{ 
//               mb: 2,
//               fontWeight: 800,
//               color: theme.palette.primary.dark,
//               position: 'relative',
//               display: 'inline-block',
//               '&:after': {
//                 content: '""',
//                 position: 'absolute',
//                 bottom: -10,
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//                 width: '60%',
//                 height: '4px',
//                 background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                 borderRadius: '2px'
//               }
//             }}>
//               Meet The Creators
//             </Typography>
//             <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
//               The talented developers behind this professional network
//             </Typography>
//           </Box>
//         </Zoom>
//       </Box>

//       <Grid container spacing={4} justifyContent="center" sx={{ mb: 8 }}>
//         {creators.map((creator, index) => (
//           <Grid item xs={12} md={6} key={index}>
//             <Slide direction="up" in={checked} timeout={800} style={{ transitionDelay: checked ? `${index * 200}ms` : '0ms' }}>
//               <Card elevation={4} sx={{ 
//                 borderRadius: 3,
//                 height: '100%',
//                 p: 3,
//                 background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
//                 position: 'relative',
//                 overflow: 'hidden',
//                 '&:hover': {
//                   transform: 'translateY(-5px)',
//                   boxShadow: '0 10px 20px rgba(0,0,0,0.15)'
//                 },
//                 transition: 'all 0.3s ease'
//               }}>
//                 <Box sx={{ 
//                   display: 'flex', 
//                   flexDirection: isMobile ? 'column' : 'row',
//                   alignItems: 'center',
//                   mb: 3,
//                   position: 'relative',
//                   zIndex: 1
//                 }}>
//                   <Avatar
//                     src={creator.image}
//                     sx={{ 
//                       width: 120, 
//                       height: 120,
//                       mr: isMobile ? 0 : 4,
//                       mb: isMobile ? 3 : 0,
//                       border: `3px solid ${theme.palette.primary.main}`,
//                       boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
//                     }}
//                   />
//                   <Box>
//                     <Typography variant="h4" component="h3" sx={{ 
//                       fontWeight: 700,
//                       mb: 1,
//                       color: theme.palette.primary.dark
//                     }}>
//                       {creator.name}
//                     </Typography>
//                     <Typography variant="h6" color="primary" sx={{ 
//                       mb: 1,
//                       fontWeight: 600
//                     }}>
//                       {creator.role}
//                     </Typography>
//                     <Typography variant="body1" sx={{ 
//                       display: 'flex',
//                       alignItems: 'center',
//                       mb: 1,
//                       color: theme.palette.text.secondary
//                     }}>
//                       <School sx={{ mr: 1, color: theme.palette.primary.main }} />
//                       {creator.education}
//                     </Typography>
//                   </Box>
//                 </Box>
//                 <Typography variant="body1" paragraph sx={{ 
//                   mb: 3,
//                   color: theme.palette.text.secondary,
//                   position: 'relative',
//                   zIndex: 1
//                 }}>
//                   {creator.bio}
//                 </Typography>
//                 <Button 
//                   variant="contained" 
//                   color="primary" 
//                   fullWidth
//                   onClick={() => navigate(creator.link)}
//                   startIcon={<ConnectWithoutContact />}
//                   sx={{ 
//                     borderRadius: 2,
//                     py: 1.5,
//                     fontWeight: 600,
//                     fontSize: '1rem',
//                     transition: 'all 0.3s',
//                     '&:hover': {
//                       transform: 'translateY(-2px)',
//                       boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
//                     }
//                   }}
//                 >
//                   View Profile
//                 </Button>
//               </Card>
//             </Slide>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Final CTA */}
//       <Box sx={{ 
//         mt: 6, 
//         mb: 8,
//         textAlign: 'center'
//       }}>
//         <Fade in={checked} timeout={1000}>
//           <Paper elevation={0} sx={{
//             p: 4,
//             borderRadius: 3,
//             background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
//             position: 'relative',
//             overflow: 'hidden',
//             '&:before': {
//               content: '""',
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               background: 'radial-gradient(circle at 70% 20%, rgba(255,255,255,0.3) 0%, transparent 70%)',
//               zIndex: 0
//             }
//           }}>
//             <Box position="relative" zIndex={1}>
//               <Typography variant="h4" component="h2" sx={{ 
//                 mb: 3,
//                 fontWeight: 700,
//                 color: theme.palette.getContrastText(theme.palette.primary.light)
//               }}>
//                 Ready to Join Our Professional Network?
//               </Typography>
//               <Typography variant="h6" sx={{ 
//                 mb: 4,
//                 color: theme.palette.getContrastText(theme.palette.primary.light),
//                 opacity: 0.9
//               }}>
//                 Connect with professionals, grow your network, and advance your career
//               </Typography>
//               <Button 
//                 variant="contained" 
//                 size="large" 
//                 onClick={handleNavigate}
//                 startIcon={<Handshake />}
//                 sx={{ 
//                   px: 8, 
//                   py: 2, 
//                   fontSize: '1.2rem',
//                   borderRadius: 2,
//                   fontWeight: 700,
//                   backgroundColor: theme.palette.secondary.main,
//                   color: theme.palette.secondary.contrastText,
//                   boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
//                   transition: 'all 0.3s',
//                   '&:hover': {
//                     backgroundColor: theme.palette.secondary.dark,
//                     transform: 'translateY(-2px)',
//                     boxShadow: '0 6px 16px rgba(0,0,0,0.3)'
//                   }
//                 }}
//               >
//                 Get Started Now
//               </Button>
//             </Box>
//           </Paper>
//         </Fade>
//       </Box>
//     </Container>
//   );
// };

// export default FeatureShowcase;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Button, Card, CardContent, Container, Grid, Typography, 
  useMediaQuery, useTheme, Avatar, Divider, Chip, List, 
  ListItem, ListItemIcon, ListItemText, Paper, Alert, TextField,
  Grow, Zoom, Fade, Slide, useScrollTrigger
} from '@mui/material';
import { 
  People, Notifications, Lock, Public, Email, Chat, 
  ThumbUp, Comment, Work, School, LocationOn, Build, 
  Share, Group, GroupAdd, VerifiedUser, Crop, CloudUpload,
  Rocket, ConnectWithoutContact, Handshake, TrendingUp
} from '@mui/icons-material';
import vikasImage from '../../assets/vikas.png';
import adarshImage from '../../assets/adarsh.jpeg';

const FeatureShowcase = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [demoCreds, setDemoCreds] = useState(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [checked, setChecked] = useState(false);

  // Initialize all animations to show
  React.useEffect(() => {
    setChecked(true);
  }, []);

  const features = [
    {
      icon: <People fontSize="large" />,
      title: "Professional Networking",
      description: "Connect with professionals, expand your network, and discover opportunities.",
      tech: ["MERN", "Redux"]
    },
    {
      icon: <Notifications fontSize="large" />,
      title: "Real-time Notifications",
      description: "Instant updates for connections, messages, and interactions using Socket.io.",
      tech: ["Socket.io", "Redux"]
    },
    {
      icon: <Lock fontSize="large" />,
      title: "Secure Authentication",
      description: "JWT authentication with email OTP verification during signup.",
      tech: ["JWT", "NodeMailer"]
    },
    {
      icon: <Chat fontSize="large" />,
      title: "Real-time Chat",
      description: "Instant messaging with your connections with Socket.io integration.",
      tech: ["Socket.io", "MongoDB"]
    },
    {
      icon: <Public fontSize="large" />,
      title: "Content Sharing",
      description: "Post with privacy levels: Public, Connections, or Connections of connections.",
      tech: ["React", "Redux"]
    },
    {
      icon: <Crop fontSize="large" />,
      title: "Image Cropping",
      description: "Profile picture cropping tool for perfect images every time.",
      tech: ["Cropper.js", "Cloudinary"]
    },
    {
      icon: <CloudUpload fontSize="large" />,
      title: "Media Uploads",
      description: "Upload and share images with Cloudinary integration.",
      tech: ["Cloudinary", "React"]
    },
    {
      icon: <Group fontSize="large" />,
      title: "Connection Management",
      description: "Send/accept connection requests with real-time updates.",
      tech: ["Socket.io", "MongoDB"]
    },
    {
      icon: <ThumbUp fontSize="large" />,
      title: "Post Interactions",
      description: "Like, comment, and share posts with pagination support.",
      tech: ["React", "Redux"]
    },
    {
      icon: <Work fontSize="large" />,
      title: "Professional Profile",
      description: "Showcase experience, education, skills, and projects.",
      tech: ["MongoDB", "React"]
    },
    {
      icon: <VerifiedUser fontSize="large" />,
      title: "Email Verification",
      description: "Secure OTP-based email verification for new accounts.",
      tech: ["NodeMailer", "JWT"]
    },
    {
      icon: <Share fontSize="large" />,
      title: "Extended Network Visibility",
      description: "See posts from your connections and their connections.",
      tech: ["MongoDB", "Redux"]
    }
  ];

  const demoAccounts = [
    {
      email: "Vikas.college001@gmail.com",
      password: "Test@123"
    },
    {
      email: "shivsrivas123456@gmail.com",
      password: "Test@123"
    }
  ];

  const creators = [
    {
      name: "Vikas Gupta",
      role: "Full Stack Developer",
      education: "B.Tech, MMMUT Gorakhpur",
      bio: "EXPERT- MERN SQL JAVASCRIPT C++ DSA ",
      image: vikasImage,
      linkedin: "https://www.linkedin.com/in/vikas-gupta-234512224/"
    },
    {
      name: "Adarsh Srivastava",
      role: "Full Stack Developer",
      education: "B.Tech, MMMUT Gorakhpur",
      bio: "EXPERT- MERN SQL JAVASCRIPT C++ DSA ",
      image: adarshImage,
      linkedin: "https://linkedin.com/in/adarsh912013"
    }
  ];

  const handleNavigate = () => {
    navigate('/');
  };

  const setDemoCredentials = (account) => {
    setDemoCreds(account);
  };

  const openLinkedIn = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Slide direction="down" in={checked} timeout={800}>
        <Paper elevation={3} sx={{ 
          p: 4, 
          mb: 4, 
          textAlign: 'center', 
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: 'white',
          borderRadius: 4,
          position: 'relative',
          overflow: 'hidden',
          transform: 'scale(1)',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.01)'
          },
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 70%)',
            zIndex: 0
          }
        }}>
          <Box position="relative" zIndex={1}>
            <Typography variant="h2" component="h1" gutterBottom sx={{ 
              fontWeight: 800,
              fontSize: isMobile ? '2.5rem' : '3.5rem',
              lineHeight: 1.2,
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>
              Connect Professional Network
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom sx={{ 
              mb: 4,
              fontWeight: 400,
              opacity: 0.9
            }}>
              Where Professionals Meet, Collaborate, and Grow
            </Typography>
            <Button 
              variant="contained" 
              color="secondary" 
              size="large" 
              onClick={handleNavigate}
              startIcon={<Rocket />}
              sx={{ 
                mt: 2, 
                fontWeight: 'bold',
                px: 6,
                py: 1.5,
                fontSize: '1.1rem',
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                transition: 'all 0.3s',
                transform: 'scale(1)',
                '&:hover': {
                  transform: 'scale(1.05) translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.3)'
                }
              }}
            >
              Launch Application
            </Button>
          </Box>
        </Paper>
      </Slide>

      {/* Tech Stack and Demo Accounts */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={6}>
          <Grow in={checked} timeout={1000} style={{ transformOrigin: '0 0 0' }}>
            <Card elevation={3} sx={{ 
              height: '100%',
              borderRadius: 3,
              transition: 'all 0.3s ease',
              transform: 'scale(1)',
              '&:hover': {
                transform: 'scale(1.02) translateY(-5px)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.15)'
              }
            }}>
              <CardContent>
                <Typography variant="h4" component="h2" gutterBottom sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  fontWeight: 700,
                  color: theme.palette.primary.dark
                }}>
                  <Build sx={{ mr: 1.5, fontSize: '2rem' }} /> Technology Stack
                </Typography>
                <Divider sx={{ 
                  my: 3,
                  background: `linear-gradient(to right, transparent, ${theme.palette.primary.main}, transparent)`,
                  height: '2px'
                }} />
                <Grid container spacing={2}>
                  {['MongoDB', 'Express', 'React', 'Node.js', 'Redux', 'JWT', 'Socket.io', 'Cloudinary', 'Cropper.js', 'NodeMailer'].map((tech) => (
                    <Grid item key={tech}>
                      <Chip 
                        label={tech} 
                        color="primary" 
                        variant="outlined" 
                        sx={{ 
                          fontWeight: 600,
                          px: 1.5,
                          py: 1.5,
                          transition: 'all 0.2s',
                          transform: 'scale(1)',
                          '&:hover': {
                            backgroundColor: theme.palette.primary.light,
                            color: 'white',
                            transform: 'scale(1.1)'
                          }
                        }} 
                      />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grow>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grow in={checked} timeout={1000} style={{ transformOrigin: '0 0 0', transitionDelay: checked ? '200ms' : '0ms' }}>
            <Card elevation={3} sx={{ 
              borderRadius: 3,
              transition: 'all 0.3s ease',
              transform: 'scale(1)',
              '&:hover': {
                transform: 'scale(1.02) translateY(-5px)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.15)'
              }
            }}>
              <CardContent>
                <Typography variant="h4" component="h2" gutterBottom sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  fontWeight: 700,
                  color: theme.palette.primary.dark
                }}>
                  <Email sx={{ mr: 1.5, fontSize: '2rem' }} /> Demo Accounts
                </Typography>
                <Divider sx={{ 
                  my: 3,
                  background: `linear-gradient(to right, transparent, ${theme.palette.primary.main}, transparent)`,
                  height: '2px'
                }} />
                <Typography variant="body1" paragraph sx={{ 
                  mb: 3,
                  fontSize: '1.1rem'
                }}>
                  Try these pre-configured accounts to explore all features:
                </Typography>
                <List>
                  {demoAccounts.map((account, index) => (
                    <Grow in={checked} timeout={1000} key={index} style={{ transitionDelay: checked ? `${index * 100}ms` : '0ms' }}>
                      <ListItem 
                        button 
                        onClick={() => setDemoCredentials(account)}
                        sx={{ 
                          backgroundColor: demoCreds?.email === account.email ? 
                            theme.palette.action.selected : 'inherit',
                          borderRadius: 2,
                          mb: 1,
                          transition: 'all 0.3s',
                          transform: 'scale(1)',
                          '&:hover': {
                            transform: 'scale(1.01) translateX(5px)',
                            backgroundColor: theme.palette.action.hover
                          }
                        }}
                      >
                        <ListItemIcon>
                          <Avatar sx={{ 
                            bgcolor: theme.palette.primary.main,
                            color: 'white',
                            fontWeight: 'bold'
                          }}>
                            {index + 1}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={<Typography fontWeight={600}>{account.email}</Typography>}
                          secondary={<Typography variant="body2" color="text.secondary">Password: {account.password}</Typography>}
                        />
                      </ListItem>
                    </Grow>
                  ))}
                </List>
                {demoCreds && (
                  <Fade in={demoCreds !== null}>
                    <Alert severity="info" sx={{ 
                      mt: 2,
                      borderRadius: 2,
                      borderLeft: `4px solid ${theme.palette.info.main}`
                    }}>
                      Ready to login as <strong>{demoCreds.email}</strong>. Click the button above to go to the app.
                    </Alert>
                  </Fade>
                )}
              </CardContent>
            </Card>
          </Grow>
        </Grid>
      </Grid>

      {/* Features Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Zoom in={checked} timeout={800} style={{ transformOrigin: 'center center' }}>
          <Box>
            <Typography variant="h3" component="h2" sx={{ 
              mb: 2,
              fontWeight: 800,
              color: theme.palette.primary.dark,
              position: 'relative',
              display: 'inline-block',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60%',
                height: '4px',
                background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                borderRadius: '2px'
              }
            }}>
              Key Features
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              Discover the powerful features that make our professional network stand out
            </Typography>
          </Box>
        </Zoom>
      </Box>

      {/* <Grid container spacing={4} sx={{ mb: 8 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Grow 
              in={checked} 
              timeout={1000} 
              style={{ 
                transformOrigin: 'center bottom',
                transitionDelay: checked ? `${index * 100}ms` : '0ms' 
              }}
            >
              <Card elevation={hoveredFeature === index ? 6 : 2} sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                borderRadius: 3,
                transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
                transform: 'scale(1)',
                border: hoveredFeature === index ? `2px solid ${theme.palette.primary.main}` : 'none',
                '&:hover': {
                  boxShadow: '0 14px 28px rgba(0,0,0,0.1)',
                  transform: 'scale(1.03) translateY(-5px)'
                }
              }}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <CardContent sx={{ 
                  flexGrow: 1,
                  p: 3,
                  background: hoveredFeature === index ? 
                    `linear-gradient(to bottom right, ${theme.palette.background.paper}, ${theme.palette.grey[50]})` : 
                    theme.palette.background.paper
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 3
                  }}>
                    <Avatar sx={{ 
                      bgcolor: hoveredFeature === index ? theme.palette.primary.dark : theme.palette.primary.main, 
                      mr: 2,
                      width: 56,
                      height: 56,
                      transition: 'all 0.3s',
                      transform: hoveredFeature === index ? 'scale(1.1)' : 'scale(1)'
                    }}>
                      {React.cloneElement(feature.icon, {
                        sx: { 
                          color: 'white',
                          fontSize: hoveredFeature === index ? '1.8rem' : '1.5rem',
                          transition: 'all 0.3s'
                        }
                      })}
                    </Avatar>
                    <Typography variant="h5" component="h3" sx={{ 
                      fontWeight: 600,
                      color: hoveredFeature === index ? theme.palette.primary.dark : 'inherit',
                      transition: 'all 0.3s'
                    }}>
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1" paragraph sx={{ 
                    mb: 2,
                    color: theme.palette.text.secondary
                  }}>
                    {feature.description}
                  </Typography>
                  <Box sx={{ mt: 'auto', pt: 2 }}>
                    {feature.tech.map((tech) => (
                      <Chip 
                        key={tech} 
                        label={tech} 
                        size="small" 
                        sx={{ 
                          mr: 1, 
                          mb: 1,
                          fontWeight: 600,
                          backgroundColor: theme.palette.secondary.light,
                          color: theme.palette.secondary.contrastText,
                          transition: 'all 0.2s',
                          transform: 'scale(1)',
                          '&:hover': {
                            backgroundColor: theme.palette.secondary.main,
                            transform: 'scale(1.1)'
                          }
                        }} 
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grow>
          </Grid>
        ))}
      </Grid> */}

<Grid container spacing={4} sx={{ mb: 8 }}>
  {features.map((feature, index) => (
    <Grid item xs={12} sm={6} md={4} key={index}>
      <Grow 
        in={checked} 
        timeout={{
          enter: 1000,
          exit: 500,
        }}
        style={{
          transformOrigin: 'center bottom',
          transitionDelay: checked ? `${index * 100}ms` : '0ms'
        }}
      >
        <Card 
          elevation={hoveredFeature === index ? 8 : 2}
          onMouseEnter={() => setHoveredFeature(index)}
          onMouseLeave={() => setHoveredFeature(null)}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 3,
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease, border 0.3s ease',
            transform: hoveredFeature === index ? 'scale(1.03) translateY(-5px)' : 'scale(1)',
            border: hoveredFeature === index ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
            backgroundColor: theme.palette.background.paper,
            '&:hover': {
              boxShadow: '0 16px 30px rgba(0,0,0,0.15)'
            }
          }}
        >
          <CardContent 
            sx={{ 
              flexGrow: 1,
              p: 3,
              transition: 'background 0.4s ease',
              background: hoveredFeature === index 
                ? `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.grey[50]})`
                : theme.palette.background.paper
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar 
                sx={{ 
                  bgcolor: hoveredFeature === index ? theme.palette.primary.dark : theme.palette.primary.main, 
                  mr: 2,
                  width: 56,
                  height: 56,
                  transition: 'transform 0.3s ease, background-color 0.3s ease',
                  transform: hoveredFeature === index ? 'scale(1.15)' : 'scale(1)'
                }}
              >
                {React.cloneElement(feature.icon, {
                  sx: { 
                    color: 'white',
                    fontSize: hoveredFeature === index ? '1.8rem' : '1.5rem',
                    transition: 'font-size 0.3s ease'
                  }
                })}
              </Avatar>
              <Typography 
                variant="h5" 
                component="h3" 
                sx={{ 
                  fontWeight: 600,
                  color: hoveredFeature === index ? theme.palette.primary.dark : 'inherit',
                  transition: 'color 0.3s ease'
                }}
              >
                {feature.title}
              </Typography>
            </Box>

            <Typography 
              variant="body1" 
              paragraph 
              sx={{ 
                mb: 2,
                color: theme.palette.text.secondary,
                transition: 'color 0.3s ease'
              }}
            >
              {feature.description}
            </Typography>

            <Box sx={{ mt: 'auto', pt: 2 }}>
              {feature.tech.map((tech) => (
                <Chip 
                  key={tech} 
                  label={tech} 
                  size="small" 
                  sx={{ 
                    mr: 1, 
                    mb: 1,
                    fontWeight: 600,
                    backgroundColor: theme.palette.secondary.light,
                    color: theme.palette.secondary.contrastText,
                    transition: 'transform 0.2s ease, background-color 0.3s ease',
                    transform: 'scale(1)',
                    '&:hover': {
                      backgroundColor: theme.palette.secondary.main,
                      transform: 'scale(1.1)'
                    }
                  }} 
                />
              ))}
            </Box>

          </CardContent>
        </Card>
      </Grow>
    </Grid>
  ))}
</Grid>


      

      {/* Creators Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Zoom in={checked} timeout={800} style={{ transformOrigin: 'center center' }}>
          <Box>
            <Typography variant="h3" component="h2" sx={{ 
              mb: 2,
              fontWeight: 800,
              color: theme.palette.primary.dark,
              position: 'relative',
              display: 'inline-block',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60%',
                height: '4px',
                background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                borderRadius: '2px'
              }
            }}>
              Meet The Creators
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              The talented developers behind this professional network
            </Typography>
          </Box>
        </Zoom>
      </Box>

      <Grid container spacing={4} justifyContent="center" sx={{ mb: 8 }}>
        {creators.map((creator, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Slide 
              direction="up" 
              in={checked} 
              timeout={800} 
              style={{ 
                transitionDelay: checked ? `${index * 200}ms` : '0ms',
                transformOrigin: 'center bottom'
              }}
            >
              <Card elevation={4} sx={{ 
                borderRadius: 3,
                height: '100%',
                p: 3,
                background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
                position: 'relative',
                overflow: 'hidden',
                transform: 'scale(1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02) translateY(-5px)',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.15)'
                }
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: isMobile ? 'column' : 'row',
                  alignItems: 'center',
                  mb: 3,
                  position: 'relative',
                  zIndex: 1
                }}>
                  <Avatar
                    src={creator.image}
                    sx={{ 
                      width: 120, 
                      height: 120,
                      mr: isMobile ? 0 : 4,
                      mb: isMobile ? 3 : 0,
                      border: `3px solid ${theme.palette.primary.main}`,
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                      transition: 'all 0.3s',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                  <Box>
                    <Typography variant="h4" component="h3" sx={{ 
                      fontWeight: 700,
                      mb: 1,
                      color: theme.palette.primary.dark
                    }}>
                      {creator.name}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ 
                      mb: 1,
                      fontWeight: 600
                    }}>
                      {creator.role}
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      mb: 1,
                      color: theme.palette.text.secondary
                    }}>
                      <School sx={{ mr: 1, color: theme.palette.primary.main }} />
                      {creator.education}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1" paragraph sx={{ 
                  mb: 3,
                  color: theme.palette.text.secondary,
                  position: 'relative',
                  zIndex: 1
                }}>
                  {creator.bio}
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  onClick={() => openLinkedIn(creator.linkedin)}
                  // startIcon={<ConnectWithoutContact />}
                  sx={{ 
                    borderRadius: 2,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: '1rem',
                    transition: 'all 0.3s',
                    transform: 'scale(1)',
                    '&:hover': {
                      transform: 'scale(1.02) translateY(-2px)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  View Profile
                </Button>
              </Card>
            </Slide>
          </Grid>
        ))}
      </Grid>

      {/* Final CTA */}
      <Box sx={{ 
        mt: 6, 
        mb: 8,
        textAlign: 'center'
      }}>
        <Fade in={checked} timeout={1000}>
          <Paper elevation={0} sx={{
            p: 4,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
            position: 'relative',
            overflow: 'hidden',
            transform: 'scale(1)',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.01)'
            },
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 70% 20%, rgba(255,255,255,0.3) 0%, transparent 70%)',
              zIndex: 0
            }
          }}>
            <Box position="relative" zIndex={1}>
              <Typography variant="h4" component="h2" sx={{ 
                mb: 3,
                fontWeight: 700,
                color: theme.palette.getContrastText(theme.palette.primary.light)
              }}>
                Ready to Join Our Professional Network?
              </Typography>
              <Typography variant="h6" sx={{ 
                mb: 4,
                color: theme.palette.getContrastText(theme.palette.primary.light),
                opacity: 0.9
              }}>
                Connect with professionals, grow your network, and advance your career
              </Typography>
              <Button 
                variant="contained" 
                size="large" 
                onClick={handleNavigate}
                startIcon={<Handshake />}
                sx={{ 
                  px: 8, 
                  py: 2, 
                  fontSize: '1.2rem',
                  borderRadius: 2,
                  fontWeight: 700,
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s',
                  transform: 'scale(1)',
                  '&:hover': {
                    backgroundColor: theme.palette.secondary.dark,
                    transform: 'scale(1.05) translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.3)'
                  }
                }}
              >
                Get Started Now
              </Button>
            </Box>
          </Paper>
        </Fade>
      </Box>
    </Container>
  );
};

export default FeatureShowcase;