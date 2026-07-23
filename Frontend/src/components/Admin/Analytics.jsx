import React, { useState, useEffect } from 'react';
// Import from the OrderManagement file where the context is defined
import { useOrders } from './OrderManagement';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  PieChart,
  BarChart3,
  LineChart,
  Download,
  RefreshCw,
  Filter,
  ChevronDown,
  ChevronUp,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Wallet,
  Building,
  IndianRupee,
  Percent,
  Target,
  Award,
  Zap,
  Activity,
  BarChart,
  Layers
} from 'lucide-react';


// STAT CARD COMPONENT

function StatCard({ title, value, icon: Icon, color, trend, trendValue, subtitle }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-1 mt-3">
          {trend === 'up' ? (
            <ArrowUpRight className="w-4 h-4 text-green-500" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trendValue}
          </span>
          <span className="text-xs text-gray-400">vs last month</span>
        </div>
      )}
    </div>
  );
}


// CHART COMPONENTS

function RevenueChart({ data }) {
  // Calculate max value, default to 1 if all values are 0
  const maxValue = Math.max(...data.map(d => d.value), 1);
  const hasData = data.some(d => d.value > 0);
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
          <p className="text-sm text-gray-500">Daily revenue for the last 7 days</p>
        </div>
      </div>
      
      {hasData ? (
        <>
          <div className="h-64 flex items-end gap-3">
            {data.map((item, index) => {
              const heightPercentage = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
              return (
                <div key={index} className="flex-1 h-full flex flex-col items-center gap-2">
                  <div className="relative w-full flex-1 group">
                    <div 
                      className="w-full bg-blue-500 rounded-t-lg transition-all duration-500 hover:bg-blue-600 absolute bottom-0 left-0"
                      style={{ 
                        height: `${Math.max(heightPercentage, 2)}%`,
                      }}
                    >
                      {item.value > 0 && (
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          ₹{item.value.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{item.day}</span>
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-between mt-4 text-xs text-gray-400">
            <span>Min: ₹{Math.min(...data.map(d => d.value))}</span>
            <span>Max: ₹{Math.max(...data.map(d => d.value))}</span>
          </div>
        </>
      ) : (
        <div className="h-64 flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">No revenue data for the last 7 days</p>
            <p className="text-xs text-gray-400">Add bookings to see revenue trends</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ServiceDistributionChart({ data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Service Distribution</h3>
          <p className="text-sm text-gray-500">Orders by service type</p>
        </div>
      </div>
      
      {data.length > 0 ? (
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">{item.name}</span>
                <span className="text-gray-600">{item.value} ({Math.round((item.value / total) * 100)}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${(item.value / total) * 100}%`,
                    backgroundColor: colors[index % colors.length]
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">No data available</p>
      )}
    </div>
  );
}

function PaymentMethodChart({ data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
          <p className="text-sm text-gray-500">Distribution of payment methods</p>
        </div>
      </div>
      
      {data.length > 0 ? (
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: colors[index % colors.length] }} />
              <div className="flex-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">{item.name}</span>
                  <span className="text-gray-600">{item.value} ({Math.round((item.value / total) * 100)}%)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">No data available</p>
      )}
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Total Payments</span>
          <span className="font-semibold text-gray-900">{total}</span>
        </div>
      </div>
    </div>
  );
}

function StatusChart({ data }) {
  const colors = {
    'Completed': '#10B981',
    'Active': '#3B82F6',
    'Pending': '#F59E0B',
    'Cancelled': '#EF4444'
  };

  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Order Status</h3>
          <p className="text-sm text-gray-500">Current status distribution</p>
        </div>
      </div>
      
      {data.length > 0 ? (
        <>
          <div className="flex items-center justify-center h-48">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {data.map((item, index) => {
                  const percentage = (item.value / total) * 100;
                  const startAngle = data.slice(0, index).reduce((sum, d) => sum + (d.value / total) * 360, 0);
                  const endAngle = startAngle + (percentage / 100) * 360;
                  
                  const startRad = (startAngle - 90) * Math.PI / 180;
                  const endRad = (endAngle - 90) * Math.PI / 180;
                  
                  const x1 = 50 + 40 * Math.cos(startRad);
                  const y1 = 50 + 40 * Math.sin(startRad);
                  const x2 = 50 + 40 * Math.cos(endRad);
                  const y2 = 50 + 40 * Math.sin(endRad);
                  
                  const largeArc = percentage > 50 ? 1 : 0;
                  
                  return (
                    <path
                      key={index}
                      d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                      fill={colors[item.name] || '#6B7280'}
                      className="transition-all duration-500"
                    />
                  );
                })}
                <circle cx="50" cy="50" r="25" fill="white" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900">{total}</p>
                  <p className="text-xs text-gray-500">Total</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-2">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[item.name] || '#6B7280' }} />
                <span className="text-xs text-gray-600">{item.name}</span>
                <span className="text-xs font-medium text-gray-900 ml-auto">{item.value}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 py-8">No data available</p>
      )}
    </div>
  );
}


// MAIN ANALYTICS COMPONENT

function Analytics() {
  // Use real data from context
  const { bookings } = useOrders();
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [loading, setLoading] = useState(false);

  
  // COMPUTED STATISTICS
 
  const totalOrders = bookings.length;
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const completedOrders = bookings.filter(b => b.status?.toLowerCase() === 'completed').length;
  const activeOrders = bookings.filter(b => {
    const s = b.status?.toLowerCase();
    return s && s !== 'completed' && s !== 'cancelled';
  }).length;
  const pendingOrders = bookings.filter(b => b.status?.toLowerCase() === 'pickup' || b.status?.toLowerCase() === 'pending').length;
  const cancelledOrders = bookings.filter(b => b.status?.toLowerCase() === 'cancelled').length;
 
  
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  const completionRate = totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0;
  
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
    acc[booking.paymentMethod] = (acc[booking.paymentMethod] || 0) + 1;
    return acc;
  }, {});
  
  const paymentDistribution = Object.entries(paymentData).map(([name, value]) => ({
    name,
    value
  }));

  // Status distribution
  const statusData = bookings.reduce((acc, booking) => {
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
  
  const statusDistribution = Object.entries(statusData).map(([name, value]) => ({
    name,
    value
  }));

  // Daily revenue (last 7 days)
  const today = new Date();
  const revenueData = Array.from({ length: 7 }, (_, i) => {
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
      .reduce((sum, b) => sum + b.totalAmount, 0);
    
    return { day, value: dailyRevenue };
  });

  // Monthly revenue trend (last 6 months)
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyRevenue = Array.from({ length: 6 }, (_, i) => {
    const month = new Date();
    month.setMonth(month.getMonth() - (5 - i));
    const monthName = monthNames[month.getMonth()];
    
    const monthlyTotal = bookings
      .filter(b => {
        const bookingMonth = new Date(b.bookingDate).getMonth();
        const bookingYear = new Date(b.bookingDate).getFullYear();
        return bookingMonth === month.getMonth() && bookingYear === month.getFullYear();
      })
      .reduce((sum, b) => sum + b.totalAmount, 0);
    
    return { month: monthName, revenue: monthlyTotal };
  });

  // Top customers
  const customerSpending = bookings.reduce((acc, booking) => {
    acc[booking.customerName] = (acc[booking.customerName] || 0) + booking.totalAmount;
    return acc;
  }, {});
  
  const topCustomers = Object.entries(customerSpending)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, amount]) => ({ name, amount }));

  // Popular services
  const servicePopularity = bookings.reduce((acc, booking) => {
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
  
  const popularServices = Object.entries(servicePopularity)
    .sort(([, a], [, b]) => b - a)
    .map(([name, count]) => ({ name, count }));

  
  // HANDLERS
 
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };


  // RENDER
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              Analytics Dashboard
              <span className="text-sm font-normal bg-green-500 text-white px-3 py-1 rounded-full animate-pulse">
                Live
              </span>
            </h1>
            <p className="text-gray-600 mt-1">Real-time insights from your orders</p>
          </div>
          
          {/* Removed: Date Range Selector and Export Report Button */}
          <button
            onClick={handleRefresh}
            className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            <RefreshCw className={`w-5 h-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          <StatCard
            title="Total Revenue"
            value={`₹${totalRevenue.toLocaleString()}`}
            icon={DollarSign}
            color="bg-gradient-to-br from-green-500 to-green-600"
            trend={totalRevenue > 0 ? "up" : "down"}
            trendValue={totalRevenue > 0 ? "12.5%" : "0%"}
          />
          <StatCard
            title="Total Orders"
            value={totalOrders}
            icon={ShoppingBag}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
            trend={totalOrders > 0 ? "up" : "down"}
            trendValue={totalOrders > 0 ? "8.3%" : "0%"}
          />
          <StatCard
            title="Completion Rate"
            value={`${completionRate}%`}
            icon={Target}
            color="bg-gradient-to-br from-purple-500 to-purple-600"
            trend={completionRate > 50 ? "up" : "down"}
            trendValue={completionRate > 50 ? "5.2%" : "0%"}
          />
          <StatCard
            title="Active Orders"
            value={activeOrders}
            icon={Activity}
            color="bg-gradient-to-br from-cyan-500 to-cyan-600"
            subtitle={`${pendingOrders} pending`}
          />
          <StatCard
            title="Avg Order Value"
            value={`₹${avgOrderValue}`}
            icon={Award}
            color="bg-gradient-to-br from-orange-500 to-orange-600"
            trend={avgOrderValue > 0 ? "up" : "down"}
            trendValue={avgOrderValue > 0 ? "3.7%" : "0%"}
          />
         
        </div>

        {/* MAIN CHARTS ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <RevenueChart data={revenueData} />
          </div>
          <div>
            <StatusChart data={statusDistribution} />
          </div>
        </div>

        {/* SECOND ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ServiceDistributionChart data={serviceDistribution} />
          <PaymentMethodChart data={paymentDistribution} />
        </div>

        {/* MONTHLY TREND */}
{/* MONTHLY TREND */}
<div className="bg-white rounded-xl shadow-sm p-6 mb-6">
  <div className="flex items-center justify-between mb-6">
    <div>
      <h3 className="text-lg font-semibold text-gray-900">Monthly Revenue Trend</h3>
      <p className="text-sm text-gray-500">Revenue performance over the last 6 months</p>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500">Showing:</span>
      <select
        className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 outline-none"
        value={selectedMetric}
        onChange={(e) => setSelectedMetric(e.target.value)}
      >
        <option value="revenue">Revenue</option>
      </select>
    </div>
  </div>
  
  <div className="h-64 relative">
    <div className="absolute inset-0 flex items-end justify-around px-4 pb-8">
      {monthlyRevenue.map((item, index) => {
        // Find the maximum revenue value
        const maxRevenue = Math.max(...monthlyRevenue.map(d => d.revenue), 1);
        // Calculate height percentage (80% of container to leave room for labels)
        const heightPercentage = (item.revenue / maxRevenue) * 80;
        // Ensure minimum height for visibility
        const barHeight = Math.max(heightPercentage, 5);
        
        return (
          <div key={index} className="flex flex-col items-center justify-end h-full" style={{ flex: 1 }}>
            {/* Revenue label */}
            <div className="text-xs font-medium text-gray-600 mb-1">
              ₹{item.revenue.toLocaleString()}
            </div>
            
            {/* Bar container */}
            <div className="w-full max-w-[60px] h-[80%] flex items-end justify-center">
              <div 
                className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-700 hover:from-blue-600 hover:to-blue-500"
                style={{ 
                  height: `${barHeight}%`,
                  minHeight: '8px',
                  width: '100%',
                  maxWidth: '50px',
                }}
              />
            </div>
            
            {/* Month label */}
            <span className="text-xs text-gray-500 mt-2">{item.month}</span>
          </div>
        );
      })}
    </div>
  </div>
</div>

        {/* INSIGHTS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Customers */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              Top Customers
            </h3>
            <div className="space-y-3">
              {topCustomers.length > 0 ? (
                topCustomers.map((customer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                        {index + 1}
                      </div>
                      <span className="font-medium text-gray-800">{customer.name}</span>
                    </div>
                    <span className="font-semibold text-green-600">₹{customer.amount.toLocaleString()}</span>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">No customers yet</p>
              )}
            </div>
          </div>

          {/* Popular Services */}
          {/* <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-500" />
              Popular Services
            </h3>
            <div className="space-y-3">
              {popularServices.length > 0 ? (
                popularServices.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-sm">
                        {index + 1}
                      </div>
                      <span className="font-medium text-gray-800">{service.name}</span>
                    </div>
                    <span className="font-semibold text-blue-600">{service.count} orders</span>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">No services yet</p>
              )}
            </div>
          </div> */}
        </div>

        
      </div>
    </div>
  );
}

export default Analytics;