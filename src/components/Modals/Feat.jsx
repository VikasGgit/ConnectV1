import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  Avatar,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Alert,
  TextField
} from '@mui/material';
import {
  People,
  Notifications,
  Lock,
  Public,
  Email,
  Chat,
  ThumbUp,
  Comment,
  Work,
  School,
  LocationOn,
  Build,
  Share,
  Group,
  GroupAdd,
  VerifiedUser,
  Crop,
  CloudUpload
} from '@mui/icons-material';

const FeatureShowcase = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [demoCreds, setDemoCreds] = React.useState(null);

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

  const handleNavigate = () => {
    navigate('/'); // Change this to your main app route
  };

  const setDemoCredentials = (account) => {
    setDemoCreds(account);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4, textAlign: 'center', backgroundColor: theme.palette.primary.main, color: 'white' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Connect Professional Network
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Connect with Advanced Features
        </Typography>
        <Button 
          variant="contained" 
          color="secondary" 
          size="large" 
          onClick={handleNavigate}
          sx={{ mt: 2, fontWeight: 'bold' }}
        >
          Go to Main Application
        </Button>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Build sx={{ mr: 1 }} /> Technology Stack
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                {['MongoDB', 'Express', 'React', 'Node.js', 'Redux', 'JWT', 'Socket.io', 'Cloudinary', 'Cropper.js', 'NodeMailer'].map((tech) => (
                  <Grid item key={tech}>
                    <Chip label={tech} color="primary" variant="outlined" />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Email sx={{ mr: 1 }} /> Demo Accounts
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1" paragraph>
                Try these pre-configured accounts to explore the app:
              </Typography>
              <List>
                {demoAccounts.map((account, index) => (
                  <ListItem 
                    key={index} 
                    button 
                    onClick={() => setDemoCredentials(account)}
                    sx={{ 
                      backgroundColor: demoCreds?.email === account.email ? theme.palette.action.selected : 'inherit',
                      borderRadius: 1
                    }}
                  >
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        {index + 1}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={account.email}
                      secondary={`Password: ${account.password}`}
                    />
                  </ListItem>
                ))}
              </List>
              {demoCreds && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  Ready to login as <strong>{demoCreds.email}</strong>. Click the button above to go to the app.
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h4" component="h2" sx={{ mt: 6, mb: 4, textAlign: 'center' }}>
        Key Features
      </Typography>

      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                    {feature.icon}
                  </Avatar>
                  <Typography variant="h6" component="h3">
                    {feature.title}
                  </Typography>
                </Box>
                <Typography variant="body1" paragraph>
                  {feature.description}
                </Typography>
                <Box sx={{ mt: 'auto' }}>
                  {feature.tech.map((tech) => (
                    <Chip 
                      key={tech} 
                      label={tech} 
                      size="small" 
                      sx={{ mr: 1, mb: 1 }} 
                      color="secondary"
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Button 
          variant="contained" 
          size="large" 
          onClick={handleNavigate}
          sx={{ px: 6, py: 2, fontSize: '1.1rem' }}
        >
          Launch MyConnect
        </Button>
      </Box>
    </Container>
  );
};

export default FeatureShowcase;


// import React, { useState } from 'react';
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
//   Chip,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Paper,
//   Alert,
//   Tabs,
//   Tab,
//   Fade,
//   Grow,
//   Slide,
//   Zoom,
//   Fab,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   IconButton
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
//   Star,
//   Code,
//   Storage,
//   Security,
//   Dashboard,
//   AccountCircle,
//   PostAdd,
//   ConnectWithoutContact,
//   Feed,
//   SmartToy,
//   Crop,
//   CloudUpload,
//   PlayCircle,
//   Close,
//   ArrowForward,
//   ArrowBack,
//   Group,
//   GroupAdd,
//   Share
// } from '@mui/icons-material';

// const FeatureShowcase = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const navigate = useNavigate();
//   const [demoCreds, setDemoCreds] = useState(null);
//   const [activeTab, setActiveTab] = useState(0);
//   const [openVideo, setOpenVideo] = useState(false);
//   const [currentFeature, setCurrentFeature] = useState(0);

//   const handleChangeTab = (event, newValue) => {
//     setActiveTab(newValue);
//   };

//   const handleNavigate = () => {
//     navigate('/');
//   };

//   const setDemoCredentials = (account) => {
//     setDemoCreds(account);
//   };

//   const handleFeatureNavigation = (direction) => {
//     if (direction === 'next') {
//       setCurrentFeature((prev) => (prev === featureHighlights.length - 1 ? 0 : prev + 1));
//     } else {
//       setCurrentFeature((prev) => (prev === 0 ? featureHighlights.length - 1 : prev - 1));
//     }
//   };

//   const techStack = [
//     { name: 'MongoDB', icon: <Storage />, category: 'Database' },
//     { name: 'Express', icon: <Code />, category: 'Backend' },
//     { name: 'React', icon: <Dashboard />, category: 'Frontend' },
//     { name: 'Node.js', icon: <Code />, category: 'Backend' },
//     { name: 'Redux', icon: <Storage />, category: 'State' },
//     { name: 'JWT', icon: <Security />, category: 'Auth' },
//     { name: 'Socket.io', icon: <ConnectWithoutContact />, category: 'Realtime' },
//     { name: 'Cloudinary', icon: <CloudUpload />, category: 'Media' },
//     { name: 'Cropper.js', icon: <Crop />, category: 'Media' },
//     { name: 'NodeMailer', icon: <Email />, category: 'Email' }
//   ].filter(Boolean); // Ensure no undefined/null items

//   const demoAccounts = [
//     {
//       email: "Vikas.college001@gmail.com",
//       password: "Test@123",
//       role: "Software Engineer"
//     },
//     {
//       email: "shivsrivas123456@gmail.com",
//       password: "Test@123",
//       role: "Product Manager"
//     }
//   ].filter(Boolean);

//   const featureHighlights = [
//     {
//       title: "Professional Networking",
//       description: "Build meaningful professional relationships with our advanced networking platform. Connect with industry leaders, peers, and potential employers.",
//       icon: <People fontSize="large" />,
//       tech: ["MERN", "Redux"],
//       visual: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
//       benefits: [
//         "Expand your professional circle",
//         "Discover new career opportunities",
//         "Gain industry insights"
//       ]
//     },
//     {
//       title: "Real-time Interactions",
//       description: "Experience seamless real-time notifications and messaging powered by Socket.io. Never miss an important connection or message.",
//       icon: <Notifications fontSize="large" />,
//       tech: ["Socket.io", "Redux"],
//       visual: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
//       benefits: [
//         "Instant connection requests",
//         "Live message notifications",
//         "Real-time post updates"
//       ]
//     },
//     {
//       title: "Secure Authentication",
//       description: "Enterprise-grade security with JWT authentication and OTP verification. Your data is protected with industry-standard encryption.",
//       icon: <Lock fontSize="large" />,
//       tech: ["JWT", "NodeMailer"],
//       visual: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
//       benefits: [
//         "Secure account protection",
//         "Email verification",
//         "Password recovery"
//       ]
//     }
//   ].filter(Boolean);

//   const allFeatures = [
//     {
//       category: "Profile",
//       icon: <AccountCircle />,
//       items: [
//         { name: "Detailed Profile", icon: <AccountCircle /> },
//         { name: "Experience Section", icon: <Work /> },
//         { name: "Education History", icon: <School /> },
//         { name: "Skills Endorsements", icon: <Star /> },
//         { name: "Projects Showcase", icon: <Feed /> }
//       ].filter(Boolean)
//     },
//     {
//       category: "Networking",
//       icon: <Group />,
//       items: [
//         { name: "Connection Requests", icon: <GroupAdd /> },
//         { name: "Network Visibility", icon: <Group /> },
//         { name: "Search Professionals", icon: <People /> },
//         { name: "Recommendations", icon: <ThumbUp /> }
//       ].filter(Boolean)
//     },
//     {
//       category: "Content",
//       icon: <PostAdd />,
//       items: [
//         { name: "Create Posts", icon: <PostAdd /> },
//         { name: "Privacy Controls", icon: <Public /> },
//         { name: "Comments & Likes", icon: <Comment /> },
//         { name: "Media Sharing", icon: <Share /> }
//       ].filter(Boolean)
//     },
//     {
//       category: "Realtime",
//       icon: <Chat />,
//       items: [
//         { name: "Instant Messaging", icon: <Chat /> },
//         { name: "Notifications", icon: <Notifications /> },
//         { name: "Live Updates", icon: <SmartToy /> }
//       ].filter(Boolean)
//     }
//   ].filter(Boolean);

//   // Filter tech stack based on active tab
//   const filteredTechStack = techStack.filter(tech => {
//     if (activeTab === 0) return true;
//     if (activeTab === 1) return tech.category === 'Frontend';
//     if (activeTab === 2) return tech.category === 'Backend';
//     if (activeTab === 3) return tech.category === 'Database';
//     if (activeTab === 4) return ['Auth', 'Realtime', 'Media', 'Email', 'State'].includes(tech.category);
//     return false;
//   });

//   return (
//     <Box sx={{ background: 'linear-gradient(to bottom, #f5f7fa 0%, #e4e8eb 100%)', minHeight: '100vh' }}>
//       {/* Hero Section */}
//       <Box sx={{ 
//         background: 'linear-gradient(135deg, #0077b5 0%, #00a0dc 100%)',
//         color: 'white',
//         py: 10,
//         textAlign: 'center',
//         position: 'relative',
//         overflow: 'hidden'
//       }}>
//         <Container maxWidth="lg">
//           <Fade in={true} timeout={1000}>
//             <Box>
//               <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
//                 MyConnect Professional Network
//               </Typography>
//               <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4 }}>
//                 A Full-Stack LinkedIn Clone with Cutting-Edge Features
//               </Typography>
              
//               <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 4, flexWrap: 'wrap' }}>
//                 <Button 
//                   variant="contained" 
//                   color="secondary" 
//                   size="large" 
//                   onClick={handleNavigate}
//                   sx={{ 
//                     px: 4,
//                     py: 1.5,
//                     fontSize: '1.1rem',
//                     fontWeight: 'bold',
//                     boxShadow: 3,
//                     '&:hover': {
//                       transform: 'translateY(-2px)',
//                       boxShadow: 6
//                     },
//                     transition: 'all 0.3s'
//                   }}
//                   endIcon={<ArrowForward />}
//                 >
//                   Launch Application
//                 </Button>
                
//                 <Button 
//                   variant="outlined" 
//                   color="secondary" 
//                   size="large"
//                   onClick={() => setOpenVideo(true)}
//                   sx={{ 
//                     px: 4,
//                     py: 1.5,
//                     fontSize: '1.1rem',
//                     fontWeight: 'bold',
//                     boxShadow: 3,
//                     '&:hover': {
//                       transform: 'translateY(-2px)',
//                       boxShadow: 6
//                     },
//                     transition: 'all 0.3s'
//                   }}
//                   startIcon={<PlayCircle />}
//                 >
//                   Watch Demo
//                 </Button>
//               </Box>
//             </Box>
//           </Fade>
//         </Container>
//       </Box>

//       {/* Demo Accounts */}
//       <Container maxWidth="lg" sx={{ py: 6 }}>
//         <Grow in={true} timeout={1000}>
//           <Paper elevation={6} sx={{ p: 4, mb: 4, background: 'linear-gradient(to right, #ffffff, #f8f9fa)' }}>
//             <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3, display: 'flex', alignItems: 'center' }}>
//               <SmartToy sx={{ mr: 2 }} /> Try Our Demo Accounts
//             </Typography>
            
//             <Grid container spacing={4}>
//               {demoAccounts.map((account, index) => (
//                 <Grid item xs={12} md={6} key={index}>
//                   <Card 
//                     elevation={3} 
//                     sx={{ 
//                       cursor: 'pointer',
//                       transition: 'all 0.3s',
//                       border: demoCreds?.email === account.email ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
//                       '&:hover': {
//                         transform: 'translateY(-5px)',
//                         boxShadow: 6
//                       }
//                     }}
//                     onClick={() => setDemoCredentials(account)}
//                   >
//                     <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
//                       <Avatar sx={{ 
//                         bgcolor: theme.palette.primary.main, 
//                         width: 56, 
//                         height: 56,
//                         mr: 3
//                       }}>
//                         <Typography variant="h5">{index + 1}</Typography>
//                       </Avatar>
//                       <Box>
//                         <Typography variant="h6" component="h3">
//                           {account.role} Account
//                         </Typography>
//                         <Typography variant="body1" color="text.secondary">
//                           {account.email}
//                         </Typography>
//                         <Chip 
//                           label={`Password: ${account.password}`} 
//                           size="small" 
//                           sx={{ mt: 1 }}
//                           color="primary"
//                         />
//                       </Box>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>

//             {demoCreds && (
//               <Fade in={true}>
//                 <Alert 
//                   severity="success" 
//                   sx={{ mt: 3 }}
//                   action={
//                     <Button 
//                       color="inherit" 
//                       size="small"
//                       onClick={handleNavigate}
//                       endIcon={<ArrowForward />}
//                     >
//                       Login Now
//                     </Button>
//                   }
//                 >
//                   <strong>Demo credentials loaded!</strong> You're ready to explore as {demoCreds.role}.
//                 </Alert>
//               </Fade>
//             )}
//           </Paper>
//         </Grow>
//       </Container>

//       {/* Feature Highlights Carousel */}
//       <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
//         <Container maxWidth="lg">
//           <Typography variant="h3" component="h2" gutterBottom sx={{ 
//             fontWeight: 'bold', 
//             mb: 6,
//             textAlign: 'center',
//             position: 'relative',
//             '&:after': {
//               content: '""',
//               display: 'block',
//               width: '100px',
//               height: '4px',
//               background: theme.palette.primary.main,
//               margin: '20px auto 0'
//             }
//           }}>
//             Key Features
//           </Typography>

//           <Box sx={{ position: 'relative', mb: 6 }}>
//             <Slide direction="right" in={true} timeout={500}>
//               <Card elevation={10} sx={{ borderRadius: 2, overflow: 'hidden' }}>
//                 <Grid container>
//                   <Grid item xs={12} md={6}>
//                     <Box sx={{ 
//                       height: '100%',
//                       minHeight: '400px',
//                       background: `url(${featureHighlights[currentFeature].visual}) center/cover`,
//                       position: 'relative'
//                     }}>
//                       <Box sx={{
//                         position: 'absolute',
//                         bottom: 0,
//                         left: 0,
//                         right: 0,
//                         bgcolor: 'rgba(0,0,0,0.7)',
//                         color: 'white',
//                         p: 2,
//                         textAlign: 'center'
//                       }}>
//                         <Typography variant="overline">
//                           {featureHighlights[currentFeature].tech.join(' • ')}
//                         </Typography>
//                       </Box>
//                     </Box>
//                   </Grid>
//                   <Grid item xs={12} md={6}>
//                     <CardContent sx={{ p: 4, height: '100%' }}>
//                       <Box sx={{ 
//                         display: 'flex',
//                         flexDirection: 'column',
//                         height: '100%',
//                         justifyContent: 'center'
//                       }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//                           <Avatar sx={{ 
//                             bgcolor: theme.palette.primary.main, 
//                             color: 'white',
//                             mr: 2,
//                             width: 48,
//                             height: 48
//                           }}>
//                             {featureHighlights[currentFeature].icon}
//                           </Avatar>
//                           <Typography variant="h4" component="h3" sx={{ fontWeight: 'bold' }}>
//                             {featureHighlights[currentFeature].title}
//                           </Typography>
//                         </Box>
                        
//                         <Typography variant="body1" paragraph sx={{ mb: 3, fontSize: '1.1rem' }}>
//                           {featureHighlights[currentFeature].description}
//                         </Typography>
                        
//                         <List dense sx={{ mb: 3 }}>
//                           {featureHighlights[currentFeature].benefits.map((benefit, index) => (
//                             <ListItem key={index} sx={{ px: 0 }}>
//                               <ListItemIcon sx={{ minWidth: '36px' }}>
//                                 <Star color="primary" />
//                               </ListItemIcon>
//                               <ListItemText primary={benefit} />
//                             </ListItem>
//                           ))}
//                         </List>
                        
//                         <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto' }}>
//                           <Button 
//                             variant="outlined" 
//                             onClick={() => handleFeatureNavigation('prev')}
//                             startIcon={<ArrowBack />}
//                           >
//                             Previous
//                           </Button>
//                           <Button 
//                             variant="contained" 
//                             onClick={() => handleFeatureNavigation('next')}
//                             endIcon={<ArrowForward />}
//                           >
//                             Next
//                           </Button>
//                         </Box>
//                       </Box>
//                     </CardContent>
//                   </Grid>
//                 </Grid>
//               </Card>
//             </Slide>
            
//             <Fab 
//               color="primary" 
//               aria-label="feature indicator"
//               size="small"
//               sx={{
//                 position: 'absolute',
//                 top: -20,
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//                 boxShadow: 3
//               }}
//             >
//               {currentFeature + 1}/{featureHighlights.length}
//             </Fab>
//           </Box>
//         </Container>
//       </Box>

//       {/* Technology Stack */}
//       <Box sx={{ py: 8, bgcolor: 'background.default' }}>
//         <Container maxWidth="lg">
//           <Typography variant="h3" component="h2" gutterBottom sx={{ 
//             fontWeight: 'bold', 
//             mb: 6,
//             textAlign: 'center'
//           }}>
//             Powerful Technology Stack
//           </Typography>
          
//           <Tabs 
//             value={activeTab} 
//             onChange={handleChangeTab} 
//             centered
//             sx={{ mb: 4 }}
//             variant={isMobile ? 'scrollable' : 'standard'}
//             allowScrollButtonsMobile
//           >
//             <Tab label="All" />
//             <Tab label="Frontend" />
//             <Tab label="Backend" />
//             <Tab label="Database" />
//             <Tab label="Services" />
//           </Tabs>
          
//           <Grid container spacing={3}>
//             {filteredTechStack.length > 0 ? (
//               filteredTechStack.map((tech, index) => (
//                 <Grid item xs={6} sm={4} md={3} key={`${tech.name}-${index}`}>
//                   <Zoom in={true} timeout={(index + 1) * 200}>
//                     <Card elevation={3} sx={{ 
//                       height: '100%',
//                       display: 'flex',
//                       flexDirection: 'column',
//                       alignItems: 'center',
//                       p: 3,
//                       transition: 'all 0.3s',
//                       '&:hover': {
//                         transform: 'translateY(-5px)',
//                         boxShadow: 6
//                       }
//                     }}>
//                       <Avatar sx={{ 
//                         bgcolor: theme.palette.primary.main, 
//                         color: 'white',
//                         width: 60,
//                         height: 60,
//                         mb: 2
//                       }}>
//                         {tech.icon}
//                       </Avatar>
//                       <Typography variant="h6" component="h3" sx={{ textAlign: 'center' }}>
//                         {tech.name}
//                       </Typography>
//                       <Chip 
//                         label={tech.category} 
//                         size="small" 
//                         sx={{ mt: 1 }}
//                         color="secondary"
//                       />
//                     </Card>
//                   </Zoom>
//                 </Grid>
//               ))
//             ) : (
//               <Grid item xs={12}>
//                 <Typography align="center">No technologies found for this category</Typography>
//               </Grid>
//             )}
//           </Grid>
//         </Container>
//       </Box>

//       {/* All Features Section */}
//       <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
//         <Container maxWidth="lg">
//           <Typography variant="h3" component="h2" gutterBottom sx={{ 
//             fontWeight: 'bold', 
//             mb: 6,
//             textAlign: 'center'
//           }}>
//             Complete Feature Breakdown
//           </Typography>
          
//           <Grid container spacing={4}>
//             {allFeatures.map((category, index) => (
//               <Grid item xs={12} md={6} key={index}>
//                 <Card elevation={3} sx={{ height: '100%' }}>
//                   <CardContent>
//                     <Typography variant="h5" component="h3" sx={{ 
//                       mb: 3,
//                       display: 'flex',
//                       alignItems: 'center',
//                       fontWeight: 'bold'
//                     }}>
//                       {category.icon}
//                       <Box sx={{ ml: 1.5 }}>{category.category}</Box>
//                     </Typography>
                    
//                     <List dense>
//                       {category.items.map((item, itemIndex) => (
//                         <ListItem key={itemIndex} sx={{ px: 0 }}>
//                           <ListItemIcon sx={{ minWidth: '36px' }}>
//                             {item.icon}
//                           </ListItemIcon>
//                           <ListItemText 
//                             primary={item.name} 
//                             primaryTypographyProps={{ variant: 'body1' }}
//                           />
//                         </ListItem>
//                       ))}
//                     </List>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* Final CTA */}
//       <Box sx={{ 
//         py: 10,
//         background: 'linear-gradient(135deg, #0077b5 0%, #00a0dc 100%)',
//         color: 'white',
//         textAlign: 'center'
//       }}>
//         <Container maxWidth="md">
//           <Typography variant="h3" component="h2" gutterBottom sx={{ 
//             fontWeight: 'bold', 
//             mb: 3
//           }}>
//             Ready to Explore MyConnect?
//           </Typography>
          
//           <Typography variant="h5" component="p" sx={{ mb: 4 }}>
//             Experience the full power of this professional networking platform
//           </Typography>
          
//           <Button 
//             variant="contained" 
//             color="secondary" 
//             size="large" 
//             onClick={handleNavigate}
//             sx={{ 
//               px: 6,
//               py: 2,
//               fontSize: '1.1rem',
//               fontWeight: 'bold',
//               boxShadow: 3,
//               '&:hover': {
//                 transform: 'translateY(-2px)',
//                 boxShadow: 6
//               },
//               transition: 'all 0.3s'
//             }}
//             endIcon={<ArrowForward />}
//           >
//             Launch Application Now
//           </Button>
//         </Container>
//       </Box>

//       {/* Video Demo Dialog */}
//       <Dialog 
//         open={openVideo} 
//         onClose={() => setOpenVideo(false)}
//         maxWidth="md"
//         fullWidth
//       >
//         <DialogTitle sx={{ m: 0, p: 2 }}>
//           <Typography variant="h6">MyConnect Demo Video</Typography>
//           <IconButton
//             aria-label="close"
//             onClick={() => setOpenVideo(false)}
//             sx={{
//               position: 'absolute',
//               right: 8,
//               top: 8,
//               color: (theme) => theme.palette.grey[500],
//             }}
//           >
//             <Close />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent dividers sx={{ p: 0 }}>
//           <Box sx={{ 
//             position: 'relative',
//             paddingTop: '56.25%', // 16:9 aspect ratio
//             backgroundColor: '#000'
//           }}>
//             <Box sx={{
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               width: '100%',
//               height: '100%',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               color: 'white'
//             }}>
//               <Typography variant="h4">Video Demo Coming Soon</Typography>
//             </Box>
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenVideo(false)}>Close</Button>
//           <Button 
//             variant="contained" 
//             onClick={handleNavigate}
//             endIcon={<ArrowForward />}
//           >
//             Try Live Demo
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default FeatureShowcase;