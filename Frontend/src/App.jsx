import { GoogleOAuthProvider } from "@react-oauth/google";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useLayoutEffect } from "react";

import "./App.css";

import HomePage from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Services from "./Pages/Services";
import SubService from "./Pages/SubService";
import Pricing from "./Pages/Pricing";
import CheckOut from "./Pages/CheckOut";
import FAQ from "./Pages/FAQ";
import TermsCondition from "./Pages/TermsCondition";
import ResetPassword from "./Pages/ResetPassword";

import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import ForgotPassword from "./Auth/ForgotPassword";
import AdminLogin from "./Auth/AdminLogin";
import AdminRegister from "./components/Admin/AdminRegistration";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import UserProfile from "./User/UserProfile";
import Address from "./User/Address";
import MyBookings from "./User/MyBookings";
import OrderTracking from "./User/OrderTracking";

import AdminLayout from "./components/Admin/AdminLayout";
import ProtectedAdminRoute from "./components/Admin/ProtectedAdminRoute";
import AdminDashboard from "./components/Admin/AdminDashboard";
import UserManagement from "./components/Admin/UserManagement";
import OrderManagement, {
  OrderProvider,
} from "./components/Admin/OrderManagement";
import ServiceManagement from "./components/Admin/ServiceManagement";
import Payments from "./components/Admin/Payments";
import Analytics from "./components/Admin/Analytics";
import InquiryManagement from "./components/Admin/InquiryManagement";

const OldAdminLoginRedirect = () => <Navigate to="/admin/login" replace />;

const OldAdminRegisterRedirect = () => (
  <Navigate to="/admin/register" replace />
);

const OldAdminDashboardRedirect = () => <Navigate to="/admin" replace />;

const OldAdminSubRoutesRedirect = () => {
  const location = useLocation();
  const newPath = location.pathname.replace("/admin_dashboard", "/admin");

  return <Navigate to={newPath} replace />;
};

function App() {
  const location = useLocation();
  const { pathname } = location;

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const hideLayoutRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/admin/login",
    "/admin/register",
  ];

  const hideLayout =
    hideLayoutRoutes.includes(pathname) ||
    pathname.startsWith("/reset-password");

  const isAdminRoute = pathname.startsWith("/admin");

  const showNavbarAndFooter = !(hideLayout || isAdminRoute);

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      {showNavbarAndFooter && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route
          path="/services/:service"
          element={<SubService key={pathname} />}
        />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/terms-condition" element={<TermsCondition />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/checkout" element={<CheckOut />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/user-address" element={<Address />} />
        <Route path="/user-orders" element={<MyBookings />} />
        <Route path="/user-tracking" element={<OrderTracking />} />
        <Route path="/user-terms" element={<TermsCondition />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />

        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <OrderProvider>
                <AdminLayout />
              </OrderProvider>
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="services" element={<ServiceManagement />} />
          <Route path="payments" element={<Payments />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="inquiries" element={<InquiryManagement />} />
        </Route>

        <Route path="/admin-login" element={<OldAdminLoginRedirect />} />
        <Route
          path="/admin-register"
          element={<OldAdminRegisterRedirect />}
        />
        <Route
          path="/admin_dashboard"
          element={<OldAdminDashboardRedirect />}
        />
        <Route
          path="/admin_dashboard/*"
          element={<OldAdminSubRoutesRedirect />}
        />

        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-blue-900">404</h1>
                <p className="text-gray-500 mt-4 text-lg">
                  Page not found
                </p>
                <a
                  href="/"
                  className="inline-block mt-6 px-6 py-2 bg-blue-900 text-white rounded-full hover:bg-blue-800 transition-colors"
                >
                  Go Home
                </a>
              </div>
            </div>
          }
        />
      </Routes>

      {showNavbarAndFooter && <Footer />}
    </GoogleOAuthProvider>
  );
}

export default App;