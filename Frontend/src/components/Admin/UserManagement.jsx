import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Edit, 
  Trash2, 
  UserCheck, 
  UserX, 
  Plus, 
  X,
  ChevronLeft,
  ChevronRight,
  Mail,
  CheckCircle,
  AlertCircle,
  Users,
  ArrowLeft,
  User,
  ShoppingBag,
  Phone,
  MapPin,
  Calendar,
  CalendarX,
  Eye,
  Clock,
  Home,
  Star
} from 'lucide-react';


// MOCK DATA - Customer Data

const MOCK_USERS = [
  { 
    id: '1', 
    name: 'Rajesh Kumar', 
    email: 'rajesh@email.com', 
    status: 'Active', 
    avatar: 'R', 
    lastLogin: '2024-06-19T10:30:00', 
    joined: '2024-01-15', 
    closedDate: null,
    bookings: 45,
    phone: '+91 98765 43210',
    address: '123, MG Road, Mumbai - 400001',
    totalSpent: '₹12,450',
    totalBookings: 45,
    completedBookings: 42,
    cancelledBookings: 3,
    preferredService: 'Dry Cleaning',
    rating: 4.8,
    feedback: 'Excellent service! Always on time.'
  },
  { 
    id: '2', 
    name: 'Priya Sharma', 
    email: 'priya@email.com', 
    status: 'Active', 
    avatar: 'P', 
    lastLogin: '2024-06-18T14:20:00', 
    joined: '2024-02-20', 
    closedDate: null,
    bookings: 23,
    phone: '+91 98765 43211',
    address: '456, Lake View, Bangalore - 560001',
    totalSpent: '₹6,780',
    totalBookings: 23,
    completedBookings: 20,
    cancelledBookings: 3,
    preferredService: 'Wash & Fold',
    rating: 4.5,
    feedback: 'Great quality, reasonable prices.'
  },
  { 
    id: '3', 
    name: 'Amit Patel', 
    email: 'amit@email.com', 
    status: 'Active', 
    avatar: 'A', 
    lastLogin: '2024-06-19T08:45:00', 
    joined: '2024-04-05', 
    closedDate: null,
    bookings: 12,
    phone: '+91 98765 43212',
    address: '789, Park Street, Delhi - 110001',
    totalSpent: '₹3,450',
    totalBookings: 12,
    completedBookings: 10,
    cancelledBookings: 2,
    preferredService: 'Ironing',
    rating: 4.2,
    feedback: 'Good service, will use again.'
  },
  { 
    id: '4', 
    name: 'Sneha Reddy', 
    email: 'sneha@email.com', 
    status: 'Deactive', 
    avatar: 'S', 
    lastLogin: '2024-06-10T09:15:00', 
    joined: '2024-03-10', 
    closedDate: '2024-06-15',
    bookings: 3,
    phone: '+91 98765 43213',
    address: '321, Green Valley, Hyderabad - 500001',
    totalSpent: '₹890',
    totalBookings: 3,
    completedBookings: 1,
    cancelledBookings: 2,
    preferredService: 'Stain Removal',
    rating: 3.5,
    feedback: 'Service was okay.'
  },
  { 
    id: '5', 
    name: 'Vikram Singh', 
    email: 'vikram@email.com', 
    status: 'Deactive', 
    avatar: 'V', 
    lastLogin: null, 
    joined: '2024-06-01', 
    closedDate: '2024-06-10',
    bookings: 0,
    phone: '+91 98765 43214',
    address: '654, Sunrise Colony, Jaipur - 302001',
    totalSpent: '₹0',
    totalBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
    preferredService: 'N/A',
    rating: 0,
    feedback: 'Never used service.'
  },
  { 
    id: '6', 
    name: 'Ananya Gupta', 
    email: 'ananya@email.com', 
    status: 'Active', 
    avatar: 'A', 
    lastLogin: '2024-06-17T16:00:00', 
    joined: '2024-05-12', 
    closedDate: null,
    bookings: 7,
    phone: '+91 98765 43215',
    address: '987, Coastal Road, Chennai - 600001',
    totalSpent: '₹2,100',
    totalBookings: 7,
    completedBookings: 6,
    cancelledBookings: 1,
    preferredService: 'Dry Cleaning',
    rating: 4.7,
    feedback: 'Very professional service.'
  },
  { 
    id: '7', 
    name: 'Rahul Verma', 
    email: 'rahul@email.com', 
    status: 'Active', 
    avatar: 'R', 
    lastLogin: '2024-06-18T22:10:00', 
    joined: '2024-02-01', 
    closedDate: null,
    bookings: 34,
    phone: '+91 98765 43216',
    address: '147, Garden City, Pune - 411001',
    totalSpent: '₹9,870',
    totalBookings: 34,
    completedBookings: 32,
    cancelledBookings: 2,
    preferredService: 'Wash & Fold',
    rating: 4.9,
    feedback: 'Best laundry service in town!'
  },
  { 
    id: '8', 
    name: 'Meera Nair', 
    email: 'meera@email.com', 
    status: 'Active', 
    avatar: 'M', 
    lastLogin: '2024-06-19T12:00:00', 
    joined: '2024-05-20', 
    closedDate: null,
    bookings: 8,
    phone: '+91 98765 43217',
    address: '258, Temple Road, Kochi - 682001',
    totalSpent: '₹2,340',
    totalBookings: 8,
    completedBookings: 7,
    cancelledBookings: 1,
    preferredService: 'Ironing',
    rating: 4.3,
    feedback: 'Good quality ironing.'
  },
  { 
    id: '9', 
    name: 'Arjun Reddy', 
    email: 'arjun@email.com', 
    status: 'Deactive', 
    avatar: 'A', 
    lastLogin: '2024-06-05T11:30:00', 
    joined: '2024-03-25', 
    closedDate: '2024-06-18',
    bookings: 1,
    phone: '+91 98765 43218',
    address: '369, Lake Gardens, Kolkata - 700001',
    totalSpent: '₹250',
    totalBookings: 1,
    completedBookings: 0,
    cancelledBookings: 1,
    preferredService: 'Stain Removal',
    rating: 0,
    feedback: 'Not satisfied with service.'
  },
  { 
    id: '10', 
    name: 'Kavya Menon', 
    email: 'kavya@email.com', 
    status: 'Deactive', 
    avatar: 'K', 
    lastLogin: null, 
    joined: '2024-06-15', 
    closedDate: '2024-06-20',
    bookings: 0,
    phone: '+91 98765 43219',
    address: '741, Hill View, Coimbatore - 641001',
    totalSpent: '₹0',
    totalBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
    preferredService: 'N/A',
    rating: 0,
    feedback: 'Account deactivated.'
  },
];


// USER DETAIL VIEW COMPONENT

function UserDetailView({ user, onBack, onEdit }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Header with back button */}
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
              {user.avatar}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {user.email}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(user)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
        </div>
      </div>

      {/* User Details Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Personal Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Personal Information</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Full Name</p>
                  <p className="text-sm font-medium text-gray-800">{user.name}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Email Address</p>
                  <p className="text-sm font-medium text-gray-800">{user.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Phone Number</p>
                  <p className="text-sm font-medium text-gray-800">{user.phone || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Home className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="text-sm font-medium text-gray-800">{user.address || 'Not provided'}</p>
                </div>
              </div>
            </div>

            {/* Account Status */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Account Status</h3>
              <div className="grid grid-cols-2 gap-3">
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">Joined Date</p>
                  <p className="text-sm font-medium text-gray-800">{new Date(user.joined).toLocaleDateString()}</p>
                </div>
                {/* {user.closedDate && (
                  <div className="p-3 bg-gray-50 rounded-lg col-span-2">
                    <p className="text-xs text-gray-500">Account Closed On</p>
                    <p className="text-sm font-medium text-gray-800">{new Date(user.closedDate).toLocaleDateString()}</p>
                  </div>
                )} */}
              </div>
            </div>
          </div>

          {/* Right Column - Activity & Stats */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Activity Summary</h3>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-gray-500">Total Bookings</p>
                <p className="text-xl font-bold text-blue-600">{user.totalBookings || 0}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-xs text-gray-500">Completed</p>
                <p className="text-xl font-bold text-green-600">{user.completedBookings || 0}</p>
              </div>
             
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-xs text-gray-500">Total Spent</p>
                <p className="text-xl font-bold text-purple-600">{user.totalSpent || '₹0'}</p>
              </div>
            </div>

           
            
          </div>
        </div>
      </div>
    </div>
  );
}


