import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaBoxOpen,
  FaMapMarkerAlt,
  FaCrown,
  FaRoute,
  FaFileContract,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChevronRight,
  FaPhone,
  FaEnvelope,
  FaHome,
} from "react-icons/fa";

const UserLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [newOrdersCount, setNewOrdersCount] = useState(3);

  // --- Get user data from localStorage ---
  const getCurrentUser = () => {
    try {
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        return parsedUser;
      }
      return null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  };

  const currentUser = getCurrentUser();
  
  // Extract user details with proper field names
  const firstName = currentUser?.FirstName || currentUser?.firstName || '';
  const lastName = currentUser?.LastName || currentUser?.lastName || '';
  const userName = firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName || 'Guest User';
  const userPhone = currentUser?.Phone || currentUser?.phone || currentUser?.contact || '+1 (555) 000-0000';
  const userEmail = currentUser?.Email || currentUser?.email || 'user@example.com';

 
  const NAVIGATION_ITEMS = [
    {
      id: "profile",
      name: "Profile",
      description: "Account identity and security keys",
      icon: <FaUser />,
      path: "/user-profile",
    },
    {
      id: "orders",
      name: "My Bookings",
      description: "Live tracking and transaction history",
      icon: <FaBoxOpen />,
      path: "/user-orders",
    },
    {
      id: "address",
      name: "Saved Address",
      description: "Geographic routing points",
      icon: <FaMapMarkerAlt />,
      path: "/user-address",
    },
   
    {
      id: "tracking",
      name: "Progress Tracking",
      description: "Real-time pipeline telemetry",
      icon: <FaRoute />,
      path: "/user-tracking",
    },
    {
      id: "terms",
      name: "Terms & Conditions",
      description: "Legal framework parameters",
      icon: <FaFileContract />,
      path: "/user-terms",
    },
  ];

  // Bottom navigation 
  const BOTTOM_NAV_ITEMS = [
    {
      id: "orders",
      name: "Bookings",
      icon: <FaBoxOpen />,
      path: "/user-orders",
    },
    {
      id: "address",
      name: "Address",
      icon: <FaMapMarkerAlt />,
      path: "/user-address",
    },
    {
      id: "home",
      name: "Home",
      icon: <FaHome />,
      path: "/",
      isHome: true,
    },
  {
      id: "tracking",
      name: "Progress Tracking",
      description: "Real-time pipeline telemetry",
      icon: <FaRoute />,
      path: "/user-tracking",
    },
    {
      id: "more",
      name: "More",
      icon: <FaBars />,
      path: "#",
      action: () => setMobileMenuOpen(true),
    },
  ];

  const activeItem = NAVIGATION_ITEMS.find((item) => item.path === location.pathname) || NAVIGATION_ITEMS[0];

  const handleNavigation = (path, id) => {
    navigate(path);
    setMobileMenuOpen(false);
    if (id === "orders") {
      setNewOrdersCount(0);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex flex-col"> 
      <div className="flex flex-1 pt-20 pb-20 lg:pb-0 font-sans antialiased text-slate-900 select-none">
        {/* MOBILE DRAWER */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-50 lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", bounce: 0, damping: 30 }}
                className="fixed top-0 bottom-0 left-0 w-80 bg-white z-50 p-6 flex flex-col justify-between shadow-2xl lg:hidden rounded-r-3xl"
              >
                <div className="space-y-6">
                  {/* Mobile User Profile Header */}
                  <div className="pb-4 border-b border-slate-100">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/25 ring-2 ring-white/50">
                          {userName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-bold text-base text-slate-900">{userName}</h3>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                            <FaPhone className="text-[10px] text-indigo-500" />
                            <span className="font-medium">{userPhone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                            <FaEnvelope className="text-[10px] text-indigo-500" />
                            <span className="font-medium truncate max-w-[140px]">{userEmail}</span>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => setMobileMenuOpen(false)} 
                        className="p-2.5 text-slate-400 hover:bg-slate-100 rounded-2xl transition-all hover:rotate-90 duration-300"
                      >
                        <FaTimes className="text-base" />
                      </button>
                    </div>
                  </div>

                  <nav className="space-y-1.5">
                    {NAVIGATION_ITEMS.map((item) => {
                      const isSelected = isActive(item.path);
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavigation(item.path, item.id)}
                          className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 ${
                            isSelected 
                              ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25" 
                              : "text-slate-600 hover:bg-slate-50 hover:scale-[1.02]"
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <span className={`text-base ${isSelected ? "text-white" : "text-slate-400"}`}>
                              {item.icon}
                            </span>
                            {item.name}
                          </div>
                          {/* {item.id === "orders" && newOrdersCount > 0 && (
                            <span className={`w-5 h-5 font-bold text-[10px] rounded-full flex items-center justify-center transition-colors shadow-sm ${
                              isSelected 
                                ? "bg-white text-indigo-600" 
                                : "bg-rose-500 text-white animate-pulse"
                            }`}>
                              {newOrdersCount}
                            </span>
                          )} */}
                        </button>
                      );
                    })}
                  </nav>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <button 
                    onClick={() => { setMobileMenuOpen(false); setShowLogoutModal(true); }}
                    className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-rose-600 hover:bg-rose-50 transition-all font-bold text-sm hover:scale-[1.02] duration-200"
                  >
                    <FaSignOutAlt className="text-rose-500" /> Logout
                  </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:flex flex-col justify-between w-[290px] bg-white/80 backdrop-blur-xl border-r border-slate-200/60 h-[calc(100vh-80px)] sticky top-20 shrink-0 z-30">
          <div className="p-6"> 
            <div className="mb-6 p-4 bg-gradient-to-br from-indigo-50/80 via-violet-50/80 to-purple-50/80 rounded-2xl border border-indigo-100/50 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start gap-3.5">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/25 ring-2 ring-white/50">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white shadow-sm"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-slate-900 truncate">{userName}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1.5">
                    <FaPhone className="text-[10px] text-indigo-500 shrink-0" />
                    <span className="truncate font-medium">{userPhone}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                    <FaEnvelope className="text-[10px] text-indigo-500 shrink-0" />
                    <span className="truncate font-medium">{userEmail}</span>
                  </div>
                </div>
              </div>
            </div>

            <nav className="space-y-1.5">
              {NAVIGATION_ITEMS.map((item) => {
                const isSelected = isActive(item.path);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.path, item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-sm transition-all duration-200 cursor-pointer relative group ${
                      isSelected 
                        ? "text-white" 
                        : "text-slate-600 hover:bg-slate-50/80 hover:text-slate-900 hover:scale-[1.02]"
                    }`}
                  >
                    {isSelected && (
                      <motion.div 
                        layoutId="activeDesktopNav"
                        className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl shadow-lg shadow-indigo-500/25 z-0"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    
                    <div className="flex items-center gap-3.5 z-10">
                      <span className={`text-base transition-colors duration-200 ${isSelected ? "text-white" : "text-slate-400 group-hover:text-indigo-600"}`}>
                        {item.icon}
                      </span>
                      <span>{item.name}</span>
                    </div>

                    {/* {item.id === "orders" && newOrdersCount > 0 && (
                      <span className={`z-10 w-5 h-5 font-bold text-[10px] rounded-full flex items-center justify-center transition-colors shadow-sm ${
                        isSelected 
                          ? "bg-white text-indigo-600" 
                          : "bg-rose-500 text-white animate-pulse"
                      }`}>
                        {newOrdersCount}
                      </span>
                    )} */}
                  </button>
                );
              })}
            </nav>
          </div>
          <div className="p-4 border-t border-slate-100 bg-gradient-to-b from-transparent to-slate-50/50">
            <button 
              onClick={() => setShowLogoutModal(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all font-bold text-sm group hover:scale-[1.02] duration-200 cursor-pointer"
            >
              <FaSignOutAlt className="cursor-pointer text-slate-400 transition-colors group-hover:text-rose-500" /> 
              Logout
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-6xl w-full mx-auto overflow-hidden flex flex-col gap-4">
          {/* Breadcrumb */}
          <div className="text-[11px] font-bold text-slate-400 flex items-center gap-2 px-1">
            <Link to="/" className="hover:text-slate-600 transition-colors duration-200">Home</Link>
            <FaChevronRight className="text-[8px] text-slate-300" />
            <span className="text-indigo-600 capitalize">{activeItem?.name}</span>
          </div>

          {/* Content Canvas */}
          <div className="flex-1 min-h-[400px] lg:min-h-[calc(100vh-210px)] bg-white/70 backdrop-blur-sm border border-slate-200/70 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 sm:p-10 flex flex-col relative overflow-hidden group/canvas">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
            
            {/* Decorative gradient orbs */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-violet-200/20 rounded-full blur-3xl pointer-events-none"></div>

            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="w-full h-full flex-1 flex flex-col z-10 relative"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-lg z-40 safe-bottom">
        <div className="flex items-center justify-around px-2 py-1.5 max-w-md mx-auto">
          {BOTTOM_NAV_ITEMS.map((item) => {
            const isSelected = item.path !== "#" && isActive(item.path);
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else if (item.path) {
                    handleNavigation(item.path, item.id);
                  }
                }}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-2xl transition-all duration-200 relative ${
                  item.isHome 
                    ? "min-w-[60px] mt-[-16px]" 
                    : "min-w-[56px]"
                } ${
                  isSelected 
                    ? "text-indigo-600" 
                    : "text-slate-500 hover:text-indigo-500"
                }`}
              >
                {/* Active indicator for non-home items */}
                {isSelected && !item.isHome && (
                  <motion.div
                    layoutId="bottomNavActive"
                    className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                
                {/* Icon with badge */}
                <div className="relative">
                  {/* Home button */}
                  {item.isHome ? (
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-indigo-500/30 ring-4 ring-white transition-all duration-200 ${
                      isSelected ? "scale-110 shadow-indigo-500/40" : ""
                    }`}>
                      {item.icon}
                    </div>
                  ) : (
                    <span className={`text-xl transition-all duration-200 ${
                      isSelected ? "scale-110" : "scale-100"
                    }`}>
                      {item.icon}
                    </span>
                  )}
                  
                  {/* Badge for orders */}
                  {/* {item.id === "orders" && newOrdersCount > 0 && (
                    <span className="absolute -top-1 -right-2 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-sm animate-pulse">
                      {newOrdersCount}
                    </span>
                  )} */}
                </div>
                
                {/* Label */}
                <span className={`text-[10px] font-bold mt-0.5 transition-all duration-200 ${
                  isSelected ? "text-indigo-600" : "text-slate-500"
                } ${item.isHome ? "mt-0" : ""}`}>
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* LOGOUT MODAL - Enhanced */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm"
              onClick={() => setShowLogoutModal(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-3xl max-w-sm w-full p-6 relative z-10 shadow-2xl border border-slate-100"
            >
              <div className="text-center mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <FaSignOutAlt className="text-2xl text-rose-600" />
                </div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">Confirm Sign Out</h3>
                <p className="text-slate-500 text-sm mt-1.5 leading-relaxed">
                  Are you sure you want to terminate your current session?
                </p>
              </div>
              <div className="flex items-center justify-end gap-3 mt-6">
                <button 
                  onClick={() => setShowLogoutModal(false)} 
                  className="px-5 py-2.5 rounded-2xl text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all hover:scale-[1.02] duration-200"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleLogout} 
                  className="px-5 py-2.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 transition-all shadow-lg shadow-rose-500/25 hover:shadow-rose-500/35 hover:scale-[1.02] duration-200"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserLayout;