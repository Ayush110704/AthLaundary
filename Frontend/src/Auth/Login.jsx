import axios from 'axios';
import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Shield, Headphones, Zap } from "lucide-react";
import WhiteLogo from '../assets/WhiteLogo.png';
import { Link, useNavigate } from 'react-router-dom';
import Image from '../assets/LoginImage.jpeg';
import Swal from 'sweetalert2';


const API_URL = import.meta.env.VITE_API_URL;

// Check if Google client ID is configured
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const isGoogleConfigured = GOOGLE_CLIENT_ID && GOOGLE_CLIENT_ID !== 'undefined';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [GoogleLoginComponent, setGoogleLoginComponent] = useState(null);
  const [userdata, setUserdata] = useState({
    Email: "",
    Password: ""
  });

  const navigate = useNavigate();

  // Lazy load Google Login component to prevent multiple initializations
  React.useEffect(() => {
    if (isGoogleConfigured) {
      import('@react-oauth/google').then((module) => {
        setGoogleLoginComponent(() => module.GoogleLogin);
      }).catch((err) => {
        console.error("Failed to load Google OAuth:", err);
      });
    }
  }, []);

  const handleChange = (e) => {
    setUserdata(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const normalizeAndStoreUser = useCallback((user) => {
    if (!user) return null;
    
    const firstName = user.firstName || user.FirstName || '';
    const lastName = user.lastName || user.LastName || '';
    const email = user.email || user.Email || '';
    const phone = user.phone || user.number || user.mobile || '';
    const address = user.address || user.Address || '';
    const joiningDate = user.createdAt || user.joiningDate || new Date().toISOString();

    const normalized = {
      ...user,
      id: user._id || user.id,
      _id: user._id || user.id,
      firstName,
      FirstName: firstName,
      lastName,
      LastName: lastName,
      email,
      Email: email,
      phone,
      number: phone,
      mobile: phone,
      address,
      Address: address,
      dob: user.dob || '',
      createdAt: joiningDate,
      joiningDate: new Date(joiningDate).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    };
    
    localStorage.setItem("currentUser", JSON.stringify(normalized));
    return normalized;
  }, []);

  // Stores the JWT the backend issues on login/signup. Every success path
  // below must call this — otherwise any future authenticated request
  // (e.g. an Authorization: Bearer header) has nothing to send.
  const storeToken = useCallback((token) => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email: userdata.Email.trim().toLowerCase(),
        password: userdata.Password
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.data.success) {
        normalizeAndStoreUser(response.data.user);
        storeToken(response.data.token);

        await Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
          timer: 1500,
          showConfirmButton: false
        });

        navigate("/");
      }
    } catch (error) {
      console.error("Login Error:", error);
      
      let errorMessage = "Invalid email or password";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (!error.response) {
        errorMessage = "Network error. Please check your connection.";
      }

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = useCallback(async (credentialResponse) => {
    if (!credentialResponse?.credential) {
      Swal.fire({ icon: "error", title: "Error", text: "Google authentication failed" });
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/auth/google`, {
        token: credentialResponse.credential
      });

      if (response.data.success) {
        normalizeAndStoreUser(response.data.user);
        storeToken(response.data.token);
        await Swal.fire({ icon: "success", title: "Logged in!", timer: 1500, showConfirmButton: false });
        navigate("/");
        return;
      }

      if (response.data.requiresPhone) {
        const { value: phone } = await Swal.fire({
          title: 'Complete Registration',
          html: '<p style="font-size: 14px; color: #666;">Please enter your 10-digit phone number</p>',
          input: 'text',
          inputPlaceholder: '9876543210',
          inputAttributes: {
            maxlength: 10,
            pattern: '[0-9]*'
          },
          showCancelButton: true,
          confirmButtonText: 'Submit',
          confirmButtonColor: '#1e3a5f',
          inputValidator: (value) => {
            if (!value) return 'Phone number is required!';
            if (!/^\d{10}$/.test(value)) return 'Please enter a valid 10-digit phone number!';
          }
        });

        if (phone) {
          const signupResponse = await axios.post(`${API_URL}/api/auth/complete-google-signup`, {
            firstName: response.data.firstName || response.data.user?.firstName || '',
            lastName: response.data.lastName || response.data.user?.lastName || '',
            email: response.data.email,
            phone: phone
          });

          if (signupResponse.data.success) {
            normalizeAndStoreUser(signupResponse.data.user);
            storeToken(signupResponse.data.token);
            await Swal.fire({ icon: "success", title: "Account Created!", timer: 1500, showConfirmButton: false });
            navigate("/");
          }
        }
      }
    } catch (error) {
      console.error("Google Auth Error:", error);
      let errorMessage = "Google authentication failed";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      Swal.fire({ icon: "error", title: "Login Failed", text: errorMessage });
    }
  }, [navigate, normalizeAndStoreUser, storeToken]);

  const handleGoogleError = useCallback(() => {
    console.log('Google Login Failed');
    Swal.fire({
      icon: "error",
      title: "Google Login Failed",
      text: "Please try again or use email login"
    });
  }, []);

  return (
    <div className="w-full min-h-screen bg-slate-100 py-7 overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4"
      >
        <div className="grid lg:grid-cols-2 overflow-hidden rounded-3xl bg-white shadow-2xl">
          {/* Left Side - Decorative */}
          <div className="hidden lg:flex relative bg-blue-950 p-10 text-white flex-col justify-between overflow-hidden">
            <img
              src={Image}
              className="absolute inset-0 w-full h-full object-cover opacity-20"
              alt="Laundry service"
            />
            
            <div className="relative z-10">
              <div className="flex ">
                <img src={WhiteLogo} alt="Athenura" className="h-25 w-40" />
              </div>
              
              <h1 className="text-5xl font-bold leading-tight">
                Fresh Clothes,
                <span className="block text-blue-400">Hassle Free.</span>
              </h1>
              <p className="mt-5 text-xl text-gray-300 leading-10">
                Premium laundry and dry cleaning services delivered at your doorstep.
              </p>
            </div>

            <div className="relative z-10 mt-10 space-y-8">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-blue-800 flex justify-center items-center shrink-0">
                  <Shield size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-2xl">Trusted & Secure</h3>
                  <p className="text-gray-300 text-lg">Your data is safe with us</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-blue-800 flex justify-center items-center shrink-0">
                  <Zap size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-2xl">Quick & Easy</h3>
                  <p className="text-gray-300 text-lg">Login and get started instantly</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-blue-800 flex justify-center items-center shrink-0">
                  <Headphones size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-2xl">Best Support</h3>
                  <p className="text-gray-300 text-lg">We're available 24/7</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex items-center justify-center px-6 sm:px-10 lg:px-16 py-12">
            <div className="w-full max-w-xl">
              <h1 className="text-3xl md:text-5xl font-bold text-blue-950">Welcome Back</h1>
              <p className="text-gray-500 text-sm md:text-lg mt-1 md:mt-3">
                Please enter your details to sign in.
              </p>

              <form onSubmit={handleLogin}>
                {/* Email */}
                <div className="mt-6">
                  <label className="font-bold text-blue-950 tracking-wide text-sm">EMAIL</label>
                  <div className="mt-2 flex items-center border border-gray-300 rounded-2xl px-5 h-12 focus-within:border-blue-500 transition-colors">
                    <Mail className="text-gray-400 shrink-0" />
                    <input
                      type="email"
                      name="Email"
                      value={userdata.Email}
                      placeholder="name@company.com"
                      onChange={handleChange}
                      required
                      className="w-full px-4 outline-none"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="mt-5">
                  <label className="font-bold text-blue-950 tracking-wide text-sm">PASSWORD</label>
                  <div className="mt-2 flex items-center border border-gray-300 rounded-2xl px-5 h-12 focus-within:border-blue-500 transition-colors">
                    <Lock className="text-gray-400 shrink-0" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      name="Password"
                      value={userdata.Password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex justify-between items-center mt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-blue-600" />
                    <span className="text-gray-600 text-sm">Remember Me</span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="font-semibold text-blue-600 text-sm hover:text-blue-800 transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Login Button */}
                <motion.button
                  whileHover={isLoading ? {} : { scale: 1.02 }}
                  whileTap={isLoading ? {} : { scale: 0.98 }}
                  className="w-full h-12 md:h-14 bg-blue-900 text-white rounded-2xl mt-5 text-lg md:text-xl font-semibold hover:bg-blue-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </motion.button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 border" />
                <p className="font-semibold text-gray-500 text-sm">OR CONTINUE WITH</p>
                <div className="flex-1 border" />
              </div>

              {/* Google Login */}
              <div className="flex justify-center">
                {isGoogleConfigured && GoogleLoginComponent ? (
                  <GoogleLoginComponent
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    shape="pill"
                    text="continue_with"
                    size="large"
                    width="200"
                  />
                ) : (
                  <div className="w-[300px] h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-sm border border-gray-200">
                    {isGoogleConfigured ? "Loading Google Login..." : "Google Login Not Configured"}
                  </div>
                )}
              </div>

              {/* Signup Link */}
              <p className="text-center mt-8 md:mt-10 text-gray-500">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;