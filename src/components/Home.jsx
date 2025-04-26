
import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.svg';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { SOCKET_API as scket , API_URL as api, } from "../config/variable";

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: '#f44336',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});

const Home = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [loading, setLoading] = useState(true); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (userData) {
      setIsLoggedIn(true);
      navigate("/welcome", { replace: true });
    } else {
      setLoading(false);
    }
  }, [navigate, userData]);

  const changeLogin = () => navigate("/login");
  const changeSignup = () => navigate("/signup");

  if (loading) {
    return <Spinner />;
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="w-full h-screen overflow-y-auto bg-white">
        <div className="flex flex-col items-center justify-center min-h-full p-6 mx-auto md:flex-row md:p-12 lg:p-16 max-w-7xl">
          {/* Left Column - Image */}
          <div className="flex justify-center w-full mt-12 mb-8 md:w-1/2 lg:mt-0 md:mb-0">
            <div className="relative flex items-center w-full h-full max-w-md">
              <img 
                src={logo} 
                alt="Connect Logo" 
                className="w-full h-auto max-h-[400px] object-contain transition-all duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="w-full py-4 space-y-6 md:w-1/2">
            <h1 className="text-3xl font-bold leading-tight text-gray-800 sm:text-4xl lg:text-5xl">
              Welcome to <span className="text-purple-600">connect.</span>
            </h1>
            
            <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
              We provide the tools to help you connect with professionals. Join our vibrant community where innovation meets opportunity, and let your career take flight.
            </p>

            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <Button 
                variant="contained" 
                onClick={changeSignup}
                size="large"
                sx={{
                  backgroundColor: '#6C63FF',
                  color: 'white',
                  padding: '12px 24px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  '&:hover': { 
                    backgroundColor: '#5a52e0',
                    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)'
                  },
                }}
              >
                Get Started
              </Button>
              
              <Button 
                variant="outlined" 
                onClick={changeLogin}
                size="large"
                sx={{
                  borderColor: '#6C63FF',
                  color: '#6C63FF',
                  padding: '12px 24px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  borderRadius: '8px',
                  '&:hover': { 
                    borderColor: '#5a52e0',
                    color: '#5a52e0',
                    backgroundColor: 'rgba(108, 99, 255, 0.08)'
                  },
                }}
              >
                Login
              </Button>
            </div>

            <div className="pt-2">
              <p className="text-sm text-gray-500 sm:text-base">
                Already a member?{' '}
                <span 
                  className="font-semibold text-purple-600 transition-all cursor-pointer hover:underline"
                  onClick={changeLogin}
                >
                  Sign in here
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Home;