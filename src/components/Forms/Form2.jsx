
import React, { useState, useEffect } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from "react-router-dom";
import { ref } from '../features/user/refreshSlice';
import { sUserData } from '../features/user/statusSlice';
import { SOCKET_API as scket , API_URL as api, } from "../../config/variable";

const EducationForm = () => {
  const [formData, setFormData] = useState({
    degree: '',
    collegeName: '',
    degreeWithMajors: '',
    durationFrom: '',
    durationTo: '',
    grade: '',
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const educationId = searchParams.get("educationId");
  const editMode = searchParams.get("edit") === "1";
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { userData, token } = useSelector((state) => state.status);

  useEffect(() => {
    if (editMode && educationId) {
      const fetchEducationData = async () => {
        try {
          setLoading(true);
          const education = userData?.user?.education?.find(edu => edu._id === educationId);
          if (education) {
            setFormData({
              degree: education.degree || '',
              collegeName: education.collegeName || '',
              degreeWithMajors: education.degreeWithMajors || '',
              durationFrom: education.from || '',
              durationTo: education.to || '',
              grade: education.grade || '',
            });
          }
        } catch (error) {
          // console.error("Error fetching education data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchEducationData();
    }
  }, [editMode, educationId, userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const previosRouteHandler = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Object.values(formData).every(Boolean)) {
      toast.error("Please fill all fields correctly...");
      return;
    }

    setLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      };

      const url= `${api}/education/${educationId}`
        

      const method = axios.put;

      const res=await method(url, formData, config);
      // console.log("resss", res)
      // dispatch(sUserData(res?.data?.user))
      toast.success('Education successfully updated');
      dispatch(ref());
      navigate(-1);
    } catch (error) {
      // console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50'>
      <div className='relative flex items-start justify-center min-h-screen px-4 py-10'>
        <div className='relative w-full max-w-4xl p-4 mx-auto bg-white shadow-xl rounded-xl sm:p-6'>
          <IconButton
            onClick={previosRouteHandler}
            className='absolute z-10 top-4 right-4'
          >
            <CancelIcon style={{ color: 'black', fontSize: 30 }} />
          </IconButton>

          <form
            className='grid grid-cols-1 gap-4 mt-10 sm:grid-cols-2'
            onSubmit={handleSubmit}
          >
            <div className='flex flex-col'>
              <label htmlFor='inputDegree' className='mb-1 text-gray-700'>Degree</label>
              <input
                type='text'
                id='inputDegree'
                name='degree'
                value={formData.degree}
                onChange={handleChange}
                className='p-2 border border-gray-300 rounded-md'
                placeholder='Degree'
                required
              />
            </div>

            <div className='flex flex-col'>
              <label htmlFor='inputCollegeName' className='mb-1 text-gray-700'>College Name</label>
              <input
                type='text'
                id='inputCollegeName'
                name='collegeName'
                value={formData.collegeName}
                onChange={handleChange}
                className='p-2 border border-gray-300 rounded-md'
                placeholder='Enter Your College Name'
                required
              />
            </div>

            <div className='flex flex-col'>
              <label htmlFor='inputDegreeWithMajors' className='mb-1 text-gray-700'>Majors</label>
              <input
                type='text'
                id='inputDegreeWithMajors'
                name='degreeWithMajors'
                value={formData.degreeWithMajors}
                onChange={handleChange}
                className='p-2 border border-gray-300 rounded-md'
                placeholder='Majors'
                required
              />
            </div>

            <div className='flex flex-col'>
              <label htmlFor='inputDurationFrom' className='mb-1 text-gray-700'>Duration (From)</label>
              <input
                type='month'
                id='inputDurationFrom'
                name='durationFrom'
                value={formData.durationFrom}
                onChange={handleChange}
                className='p-2 border border-gray-300 rounded-md'
                required
              />
            </div>

            <div className='flex flex-col'>
              <label htmlFor='inputDurationTo' className='mb-1 text-gray-700'>Duration (To)</label>
              <input
                type='month'
                id='inputDurationTo'
                name='durationTo'
                value={formData.durationTo}
                onChange={handleChange}
                className='p-2 border border-gray-300 rounded-md'
                required
              />
            </div>

            <div className='flex flex-col'>
              <label htmlFor='inputGrade' className='mb-1 text-gray-700'>Grade / Percentage</label>
              <input
                type='text'
                id='inputGrade'
                name='grade'
                value={formData.grade}
                onChange={handleChange}
                className='p-2 border border-gray-300 rounded-md'
                placeholder='Grade'
                required
              />
            </div>

            <div className='col-span-1 sm:col-span-2'>
              <button
                type='submit'
                className='w-full py-3 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600'
                disabled={loading}
              >
                {editMode ? 'Update Education' : 'Add Education'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EducationForm;
