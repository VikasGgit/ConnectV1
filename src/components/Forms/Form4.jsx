

import React, { useState, useEffect } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { ref } from '../features/user/refreshSlice';
import Spinner from '../Spinner';
import { SOCKET_API as scket , API_URL as api, } from "../../config/variable";

const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    role: '',
    organization: '',
    durationFrom: '',
    durationTo: '',
    field: '',
  });
  
  const [searchParams] = useSearchParams();
  const volunteerId = searchParams.get("volunteerId");
  const editMode = searchParams.get("edit") === "1";
  
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {userData, token} = useSelector((state)=>state.status);
  const userDetails = userData;

  useEffect(() => {
    if (editMode && volunteerId) {
      const fetchVolunteerData = async () => {
        try {
          setLoading(true);
          const volunteer = userDetails?.user?.volunteering?.find(vol => vol._id === volunteerId);
          if (volunteer) {
            setFormData({
              role: volunteer.role || '',
              organization: volunteer.organization || '',
              durationFrom: volunteer.durationFrom || '',
              durationTo: volunteer.durationTo || '',
              field: volunteer.field || '',
            });
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching volunteer data:", error);
          setLoading(false);
        }
      };
      fetchVolunteerData();
    }
  }, [editMode, volunteerId, userDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const previosRouteHandler = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.role || 
      !formData.organization || 
      !formData.durationFrom || 
      !formData.durationTo || 
      !formData.field
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
        withCredentials: true,
      };

      let response;
     
        response = await axios.put(
          `${api}/volunteer/${volunteerId}`,
          formData, 
          config
        );
      
      toast.success('Volunteering experience successfully updated');
      dispatch(ref());
      navigate(-1);
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full gap-2 bg-black bg-opacity-50'>
      <form 
        className="grid w-full max-w-4xl grid-cols-1 gap-6 p-6 mx-4 rounded-lg shadow-lg md:grid-cols-2 bg-gray-50" 
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="inputRole" className="mb-2 text-gray-700">Role*</label>
          <input
            type="text"
            className="p-3 border border-gray-300 rounded-lg"
            id="inputRole"
            name="role"
            placeholder='Your Role'
            value={formData.role}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="inputOrganization" className="mb-2 text-gray-700">Organization*</label>
          <input
            type="text"
            className="p-3 border border-gray-300 rounded-lg"
            id="inputOrganization"
            name="organization"
            placeholder='Organization Name'
            value={formData.organization}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="inputDurationFrom" className="mb-2 text-gray-700">Duration (From)*</label>
          <input
            type="month"
            className="p-3 border border-gray-300 rounded-lg"
            id="inputDurationFrom"
            name="durationFrom"
            value={formData.durationFrom}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="inputDurationTo" className="mb-2 text-gray-700">Duration (To)*</label>
          <input
            type="month"
            className="p-3 border border-gray-300 rounded-lg"
            id="inputDurationTo"
            name="durationTo"
            value={formData.durationTo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col md:col-span-2">
          <label htmlFor="inputField" className="mb-2 text-gray-700">Field/Domain*</label>
          <input
            type="text"
            className="p-3 border border-gray-300 rounded-lg"
            id="inputField"
            name="field"
            placeholder='Field/Domain'
            value={formData.field}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-span-2">
          <button 
            type="submit" 
            className="w-full py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            disabled={loading}
          >
            {editMode ? 'Update Volunteering' : 'Add Volunteering'}
          </button>
        </div>
      </form>
      <div className='h-[40rem]'>
        <IconButton onClick={previosRouteHandler}>
          <CancelIcon style={{ color: 'white', fontSize: 50 }} />
        </IconButton>
      </div>
    </div>
  );
};

export default VolunteerForm;