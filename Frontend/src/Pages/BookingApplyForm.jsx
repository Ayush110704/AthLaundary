import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  Shirt,
  ClipboardList,
  CheckCircle2,
  Trash2
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { getCheckoutData, saveCheckoutData } from "../utils/checkoutStorage";
import { DEFAULT_CATEGORY_ITEMS } from "../Data/LaundaryData.js";
import Swal from 'sweetalert2'

const BookingApplyForm = ({ checkoutData, setCheckoutData, setCurrentStep, }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    altPhone: "",
    email: "",
    serviceType: "",
    clothType: "",
    quantity: "",
    instructions: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [dbServices, setDbServices] = useState([]);
  const navigate = useNavigate();

  // Load user data from localStorage on component mount and fetch DB services
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const loadCurrentUserProfile = async () => {
      const userId = currentUser?.id || currentUser?._id;

      if (!userId) {
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/auth/profile/${userId}`);
        const result = await res.json();

        if (res.ok && result?.user) {
          const { firstName, lastName, email, phone } = result.user;
          const fullName = [firstName, lastName].filter(Boolean).join(" ");

          if (fullName || email || phone) {
            setFormData((prev) => ({
              ...prev,
              fullName,
              email: email || "",
              phone: phone || "",
            }));
          }
        }
      } catch (error) {
        console.error("Error loading current user profile in BookingApplyForm:", error);
      }
    };

    loadCurrentUserProfile();

    const fetchServices = async () => {
      try {
        const res = await fetch(`${API_URL}/api/services`);
        const result = await res.json();
        if (result.success) {
          setDbServices(result.data);
        }
      } catch (error) {
        console.error("Error fetching services in BookingApplyForm:", error);
      }
    };
    fetchServices();
  }, []);

  const cardBase =
    "rounded-[22px] sm:rounded-[28px] border border-white/60 bg-white/85 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.08)]";

  const inputStyle =
    "w-full rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white px-4 py-3 sm:py-3.5 text-sm sm:text-base text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100";

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter valid 10 digit number";
    }

    if (formData.altPhone.trim() && !/^[0-9]{10}$/.test(formData.altPhone)) {
      newErrors.altPhone = "Enter valid 10 digit number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter valid email address";
    }

  

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };
      if (name === "serviceType") {
        updated.clothType = "";
      }
      return updated;
    });

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (submitted) setSubmitted(false);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const validationErrors = validate();

    if ((checkoutData.items || []).length === 0) {
    validationErrors.items = "Please add at least one item.";
  }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

const updatedCheckoutData = {
    ...checkoutData,
    altPhone: formData.altPhone,
    instructions: formData.instructions,
  };

  setCheckoutData(updatedCheckoutData);
  saveCheckoutData(updatedCheckoutData);


    console.log("Booking Submitted:", updatedCheckoutData);
    setSubmitted(true);

const swalResult = await Swal.fire({
  icon: "success",
  title: "Items Added !",
  text: "Your Items has been added successfully.",
  confirmButtonText: "OK",
  confirmButtonColor: "#06b6d4",
});

if (swalResult.isConfirmed) {
  setCurrentStep(2);
}

  

  
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    // Resetting form fields but preserving pre-filled data from localStorage
    setFormData({
      fullName: currentUser ? `${currentUser.FirstName} ${currentUser.LastName}` : "",
      phone: currentUser ? currentUser.number : "",
      altPhone: "",
      email: currentUser ? currentUser.Email : "",
      serviceType: "",
      clothType: "",
      quantity: "",
      instructions: "",
    });

    setErrors({});
  };

  const FieldLabel = ({ icon: Icon, label, required = false }) => (
    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
        <Icon size={16} />
      </span>
      <span className="leading-5">
        {label}
        {required && <span className="ml-1 text-rose-500">*</span>}
      </span>
    </label>
  );

  const ErrorText = ({ message }) =>
    message ? <p className="mt-2 text-sm text-rose-500">{message}</p> : null;



  const handleAddItem = (e) => {
  e.preventDefault();
  const newErrors = {};

  if (!formData.serviceType) newErrors.serviceType = "Select service type";
  if (!formData.clothType.trim()) newErrors.clothType = "Clothes type is required";
  if (!formData.quantity.toString().trim() || Number(formData.quantity) <= 0) {
    newErrors.quantity = "Enter a valid quantity";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return;
  }

  // --- FIX STARTS HERE ---
  // Find the actual item object to get the price
  const selectedItem = dropdownItems.find(item => item.name === formData.clothType);
  const itemPrice = selectedItem ? Number(selectedItem.price) : 0;
  // --- FIX ENDS HERE ---

  const newItems = {
    serviceType: formData.serviceType,
    clothType: formData.clothType,
    quantity: Number(formData.quantity),
    price: itemPrice, 
    instructions: formData.instructions,
  };

  const updatedCheckoutData = {
    ...checkoutData,
    items: [...(checkoutData.items || []), newItems],
  };

  setCheckoutData(updatedCheckoutData);
  saveCheckoutData(updatedCheckoutData);

  setFormData((prev) => ({
    ...prev,
    clothType: "", // Only reset relevant fields
    quantity: "",
    instructions: "",
  }));
};

  const removeItems = (index) => {
    const checkoutData = getCheckoutData();

    const updatedItems = checkoutData.items.filter((_, i) => i !== index);

    const updatedCheckout = {
      ...checkoutData,
      items: updatedItems,
    };

    saveCheckoutData(updatedCheckout);
    setCheckoutData(updatedCheckout);
  };

  const selectedServiceObj = dbServices.find(
    (s) => s.name.toLowerCase() === formData.serviceType.toLowerCase()
  );

  const dropdownItems = selectedServiceObj && selectedServiceObj.items && selectedServiceObj.items.length > 0
    ? selectedServiceObj.items
    : (DEFAULT_CATEGORY_ITEMS[formData.serviceType] || []);

  const totalItems = (checkoutData.items || []).reduce((total, item) => total + Number(item.quantity), 0);

  return (

    <div className="mx-auto w-full max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className={`${cardBase} overflow-hidden`}
      >
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 px-4 py-6 text-white sm:px-6 sm:py-8 md:px-8">
          <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-white/10 blur-2xl sm:h-32 sm:w-32" />
          <div className="absolute bottom-0 left-6 h-16 w-16 rounded-full bg-white/10 blur-xl sm:left-10 sm:h-20 sm:w-20" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold text-white/95 backdrop-blur sm:text-xs">
              <ClipboardList size={14} />
              Booking Apply Form
            </div>

            <h2 className="text-xl font-bold sm:text-2xl md:text-3xl">
              Schedule Pickup Request
            </h2>

            <p className="mt-2 max-w-2xl px-1 text-sm leading-6 text-white/90 sm:text-base">
              Fill your details below and submit your laundry booking request.
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8">
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mb-6 flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700 sm:flex-row sm:items-start"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <p className="font-bold">Booking submitted successfully!</p>
                  <p className="text-sm text-emerald-600">
                    Our team will review and confirm your pickup shortly.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Details */}
            <section>
              <div className="mb-5 flex items-start gap-3 sm:items-center">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
                  1
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                    Personal Details
                  </h3>
                  <p className="text-sm text-slate-500">
                    Verify your profile and primary contact credentials
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                <div>
                  <FieldLabel icon={User} label="Full Name" required />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder={formData.fullName ? "" : "No name found in profile"}
                    className={`${inputStyle} ${formData.fullName ? 'bg-slate-50/70 opacity-85 cursor-not-allowed' : ''}`}
                    disabled={!!formData.fullName}
                  />
                  <ErrorText message={errors.fullName} />
                </div>

                <div>
                  <FieldLabel icon={Mail} label="Email Address" required />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={formData.email ? "" : "No email found in profile"}
                    className={`${inputStyle} ${formData.email ? 'bg-slate-50/70 opacity-85 cursor-not-allowed' : ''}`}
                    disabled={!!formData.email}
                  />
                  <ErrorText message={errors.email} />
                </div>

                <div>
                  <FieldLabel icon={Phone} label="Phone Number" required />
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter 10 digit phone number"
                    className={inputStyle}
                  />
                  <ErrorText message={errors.phone} />
                </div>

                <div>
                  <FieldLabel icon={Phone} label="Alternate Mobile Number" />
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    name="altPhone"
                    value={formData.altPhone}
                    onChange={handleChange}
                    placeholder="Enter alternative mobile number"
                    className={inputStyle}
                  />
                  <ErrorText message={errors.altPhone} />
                </div>
              </div>
            </section>

            {/*  Select Service  */}
            <section>
              <div className="mb-5 flex items-start gap-3 sm:items-center">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
                  2
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                    Select Service & Options
                  </h3>
                  <p className="text-sm text-slate-500">
                    Configure service types along with standard dates and hours
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-4 md:gap-6 ">
                <div className="">
                  <FieldLabel icon={Shirt} label="Service Type" required />
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className={inputStyle}


                  >
                   <option value="">Select Service</option>
                    <option value="Laundry">Laundry</option>
                    <option value="Dry Cleaning">Dry Cleaning</option>
                    <option value="Shoe Cleaning">Shoe Cleaning</option>
                    <option value="Ironing">Ironing</option>
                    <option value="Curtain Cleaning">Curtain Cleaning</option>
                    <option value="Carpet Cleaning">Carpet Cleaning</option>
                  </select>
                  <ErrorText message={errors.serviceType} />
                </div>

                <div className="">
                  <FieldLabel icon={ClipboardList} label="Item Type" required />
                  <select
                    name="clothType"
                    value={formData.clothType}
                    onChange={handleChange}
                    className={inputStyle}
                    disabled={!formData.serviceType}
                  >
                    <option value="">Select Item Type</option>
                    {dropdownItems.map((item, index) => (
                      <option key={index} value={item.name}>
                        {item.name} (₹{item.price})
                      </option>
                    ))}
                  </select>
                  <ErrorText message={errors.clothType} />
                </div>

                <div>
<FieldLabel icon={ClipboardList} label="Item Quantity" required />
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="e.g. 5"
                    className={inputStyle}
                  />
                  <ErrorText message={errors.quantity} />
                </div>

                <button
                  type="button"
                  onClick={handleAddItem}
                  className="  h-10 mt-12 ml-5 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 text-white text-lg font-bold rounded-2xl  ">Add</button>

              </div>

              {checkoutData.items.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    Added Items
                  </h3>
                  <ul className=" flex gap-2 items-center">
                    {checkoutData.items.map((item, index) => (
                      <li key={index} className="flex gap-3 items-center justify-between rounded-xl border border-slate-200/80 bg-blue-50 px-4 py-3 text-sm text-slate-700 shadow-sm">
                        <span>
                          {item.quantity} × {item.clothType} ({item.serviceType})
                        </span>
                        {item.instructions && (
                          <span className="text-xs text-slate-500">
                            Instructions: {item.instructions}
                          </span>
                        )}
                        <button  
                        type="button"
                        onClick={() => removeItems(index)}
                        className="text-red-500 hover:scale-110"><Trash2 size={16} /></button>
                      </li>
                    ))}
                  </ul>
                  
                </div>

                
              )}



              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 mt-5">
                
 <div className="md:col-span-2">
                  <FieldLabel icon={ClipboardList} label="Clothes Quantity" required />
                  <div className="mt-4 rounded-xl bg-blue-50 p-4">
                    <p className="text-lg font-semibold text-blue-900">
                      Total Quantity: {totalItems} Items
                    </p>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <FieldLabel icon={ClipboardList} label="Special Instructions" />
                  <textarea
                    name="instructions"
                    rows={4}
                    value={formData.instructions}
                    onChange={handleChange}
                    placeholder="Any special notes for washing, pickup, stain care, delicate fabric handling..."
                    className={inputStyle}
                  />
                </div>
              </div>
            </section>

            {/* Submit */}
            <div className="pt-2">
              <motion.button
                whileTap={{ scale: 0.985 }}
                whileHover={{ y: -2 }}
                type="submit"
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-[0_16px_40px_rgba(14,165,233,0.30)] transition sm:rounded-2xl sm:py-4 sm:text-base"
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 transition group-hover:opacity-100" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <CheckCircle2 size={18} />
                  Next
                </span>
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>

  );
};

export default BookingApplyForm;
