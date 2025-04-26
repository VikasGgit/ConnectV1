

import React, { useState, useEffect } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { ref } from '../features/user/refreshSlice';
import Spinner from '../Spinner';
import { SOCKET_API as scket , API_URL as api, } from "../../config/variable";

const SkillsForm = () => {
  const [skill, setSkill] = useState('');
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { userData, token } = useSelector((state) => state.status);
  const userDetails = userData;

  useEffect(() => {
    if (userDetails?.user?.skills) {
      setSkills(userDetails?.user?.skills);
    }
  }, [userDetails]);

  const handleAddSkill = () => {
    if (skill.trim() && !skills.includes(skill.trim())) {
      setSkills([...skills, skill.trim()]);
      setSkill('');
    } else if (skills.includes(skill.trim())) {
      toast.warning('Skill already exists');
    }
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const navigate = useNavigate();
  const previosRouteHandler = () => navigate(-1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (skills.length === 0) {
      toast.error('Please add at least one skill');
      return;
    }

    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };

      await axios.put(
        `${api}/skills/${userData.user._id}`,
        { skills },
        config
      );

      toast.success('Skills updated successfully');
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
        <div className='relative w-full max-w-2xl p-4 mx-auto bg-white shadow-xl rounded-xl sm:p-6'>
          <IconButton
            onClick={previosRouteHandler}
            className='absolute z-10 top-4 right-4'
          >
            <CancelIcon style={{ color: 'black', fontSize: 30 }} />
          </IconButton>

          <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-4 mt-10'>
            <div className='flex flex-col gap-4 sm:flex-row'>
              <input
                type='text'
                className='flex-1 p-3 border border-gray-300 rounded-md'
                placeholder='Enter a skill'
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                type='button'
                className='px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50'
                onClick={handleAddSkill}
                disabled={!skill.trim()}
              >
                Add
              </button>
            </div>

            <div>
              {skills.length > 0 ? (
                <div className='flex flex-wrap gap-2'>
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className='flex items-center px-3 py-1 bg-gray-100 border border-gray-300 rounded-full shadow-sm'
                    >
                      <span className='mr-2 text-gray-700'>{skill}</span>
                      <button
                        type='button'
                        className='text-red-500 hover:text-red-700'
                        onClick={() => handleRemoveSkill(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className='text-center text-gray-500'>No skills added yet</p>
              )}
            </div>

            <button
              type='submit'
              className='w-full py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50'
              disabled={loading || skills.length === 0}
            >
              Save Skills
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;
