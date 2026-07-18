import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/Athenura.png";
import axios from "axios";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [userLogin, setUserLogin] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [profile, setProfile] = useState(false);
  const [userData, setUserData] = useState(null);
  const [servicesList, setServicesList] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const location = useLocation();

  const hideHamburgerRoutes = [
    "/user-profile",
    "/user-orders",
    "/user-address",
    "/user-subscription",
  ];

  const hideHamburger = hideHamburgerRoutes.includes(location.pathname);

  // Check user login status
  useEffect(() => {
    const checkUserLogin = () => {
      try {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        if (user) {
          setUserLogin(true);
          setUserData(user);
        } else {
          setUserLogin(false);
          setUserData(null);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUserLogin(false);
        setUserData(null);
      }
    };

    checkUserLogin();

    // Listen for storage changes (useful when multiple tabs open)
    const handleStorageChange = () => checkUserLogin();
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/services`);
        const result = res.data;
        if (result.success) {
          setServicesList(result.data);
        }
      } catch (error) {
        console.error("Error fetching navbar services:", error);
      }
    };
    fetchServices();
  }, [API_URL]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenu(false);
    setShowServices(false);
  }, [location.pathname]);

  const getServicePath = useCallback((name) => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes("dry")) return "/services/DryClean-service";
    if (nameLower.includes("laundry")) return "/services/Laundry-service";
    if (nameLower.includes("shoe")) return "/services/ShoeCleaning-service";
    if (nameLower.includes("curtain")) return "/services/CurtainCleaning-service";
    if (nameLower.includes("carpet")) return "/services/CarpetCleaning-service";
    if (nameLower.includes("iron")) return "/services/Ironing-service";
    return `/services/${name.replace(/\s+/g, "")}-service`;
  }, []);

  const dynamicDropdown = servicesList.length > 0
    ? servicesList.map((s) => ({
        label: s.name,
        path: getServicePath(s.name),
        isInactive: s.status === "Inactive",
      }))
    : [
        { label: "Laundry Service", path: "/services/Laundry-service", isInactive: false },
        { label: "Dry Cleaning", path: "/services/DryClean-service", isInactive: false },
        { label: "Ironing", path: "/services/Ironing-service", isInactive: false },
        { label: "Carpet Cleaning", path: "/services/CarpetCleaning-service", isInactive: false },
        { label: "Shoe Cleaning", path: "/services/ShoeCleaning-service", isInactive: false },
        { label: "Curtain Cleaning", path: "/services/CurtainCleaning-service", isInactive: false },
      ];

  const menu = [
    { id: "Home", label: "Home", path: "/" },
    { id: "About", label: "About", path: "/about" },
    {
      id: "Services",
      label: "Services",
      path: "/services",
      dropdown: dynamicDropdown,
    },
    { id: "Contact", label: "Contact", path: "/contact" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUserLogin(false);
    setUserData(null);
    setProfile(false);
    setMobileMenu(false);
    navigate("/login");
  };

  const handleMobileAuthAction = () => {
    setMobileMenu(false);
    if (userLogin) {
      navigate("/user-profile");
    } else {
      navigate("/login");
    }
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenu]);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="h-14 md:h-16 bg-gray-50 shadow-2xl flex justify-between items-center px-4 md:px-6 relative z-50"
      >
        {/* Logo */}
        <Link to="/" className="h-full flex items-center">
          <img
            src={logo}
            alt="Athenura Logo"
            className="h-10 mt-1 md:h-full md:mt-0"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex font-semibold text-lg gap-10 items-center">
          <ul className="flex gap-6">
            {menu.map((item) => (
              <li key={item.id} className="group relative">
                {item.dropdown ? (
                  <>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `relative flex items-center gap-1 transition-colors duration-300 ${
                          isActive || location.pathname.startsWith("/services")
                            ? "text-blue-600"
                            : "text-gray-950 hover:text-blue-600"
                        }`
                      }
                    >
                      {item.label}
                      <ChevronDown
                        size={20}
                        className="mt-1 transition-transform duration-300 group-hover:rotate-180"
                      />
                      {location.pathname.startsWith("/services") && (
                        <motion.div
                          layoutId="active-navbar"
                          className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] w-[30px] rounded-full bg-blue-600"
                          transition={{
                            type: "spring",
                            stiffness: 450,
                            damping: 30,
                          }}
                        />
                      )}
                    </NavLink>

                    <div className="absolute top-full mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden">
                      {item.dropdown.map((service, idx) =>
                        service.isInactive ? (
                          <div
                            key={`${service.path}-${idx}`}
                            className="block px-5 py-2.5 text-sm bg-gray-50 text-gray-400 cursor-not-allowed font-medium"
                          >
                            <div className="flex items-center justify-between w-full">
                              <span>{service.label}</span>
                              <span className="text-red-500 text-xs font-medium ml-2 shrink-0">
                                [Inactive]
                              </span>
                            </div>
                          </div>
                        ) : (
                          <NavLink
                            key={`${service.path}-${idx}`}
                            to={service.path}
                            className={({ isActive }) =>
                              `block px-5 py-2.5 text-sm transition-colors ${
                                isActive
                                  ? "bg-blue-100 text-blue-900 font-semibold"
                                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                              }`
                            }
                          >
                            {service.label}
                          </NavLink>
                        )
                      )}
                    </div>
                  </>
                ) : (
                  <NavLink
                    to={item.path}
                    end={item.path === "/"}
                    className={({ isActive }) =>
                      `relative transition-colors duration-300 ${
                        isActive
                          ? "text-blue-600"
                          : "text-gray-900 hover:text-blue-600"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        {isActive && (
                          <motion.div
                            layoutId="active-navbar"
                            className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] w-[30px] rounded-full bg-blue-600"
                            transition={{
                              type: "spring",
                              stiffness: 450,
                              damping: 30,
                            }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Login/Profile Button */}
        <div className="hidden md:block">
          {userLogin ? (
            <div
              className="relative"
              onMouseEnter={() => setProfile(true)}
              onMouseLeave={() => setProfile(false)}
            >
              <button
                className="flex items-center gap-2 py-1.5 px-4 bg-white border-2 border-blue-600 rounded-full text-blue-700 cursor-pointer font-semibold transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:text-white hover:border-blue-700"
                aria-label="User profile menu"
                aria-expanded={profile}
              >
                <User size={18} />
                {userData?.FirstName || "Profile"}
              </button>

              <AnimatePresence>
                {profile && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 shadow-lg rounded-xl p-4 w-48 z-50 bg-gradient-to-b from-blue-50 to-blue-100 text-blue-600 font-semibold border border-blue-200"
                    role="menu"
                  >
                    <div className="pb-3 mb-3 border-b border-blue-200">
                      <h3 className="text-sm text-blue-500">
                        Hello,{" "}
                        <span className="text-blue-700 font-bold">
                          {userData?.FirstName}
                        </span>
                      </h3>
                      {userData?.number && (
                        <p className="text-xs text-blue-400 mt-0.5">
                          {userData.number}
                        </p>
                      )}
                    </div>

                    <Link
                      to="/user-profile"
                      onClick={() => setProfile(false)}
                      className="block py-2 px-3 rounded-lg hover:bg-blue-200/50 hover:text-blue-800 transition-all duration-200"
                      role="menuitem"
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left py-2 px-3 mt-1 text-red-600 flex items-center gap-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                      role="menuitem"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-block py-1.5 px-6 bg-blue-600 rounded-full text-white font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        {!hideHamburger && (
          <button
            className="md:hidden cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label={mobileMenu ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenu}
          >
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
              onClick={() => setMobileMenu(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-14 left-0 w-full bg-white text-blue-950 font-semibold shadow-xl z-50 md:hidden rounded-b-2xl border-t border-blue-100"
            >
              <ul className="flex flex-col py-4">
                {menu.map((item) => (
                  <li key={item.id}>
                    {item.dropdown ? (
                      <div className="border-b border-gray-100 last:border-b-0">
                        <div className="flex items-center justify-between px-6 py-3">
                          <Link
                            to={item.path}
                            onClick={() => {
                              setMobileMenu(false);
                              setShowServices(false);
                            }}
                            className={`hover:text-blue-600 transition-colors ${
                              location.pathname.startsWith("/services")
                                ? "text-blue-600"
                                : ""
                            }`}
                          >
                            {item.label}
                          </Link>

                          <button
                            onClick={() => setShowServices(!showServices)}
                            className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                            aria-label="Toggle services dropdown"
                            aria-expanded={showServices}
                          >
                            <ChevronDown
                              size={18}
                              className={`transition-transform duration-300 ${
                                showServices ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        </div>

                        <AnimatePresence>
                          {showServices && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pb-3 px-4">
                                {item.dropdown.map((service, idx) =>
                                  service.isInactive ? (
                                    <div
                                      key={`${service.path}-${idx}`}
                                      className="py-2.5 px-4 text-sm bg-gray-50 text-gray-400 cursor-not-allowed font-medium rounded-lg mb-1 flex items-center justify-between"
                                    >
                                      <span>{service.label}</span>
                                      <span className="text-red-500 text-xs font-medium ml-2 shrink-0">
                                        [Inactive]
                                      </span>
                                    </div>
                                  ) : (
                                    <Link
                                      key={`${service.path}-${idx}`}
                                      to={service.path}
                                      onClick={() => {
                                        setMobileMenu(false);
                                        setShowServices(false);
                                      }}
                                      className={`block py-2.5 px-4 text-sm rounded-lg mb-1 transition-colors ${
                                        location.pathname === service.path
                                          ? "bg-blue-100 text-blue-700 font-semibold"
                                          : "hover:bg-blue-50 hover:text-blue-600 text-gray-700"
                                      }`}
                                    >
                                      {service.label}
                                    </Link>
                                  )
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <div className="border-b border-gray-100 last:border-b-0">
                        <Link
                          to={item.path}
                          onClick={() => setMobileMenu(false)}
                          className={`block px-6 py-3 hover:text-blue-600 transition-colors ${
                            (item.path === "/" && location.pathname === "/") ||
                            location.pathname === item.path
                              ? "text-blue-600"
                              : ""
                          }`}
                        >
                          {item.label}
                        </Link>
                      </div>
                    )}
                  </li>
                ))}
              </ul>

              {/* Mobile Auth Section */}
              <div className="px-6 py-4 bg-gray-50 rounded-b-2xl border-t border-gray-100">
                {userLogin ? (
                  <div className="flex flex-col gap-3">
                    <div className="text-sm text-gray-500">
                      Signed in as{" "}
                      <span className="font-semibold text-blue-600">
                        {userData?.FirstName}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleMobileAuthAction}
                        className="flex-1 py-2 px-4 bg-blue-600 rounded-full text-white font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-2 py-2 px-4 border-2 border-red-300 text-red-600 rounded-full font-semibold hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenu(false)}
                    className="block w-full py-2.5 px-4 bg-blue-600 rounded-full text-white font-semibold text-center hover:bg-blue-700 transition-colors"
                  >
                    Login
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;