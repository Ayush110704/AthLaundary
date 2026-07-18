import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AddressForm from '../components/AddressForm';
import UserLayout from './UserLayout';

const Address = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    loadUserData();
    loadAddresses();
  }, []);

  const loadUserData = () => {
    const user = JSON.parse(localStorage.getItem('currentUser')) || JSON.parse(localStorage.getItem('freshUser')) || {};
    setUserData(user);
  };

  const loadAddresses = async () => {
    const user = JSON.parse(localStorage.getItem('currentUser')) || JSON.parse(localStorage.getItem('freshUser')) || {};
    const email = user.Email || user.email;
    if (!email) return;
    
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/addresses?email=${encodeURIComponent(email)}`);
      const json = await res.json();
      if (json.success && json.data) {
        setAddresses(json.data);
      }
    } catch (err) {
      console.error('Failed to load addresses:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAddress = async (formData) => {
    const user = JSON.parse(localStorage.getItem('currentUser')) || JSON.parse(localStorage.getItem('freshUser')) || {};
    const email = user.Email || user.email;
    if (!email) {
      Swal.fire({
        icon: 'error',
        title: 'Authentication Required',
        text: 'Please log in to add an address.',
        confirmButtonColor: '#2563eb'
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/addresses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, email })
      });
      const json = await res.json();
      if (json.success) {
        setShowAddModal(false);
        await loadAddresses();
        Swal.fire({
          title: 'Address Added! 🎉',
          text: 'Your address has been added successfully!',
          icon: 'success',
          confirmButtonColor: '#2563eb',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
          background: '#ffffff',
          customClass: {
            popup: 'rounded-2xl'
          }
        });
      }
    } catch (err) {
      console.error('Error adding address:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditAddress = async (formData) => {
    if (!selectedAddress) return;
    const addressId = selectedAddress._id || selectedAddress.id;

    setIsLoading(true);
    try {
     const res = await fetch(`${API_URL}/api/addresses/${addressId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const json = await res.json();
      if (json.success) {
        setShowEditModal(false);
        setSelectedAddress(null);
        await loadAddresses();
        Swal.fire({
          title: 'Address Updated! ✅',
          text: 'Your address has been updated successfully!',
          icon: 'success',
          confirmButtonColor: '#2563eb',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
          background: '#ffffff',
          customClass: {
            popup: 'rounded-2xl'
          }
        });
      }
    } catch (err) {
      console.error('Error editing address:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAddress = (address) => {
    const addressId = address._id || address.id;
    Swal.fire({
      title: 'Delete Address?',
      html: `Are you sure you want to delete <strong>${address.fullName}</strong>?<br>This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      background: '#ffffff',
      customClass: {
        popup: 'rounded-2xl'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        try {
          const res = await fetch(`${API_URL}/api/addresses/${addressId}`, {
            method: 'DELETE'
          });
          const json = await res.json();
          if (json.success) {
            await loadAddresses();
            Swal.fire({
              title: 'Deleted!',
              text: 'Address has been deleted.',
              icon: 'success',
              confirmButtonColor: '#2563eb',
              timer: 1500,
              showConfirmButton: false,
              background: '#ffffff',
              customClass: {
                popup: 'rounded-2xl'
              }
            });
          }
        } catch (err) {
          console.error('Error deleting address:', err);
        } finally {
          setIsLoading(false);
        }
      }
    });
  };

  const handleToggleDefault = (address) => {
    const addressId = address._id || address.id;
    Swal.fire({
      title: 'Set as Default?',
      text: `Make ${address.fullName} your default delivery address?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, set as default',
      cancelButtonText: 'Cancel',
      background: '#ffffff',
      customClass: {
        popup: 'rounded-2xl'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        try {
          const res = await fetch(`${API_URL}/api/addresses/${addressId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isDefault: true })
          });
          const json = await res.json();
          if (json.success) {
            await loadAddresses();
          }
        } catch (err) {
          console.error('Error setting default address:', err);
        } finally {
          setIsLoading(false);
        }
      }
    });
  };

  const AddressCard = ({ address }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, boxShadow: '0 20px 25px -12px rgba(37, 99, 235, 0.15)' }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
    >
      <div className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-indigo-500/20">
              <span className="text-white font-bold text-lg">
                {address.fullName?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-gray-800 text-base">{address.fullName}</h3>
                {address.isDefault && (
                  <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-2.5 py-0.5 rounded-lg text-xs font-semibold shadow-sm">
                    <i className="fa-solid fa-check-circle mr-1"></i>
                    Default
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-600 mt-1 space-y-0.5">
                <div className="flex items-start gap-2">
                  <i className="fa-solid fa-location-dot text-indigo-500 text-xs mt-1"></i>
                  <span>
                    {address.addressLine1}
                    {address.watermark && `, ${address.watermark}`}
                    {address.landmark && `, ${address.landmark}`}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 ml-5">
                  <span>{address.city}</span>
                  {address.state && <span>, {address.state}</span>}
                  <span>- {address.pincode}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 ml-5">
                  <i className="fa-solid fa-phone text-indigo-500 text-[10px]"></i>
                  <span>+91 {address.phone}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-1.5 ml-0 sm:ml-4 flex-wrap">
            {!address.isDefault && (
              <button
                onClick={() => handleToggleDefault(address)}
                className="text-xs text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 px-3 py-1.5 rounded-xl transition-colors font-medium"
              >
                <i className="fa-regular fa-star mr-1"></i>
                Default
              </button>
            )}
            <button
              onClick={() => {
                setSelectedAddress(address);
                setShowEditModal(true);
              }}
              className="text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-3 py-1.5 rounded-xl transition-colors font-medium"
            >
              <i className="fa-regular fa-pen-to-square mr-1"></i>
              Edit
            </button>
            <button
              onClick={() => handleDeleteAddress(address)}
              className="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-xl transition-colors font-medium"
            >
              <i className="fa-regular fa-trash-can mr-1"></i>
              Delete
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <UserLayout>
      <div className="w-full max-w-6xl mx-auto">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&family=Montserrat:wght@400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        
        <style>
          {`
            input:focus, select:focus, textarea:focus {
              outline: none;
            }
          `}
        </style>

        <div className="py-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-800" style={{ fontFamily: "'Playfair Display', serif" }}>
                  <i className="fa-solid fa-address-book text-indigo-600 mr-3"></i>
                  Address Book
                </h1>
                <p className="text-slate-500 mt-1 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Manage your delivery addresses
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-6 py-2.5 rounded-2xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all w-full sm:w-auto justify-center font-semibold text-sm"
              >
                <i className="fa-solid fa-plus"></i>
                Add New Address
              </motion.button>
            </div>
          </motion.div>

          {addresses.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-sm border border-slate-200/70 p-16 text-center"
            >
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-3xl flex items-center justify-center mb-6">
                  <i className="fa-solid fa-location-dot text-5xl text-indigo-600"></i>
                </div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-2">No Addresses Yet</h3>
                <p className="text-slate-500 mb-8 max-w-md text-sm">
                  Add your first delivery address to start shopping and get your orders delivered smoothly.
                </p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-8 py-3 rounded-2xl hover:shadow-lg transition-all flex items-center gap-2 font-semibold text-sm"
                >
                  <i className="fa-solid fa-plus"></i>
                  Add Your First Address
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {addresses.map((address) => (
                <AddressCard key={address._id || address.id} address={address} />
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 hover:gap-2 transition-all"
            >
              <i className="fa-solid fa-arrow-left"></i> Back to Home
            </button>
            <button
              onClick={() => navigate('/user-profile')}
              className="text-sm text-slate-500 hover:text-slate-700 font-medium flex items-center gap-1 transition-all"
            >
              <i className="fa-solid fa-user"></i> My Profile
            </button>
          </div>
        </div>

        {/* Add Address Modal */}
        <AddressForm
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddAddress}
          isLoading={isLoading}
        />

        {/* Edit Address Modal */}
        <AddressForm
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedAddress(null);
          }}
          onSave={handleEditAddress}
          address={selectedAddress}
          isLoading={isLoading}
        />
      </div>
    </UserLayout>
  );
};

export default Address;