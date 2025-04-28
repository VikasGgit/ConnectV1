// import React, {useState, useEffect} from 'react';
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';
// import Button from '@mui/material/Button';
// import {useSelector, useDispatch} from 'react-redux';
// import { login } from './features/user/statusSlice';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import Spinner from './Spinner';
// import axios from 'axios';
// import { SOCKET_API as scket , API_URL as api, } from "../config/variable";

// const Otp = () => {
//     const {firstName, lastName, email, phone, password, gender, role} = useSelector((state) => state.user);
//     const [loading, setloading] = useState(false);
//     const [otp, setotp] = useState("");
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     useEffect(() => {
//         toast.success("otp has been send to your gmail..");
//     }, [])
//     const otpHandler = (e)=>{
//          setotp(e.target.value);
//     }
//     const verifyOtpHandler = async () =>{
//         try{

//             const payload = {
//                 firstName,
//                 lastName,
//                 email,
//                 phone,
//                 password,
//                 gender,
//                 role,
//                 otp
//             }
//             // console.log(payload);
//             setloading(true);
//             const config ={
//                 headers:{
//                     "Content-type":"application/json",
//                 }
//             }
            // const response = await axios.post(`${api}//user_signup`, payload, config);
//             // console.log("signup response:", response);
//             setloading(false);
//             toast.success('successfully registered');
//             localStorage.setItem("userData", JSON.stringify(response.data));

//             //loading -> true
//             //api call for signin
//             dispatch(login(response.data));
//             navigate("/welcome");
//         }catch(error){
//             setloading(false);
//             // console.error("Error in signup");
//             if(error.response){
//                 // console.error('Response data', error.response.data);
//                 // console.error('Response status', error.response.status);
//                 let errorMsg = 'Error signin up. Please try again later';
//                 if(error.response.status === 400){
//                     toast.warning("Invalid Otp");
//                 }else if(error.response.status === 500){
//                     toast.warning(error.response.data.error);
//                 }
//             }
//         }
//     }
//     return (
//         !loading ? (
//         <div className='otp-container'>
//             <div className='otp'>
//                 <div className='mr-8'>
//                 <DotLottieReact
//                     src="https://lottie.host/eff9f3fa-1793-4552-9282-8ab6cdab5cd3/mRLAlV4GOL.lottie"
//                     loop
//                     autoplay
//                 />

//                 </div>
//                 <h1 className="mb-10 text-4xl font-extrabold text-center text-transparent md:text-sm bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 drop-shadow-lg animate-pulse">Otp has been successfully sent to this {email.slice(0,5) +'*****'} mail for email varification</h1>
//                 <div className='flex flex-col gap-3'>
//                     <label htmlFor="otp"></label>
//                     <input className="inputs" type="text" name="otp" id="otp" placeholder='Enter Otp' onChange={otpHandler} />
//                     <Button variant="contained" sx={{ backgroundColor: '#6C63FF', color: '#fff', '&:hover': { backgroundColor: '#5a52e0' } }} onClick={verifyOtpHandler}>Verify</Button>
//                 </div>
//             </div>
//         </div>) : (<Spinner/>)
//     )
// }
// export default Otp;







import React, { useState, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './features/user/statusSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import axios from 'axios';
import { styled } from '@mui/system';
import { Box, Typography, TextField } from '@mui/material';
import { API_URL as api, } from "../config/variable";

const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  padding: theme.spacing(2),
  backgroundColor: '#f5f7fa',
}));

const StyledCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  borderRadius: '16px',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  backgroundColor: 'white',
  width: '100%',
  maxWidth: '500px',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    maxWidth: '800px',
    padding: theme.spacing(6),
  },
}));

const AnimationContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '300px',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up('md')]: {
    marginBottom: 0,
    marginRight: theme.spacing(4),
  },
}));

const FormContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

const StyledInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    '& fieldset': {
      borderColor: '#e0e0e0',
    },
    '&:hover fieldset': {
      borderColor: '#6C63FF',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6C63FF',
    },
  },
}));

const Otp = () => {
  const { firstName, lastName, email, phone, password, gender, role } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    toast.success("OTP has been sent to your email..");
  }, []);

  const otpHandler = (e) => {
    setOtp(e.target.value);
  };

  const verifyOtpHandler = async () => {
    try {
      const payload = {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        role,
        otp
      };

      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
        }
      };
      
      const response = await axios.post(`${api}/user_signup`, payload, config);
      setLoading(false);
      toast.success('Successfully registered');
      localStorage.setItem("userData", JSON.stringify(response.data));
      dispatch(login(response.data));
      navigate("/welcome");
    } catch (error) {
      setLoading(false);
      if (error.response) {
        if (error.response.status === 400) {
          toast.warning("Invalid OTP");
        } else if (error.response.status === 500) {
          toast.warning(error.response.data.error);
        }
      } else {
        toast.error('Error signing up. Please try again later');
      }
    }
  };

  return !loading ? (
    <StyledContainer>
      <StyledCard>
        <AnimationContainer>
          <DotLottieReact
            src="https://lottie.host/eff9f3fa-1793-4552-9282-8ab6cdab5cd3/mRLAlV4GOL.lottie"
            loop
            autoplay
          />
        </AnimationContainer>
        
        <FormContainer>
          <Typography variant="h4" component="h1" sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #6C63FF 30%, #4A42D1 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
            mb: 3
          }}>
            OTP Verification
          </Typography>
          
          <Typography variant="body1" sx={{ 
            textAlign: 'center', 
            mb: 3,
            color: 'text.secondary'
          }}>
            We've sent a 6-digit code to {email.slice(0, 5) + '*****' + email.split('@')[1].substring(0, 3) + '...'}
          </Typography>
          
          <StyledInput
            fullWidth
            label="Enter OTP"
            variant="outlined"
            value={otp}
            onChange={otpHandler}
            inputProps={{ maxLength: 6 }}
          />
          
          <Button 
            variant="contained" 
            fullWidth
            size="large"
            sx={{ 
              mt: 2,
              borderRadius: '12px',
              padding: '12px',
              backgroundColor: '#6C63FF',
              '&:hover': { 
                backgroundColor: '#5a52e0',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(108, 99, 255, 0.3)'
              },
              transition: 'all 0.3s ease',
            }}
            onClick={verifyOtpHandler}
          >
            Verify & Continue
          </Button>
        </FormContainer>
      </StyledCard>
    </StyledContainer>
  ) : (
    <Spinner />
  );
};

export default Otp;