// EDIT MODAL COMPONENT

function EditUserModal({ user, onClose, onSave }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState(user);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      onSave(formData);
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
            <Edit className="w-5 h-5 text-blue-600" />
            Edit Customer
          </h2>
          <button 
            onClick={onClose} 
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            type="button"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="+91 98765 43210"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              value={formData.address || ''}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Enter customer address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => {
                const newStatus = e.target.value;
                const today = new Date().toISOString().split('T')[0];
                setFormData({ 
                  ...formData, 
                  status: newStatus,
                  closedDate: newStatus === 'Deactive' ? today : null
                });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            >
              <option value="Active">Active</option>
              <option value="Deactive">Deactive</option>
            </select>
          </div>

          {formData.status === 'Deactive' && formData.closedDate && (
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Closed On
              </label>
              <input
                type="date"
                value={formData.closedDate}
                onChange={(e) => setFormData({ ...formData, closedDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
              />
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


// MAIN COMPONENT

function UserManagement() {
  // State
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);
  const itemsPerPage = 5;
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_URL}/api/admin/users`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
      const data = await res.json();
      if (data.success) {
        const mappedUsers = data.users.map(u => ({
          id: u._id,
          name: u.name || `${u.firstName || ''} ${u.lastName || ''}`.trim() || 'Unknown User',
          firstName: u.firstName || '',
          lastName: u.lastName || '',
          email: u.email,
          phone: u.phone,
          address: u.address || '',
          status: u.status || 'Active',
          joined: u.createdAt || new Date().toISOString(),
          closedDate: u.closedDate || null,
          avatar: (u.firstName || u.name || 'U').charAt(0).toUpperCase(),
          // Mock data integrations for detail view fields not yet in db schema
          bookings: 0,
          totalSpent: '₹0',
          totalBookings: 0,
          completedBookings: 0,
          cancelledBookings: 0,
          preferredService: 'N/A',
          rating: 0,
          feedback: 'No feedback yet',
          lastLogin: null
        }));
        setUsers(mappedUsers);
      } else {
        setError(data.message || 'Failed to retrieve user accounts.');
      }
    } catch (err) {
      console.error(err);
      setError('Could not connect to the backend server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // COMPUTED VALUES
  
  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'Active').length,
    deactive: users.filter(u => u.status === 'Deactive').length,
    totalBookings: users.reduce((sum, u) => sum + (u.bookings || 0), 0),
  };

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (user.phone && user.phone.includes(searchTerm)) ||
                          (user.address && user.address.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'All' || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  // HANDLERS

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedUsers(paginatedUsers.map(u => u.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId, checked) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this customer? This action cannot be undone.')) {
      try {
       const res = await fetch(`${API_URL}/api/admin/users/${userId}`, {
          method: 'DELETE'
        });
        const data = await res.json();
        if (data.success) {
          setUsers(users.filter(u => u.id !== userId));
          setSelectedUsers(selectedUsers.filter(id => id !== userId));
          if (selectedUser?.id === userId) {
            setShowDetailView(false);
            setSelectedUser(null);
          }
        } else {
          alert(data.message || 'Failed to delete customer.');
        }
      } catch (err) {
        console.error(err);
        alert('Error connecting to backend to delete customer.');
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedUsers.length === 0) return;
    if (window.confirm(`Delete ${selectedUsers.length} selected customers?`)) {
      try {
        const deletePromises = selectedUsers.map(id =>
          fetch(`${API_URL}/api/admin/users/${id}`,  { method: 'DELETE' }).then(r => r.json())
        );
        await Promise.all(deletePromises);
        setUsers(users.filter(u => !selectedUsers.includes(u.id)));
        setSelectedUsers([]);
      } catch (err) {
        console.error(err);
        alert('An error occurred during bulk delete. Refreshing user list.');
        fetchUsers();
      }
    }
  };

  const handleBulkStatus = async (status) => {
    if (selectedUsers.length === 0) return;
    const today = new Date().toISOString();
    try {
      const updatePromises = selectedUsers.map(id =>
       fetch(`${API_URL}/api/admin/users/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status,
            closedDate: status === 'Deactive' ? today : null
          })
        }).then(r => r.json())
      );
      await Promise.all(updatePromises);
      setUsers(users.map(u => 
        selectedUsers.includes(u.id) ? { 
          ...u, 
          status,
          closedDate: status === 'Deactive' ? today : null
        } : u
      ));
      setSelectedUsers([]);
    } catch (err) {
      console.error(err);
      alert('Error updating user statuses. Refreshing.');
      fetchUsers();
    }
  };

  const handleToggleStatus = async (userId) => {
    const userObj = users.find(u => u.id === userId);
    if (!userObj) return;
    const newStatus = userObj.status === 'Active' ? 'Deactive' : 'Active';
    const today = new Date().toISOString();
    try {
      const res = await fetch(`${API_URL}/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          closedDate: newStatus === 'Deactive' ? today : null
        })
      });
      const data = await res.json();
      if (data.success) {
        setUsers(users.map(u =>
          u.id === userId
            ? { 
                ...u, 
                status: newStatus,
                closedDate: newStatus === 'Deactive' ? today : null
              }
            : u
        ));
      } else {
        alert(data.message || 'Failed to toggle status.');
      }
    } catch (err) {
      console.error(err);
      alert('Error toggling status.');
    }
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
     const res = await fetch(`${API_URL}/api/admin/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: updatedUser.name,
          email: updatedUser.email,
          phone: updatedUser.phone,
          address: updatedUser.address,
          status: updatedUser.status,
          closedDate: updatedUser.closedDate
        })
      });
      const data = await res.json();
      if (data.success) {
        setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
        if (selectedUser?.id === updatedUser.id) {
          setSelectedUser(updatedUser);
        }
        setShowEditModal(false);
        setEditingUser(null);
      } else {
        alert(data.message || 'Failed to save customer changes.');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating customer profile.');
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowDetailView(true);
  };

  const handleBackToList = () => {
    setShowDetailView(false);
    setSelectedUser(null);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  const getStatusBadge = (status) => {
    const config = {
      Active: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      Deactive: { color: 'bg-red-100 text-red-800', icon: AlertCircle },
    };
    const { color, icon: Icon } = config[status] || config.Deactive;
    return (
      <span className={`px-2 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full ${color}`}>
        <Icon className="w-3 h-3" />
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading customers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={fetchUsers}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

 
  // RENDER
  
  
  // If detail view is active, show the user detail
  if (showDetailView && selectedUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <UserDetailView 
            user={selectedUser} 
            onBack={handleBackToList}
            onEdit={handleEditUser}
          />
        </div>
        {showEditModal && editingUser && (
          <EditUserModal
            user={editingUser}
            onClose={() => {
              setShowEditModal(false);
              setEditingUser(null);
            }}
            onSave={handleUpdateUser}
          />
        )}
      </div>
    );
  }

  // Otherwise show the list view
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              Customer Management
              <span className="text-sm font-normal bg-blue-600 text-white px-3 py-1 rounded-full">
                {stats.total} Total
              </span>
            </h1>
            <p className="text-gray-600 mt-1">Click on any customer to view detailed information</p>
          </div>
          
         
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500 hover:shadow-md transition">
            <p className="text-sm text-gray-500">Total Customers</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          {/* <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500 hover:shadow-md transition">
            <p className="text-sm text-gray-500">Active</p>
            <p className="text-2xl font-bold text-green-600">{stats.active}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-red-500 hover:shadow-md transition">
            <p className="text-sm text-gray-500">Deactive</p>
            <p className="text-2xl font-bold text-red-600">{stats.deactive}</p>
          </div> */}
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-purple-500 hover:shadow-md transition">
            <p className="text-sm text-gray-500">Total Bookings</p>
            <p className="text-2xl font-bold text-purple-600">{stats.totalBookings}</p>
          </div>
        </div>

        {/* TOOLBAR */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, email, phone, or address..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            {/* <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Deactive">Deactive</option>
            </select> */}

            {/* Bulk Actions */}
            {/* {selectedUsers.length > 0 && (
              <div className="flex gap-2 items-center flex-wrap">
                <span className="text-sm text-gray-600 font-medium">{selectedUsers.length} selected</span>
                <button
                  onClick={() => handleBulkStatus('Active')}
                  className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm transition"
                  type="button"
                >
                  Activate
                </button>
                <button
                  onClick={() => handleBulkStatus('Deactive')}
                  className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm transition"
                  type="button"
                >
                  Deactivate
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm transition"
                  type="button"
                >
                  Delete
                </button>
              </div>
            )} */}
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 w-10">
                    <input
                      type="checkbox"
                      checked={paginatedUsers.length > 0 && selectedUsers.length === paginatedUsers.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Contact</th>
                  {/* <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th> */}
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Joined</th>
                  {/* <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Closed Date</th> */}
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedUsers.map((user) => (
                  <tr 
                    key={user.id} 
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleUserClick(user)}
                  >
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={(e) => handleSelectUser(user.id, e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                          {user.avatar}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </div>
                          {user.address && (
                            <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3" />
                              {user.address.length > 30 ? user.address.substring(0, 30) + '...' : user.address}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="text-sm text-gray-600 whitespace-nowrap">
                        {user.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3 flex-shrink-0" />
                            <span>{user.phone}</span>
                          </div>
                        )}
                        {user.totalSpent && (
                          <div className="text-xs text-gray-500">
                            Spent: {user.totalSpent}
                          </div>
                        )}
                      </div>
                    </td>
                    {/* <td className="px-4 py-3">
                      {getStatusBadge(user.status)}
                    </td> */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                        <ShoppingBag className="w-4 h-4 text-blue-500" />
                        {user.bookings || 0}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 hidden lg:table-cell">
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        <Calendar className="w-3 h-3 flex-shrink-0" />
                        {new Date(user.joined).toLocaleDateString()}
                      </div>
                    </td>
                    {/* <td className="px-4 py-3 hidden lg:table-cell">
                      {user.status === 'Deactive' && user.closedDate ? (
                        <div className="flex items-center gap-1 text-sm text-red-600 whitespace-nowrap">
                          <CalendarX className="w-4 h-4 flex-shrink-0" />
                          {new Date(user.closedDate).toLocaleDateString()}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">—</span>
                      )}
                    </td> */}
                    <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        {/* <button
                          onClick={() => handleToggleStatus(user.id)}
                          className={`p-1.5 rounded hover:bg-gray-100 transition-colors
                            ${user.status === 'Active' ? 'text-red-500 hover:text-red-700' : 'text-green-500 hover:text-green-700'}`}
                          title={user.status === 'Active' ? 'Deactivate' : 'Activate'}
                          type="button"
                        >
                          {user.status === 'Active' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                        </button> */}
                        <button
                          onClick={() => handleUserClick(user)}
                          className="p-1.5 rounded hover:bg-gray-100 text-blue-500 hover:text-blue-700 transition-colors"
                          title="View Details"
                          type="button"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No customers found matching your filters</p>
            </div>
          )}

          {/* PAGINATION */}
          {filteredUsers.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-3">
              <p className="text-sm text-gray-500">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
                {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} customers
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  type="button"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 border rounded text-sm transition ${
                      currentPage === page
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'hover:bg-gray-50'
                    }`}
                    type="button"
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  type="button"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* EDIT MODAL - For list view */}
      {showEditModal && editingUser && !showDetailView && (
        <EditUserModal
          user={editingUser}
          onClose={() => {
            setShowEditModal(false);
            setEditingUser(null);
          }}
          onSave={handleUpdateUser}
        />
      )}
    </div>
  );
}

export default UserManagement;