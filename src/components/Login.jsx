
import React, { useState, useEffect } from 'react';
import Login_SVG from '../assets/login.svg';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { login } from './features/user/statusSlice';
import { motion } from 'framer-motion';
import { SOCKET_API as scket , API_URL as api, } from "../config/variable";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({ role: "professional", email: "", password: "" });
    const [toggle, setToggle] = useState(1);
    const [loading, setLoading] = useState(true);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const changeSignup = () => navigate("/signup");
    const toggleHandler = (value) => setToggle(value);

    useEffect(() => {
        const checkUser = async () => {
            let userData;
            try {
                userData = JSON.parse(localStorage.getItem("userData"));
            } catch (error) {
                // console.error("Error parsing user data", error);
                userData = null;
            }
            if (userData) {
                try {
                    await dispatch(login(userData));
                    navigate("/welcome", { replace: true });
                } catch (error) {
                    // console.error("Dispatching login failed", error);
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        checkUser();
    }, [navigate, dispatch]);

    const changeHandler = (event) => {
        setData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };
    const loginHandler = async () => {
        if (!data.email || !data.password) {
            toast.warning("Please fill all the fields");
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            
            const response = await axios.post(
                `${api}/user_login`, 
                data, 
                config
            );
            localStorage.setItem("userData", JSON.stringify(response.data));
            await dispatch(login(response?.data));
            navigate("/welcome");
        } catch (error) {
            // console.error("Login failed", error);
            
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        toast.warning("User is not registered");
                        break;
                    case 400:
                        toast.warning("Invalid authorization");
                        break;
                    case 403:
                        toast.warning("Password incorrect");
                        break;
                    default:
                        toast.error("Error logging in. Please try again");
                }
            } else {
                toast.error("Network error. Please try again");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-wrap items-center justify-center w-full min-h-screen gap-2 p-4 overflow-y-auto bg-gradient-to-br from-indigo-50 to-purple-50 lg:flex-row md:p-8 md:gap-12">
            {/* Left Column - Image */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex justify-center w-full mt-24 lg:w-1/2 lg:mt-0"
            >
                <div className="relative w-full max-w-md lg:max-w-lg ">
                    <img 
                        src={Login_SVG} 
                        alt="Login Illustration" 
                        className="w-full h-auto drop-shadow-lg hover:scale-[1.02] transition-transform duration-300"
                    />
                    <div className="absolute bg-purple-100 rounded-full -inset-6 opacity-20 -z-10 blur-md"></div>
                </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full max-w-md lg:w-1/2"
            >
                <div className="p-8 mt-16 bg-white border border-gray-100 shadow-xl rounded-2xl md:p-10">
                    <div className="mb-8 text-center">
                        <h1 className="mb-2 text-3xl font-bold text-gray-800 md:text-4xl">
                            Welcome Back
                        </h1>
                        <p className="text-gray-500">Login to access your account</p>
                    </div>
                    
                    {/* Toggle Buttons */}
                    <div className="flex w-full mb-6 bg-gray-200 rounded-full h-14">
                        <button
                            className={`flex-1 h-12 rounded-full flex items-center justify-center m-1 transition-all duration-300 ${
                                toggle === 1 ? 'bg-[#6C63FF] slide-left text-white' : 'text-gray-600'
                            }`}
                            onClick={() => {
                                toggleHandler(1);
                                setData(prev => ({ ...prev, role: "professional" }));
                            }}
                        >
                            <span>Professional</span>
                        </button>
                        <button
                            className={`flex-1 h-12 rounded-full flex items-center justify-center m-1 transition-all duration-300 ${
                                toggle === 2 ? 'bg-[#6C63FF] slide-right text-white' : 'text-gray-600'
                            }`}
                            onClick={() => {
                                toggleHandler(2);
                                setData(prev => ({ ...prev, role: "Admin" }));
                            }}
                        >
                            <span>Admin</span>
                        </button>
                    </div>

                    {/* Form Fields */}
                    <div className="mb-6 space-y-6">
                        <TextField
                            fullWidth
                            label="Email Address"
                            variant="outlined"
                            name="email"
                            onChange={changeHandler}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px',
                                    backgroundColor: '#f9fafb'
                                }
                            }}
                        />
                        
                        <TextField
                            fullWidth
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            name="password"
                            onChange={changeHandler}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px',
                                    backgroundColor: '#f9fafb'
                                }
                            }}
                            InputProps={{
                                endAdornment: (
                                    <button 
                                        type="button" 
                                        onClick={handleClickShowPassword}
                                        className="px-3 text-gray-500 cursor-pointer hover:text-gray-700"
                                        aria-label="Toggle password visibility"
                                    >
                                        {showPassword ? (
                                            <span className="text-sm">Hide</span>
                                        ) : (
                                            <span className="text-sm">Show</span>
                                        )}
                                    </button>
                                ),
                            }}
                        />

                        <div className="flex justify-end">
                            <button 
                                className="text-sm font-medium text-[#6C63FF] hover:underline"
                                onClick={() => {/* Add forgot password handler */}}
                            >
                                Forgot Password?
                            </button>
                        </div>

                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            onClick={loginHandler}
                            sx={{
                                backgroundColor: '#6C63FF',
                                color: '#fff',
                                borderRadius: '12px',
                                padding: '14px 0',
                                fontSize: '1rem',
                                fontWeight: '600',
                                textTransform: 'none',
                                boxShadow: '0 4px 6px rgba(108, 99, 255, 0.3)',
                                '&:hover': { 
                                    backgroundColor: '#5a52e0',
                                    boxShadow: '0 6px 8px rgba(108, 99, 255, 0.4)',
                                    transform: 'translateY(-1px)'
                                },
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Sign In
                        </Button>
                    </div>

                    {/* Divider */}
                    <div className="relative flex items-center justify-center mb-6">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink mx-4 text-sm text-gray-400">or</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    {/* Sign Up CTA */}
                    <div className="text-center">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <button 
                                className="font-semibold text-[#6C63FF] hover:underline focus:outline-none"
                                onClick={changeSignup}
                            >
                                Sign up
                            </button>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;