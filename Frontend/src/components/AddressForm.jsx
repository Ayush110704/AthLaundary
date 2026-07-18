import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';

const AddressForm = ({ 
  isOpen, 
  onClose, 
  onSave, 
  address = null, 
  isLoading = false 
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    watermark: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false
  });

  // Update form data when address prop changes (for editing)
  useEffect(() => {
    if (address) {
      setFormData({
        fullName: address.fullName || '',
        phone: address.phone || '',
        addressLine1: address.addressLine1 || '',
        watermark: address.watermark || '',
        city: address.city || '',
        state: address.state || '',
        pincode: address.pincode || '',
        isDefault: address.isDefault || false
      });
    } else {
      // Reset form when adding new address
      setFormData({
        fullName: '',
        phone: '',
        addressLine1: '',
        watermark: '',
        city: '',
        state: '',
        pincode: '',
        isDefault: false
      });
    }
  }, [address]); // Re-run when address prop changes

  const states = [
    "Maharashtra", "Delhi", "Karnataka", "Gujarat", "Madhya Pradesh",
    "Rajasthan", "Uttar Pradesh", "Tamil Nadu", "Telangana", "Punjab"
  ];

  const cities = {
    Maharashtra: ["Nagpur", "Wardha", "Mumbai", "Pune", "Nashik", "Amravati"],
    Delhi: ["New Delhi", "Dwarka", "Rohini"],
    Karnataka: ["Bangalore", "Mysore"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
    "Madhya Pradesh": ["Indore", "Bhopal"],
    Rajasthan: ["Jaipur", "Udaipur"],
    "Uttar Pradesh": ["Lucknow", "Noida"],
    "Tamil Nadu": ["Chennai", "Coimbatore"],
    Telangana: ["Hyderabad"],
    Punjab: ["Ludhiana", "Amritsar"]
  };

  const handleSubmit = () => {
    if (!formData.fullName || !formData.phone || !formData.addressLine1 || 
        !formData.city || !formData.state || !formData.pincode) {
      Swal.fire({
        title: 'Missing Fields',
        text: 'Please fill in all required fields',
        icon: 'warning',
        confirmButtonColor: '#2563eb'
      });
      return;
    }

    onSave(formData);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      phone: '',
      addressLine1: '',
      watermark: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: false
    });
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', damping: 25, stiffness: 300 }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000]"
            onClick={onClose}
          />
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="modal-content fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl w-[90%] max-w-md z-[10001] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <style>
              {`
                .modal-content {
                  scrollbar-width: none;
                  -ms-overflow-style: none;
                }
                .modal-content::-webkit-scrollbar {
                  display: none;
                }
                input:focus, select:focus, textarea:focus {
                  outline: none;
                }
              `}
            </style>

            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 rounded-t-3xl z-10">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  <i className={`fa-solid ${address ? 'fa-pen' : 'fa-plus'} text-white`}></i>
                  {address ? 'Edit Address' : 'Add Address'}
                </h3>
                <button
                  onClick={() => {
                    onClose();
                    resetForm();
                  }}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition text-white text-xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  <i className="fa-solid fa-user text-blue-600 mr-1"></i> Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  <i className="fa-solid fa-phone text-blue-600 mr-1"></i> Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  maxLength="10"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  <i className="fa-solid fa-location-dot text-blue-600 mr-1"></i> Address Line 1 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="House number, building, street"
                  value={formData.addressLine1}
                  onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  <i className="fa-solid fa-water text-blue-400 mr-1"></i> Landmark (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Apartment, floor, landmark"
                  value={formData.watermark}
                  onChange={(e) => setFormData({ ...formData, watermark: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({
                      ...formData,
                      state: e.target.value,
                      city: ""
                    })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <option value="">Select State</option>
                    {states.map((state, index) => (
                      <option key={index} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    City <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({
                      ...formData,
                      city: e.target.value
                    })}
                    disabled={!formData.state}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed bg-gray-50"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <option value="">{formData.state ? 'Select City' : 'Select state first'}</option>
                    {formData.state && cities[formData.state]?.map((city, index) => (
                      <option key={index} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  <i className="fa-solid fa-map-pin text-blue-600 mr-1"></i> Pincode <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="6-digit pincode"
                  maxLength="6"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={formData.isDefault}
                  onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="isDefault" className="text-sm text-gray-700 cursor-pointer" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  <i className="fa-regular fa-star text-green-600 mr-1"></i>
                  Set as default address
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
                >
                  {isLoading ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin"></i>
                      {address ? 'Updating...' : 'Adding...'}
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-save"></i>
                      {address ? 'Update Address' : 'Save Address'}
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    onClose();
                    resetForm();
                  }}
                  className="flex-1 border border-gray-200 py-3 rounded-xl font-medium hover:bg-gray-50 transition"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddressForm;