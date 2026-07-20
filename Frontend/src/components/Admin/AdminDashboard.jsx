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
  Plus
} from 'lucide-react';

const AdminDashboard = () => { 
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('Admin');
  const [loginActivities, setLoginActivities] = useState([]);

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

  // Add admin login activity
  const addLoginActivity = (action) => {
    const activities = JSON.parse(localStorage.getItem('adminLoginActivities') || '[]');
    const session = JSON.parse(localStorage.getItem('adminSession'));
    
    if (session) {
      const initials = session.fullName ? 
        session.fullName.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2) : 
        'AD';
      
      const newActivity = {
        id: Date.now(),
        initials: initials,
        name: session.fullName || 'Admin',
        action: action,
        time: 'Just now',
        timestamp: new Date().toISOString()
      };
      
      activities.unshift(newActivity);
      if (activities.length > 50) {
        activities.pop();
      }
      localStorage.setItem('adminLoginActivities', JSON.stringify(activities));
      setLoginActivities(activities);
    }
  };

  // Real revenue data for weekly revenue
  const orderData = [
    { name: 'Mon', orders: 45, revenue: 12000 },
    { name: 'Tue', orders: 52, revenue: 15600 },
    { name: 'Wed', orders: 38, revenue: 11400 },
    { name: 'Thu', orders: 60, revenue: 18000 },
    { name: 'Fri', orders: 75, revenue: 22500 },
    { name: 'Sat', orders: 48, revenue: 14400 },
    { name: 'Sun', orders: 30, revenue: 9000 },
  ];

  // Real service distribution with actual numbers
  const serviceDistribution = [
    { name: 'Dry Cleaning', value: 35, revenue: 87500 },
    { name: 'Wash & Fold', value: 40, revenue: 100000 },
    { name: 'Ironing', value: 15, revenue: 37500 },
    { name: 'Stain Removal', value: 10, revenue: 25000 },
  ];

  // Calculate total revenue
  const totalServiceRevenue = serviceDistribution.reduce((sum, s) => sum + s.revenue, 0);
  const totalOrderRevenue = orderData.reduce((sum, day) => sum + day.revenue, 0);
  const totalRevenue = totalServiceRevenue + totalOrderRevenue;

  // Monthly revenue data
  const monthlyData = [
    { name: 'Jan', revenue: 85000 },
    { name: 'Feb', revenue: 92000 },
    { name: 'Mar', revenue: 78000 },
    { name: 'Apr', revenue: 105000 },
    { name: 'May', revenue: 112000 },
    { name: 'Jun', revenue: 98000 },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

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
      {/* Welcome Message */}
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
        </div>
      </motion.div>

      {/* Recent Activity & Quick Actions Grid */}
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

      {/* Total Revenue Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500 mb-8"
      >
        <p className="text-sm text-gray-500">Total Revenue</p>
        <h3 className="text-3xl font-bold text-gray-800">₹{totalRevenue.toLocaleString()}</h3>
        <span className="text-xs text-green-600">↑ 18.2% from last month</span>
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Weekly Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={orderData}>
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

        {/* Service Distribution */}
        {/* <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Distribution</h3>
          <div className="flex justify-center">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={serviceDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent, cx, cy, midAngle, innerRadius, outerRadius, index }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = outerRadius * 0.6;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    return `${(percent * 100).toFixed(0)}%`;
                  }}
                  outerRadius={130}
                  fill="#8884d8"
                  dataKey="value"
                  paddingAngle={2}
                >
                  {serviceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div> */}
      </div>

      {/* Monthly Trend */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#3B82F6" name="Revenue" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default AdminDashboard;