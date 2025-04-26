import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Badge from '@mui/material/Badge';
import GroupIcon from '@mui/icons-material/Group';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ArticleIcon from '@mui/icons-material/Article';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Trash from '../assets/trash.png';
import Updata from '../assets/pen.png';
import WidgetsIcon from '@mui/icons-material/Widgets';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import ReportIcon from '@mui/icons-material/Report';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import LogoutIcon from '@mui/icons-material/Logout';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const Admin = () => {
    const [page, handlePageChange] = useState(1);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const navigate = useNavigate();

    // Check if userData is not present or the user role is not admin
    useEffect(() => {
        if (!userData || userData.user.role !== "admin") {
            navigate("/login", {replace:true}); // Redirect to the previous page
        }
    }, [userData, navigate]);

    // If userData is not available, show a loading spinner or fallback UI
    if (!userData) {
        return <Spinner />;
    }

    const data = {
        labels: [
            'Male',
            'Female',
            'Others'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };

    const [totalUsers, setUsers] = useState([
        { user_id: '1', user_name: "John Doe", total_post: 45 },
        { user_id: '2', user_name: "Jane Smith", total_post: 28 },
        { user_id: '3', user_name: "Michael Brown", total_post: 15 },
        { user_id: '4', user_name: "Emily Davis", total_post: 67 },
        { user_id: '5', user_name: "Chris Johnson", total_post: 23 },
        { user_id: '6', user_name: "Patricia Garcia", total_post: 11 },
        { user_id: '7', user_name: "Daniel Martinez", total_post: 39 },
        { user_id: '8', user_name: "Sophia Taylor", total_post: 50 }
    ]);

    const startPage = page * 10 - 10 < 0 ? 0 : page * 10 - 10;
    const totalPages = Math.floor(totalUsers.length / 10 + 1);

    return (
        <div className='admin-container bg-gray-200'>
            <div className='flex-[0.2] bg-white rounded-l-lg my-4 ml-4 flex flex-col jsutify-around'>
                {/* Sidebar code */}
            </div>
            <div className='flex-[0.8] bg-blue-50 my-4 mr-4 rounded-r-lg flex flex-col items-center'>
                {/* Header and other main content */}
                <div className='cards w-[98%] flex justify-between items-center mt-4 px-3 rounded-lg'>
                    {/* Card sections */}
                </div>
                <div className='middle-section w-[98%] flex justify-between items-center mt-4 px-3 rounded-lg'>
                    <div className='Users flex-[0.66] flex flex-col gap-3 bg-white rounded-md h-[30rem]'>
                        <div className='flex flex-[0.2] justify-between mx-7 items-center'>
                            <h1 className='font-bold text-2xl text-[#6C63FF]'>Total Users</h1>
                            <div>
                                <Paper
                                    component="form"
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
                                >
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Search User"
                                    />
                                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                </Paper>
                            </div>
                        </div>
                        <hr />
                        <div className='flex-[0.1]'>
                            <div className='w-full flex h-8'>
                                <span className='flex-[0.25] flex items-center justify-center'>User Id</span>
                                <span className='flex-[0.25] flex items-center justify-center'>User Name</span>
                                <span className='flex-[0.25] flex items-center justify-center'>Posts</span>
                                <span className='flex-[0.25] flex items-center justify-center'>Actions</span>
                            </div>
                        </div>
                        <div className='flex-[0.6] overflow-auto'>
                            {totalUsers.slice(startPage, startPage + 10).map((user, index) => (
                                <div key={index} className='w-full flex h-10'>
                                    <span className='flex-[0.25] flex items-center justify-center'>{user.user_id}</span>
                                    <span className='flex-[0.25] flex items-center justify-center'>{user.user_name}</span>
                                    <span className='flex-[0.25] flex items-center justify-center'>{user.total_post}</span>
                                    <div className='flex-[0.25] flex items-center justify-center gap-3'>
                                        <button><img src={Updata} alt="" width={32} /></button>
                                        <button><img src={Trash} alt="" width={32} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <hr />
                        <div className='table-footer flex-[0.1]'>
                            <div className="flex gap-x-3 items-center w-11/12 max-w-2xl mx-auto">
                                {page > 1 && (
                                    <button
                                        className="rounded-md border-gray-300 border-2 px-4 py-1"
                                        onClick={() => handlePageChange(page - 1)}
                                    >
                                        Previous
                                    </button>
                                )}
                                {page < totalPages && (
                                    <button
                                        className="rounded-md border-gray-300 border-2 px-4 py-1"
                                        onClick={() => handlePageChange(page + 1)}
                                    >
                                        Next
                                    </button>
                                )}
                                <p className="text-sm font-semibold ml-auto">
                                    Page {page} of {totalPages}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='profile-chart flex-[0.33] bg-white h-[30rem] rounded-lg'>
                        <h1 className='text-2xl ml-5 mt-4 font-bold'>
                            User Profiles
                        </h1>
                        <div className='mt-8'>
                            <Doughnut data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
