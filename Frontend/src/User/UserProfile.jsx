import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import UserLayout from './UserLayout';

const Profile = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [editProfileData, setEditProfileData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    dob: '',
    joiningDate: ''
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const calculateProfileCompletion = (data) => {
    const fields = [
      { key: 'name', weight: 20 },
      { key: 'email', weight: 20 },
      { key: 'mobile', weight: 20 },
      { key: 'address', weight: 20 },
      { key: 'dob', weight: 20 }
    ];

    let completedFields = 0;
    let totalWeight = 0;

    fields.forEach(field => {
      totalWeight += field.weight;
      const value = data[field.key];
      if (value && value.toString().trim() !== '' && value !== 'Not specified' && value !== '-') {
        completedFields += field.weight;
      }
    });

    if (data.name && data.name.trim() !== '') {
      const nameParts = data.name.trim().split(' ');
      if (nameParts.length >= 2) {
        completedFields += 5;  
      }
    }
 
    return Math.min(Math.round((completedFields / totalWeight) * 100), 100);
  };

  const normalizeUser = (user) => {
    if (!user) return {};
    const firstName = user.firstName || user.FirstName || '';
    const lastName = user.lastName || user.LastName || '';
    const email = user.email || user.Email || '';
    const phone = user.phone || user.number || user.mobile || '';
    const address = user.address || user.Address || '';
    const dob = user.dob || '';
    const joiningDate = user.createdAt || user.joiningDate || new Date().toISOString();
    
    return {
      ...user,
      id: user._id || user.id,
      _id: user._id || user.id,
      firstName,
      FirstName: firstName,
      lastName,
      LastName: lastName,
      name: `${firstName} ${lastName}`.trim(),
      email,
      Email: email,
      phone,
      number: phone,
      mobile: phone,
      address,
      Address: address,
      dob,
      createdAt: joiningDate,
      joiningDate: new Date(joiningDate).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    };
  };

  const loadUserData = async () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      navigate('/login');
      return;
    }

    let user = currentUser;
    try {
      const userId = currentUser.id || currentUser._id;
      if (userId) {
        const response = await axios.get(`${API_URL}/api/auth/profile/${userId}`);
        if (response.data.success && response.data.user) {
          user = response.data.user;
        }
      }
    } catch (err) {
      console.warn("Could not fetch profile from server, using local data:", err);
    }

    const normalized = normalizeUser(user);
    setUserData(normalized);
    const completion = calculateProfileCompletion(normalized);
    setProfileCompletion(completion);

    setEditProfileData({
      name: normalized.name,
      email: normalized.email,
      mobile: normalized.mobile,
      address: normalized.address,
      dob: normalized.dob,
      joiningDate: normalized.joiningDate
    });

    localStorage.setItem('currentUser', JSON.stringify(normalized));
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userId = currentUser?.id || currentUser?._id;
    
    const nameParts = editProfileData.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    
    let updatedUser = {
      ...currentUser,
      firstName,
      FirstName: firstName,
      lastName,
      LastName: lastName,
      name: editProfileData.name,
      email: editProfileData.email,
      Email: editProfileData.email,
      phone: editProfileData.mobile,
      number: editProfileData.mobile,
      mobile: editProfileData.mobile,
      address: editProfileData.address,
      Address: editProfileData.address,
      dob: editProfileData.dob,
    };
    
    try {
      if (userId) {
        const response = await axios.put(`${API_URL}/api/auth/update-profile`, {
          userId,
          firstName,
          lastName,
          email: editProfileData.email,
          phone: editProfileData.mobile,
          address: editProfileData.address,
          dob: editProfileData.dob
        });
        
        if (response.data.success && response.data.user) {
          updatedUser = normalizeUser(response.data.user);
        }
      }
    } catch (err) {
      console.error("Failed to update profile on backend:", err);
    }
    
    const allUsers = JSON.parse(localStorage.getItem('Users')) || [];
    const updatedUsers = allUsers.map(u => {
      if (u.Email === currentUser.Email || u.email === currentUser.email) {
        return {
          ...u,
          ...updatedUser
        };
      }
      return u;
    });
    localStorage.setItem('Users', JSON.stringify(updatedUsers));
    
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    setUserData(updatedUser);
    const completion = calculateProfileCompletion(updatedUser);
    setProfileCompletion(completion);
    
    setShowEditProfileModal(false);
    setIsLoading(false);
    
    Swal.fire({
      title: 'Profile Updated!',
      text: 'Your profile has been updated successfully!',
      icon: 'success',
      confirmButtonColor: '#10b981',
      timer: 2000,
      timerProgressBar: true,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      }
    });
  };

  const handleFieldClick = (field) => {
    setEditingField(field);
    setTimeout(() => {
      document.getElementById(field)?.focus();
    }, 100);
  };

  const handleCancelEdit = () => { 
    const hasChanges = 
      editProfileData.name !== userData.name ||
      editProfileData.email !== userData.email ||
      editProfileData.mobile !== userData.mobile ||
      editProfileData.address !== userData.address ||
      editProfileData.dob !== userData.dob;

    if (hasChanges) {
      Swal.fire({
        title: 'Discard Changes?',
        text: 'Are you sure you want to discard your changes?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, discard',
        cancelButtonText: 'Keep editing'
      }).then((result) => {
        if (result.isConfirmed) {
          setShowEditProfileModal(false);
          loadUserData();
        }
      });
    } else {
      setShowEditProfileModal(false);
    }
  };

  const handleCloseModal = () => { 
    const hasChanges = 
      editProfileData.name !== userData.name ||
      editProfileData.email !== userData.email ||
      editProfileData.mobile !== userData.mobile ||
      editProfileData.address !== userData.address ||
      editProfileData.dob !== userData.dob;

    if (hasChanges) {
      Swal.fire({
        title: 'Discard Changes?',
        text: 'Are you sure you want to discard your changes?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, discard',
        cancelButtonText: 'Keep editing'
      }).then((result) => {
        if (result.isConfirmed) {
          setShowEditProfileModal(false);
          loadUserData();
        }
      });
    } else {
      setShowEditProfileModal(false);
    }
  };

  const getCompletionColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-blue-500';
    if (percentage >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const FieldCard = ({ icon, iconColor, label, value, field, onClick }) => (
    <motion.div
      whileHover={{ 
        y: -2, 
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="p-4 rounded-xl bg-white border border-gray-200 cursor-pointer hover:border-blue-400 transition-colors duration-200 group relative"
    >
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <i className="fas fa-pen text-xs text-blue-500"></i>
      </div>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2">
        <i className={`${icon} ${iconColor} text-base`}></i>
        {label}
      </p>
      <p className="text-sm font-medium text-gray-800 mt-1">
        {value || '-'}
      </p>
    </motion.div>
  );

  return (
    <UserLayout>
      <div className="w-full">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-blue-50 to-white">
          <div>
            <h2 className="text-xl font-bold text-black flex items-center gap-2">
              <i className="fas fa-user-circle text-blue-600 text-2xl"></i>
              My Profile
            </h2>
            <p className="text-sm text-gray-600 mt-1">View and manage your personal details</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "#1d4ed8" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowEditProfileModal(true)} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <i className="fas fa-pen text-white text-sm"></i>
            Edit Profile
          </motion.button>
        </div>
          
        {/* User Details */}
        <div className="p-8 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldCard
              icon="fas fa-user"
              iconColor="text-blue-600"
              label="Full Name"
              value={userData.name}
              field="name"
              onClick={() => handleFieldClick('name')}
            />
            <FieldCard
              icon="fas fa-calendar-alt"
              iconColor="text-purple-600"
              label="Joining Date"
              value={userData.joiningDate}
              field="joiningDate"
              onClick={() => handleFieldClick('joiningDate')}
            />
            <FieldCard
              icon="fas fa-envelope"
              iconColor="text-red-600"
              label="Email Address"
              value={userData.email}
              field="email"
              onClick={() => handleFieldClick('email')}
            />
            <FieldCard
              icon="fas fa-phone"
              iconColor="text-green-600"
              label="Mobile Number"
              value={userData.mobile ? `${userData.mobile}` : '-'}
              field="mobile"
              onClick={() => handleFieldClick('mobile')}
            />
            <FieldCard
              icon="fas fa-map-marker-alt"
              iconColor="text-orange-600"
              label="Address"
              value={userData.address || 'Not specified'}
              field="address"
              onClick={() => handleFieldClick('address')}
            />
            <FieldCard
              icon="fas fa-birthday-cake"
              iconColor="text-pink-600"
              label="Date of Birth"
              value={userData.dob || 'Not specified'}
              field="dob"
              onClick={() => handleFieldClick('dob')}
            />
          </div>

          {/* Quick Stats  */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 grid grid-cols-3 gap-2 md:gap-4"
          >
            {/* Member Since */}
            <div className="bg-white rounded-xl p-2 md:p-4 border border-gray-200 text-center flex flex-col justify-center">
              <p className="text-[10px] md:text-xs text-gray-500">Member Since</p>
              <p className="text-[11px] md:text-sm font-semibold text-gray-800 mt-0.5 md:mt-1 truncate">
                {userData.joiningDate || 'N/A'}
              </p>
            </div>

            {/* Profile Status */}
            {/* <div className="bg-white rounded-xl p-2 md:p-4 border border-gray-200 text-center flex flex-col justify-center">
              <p className="text-[10px] md:text-xs text-gray-500">Profile Status</p>
              <p className="text-[11px] md:text-sm font-semibold text-green-600 mt-0.5 md:mt-1">
                <i className="fas fa-check-circle mr-0.5 md:mr-1 text-[10px] md:text-sm"></i> 
                <span className="text-[11px] md:text-sm">Active</span>
              </p>
            </div> */}

            {/* Profile Complete */}
            <div className="bg-white rounded-xl p-2 md:p-4 border border-gray-200 flex flex-col items-center justify-center"> 
              <div className="relative inline-flex items-center justify-center md:hidden">
                <svg className="w-14 h-14 transform -rotate-90">
                  {/* Background circle */}
                  <circle
                    className="text-gray-200"
                    strokeWidth="5"
                    stroke="currentColor"
                    fill="transparent"
                    r="24"
                    cx="28"
                    cy="28"
                  /> 
                  <circle
                    className="text-green-500 transition-all duration-1000 ease-out"
                    strokeWidth="5"
                    strokeDasharray={2 * Math.PI * 24}
                    strokeDashoffset={2 * Math.PI * 24 * (1 - profileCompletion / 100)}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="24"
                    cx="28"
                    cy="28"
                  />
                </svg>
                <span className="absolute text-[11px] font-bold text-gray-800">
                  {profileCompletion}%
                </span>
              </div>

              {/* Desktop: Horizontal Progress Bar */}
              <div className="hidden md:block w-full">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-xs text-gray-500">Profile Complete</p>
                  <span className="text-sm font-bold text-green-600">
                    {profileCompletion}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${profileCompletion}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-green-500 rounded-full transition-all"
                  />
                </div>
              </div>
            
              <p className="text-[10px] md:hidden text-gray-500 mt-1">Complete</p>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="px-8 py-3 bg-gray-50/80 border-t border-gray-100 flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 hover:gap-2 transition-all"
          >
            <i className="fas fa-arrow-left"></i> Back to Home
          </button>
          <button
            onClick={() => window.location.reload()}
            className="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1"
          >
            <i className="fas fa-sync-alt text-xs"></i> Refresh
          </button>
        </div>

        {/* Edit Profile Modal */}
        <AnimatePresence>
          {showEditProfileModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000] flex items-center justify-center p-4"
              onClick={handleCloseModal}
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-5">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                      <i className="fas fa-edit text-xl"></i>
                      Edit Profile
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">Update your personal information</p>
                  </div>
                  <motion.button 
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCloseModal} 
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <i className="fas fa-times text-gray-600"></i>
                  </motion.button>
                </div>
                
                <div className="space-y-4">
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      <i className="fas fa-user text-blue-500 mr-2"></i>
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={editProfileData.name}
                      onChange={(e) => setEditProfileData({ ...editProfileData, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                      placeholder="Enter your full name"
                    />
                  </motion.div>

                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      <i className="fas fa-envelope text-red-500 mr-2"></i>
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={editProfileData.email}
                      onChange={(e) => setEditProfileData({ ...editProfileData, email: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                      placeholder="Enter your email"
                    />
                  </motion.div>

                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.18 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      <i className="fas fa-phone text-green-500 mr-2"></i>
                      Mobile Number
                    </label>
                    <input
                      id="mobile"
                      type="text"
                      value={editProfileData.mobile}
                      onChange={(e) => setEditProfileData({ ...editProfileData, mobile: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                      placeholder="Enter your mobile number"
                    />
                  </motion.div>

                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.22 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      <i className="fas fa-map-marker-alt text-orange-500 mr-2"></i>
                      Address
                    </label>
                    <input
                      id="address"
                      type="text"
                      value={editProfileData.address}
                      onChange={(e) => setEditProfileData({ ...editProfileData, address: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                      placeholder="Enter your address"
                    />
                  </motion.div>

                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      <i className="fas fa-birthday-cake text-pink-500 mr-2"></i>
                      Date of Birth
                    </label>
                    <input
                      id="dob"
                      type="date"
                      value={editProfileData.dob}
                      onChange={(e) => setEditProfileData({ ...editProfileData, dob: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                    />
                  </motion.div>
                </div>
                
                <div className="flex gap-3 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSaveProfile}
                    disabled={isLoading}
                    className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Saving...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save"></i>
                        Save Changes
                      </>
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCancelEdit}
                    className="flex-1 border border-gray-300 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </UserLayout>
  );
};

export default Profile;