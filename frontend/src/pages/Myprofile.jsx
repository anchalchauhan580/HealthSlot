import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function Myprofile() {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  
  // Form data for editing
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: { line: '', line2: '' },
    gender: '',
    dob: ''
  });

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'line' || name === 'line2') {
      setFormData({ 
        ...formData, 
        address: { ...formData.address, [name]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handler for image change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handler for Edit button
  const handleEdit = () => {
    setIsEditing(true);
    // Sync formData with current userData
    setFormData({
      name: userData.name || '',
      phone: userData.phone || '',
      address: userData.address || { line: '', line2: '' },
      gender: userData.gender || '',
      dob: userData.dob || ''
    });
  };

  // Handler for Save button
  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('address', JSON.stringify(formData.address));
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('dob', formData.dob);
      
      if (image) {
        formDataToSend.append('image', image);
      }

      const { data } = await axios.post(
        backendUrl + '/api/user/update-profile',
        formDataToSend,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData(); // Reload user data
        setIsEditing(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Handler for Cancel button
  const handleCancel = () => {
    setIsEditing(false);
    setImage(null);
  };
  
  // Custom Input/Text Field Component
  const ProfileField = ({ label, name, value, inputType = 'text' }) => (
    <div className='flex flex-col sm:flex-row sm:items-center py-2'>
      <p className='w-40 font-medium text-gray-700 text-sm'>{label}:</p>
      
      {isEditing ? (
        inputType === 'select' ? (
          <select
            name={name}
            value={value}
            onChange={handleChange}
            className='border border-gray-300 p-2 rounded-lg flex-1 mt-1 sm:mt-0 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors'
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        ) : (
          <input 
            type={inputType}
            name={name}
            value={value}
            onChange={handleChange}
            className='border border-gray-300 p-2 rounded-lg flex-1 mt-1 sm:mt-0 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors'
          />
        )
      ) : (
        <p className='text-gray-900 font-normal flex-1'>{value || 'Not provided'}</p>
      )}
    </div>
  );

  // Show loading if userData not loaded yet
  if (!userData) {
    return (
      <div className='max-w-5xl mx-auto py-12 px-4'>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className='max-w-5xl mx-auto py-12 px-4'>
      
      {/* Profile Header (Image and Name) */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-10 border-b border-gray-200'>
        <div className='relative'>
          <img 
            src={image ? URL.createObjectURL(image) : userData.image} 
            alt="Profile" 
            className='w-28 h-28 rounded-full object-cover border-4 border-gray-100 shadow-md'
          />
          {isEditing && (
            <label className='absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700'>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                className='hidden'
              />
              📷
            </label>
          )}
        </div>
        <div>
          <h2 className='text-3xl font-bold text-gray-900'>{userData.name}</h2>
          <p className='text-sm text-gray-500'>{userData.email}</p>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className='mt-10 p-6 bg-white rounded-xl shadow-sm border border-gray-100'>
        <h3 className='text-lg font-extrabold text-blue-600 border-b border-gray-200 pb-3 mb-4 uppercase tracking-wider'>
          Contact Information
        </h3>
        
        <ProfileField 
          label="Email id" 
          name="email" 
          value={userData.email}
          inputType="email"
        />
        <ProfileField 
          label="Phone" 
          name="phone" 
          value={isEditing ? formData.phone : userData.phone} 
        />
        <div className='flex flex-col sm:flex-row sm:items-center py-2'>
          <p className='w-40 font-medium text-gray-700 text-sm'>Address:</p>
          {isEditing ? (
            <div className='flex-1 mt-1 sm:mt-0'>
              <input 
                type="text"
                name="line"
                placeholder="Address Line"
                value={formData.address.line}
                onChange={handleChange}
                className='border border-gray-300 p-2 rounded-lg w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors'
              />
              <input 
                type="text"
                name="line2"
                placeholder="Address Line 2"
                value={formData.address.line2}
                onChange={handleChange}
                className='border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors'
              />
            </div>
          ) : (
            <p className='text-gray-900 font-normal flex-1'>
              {userData.address?.line && userData.address?.line2 
                ? `${userData.address.line}, ${userData.address.line2}`
                : 'Not provided'}
            </p>
          )}
        </div>
      </div>

      {/* Basic Information Section */}
      <div className='mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100'>
        <h3 className='text-lg font-extrabold text-blue-600 border-b border-gray-200 pb-3 mb-4 uppercase tracking-wider'>
          Basic Information
        </h3>
        
        <ProfileField 
          label="Gender" 
          name="gender" 
          value={isEditing ? formData.gender : userData.gender}
          inputType={isEditing ? 'select' : 'text'}
        />
        <ProfileField 
          label="Birthday" 
          name="dob" 
          value={isEditing ? formData.dob : userData.dob} 
          inputType="date"
        />
      </div>

      {/* Action Buttons */}
      <div className='mt-10 flex gap-4'>
        {!isEditing ? (
          <button 
            onClick={handleEdit} 
            className='bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition-colors'
          >
            Edit Profile
          </button>
        ) : (
          <>
            <button 
              onClick={handleSave} 
              className='bg-green-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-green-700 transition-colors'
            >
              Save Information
            </button>
            <button 
              onClick={handleCancel} 
              className='border border-gray-300 text-gray-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors'
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Myprofile;