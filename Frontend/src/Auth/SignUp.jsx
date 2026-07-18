import axios from 'axios';
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { User, Mail, Phone, Lock, Eye, EyeOff, MapPin } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    Address: "",
    number: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    // Allow only 10 digits for phone
    if (name === "number") {
      updatedValue = value.replace(/\D/g, "").slice(0, 10);
    }

    setText(prev => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const validateForm = () => {
    if (!text.FirstName.trim()) {
      Swal.fire({ icon: "error", title: "Error", text: "First name is required" });
      return false;
    }
    if (!text.Email.trim()) {
      Swal.fire({ icon: "error", title: "Error", text: "Email is required" });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.Email)) {
      Swal.fire({ icon: "error", title: "Error", text: "Please enter a valid email address" });
      return false;
    }
    if (text.number.length !== 10) {
      Swal.fire({ icon: "error", title: "Invalid Mobile Number", text: "Mobile number must be exactly 10 digits." });
      return false;
    }
    if (text.Password.length < 8) {
      Swal.fire({ icon: "error", title: "Weak Password", text: "Password must contain at least 8 characters." });
      return false;
    }
    if (!isAgreed) {
      Swal.fire({ icon: "warning", title: "Terms Required", text: "Please agree to the Terms of Service and Privacy Policy" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Try different payload formats based on what backend expects
      const payload = {
        firstName: text.FirstName,
        lastName: text.LastName,
        email: text.Email.toLowerCase().trim(),
        password: text.Password,
        phone: text.number,
        address: text.Address
      };

      console.log("Sending payload:", payload);

      const response = await axios.post(`${API_URL}/api/auth/register`, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        await Swal.fire({
          title: "Signup Successful!",
          text: "Please login to continue",
          icon: "success",
          confirmButtonColor: "#1e3a5f",
        });
        navigate("/login");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      console.error("Error response:", err.response?.data);
      
      let errorMessage = "Something went wrong";
      
      if (err.response) {
        // Server responded with error status
        if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err.response.data?.errors) {
          // Handle validation errors array
          errorMessage = err.response.data.errors.map(e => e.msg || e.message).join(', ');
        } else if (err.response.data?.error) {
          errorMessage = err.response.data.error;
        }
      } else if (err.request) {
        errorMessage = "Network error. Please check your connection.";
      }

      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 pt-20 pb-10 px-4 overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl grid lg:grid-cols-2"
      >
        {/* LEFT SIDE */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex relative bg-blue-950 text-white p-12 flex-col justify-between overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-60 h-60 rounded-full bg-blue-800 opacity-30 -translate-x-24 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-blue-700 opacity-20 translate-x-20 translate-y-20"></div>
          
          <div className="relative z-10">
            <h1 className="text-5xl font-bold">Athenura</h1>
            <p className="text-gray-300 mt-2">Code. Create. Innovate.</p>
          </div>

          <div className="relative z-10">
            <div className="bg-blue-900 p-6 rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600"
                alt="Laundry service"
                className="rounded-2xl h-56 w-full object-cover"
              />
              <p className="mt-6 text-gray-300 leading-8">
                Athenura has transformed our laundry routine. The platform is simple, fast and reliable.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <img
                  src="https://i.pravatar.cc/100"
                  alt="David Richardson"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">David Richardson</h3>
                  <p className="text-sm text-gray-300">Creative Director</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE - FORM */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="p-6 sm:p-8 md:p-10 lg:p-14"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-950">
            Create Your Account
          </h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Join the premium laundry experience today.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Names */}
            <div className="grid sm:grid-cols-2 gap-5 mt-8">
              <div>
                <label className="font-semibold text-blue-950 text-sm">FIRST NAME</label>
                <div className="mt-2 border border-gray-300 rounded-xl h-12 flex items-center px-4 focus-within:border-blue-500 transition-colors">
                  <User className="text-gray-400 w-5 shrink-0" />
                  <input
                    type="text"
                    name="FirstName"
                    placeholder="First Name"
                    className="w-full px-3 outline-none"
                    value={text.FirstName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-blue-950 text-sm">LAST NAME</label>
                <div className="mt-2 border border-gray-300 rounded-xl h-12 flex items-center px-4 focus-within:border-blue-500 transition-colors">
                  <User className="text-gray-400 w-5 shrink-0" />
                  <input
                    type="text"
                    name="LastName"
                    placeholder="Last Name"
                    className="w-full px-3 outline-none"
                    value={text.LastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="mt-5">
              <label className="font-semibold text-blue-950 text-sm">EMAIL ADDRESS</label>
              <div className="mt-2 border border-gray-300 rounded-xl h-12 flex items-center px-4 focus-within:border-blue-500 transition-colors">
                <Mail className="text-gray-400 w-5 shrink-0" />
                <input
                  type="email"
                  name="Email"
                  placeholder="xyz@gmail.com"
                  className="w-full px-3 outline-none"
                  value={text.Email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="mt-5">
              <label className="font-semibold text-blue-950 text-sm">MOBILE PHONE</label>
              <div className="mt-2 border border-gray-300 rounded-xl h-12 flex items-center px-4 focus-within:border-blue-500 transition-colors">
                <Phone className="text-gray-400 w-5 shrink-0" />
                <input
                  type="tel"
                  name="number"
                  placeholder="9876543210"
                  className="w-full px-3 outline-none"
                  value={text.number}
                  onChange={handleChange}
                  required
                  maxLength={10}
                />
              </div>
            </div>

            {/* Password */}
            <div className="mt-5">
              <label className="font-semibold text-blue-950 text-sm">CREATE PASSWORD</label>
              <div className="mt-2 border border-gray-300 rounded-xl h-12 flex items-center px-4 focus-within:border-blue-500 transition-colors">
                <Lock className="text-gray-400 w-5 shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 8 characters"
                  className="w-full px-3 outline-none"
                  name="Password"
                  value={text.Password}
                  onChange={handleChange}
                  minLength={8}
                  required
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                  className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            {/* Address */}
            <div className="mt-5">
              <label className="font-semibold text-blue-950 text-sm">PRIMARY PICKUP ADDRESS</label>
              <div className="mt-2 border border-gray-300 rounded-xl h-12 flex items-center px-4 focus-within:border-blue-500 transition-colors">
                <MapPin className="text-gray-400 w-5 shrink-0" />
                <input
                  type="text"
                  placeholder="Start typing your address..."
                  className="w-full px-3 outline-none"
                  name="Address"
                  value={text.Address}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex gap-3 mt-6">
              <input
                type="checkbox"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-blue-600"
              />
              <p className="text-xs text-gray-500">
                I agree to the
                <span className="text-blue-600 font-semibold mx-1 cursor-pointer">Terms of Service</span>
                and
                <span className="text-blue-600 font-semibold ml-1 cursor-pointer">Privacy Policy</span>
              </p>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={isAgreed && !isLoading ? { scale: 1.02 } : {}}
              whileTap={isAgreed && !isLoading ? { scale: 0.98 } : {}}
              disabled={!isAgreed || isLoading}
              className={`w-full h-14 rounded-xl text-lg font-semibold mt-8 flex items-center justify-center gap-2 transition-all ${
                isAgreed && !isLoading
                  ? "bg-blue-900 text-white hover:bg-blue-800 cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating Account...
                </>
              ) : (
                "Sign Up"
              )}
            </motion.button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 border"></div>
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <span className="text-blue-600 font-semibold">
                <Link to="/login">Login</Link>
              </span>
            </p>
            <div className="flex-1 border"></div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUp;