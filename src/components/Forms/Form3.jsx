
import React, { useState, useEffect } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from '../Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { ref } from '../features/user/refreshSlice';
import { SOCKET_API as scket , API_URL as api, } from "../../config/variable";

const ProjectsForm = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    durationFrom: '',
    durationTo: '',
    projectDescription: '',
    projectLink: '',
  });

  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("projectId");
  const editMode = searchParams.get("edit") === "1";

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { userData, token } = useSelector((state) => state.status);
  const userDetails = userData;

  useEffect(() => {
    if (editMode && projectId) {
      const fetchProjectData = async () => {
        try {
          setLoading(true);
          const project = userDetails?.user.projects?.find(proj => proj._id === projectId);
          if (project) {
            setFormData({
              projectName: project.projectName || '',
              durationFrom: project.durationFrom || '',
              durationTo: project.durationTO || '',
              projectDescription: project.projectDescription || '',
              projectLink: project.projectLink || '',
            });
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching project data:", error);
          setLoading(false);
        }
      };
      fetchProjectData();
    }
  }, [editMode, projectId, userDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();
  const previosRouteHandler = () => navigate(-1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.projectName || !formData.durationFrom || !formData.durationTo || !formData.projectDescription) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      };

      const response = await axios.put(`${api}/project/${projectId}`, formData, config)
       
      toast.success('Project successfully updated');
      dispatch(ref());
      navigate(-1);
    } catch (error) {
      console.error('Error:', error);
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

          <form className='grid grid-cols-1 gap-4 mt-10 md:grid-cols-2' onSubmit={handleSubmit}>
            <div className='flex flex-col'>
              <label htmlFor='inputProjectName' className='mb-1 text-gray-700'>Project Name*</label>
              <input
                type='text'
                id='inputProjectName'
                name='projectName'
                value={formData.projectName}
                onChange={handleChange}
                className='p-2 border border-gray-300 rounded-md'
                placeholder='Enter Project Name'
                required
              />
            </div>

            <div className='flex flex-col'>
              <label htmlFor='inputDurationFrom' className='mb-1 text-gray-700'>Duration (From)*</label>
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
              <label htmlFor='inputDurationTo' className='mb-1 text-gray-700'>Duration (To)*</label>
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

            <div className='flex flex-col md:col-span-2'>
              <label htmlFor='inputProjectDescription' className='mb-1 text-gray-700'>Project Description*</label>
              <textarea
                id='inputProjectDescription'
                name='projectDescription'
                rows='4'
                value={formData.projectDescription}
                onChange={handleChange}
                className='p-2 border border-gray-300 rounded-md'
                placeholder='Project Description'
                required
              ></textarea>
            </div>

            <div className='flex flex-col md:col-span-2'>
              <label htmlFor='inputProjectLink' className='mb-1 text-gray-700'>Project Link</label>
              <input
                type='url'
                id='inputProjectLink'
                name='projectLink'
                value={formData.projectLink}
                onChange={handleChange}
                className='p-2 border border-gray-300 rounded-md'
                placeholder='Project Link (optional)'
              />
            </div>

            <div className='col-span-1 md:col-span-2'>
              <button
                type='submit'
                className='w-full py-3 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50'
                disabled={loading}
              >
                {editMode ? 'Update Project' : 'Add Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectsForm;
