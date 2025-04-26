import React, {useState, useEffect} from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Button from '@mui/material/Button';
import {useSelector, useDispatch} from 'react-redux';
import { login } from './features/user/statusSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import axios from 'axios';
import { SOCKET_API as scket , API_URL as api, } from "../config/variable";

const Otp = () => {
    const {firstName, lastName, email, phone, password, gender, role} = useSelector((state) => state.user);
    const [loading, setloading] = useState(false);
    const [otp, setotp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        toast.success("otp has been send to your gmail..");
    }, [])
    const otpHandler = (e)=>{
         setotp(e.target.value);
    }
    const verifyOtpHandler = async () =>{
        try{

            const payload = {
                firstName,
                lastName,
                email,
                phone,
                password,
                gender,
                role,
                otp
            }
            console.log(payload);
            setloading(true);
            const config ={
                headers:{
                    "Content-type":"application/json",
                }
            }
            const response = await axios.post(`${api}//user_signup`, payload, config);
            console.log("signup response:", response);
            setloading(false);
            toast.success('successfully registered');
            localStorage.setItem("userData", JSON.stringify(response.data));

            //loading -> true
            //api call for signin
            dispatch(login(response.data));
            navigate("/welcome");
        }catch(error){
            setloading(false);
            console.error("Error in signup");
            if(error.response){
                console.error('Response data', error.response.data);
                console.error('Response status', error.response.status);
                let errorMsg = 'Error signin up. Please try again later';
                if(error.response.status === 400){
                    toast.warning("Invalid Otp");
                }else if(error.response.status === 500){
                    toast.warning(error.response.data.error);
                }
            }
        }
    }
    return (
        !loading ? (
        <div className='otp-container'>
            <div className='otp'>
                <div className='mr-8'>
                <DotLottieReact
                    src="https://lottie.host/eff9f3fa-1793-4552-9282-8ab6cdab5cd3/mRLAlV4GOL.lottie"
                    loop
                    autoplay
                />

                </div>
                <h1 className="mb-10 text-4xl font-extrabold text-center text-transparent md:text-sm bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 drop-shadow-lg animate-pulse">Otp has been successfully sent to this {email.slice(0,5) +'*****'} mail for email varification</h1>
                <div className='flex flex-col gap-3'>
                    <label htmlFor="otp"></label>
                    <input className="inputs" type="text" name="otp" id="otp" placeholder='Enter Otp' onChange={otpHandler} />
                    <Button variant="contained" sx={{ backgroundColor: '#6C63FF', color: '#fff', '&:hover': { backgroundColor: '#5a52e0' } }} onClick={verifyOtpHandler}>Verify</Button>
                </div>
            </div>
        </div>) : (<Spinner/>)
    )
}
export default Otp;


