import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { 
  Users, 
  ShoppingBag, 
  Wrench, 
  CreditCard, 
  BarChart3,
  ChevronRight,
  Clock,
  Plus,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock as ClockIcon,
  DollarSign
} from 'lucide-react';
// Import the useOrders hook
import { useOrders } from './OrderManagement';

const AdminDashboard = () => { 
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('Admin');
  const [loginActivities, setLoginActivities] = useState([]);
  
  // Get real orders data from context
  const { bookings } = useOrders();

  // Check if admin is logged in and get data from localStorage
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('adminSession'));
    
    if (!session || !session.isLoggedIn) {
      navigate('/admin-login');
      return;
    }

    setAdminName(session.fullName || 'Admin');

    // Load login activities from localStorage
    loadLoginActivities(session);
  }, [navigate]);

  // Load login activities from localStorage
  const loadLoginActivities = (session) => {
    const storedActivities = JSON.parse(localStorage.getItem('adminLoginActivities') || '[]');
    
    // If no activities exist, create default one with current login
    if (storedActivities.length === 0) {
      const initials = session.fullName ? 
        session.fullName.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2) : 
        'AD';
      
      const defaultActivity = {
        id: Date.now(),
        initials: initials,
        name: session.fullName || 'Admin',
        action: 'Logged in to admin dashboard',
        time: 'Just now',
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('adminLoginActivities', JSON.stringify([defaultActivity]));
      setLoginActivities([defaultActivity]);
    } else {
      setLoginActivities(storedActivities);
    }
  };

  // ============= COMPUTED STATISTICS FROM BOOKINGS =============
  
  // Order counts
  const totalOrders = bookings.length;
  const completedOrders = bookings.filter(b => b.status?.toLowerCase() === 'completed').length;
  const activeOrders = bookings.filter(b => {
    const s = b.status?.toLowerCase();
    return s && s !== 'completed' && s !== 'cancelled';
  }).length;
  const pendingOrders = bookings.filter(b => b.status?.toLowerCase() === 'pickup' || b.status?.toLowerCase() === 'pending').length;
  const cancelledOrders = bookings.filter(b => b.status?.toLowerCase() === 'cancelled').length;

  // TOTAL REVENUE - ONLY REVENUE, NO PROFIT/LOSS
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  // Order status distribution for pie chart
  const statusDistribution = bookings.reduce((acc, booking) => {
    const s = booking.status?.toLowerCase();
    let displayStatus = 'Active';
    if (s === 'completed') {
      displayStatus = 'Completed';
    } else if (s === 'cancelled') {
      displayStatus = 'Cancelled';
    } else if (s === 'pickup' || s === 'pending') {
      displayStatus = 'Pending';
    }
    
    acc[displayStatus] = (acc[displayStatus] || 0) + 1;
    return acc;
  }, {});
  
  const orderStatusData = Object.entries(statusDistribution).map(([name, value]) => ({
    name,
    value
  }));

  // Service distribution
  const serviceData = bookings.reduce((acc, booking) => {
    if (booking.service) {
      const services = booking.service.split(',').map(s => s.trim()).filter(Boolean);
      services.forEach(s => {
        acc[s] = (acc[s] || 0) + 1;
      });
    } else {
      acc['Laundry'] = (acc['Laundry'] || 0) + 1;
    }
    return acc;
  }, {});
  
  const serviceDistribution = Object.entries(serviceData).map(([name, value]) => ({
    name,
    value
  }));

  // Payment method distribution
  const paymentData = bookings.reduce((acc, booking) => {
    const method = booking.paymentMethod || 'Unknown';
    acc[method] = (acc[method] || 0) + 1;
    return acc;
  }, {});
  
  const paymentDistribution = Object.entries(paymentData).map(([name, value]) => ({
    name,
    value
  }));

  // Weekly revenue (last 7 days)
  const today = new Date();
  const weeklyRevenueData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (6 - i));
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    
    const dailyRevenue = bookings
      .filter(b => {
        const bookingDate = new Date(b.bookingDate);
        return bookingDate.getFullYear() === date.getFullYear() &&
               bookingDate.getMonth() === date.getMonth() &&
               bookingDate.getDate() === date.getDate();
      })
      .reduce((sum, b) => sum + (b.totalAmount || 0), 0);
    
    return { name: day, revenue: dailyRevenue };
  });

  // Monthly revenue (last 6 months)
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyRevenueData = Array.from({ length: 6 }, (_, i) => {
    const month = new Date();
    month.setMonth(month.getMonth() - (5 - i));
    const monthName = monthNames[month.getMonth()];
    
    const monthlyTotal = bookings
      .filter(b => {
        const bookingMonth = new Date(b.bookingDate).getMonth();
        const bookingYear = new Date(b.bookingDate).getFullYear();
        return bookingMonth === month.getMonth() && bookingYear === month.getFullYear();
      })
      .reduce((sum, b) => sum + (b.totalAmount || 0), 0);
    
    return { name: monthName, revenue: monthlyTotal };
  });

  // ============= CONSTANTS =============
  
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
  const STATUS_COLORS = {
    'Completed': '#10B981',
    'Pending': '#F59E0B',
    'Active': '#3B82F6',
    'Cancelled': '#EF4444'
  };

  // Quick Actions Data  
  const quickActions = [
    { id: 1, icon: Users, label: 'User Management', color: 'bg-blue-500', path: '/admin-dashboard/user-management' },
    { id: 2, icon: ShoppingBag, label: 'Order Management', color: 'bg-green-500', path: '/admin-dashboard/orders' },
    { id: 3, icon: Wrench, label: 'Service Management', color: 'bg-yellow-500', path: '/admin-dashboard/services' },
    { id: 4, icon: CreditCard, label: 'Payments', color: 'bg-purple-500', path: '/admin-dashboard/payments' },
    { id: 5, icon: BarChart3, label: 'Analytics', color: 'bg-red-500', path: '/admin-dashboard/analytics' },
  ];
 
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Get current date and time for welcome message
  const currentHour = new Date().getHours();
  let greeting = 'Good Morning';
  if (currentHour >= 12 && currentHour < 17) {
    greeting = 'Good Afternoon';
  } else if (currentHour >= 17) {
    greeting = 'Good Evening';
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{label}</p>
          {payload.map((item, index) => (
            <p key={index} className="text-sm" style={{ color: item.color }}>
              {item.name}: ₹{item.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return 'AD';
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  // Format time
  const formatTime = (timestamp) => {
    if (!timestamp) return 'Just now';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hr ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      {/* ===== WELCOME MESSAGE ===== */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold">
              {greeting}, {adminName}!
            </h2>
            <p className="text-blue-100 mt-1">
              Welcome back to your LaundryHub dashboard. Here's what's happening with your business today.
            </p>
            <p className="text-blue-200 text-sm mt-2">
              {currentDate}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
            <span className="text-sm">Total Orders: {totalOrders}</span>
          </div>
        </div>
      </motion.div>

      {/* ===== ORDER STATUS SUMMARY CARDS ===== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-blue-500"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ClockIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Active Orders</p>
              <h4 className="text-xl font-bold text-gray-800">{activeOrders}</h4>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-yellow-500"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Pending Orders</p>
              <h4 className="text-xl font-bold text-gray-800">{pendingOrders}</h4>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-green-500"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Completed Orders</p>
              <h4 className="text-xl font-bold text-gray-800">{completedOrders}</h4>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-red-500"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Cancelled Orders</p>
              <h4 className="text-xl font-bold text-gray-800">{cancelledOrders}</h4>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ===== TOTAL REVENUE - ONLY REVENUE ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl shadow-sm p-6 border-l-4 border-green-500 mb-8"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-500 rounded-lg">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
            <h3 className="text-3xl font-bold text-gray-800">₹{totalRevenue.toLocaleString()}</h3>
            <span className="text-xs text-green-600">↑ Based on {totalOrders} orders</span>
          </div>
        </div>
      </motion.div>

      {/* ===== RECENT ACTIVITY & QUICK ACTIONS ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"> 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="lg:col-span-2"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">Admin Login Activity</h3>
              </div>
              <span className="text-xs text-gray-400">
                {loginActivities.length} activities
              </span>
            </div>

            <div className="space-y-4 max-h-80 overflow-y-auto">
              {loginActivities.length > 0 ? (
                loginActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id || index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                        {activity.initials || getInitials(activity.name)}
                      </div>
                      <div>
                        <p className="text-sm text-gray-800">
                          <span className="font-medium">{activity.name}</span>
                          <span className="text-gray-500 ml-1">{activity.action}</span>
                        </p>
                        {activity.timestamp && (
                          <p className="text-xs text-gray-400 mt-0.5">
                            {new Date(activity.timestamp).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {activity.time || formatTime(activity.timestamp)}
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-400 text-sm text-center py-4">No admin login activities yet</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
            <div className="flex items-center gap-2 mb-4">
              <Plus size={20} className="text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + index * 0.05 }}
                  whileHover={{ 
                    scale: 1.02,
                    x: 4,
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleNavigation(action.path)}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 border border-transparent hover:border-gray-200 cursor-pointer"
                >
                  <div className={`${action.color} p-2 rounded-lg text-white`}>
                    <action.icon size={18} />
                  </div>
                  <span className="text-sm font-medium text-gray-700 flex-1 text-left">
                    {action.label}
                  </span>
                  <ChevronRight size={16} className="text-gray-400" />
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ===== CHARTS ROW ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Weekly Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="revenue" fill="#3B82F6" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-2 text-xs text-gray-500 text-center">
            Showing revenue for the current week
          </div>
        </div>

        {/* Order Status Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Status Distribution</h3>
          {orderStatusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  paddingAngle={2}
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={STATUS_COLORS[entry.name] || COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} orders`} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center">
              <p className="text-gray-500">No order data available</p>
            </div>
          )}
          <div className="mt-2 grid grid-cols-2 gap-2">
            {orderStatusData.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-xs">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: STATUS_COLORS[item.name] || COLORS[index % COLORS.length] }}
                />
                <span className="text-gray-600">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== MONTHLY REVENUE TREND ===== */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlyRevenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#3B82F6" name="Revenue" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ===== SERVICE & PAYMENT DISTRIBUTION ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Distribution</h3>
          {serviceDistribution.length > 0 ? (
            <div className="space-y-3">
              {serviceDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">{item.name}</span>
                  <span className="text-sm font-semibold text-blue-600">{item.value} orders</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No service data available</p>
          )}
        </div>

        {/* Payment Method Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Methods</h3>
          {paymentDistribution.length > 0 ? (
            <div className="space-y-3">
              {paymentDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="font-medium text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-purple-600">{item.value} orders</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No payment data available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;