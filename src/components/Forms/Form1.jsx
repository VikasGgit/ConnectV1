

import React, { useState, useEffect } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Spinner from '../Spinner';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { ref } from '../features/user/refreshSlice';
import { SOCKET_API as scket , API_URL as api, } from "../../config/variable";

const Form1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, token } = useSelector((state) => state.status);
  const isEditMode = new URLSearchParams(location.search).get("edit") === "1";

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    organization: '',
    city: '',
    state: '',
    zip: '',
  });

  useEffect(() => {
    if (isEditMode && userData) {
      setFormData({
        name: `${userData?.user?.firstName || ''} ${userData?.user?.lastName || ''}`,
        position: userData?.user?.status?.position || '',
        organization: userData?.user?.status?.organization || '',
        city: userData?.user?.status?.city || '',
        state: userData?.user?.status?.state || '',
        zip: userData?.user?.status?.zip || '',
      });
    }
  }, [isEditMode, userData]);

  const previosRouteHandler = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, position, organization, city, state, zip } = formData;
    if (name && position && organization && city && state && zip) {
      setLoading(true);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        };

        await axios.put(
          `${api}/details/${userData._id}`,
          formData,
          config
        );
        
        toast.success('Profile successfully updated');
        setLoading(false);
        dispatch(ref());
        navigate(-1);
      } catch (error) {
        setLoading(false);
        // console.error('Error in updating details', error);
        if (error.response) {
          // console.error('Response data', error.response.data);
          // console.error('Response status', error.response.status);
        }
      }
    } else {
      alert("Please fill all fields correctly...");
    }
  };

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep', 'Delhi', 'Puducherry'
  ];

  if (loading) return <Spinner />;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-50">
      <div className="relative w-full max-w-4xl p-6 bg-white rounded-xl shadow-lg overflow-y-auto max-h-[95vh]">
        <form
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label htmlFor="inputName" className="mb-2 text-gray-700">Name</label>
            <input
              type="text"
              id="inputName"
              name="name"
              placeholder="Enter Your Name"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="inputPosition" className="mb-2 text-gray-700">Position</label>
            <input
              type="text"
              id="inputPosition"
              name="position"
              placeholder="Enter your position"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={formData.position}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label htmlFor="inputOrganization" className="mb-2 text-gray-700">Organization</label>
            <input
              type="text"
              id="inputOrganization"
              name="organization"
              placeholder="Enter Your Organization"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={formData.organization}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="inputCity" className="mb-2 text-gray-700">City</label>
            <input
              type="text"
              id="inputCity"
              name="city"
              placeholder="City"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="inputState" className="mb-2 text-gray-700">State</label>
            <select
              id="inputState"
              name="state"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={formData.state}
              onChange={handleChange}
            >
              <option>Choose...</option>
              {states.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="inputZip" className="mb-2 text-gray-700">Zip</label>
            <input
              type="text"
              id="inputZip"
              name="zip"
              placeholder="Zip/Pin code"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={formData.zip}
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-3 text-white transition bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>

        <div className="absolute top-4 right-4">
          <IconButton onClick={previosRouteHandler}>
            <CancelIcon style={{ color: 'gray', fontSize: 32 }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Form1;
