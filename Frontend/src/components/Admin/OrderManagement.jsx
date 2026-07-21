import React, { useState, useEffect, useContext, createContext } from 'react';
import { 
  Search, 
  Eye, 
  ChevronLeft,
  ChevronRight,
  Mail,
  CheckCircle,
  AlertCircle,
  Clock,
  Users,
  User,
  ShoppingBag,
  Phone,
  MapPin,
  Calendar,
  CalendarX,
  Filter,
  X,
  Download,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Package,
  Truck,
  Check,
  XCircle,
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  Shirt,
  Sofa,
  Clover,
  Ban,
  CreditCard,
  Wallet,
  Building,
  RotateCcw,
  IndianRupee,
  MessageSquare,
  ArrowRight,
  ShoppingCart,
  Scissors,
  Sparkles,
  Send,
  CheckCheck,
  CalendarDays
} from 'lucide-react';


// ORDER CONTEXT - For sharing data with Analytics and Payments

const OrderContext = createContext();

const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

const OrderProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);

  const updateBookings = (newBookings) => {
    setBookings(newBookings);
  };

  const addBooking = (booking) => {
    setBookings(prev => [...prev, booking]);
  };

  const updateBooking = (id, updatedData) => {
    setBookings(prev => prev.map(b => 
      b.id === id ? { ...b, ...updatedData } : b
    ));
  };

  const deleteBooking = (id) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  return (
    <OrderContext.Provider value={{
      bookings,
      setBookings,
      updateBookings,
      addBooking,
      updateBooking,
      deleteBooking
    }}>
      {children}
    </OrderContext.Provider>
  );
};

// HELPER FUNCTIONS FOR DYNAMIC DATES

const getDate = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

const getFutureDate = (daysFromNow) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString();
};

const mapAdminOrderStatus = (status) => {
  const normalized = String(status || '').trim().toLowerCase();

  const statusMap = {
    pending: 'pickup',
    pickup: 'pickup',
    processing: 'processing',
    cleaning: 'cleaning',
    'out for delivery': 'out_for_delivery',
    out_for_delivery: 'out_for_delivery',
    completed: 'completed',
    cancelled: 'cancelled'
  };

  return statusMap[normalized] || 'pickup';
};

const mapOrderToBooking = (order, index) => {
  const itemsList = (order.items || []).map((item, itemIndex) => ({
    name: item.clothType || item.name || `Item ${itemIndex + 1}`,
    quantity: Number(item.quantity || 0),
    price: Number(item.price || 0)
  }));

  const totalItems = itemsList.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  const serviceNames = [...new Set((order.items || []).map((item) => item.serviceType).filter(Boolean))];
  const normalizedPaymentMethod = String(order.paymentMethod || 'COD');
  const paymentStatus = order.paymentStatus || (normalizedPaymentMethod.toLowerCase() === 'cod' ? 'Pending' : 'Paid');

  return {
    id: order.orderId || order._id || `ORD-${index + 1}`,
    mongoId: order._id,
    customerName: order.customerName || 'Customer',
    customerEmail: order.email || 'N/A',
    customerPhone: order.phone || 'N/A',
    customerAddress: order.address || 'No address provided',
    service: serviceNames.join(', ') || 'Laundry',
    items: totalItems,
    itemsList,
    totalAmount: Number(order.totalAmount || 0),
    status: mapAdminOrderStatus(order.status),
    bookingDate: order.createdAt || new Date().toISOString(),
    pickupDate: order.pickupDate || order.createdAt || new Date().toISOString(),
    deliveryDate: order.deliveryDate || null,
    notes: order.notes || '',
    paymentStatus,
    paymentMethod: normalizedPaymentMethod.toUpperCase() === 'COD' ? 'COD' : normalizedPaymentMethod,
    transactionId: order.transactionId || null,
    statusUpdateHistory: order.statusUpdateHistory || []
  };
};


// MOCK DATA - Bookings with Items (Dynamic Dates)

const MOCK_BOOKINGS = [
  {
    id: 'BK001',
    customerName: 'Rajesh Kumar',
    customerEmail: 'rajesh@email.com',
    customerPhone: '+91 98765 43210',
    customerAddress: '123, MG Road, Mumbai - 400001',
    service: 'Dry Cleaning',
    items: 5,
    itemsList: [
      { name: 'Cotton Shirt (White)', quantity: 2, price: 150 },
      { name: 'Silk Saree', quantity: 1, price: 500 },
      { name: 'Woolen Blazer', quantity: 1, price: 300 },
      { name: 'Cotton Trousers', quantity: 1, price: 150 }
    ],
    totalAmount: 1250,
    status: 'completed',
    bookingDate: getDate(1),
    pickupDate: getDate(0),
    deliveryDate: getFutureDate(1),
    notes: 'Handle with care - silk items',
    paymentStatus: 'Paid',
    paymentMethod: 'Online',
    statusUpdateHistory: []
  },
  {
    id: 'BK002',
    customerName: 'Priya Sharma',
    customerEmail: 'priya@email.com',
    customerPhone: '+91 98765 43211',
    customerAddress: '456, Lake View, Bangalore - 560001',
    service: 'Wash & Fold',
    items: 8,
    itemsList: [
      { name: 'T-Shirts', quantity: 4, price: 80 },
      { name: 'Jeans', quantity: 2, price: 120 },
      { name: 'Trousers', quantity: 2, price: 100 }
    ],
    totalAmount: 800,
    status: 'processing',
    bookingDate: getDate(2),
    pickupDate: getDate(1),
    deliveryDate: getFutureDate(1),
    notes: 'Use gentle detergent',
    paymentStatus: 'Paid',
    paymentMethod: 'COD',
    statusUpdateHistory: []
  },
  {
    id: 'BK003',
    customerName: 'Amit Patel',
    customerEmail: 'amit@email.com',
    customerPhone: '+91 98765 43212',
    customerAddress: '789, Park Street, Delhi - 110001',
    service: 'Ironing',
    items: 3,
    itemsList: [
      { name: 'Formal Shirts', quantity: 3, price: 150 }
    ],
    totalAmount: 450,
    status: 'pickup',
    bookingDate: getDate(3),
    pickupDate: getDate(2),
    deliveryDate: null,
    notes: 'Extra starch on shirts',
    paymentStatus: 'Pending',
    paymentMethod: 'COD',
    statusUpdateHistory: []
  },
  {
    id: 'BK004',
    customerName: 'Sneha Reddy',
    customerEmail: 'sneha@email.com',
    customerPhone: '+91 98765 43213',
    customerAddress: '321, Green Valley, Hyderabad - 500001',
    service: 'Stain Removal',
    items: 2,
    itemsList: [
      { name: 'White Silk Shirt', quantity: 1, price: 350 },
      { name: 'Cotton Blouse', quantity: 1, price: 250 }
    ],
    totalAmount: 600,
    status: 'cleaning',
    bookingDate: getDate(4),
    pickupDate: getDate(3),
    deliveryDate: null,
    notes: 'Red wine stain on white shirt',
    paymentStatus: 'Paid',
    paymentMethod: 'Online',
    statusUpdateHistory: []
  },
  {
    id: 'BK005',
    customerName: 'Ananya Gupta',
    customerEmail: 'ananya@email.com',
    customerPhone: '+91 98765 43215',
    customerAddress: '987, Coastal Road, Chennai - 600001',
    service: 'Dry Cleaning',
    items: 4,
    itemsList: [
      { name: 'Wedding Gown', quantity: 1, price: 600 },
      { name: 'Bridal Dupatta', quantity: 1, price: 200 },
      { name: 'Embroidered Blouse', quantity: 1, price: 150 },
      { name: 'Silk Skirt', quantity: 1, price: 150 }
    ],
    totalAmount: 1100,
    status: 'out_for_delivery',
    bookingDate: getDate(5),
    pickupDate: getDate(4),
    deliveryDate: getDate(3),
    notes: 'Wedding dress - very delicate',
    paymentStatus: 'Paid',
    paymentMethod: 'Online',
    statusUpdateHistory: []
  },
  {
    id: 'BK006',
    customerName: 'Rahul Verma',
    customerEmail: 'rahul@email.com',
    customerPhone: '+91 98765 43216',
    customerAddress: '147, Garden City, Pune - 411001',
    service: 'Wash & Fold',
    items: 10,
    itemsList: [
      { name: 'T-Shirts', quantity: 6, price: 80 },
      { name: 'Jeans', quantity: 2, price: 120 },
      { name: 'Shirts', quantity: 2, price: 150 }
    ],
    totalAmount: 1020,
    status: 'completed',
    bookingDate: getDate(6),
    pickupDate: getDate(5),
    deliveryDate: getDate(4),
    notes: 'Separate whites and colors',
    paymentStatus: 'Paid',
    paymentMethod: 'Online',
    statusUpdateHistory: []
  },
  {
    id: 'BK007',
    customerName: 'Meera Nair',
    customerEmail: 'meera@email.com',
    customerPhone: '+91 98765 43217',
    customerAddress: '258, Temple Road, Kochi - 682001',
    service: 'Ironing',
    items: 6,
    itemsList: [
      { name: 'Formal Shirts', quantity: 4, price: 150 },
      { name: 'Trousers', quantity: 2, price: 100 }
    ],
    totalAmount: 800,
    status: 'pickup',
    bookingDate: getDate(0),
    pickupDate: getFutureDate(1),
    deliveryDate: null,
    notes: 'Need same day delivery',
    paymentStatus: 'Paid',
    paymentMethod: 'COD',
    statusUpdateHistory: []
  },
  {
    id: 'BK008',
    customerName: 'Arjun Reddy',
    customerEmail: 'arjun@email.com',
    customerPhone: '+91 98765 43218',
    customerAddress: '369, Lake Gardens, Kolkata - 700001',
    service: 'Stain Removal',
    items: 1,
    itemsList: [
      { name: 'Leather Jacket', quantity: 1, price: 300 }
    ],
    totalAmount: 300,
    status: 'cancelled',
    bookingDate: getDate(7),
    pickupDate: getDate(6),
    deliveryDate: null,
    notes: 'Oil stain on jacket',
    paymentStatus: 'Paid',
    paymentMethod: 'Online',
    statusUpdateHistory: []
  },
  {
    id: 'BK009',
    customerName: 'Kavya Menon',
    customerEmail: 'kavya@email.com',
    customerPhone: '+91 98765 43219',
    customerAddress: '741, Hill View, Coimbatore - 641001',
    service: 'Dry Cleaning',
    items: 3,
    itemsList: [
      { name: 'Silk Saree', quantity: 1, price: 500 },
      { name: 'Blouse', quantity: 1, price: 150 },
      { name: 'Dupatta', quantity: 1, price: 100 }
    ],
    totalAmount: 750,
    status: 'completed',
    bookingDate: getDate(8),
    pickupDate: getDate(7),
    deliveryDate: getDate(6),
    notes: 'Saree - handle carefully',
    paymentStatus: 'Paid',
    paymentMethod: 'Online',
    statusUpdateHistory: []
  },
  {
    id: 'BK010',
    customerName: 'Vikram Singh',
    customerEmail: 'vikram@email.com',
    customerPhone: '+91 98765 43214',
    customerAddress: '654, Sunrise Colony, Jaipur - 302001',
    service: 'Wash & Fold',
    items: 5,
    itemsList: [
      { name: 'T-Shirts', quantity: 3, price: 80 },
      { name: 'Jeans', quantity: 2, price: 120 }
    ],
    totalAmount: 480,
    status: 'processing',
    bookingDate: getDate(9),
    pickupDate: getDate(8),
    deliveryDate: null,
    notes: 'First time customer',
    paymentStatus: 'Pending',
    paymentMethod: 'COD',
    statusUpdateHistory: []
  }
];


// STATUS NOTE MODAL COMPONENT WITH TIME PICKER

function StatusNoteModal({ status, onClose, onConfirm, booking }) {
  const [note, setNote] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [loading, setLoading] = useState(false);

  // Set default date and time when modal opens
  useEffect(() => {
    if (status === 'pickup') {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      // Format date as YYYY-MM-DD
      const dateStr = tomorrow.toISOString().split('T')[0];
      // Format time as HH:mm
      const timeStr = '10:00'; // Default to 10 AM
      
      setPickupDate(dateStr);
      setPickupTime(timeStr);
    }
  }, [status]);

  const statusConfig = {
    'pickup': { 
      label: 'Schedule Pickup', 
      icon: ShoppingCart, 
      color: 'bg-blue-500',
      placeholder: 'Enter pickup details (e.g., Items location, Special instructions, etc.)',
      showTimePicker: true
    },
    'processing': { 
      label: 'Processing', 
      icon: Package, 
      color: 'bg-purple-500',
      placeholder: 'Enter processing details (e.g., Items being prepared, Estimated time, etc.)',
      showTimePicker: false
    },
    'cleaning': { 
      label: 'Cleaning', 
      icon: Sparkles, 
      color: 'bg-indigo-500',
      placeholder: 'Enter cleaning details (e.g., Cleaning method, Special treatments, etc.)',
      showTimePicker: false
    },
    'out_for_delivery': { 
      label: 'Out for Delivery', 
      icon: Send, 
      color: 'bg-orange-500',
      placeholder: 'Enter delivery details (e.g., Delivery person, Expected time, etc.)',
      showTimePicker: false
    },
    'completed': { 
      label: 'Completed', 
      icon: CheckCheck, 
      color: 'bg-green-500',
      placeholder: 'Enter completion details (e.g., Delivery confirmed, Customer feedback, etc.)',
      showTimePicker: false
    },
    'cancelled': { 
      label: 'Cancelled', 
      icon: XCircle, 
      color: 'bg-red-500',
      placeholder: 'Enter cancellation reason (e.g., Customer request, Payment issue, etc.)',
      showTimePicker: false
    }
  };

  const config = statusConfig[status];
  const Icon = config?.icon || Package;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!note.trim()) {
      alert('Please enter a note for this status update');
      return;
    }
    
    // Validate pickup date and time if status is pickup
    if (status === 'pickup') {
      if (!pickupDate) {
        alert('Please select a pickup date');
        return;
      }
      if (!pickupTime) {
        alert('Please select a pickup time');
        return;
      }
    }
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let fullNote = note;
      let pickupDateTime = null;
      
      if (status === 'pickup') {
        pickupDateTime = new Date(`${pickupDate}T${pickupTime}`);
        fullNote = `Pickup scheduled for ${pickupDate} at ${pickupTime}. ${note}`;
      }
      
      onConfirm({
        note: fullNote,
        pickupDateTime: pickupDateTime,
        pickupDate: pickupDate,
        pickupTime: pickupTime
      });
    } catch (error) {
      console.error('Failed to save note:', error);
      alert('Failed to save note. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
            <Icon className={`w-5 h-5 ${config?.color.replace('bg-', 'text-')}`} />
            {config?.label} Status Note
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
          {status === 'pickup' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Note <span className="text-red-500">*</span>
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              placeholder={config?.placeholder || 'Enter a note for this status update...'}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              required
            />
            <p className="text-xs text-gray-400 mt-1">This note will be added to the order history</p>
          </div>

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
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  {status === 'pickup' ? 'Schedule Pickup' : 'Save Note & Update'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


// BOOKING DETAIL VIEW COMPONENT

function BookingDetailView({ booking, onBack, onStatusUpdate }) {
  const [selectedStatus, setSelectedStatus] = useState(booking.status);
  const [showStatusNote, setShowStatusNote] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const statusConfig = {
    'pickup': { 
      label: 'Pickup', 
      icon: ShoppingCart, 
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-500',
      bgColor: 'bg-blue-50',
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    'processing': { 
      label: 'Processing', 
      icon: Package, 
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      borderColor: 'border-purple-500',
      bgColor: 'bg-purple-50',
      badgeColor: 'bg-purple-100 text-purple-800'
    },
    'cleaning': { 
      label: 'Cleaning', 
      icon: Sparkles, 
      color: 'bg-indigo-500',
      textColor: 'text-indigo-600',
      borderColor: 'border-indigo-500',
      bgColor: 'bg-indigo-50',
      badgeColor: 'bg-indigo-100 text-indigo-800'
    },
    'out_for_delivery': { 
      label: 'Out for Delivery', 
      icon: Send, 
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      borderColor: 'border-orange-500',
      bgColor: 'bg-orange-50',
      badgeColor: 'bg-orange-100 text-orange-800'
    },
    'completed': { 
      label: 'Completed', 
      icon: CheckCheck, 
      color: 'bg-green-500',
      textColor: 'text-green-600',
      borderColor: 'border-green-500',
      bgColor: 'bg-green-50',
      badgeColor: 'bg-green-100 text-green-800'
    },
    'cancelled': { 
      label: 'Cancelled', 
      icon: XCircle, 
      color: 'bg-red-500',
      textColor: 'text-red-600',
      borderColor: 'border-red-500',
      bgColor: 'bg-red-50',
      badgeColor: 'bg-red-100 text-red-800'
    }
  };

  const paymentStatusConfig = {
    'Paid': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
    'Pending': { color: 'bg-yellow-100 text-yellow-800', icon: Clock }
  };

  const getPaymentMethodIcon = (method) => {
    switch(method) {
      case 'Online':
        return <CreditCard className="w-4 h-4" />;
      case 'COD':
        return <Wallet className="w-4 h-4" />;
      case 'Card':
        return <CreditCard className="w-4 h-4" />;
      case 'UPI':
        return <Building className="w-4 h-4" />;
      default:
        return <Wallet className="w-4 h-4" />;
    }
  };

  const currentStatusConfig = statusConfig[booking.status] || statusConfig['pickup'];
  const StatusIcon = currentStatusConfig.icon;
  const PaymentIcon = paymentStatusConfig[booking.paymentStatus]?.icon || CheckCircle;

  const totalItems = booking.itemsList?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const getDeliveryDisplay = () => {
    if (booking.status === 'cancelled') {
      return {
        icon: Ban,
        color: 'text-red-500',
        bgColor: 'bg-red-50',
        message: 'Delivery Blocked',
        description: 'Order was cancelled'
      };
    } else if (booking.status === 'pickup') {
      return {
        icon: Clock,
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-50',
        message: 'Awaiting Pickup',
      };
    } else if (booking.status === 'out_for_delivery') {
      return {
        icon: Truck,
        color: 'text-orange-500',
        bgColor: 'bg-orange-50',
        message: 'On the way!',
        description: 'Order is out for delivery'
      };
    } else if (booking.status === 'completed') {
      return {
        icon: CheckCheck,
        color: 'text-green-500',
        bgColor: 'bg-green-50',
        message: 'Delivered',
        description: 'Order completed successfully'
      };
    } else if (booking.status === 'processing' || booking.status === 'cleaning') {
      return {
        icon: Package,
        color: 'text-purple-500',
        bgColor: 'bg-purple-50',
        message: 'In Progress',
        description: 'Order is being processed'
      };
    }
    return null;
  };

  const deliveryInfo = getDeliveryDisplay();

  const getStatusBadge = (status) => {
    const config = {
      'pickup': { color: 'bg-blue-100 text-blue-800', icon: ShoppingCart },
      'processing': { color: 'bg-purple-100 text-purple-800', icon: Package },
      'cleaning': { color: 'bg-indigo-100 text-indigo-800', icon: Sparkles },
      'out_for_delivery': { color: 'bg-orange-100 text-orange-800', icon: Send },
      'completed': { color: 'bg-green-100 text-green-800', icon: CheckCheck },
      'cancelled': { color: 'bg-red-100 text-red-800', icon: XCircle }
    };
    const { color, icon: Icon } = config[status] || config['pickup'];
    const statusLabels = {
      'pickup': 'Pickup',
      'processing': 'Processing',
      'cleaning': 'Cleaning',
      'out_for_delivery': 'Out for Delivery',
      'completed': 'Completed',
      'cancelled': 'Cancelled'
    };
    return (
      <span className={`px-2 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full ${color}`}>
        <Icon className="w-3 h-3" />
        {statusLabels[status] || status}
      </span>
    );
  };

  const handleStatusChange = (newStatus) => {
    if (newStatus === selectedStatus) return;
    setPendingStatus(newStatus);
    setShowStatusNote(true);
  };

  const handleStatusNoteConfirm = (data) => {
    if (!pendingStatus) return;
    
    setIsUpdating(true);
    try {
      const history = booking.statusUpdateHistory || [];
      const newHistory = [...history, {
        status: pendingStatus,
        date: new Date().toISOString(),
        note: data.note,
        fromStatus: selectedStatus,
        pickupDate: data.pickupDate || null,
        pickupTime: data.pickupTime || null
      }];

      // Update pickup date if status is pickup
      const updateData = {
        status: pendingStatus,
        statusUpdateHistory: newHistory,
        notes: data.note ? `${booking.notes || ''} | ${data.note}` : booking.notes
      };

      // If status is pickup and we have pickup date/time, update it
      if (pendingStatus === 'pickup' && data.pickupDateTime) {
        updateData.pickupDate = data.pickupDateTime.toISOString();
      }

      onStatusUpdate(booking.id, updateData);

      setSelectedStatus(pendingStatus);
      setShowStatusNote(false);
      setPendingStatus(null);
      
      const statusLabel = statusConfig[pendingStatus]?.label || pendingStatus;
      const message = pendingStatus === 'pickup' 
        ? `Pickup scheduled for ${data.pickupDate} at ${data.pickupTime}`
        : `Order ${booking.id} status updated to ${statusLabel} successfully!`;
      
      alert(message);
    } catch (error) {
      console.error('Status update failed:', error);
      alert('Failed to update status. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  // Status options with their labels and icons
  const statusOptions = [
    { value: 'pickup', label: 'Pickup', icon: ShoppingCart, color: 'bg-blue-500' },
    { value: 'processing', label: 'Processing', icon: Package, color: 'bg-purple-500' },
    { value: 'cleaning', label: 'Cleaning', icon: Sparkles, color: 'bg-indigo-500' },
    { value: 'out_for_delivery', label: 'Out for Delivery', icon: Send, color: 'bg-orange-500' },
    { value: 'completed', label: 'Completed', icon: CheckCheck, color: 'bg-green-500' },
    { value: 'cancelled', label: 'Cancelled', icon: XCircle, color: 'bg-red-500' }
  ];

  // Get status history with notes
  const getStatusHistory = () => {
    const history = booking.statusUpdateHistory || [];
    return history.map(update => ({
      ...update,
      label: statusConfig[update.status]?.label || update.status
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Booking Details</h2>
            <p className="text-sm text-gray-500">#{booking.id}</p>
          </div>
        </div>
        {/* <div className="flex gap-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm flex items-center gap-2">
            <Download className="w-4 h-4" />
            Invoice
          </button>
        </div> */}
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Customer Information</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Customer Name</p>
                  <p className="text-sm font-medium text-gray-800">{booking.customerName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-800">{booking.customerEmail}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-medium text-gray-800">{booking.customerPhone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="text-sm font-medium text-gray-800">{booking.customerAddress}</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Items List ({totalItems} items)
              </h3>
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Item</th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-gray-600">Quantity</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-600">Price</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-600">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {booking.itemsList?.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-100 transition-colors">
                        <td className="px-4 py-2 text-sm text-gray-800 flex items-center gap-2">
                          <Shirt className="w-4 h-4 text-blue-500" />
                          {item.name}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600 text-center">{item.quantity}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 text-right">₹{item.price}</td>
                        <td className="px-4 py-2 text-sm font-medium text-gray-800 text-right">₹{item.quantity * item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-100 border-t border-gray-200">
                    <tr>
                      <td colSpan="3" className="px-4 py-2 text-sm font-semibold text-gray-800 text-right">Total:</td>
                      <td className="px-4 py-2 text-sm font-bold text-green-600 text-right">₹{booking.totalAmount}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Booking Details</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Package className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Service</p>
                  <p className="text-sm font-medium text-gray-800">{booking.service}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <ShoppingBag className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Total Items</p>
                  <p className="text-sm font-medium text-gray-800">{totalItems} items</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-5 h-5 text-blue-500 mt-0.5">💰</div>
                <div>
                  <p className="text-xs text-gray-500">Total Amount</p>
                  <p className="text-sm font-bold text-green-600">₹{booking.totalAmount}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Current Status</span>
                    {getStatusBadge(booking.status)}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Payment Details</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    {getPaymentMethodIcon(booking.paymentMethod)}
                    <span className="text-sm text-gray-600">Payment Method</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">{booking.paymentMethod}</span>
                </div>
                
                {/* Payment Status with Dropdown - Only Pending and Paid */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <PaymentIcon className="w-4 h-4" />
                    <span className="text-sm text-gray-600">Payment Status</span>
                  </div>
                  <select
                    value={booking.paymentStatus}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      onStatusUpdate(booking.id, {
                        status: booking.status,
                        paymentStatus: newStatus,
                        note: `Payment status updated to ${newStatus}`
                      });
                    }}
                    className="px-3 py-1 rounded-lg text-xs font-semibold border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    style={{
                      backgroundColor: booking.paymentStatus === 'Paid' ? '#dcfce7' : '#fef3c7',
                      color: booking.paymentStatus === 'Paid' ? '#166534' : '#92400e',
                      borderColor: booking.paymentStatus === 'Paid' ? '#86efac' : '#fcd34d'
                    }}
                  >
                    <option value="Pending" style={{ backgroundColor: '#fef3c7', color: '#92400e' }}>
                      Pending
                    </option>
                    <option value="Paid" style={{ backgroundColor: '#dcfce7', color: '#166534' }}>
                      Paid
                    </option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Amount Paid</span>
                  </div>
                  <span className="text-sm font-bold text-green-600">₹{booking.totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-500">Booked:</span>
                <span className="font-medium">{new Date(booking.bookingDate).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CalendarX className="w-4 h-4 text-gray-400" />
                <span className="text-gray-500">Pickup:</span>
                <span className="font-medium">{new Date(booking.pickupDate).toLocaleString()}</span>
              </div>
              {deliveryInfo && (
                <div className={`flex items-center gap-2 text-sm p-2 rounded-lg ${deliveryInfo.bgColor}`}>
                  <deliveryInfo.icon className={`w-4 h-4 ${deliveryInfo.color}`} />
                  <div>
                    <span className="text-gray-500">Delivery:</span>
                    <span className={`font-medium ${deliveryInfo.color}`}>
                      {deliveryInfo.message}
                    </span>
                    {deliveryInfo.description && (
                      <span className="text-xs text-gray-400 ml-1">
                        ({deliveryInfo.description})
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {booking.notes && (
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-xs text-gray-500">Notes</p>
                <p className="text-sm text-gray-700 italic">"{booking.notes}"</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* STATUS BAR AT THE BOTTOM */}
      <div className="border-t border-gray-200 bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <StatusIcon className={`w-4 h-4 ${currentStatusConfig?.textColor || 'text-gray-600'}`} />
              Update Order Status
            </h4>
            <p className="text-xs text-gray-500">Click a status below to update the order</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {statusOptions.map((option) => {
              const isSelected = selectedStatus === option.value;
              const Icon = option.icon;
              const isDisabled = isUpdating || isSelected;
              
              return (
                <button
                  key={option.value}
                  onClick={() => !isDisabled && handleStatusChange(option.value)}
                  disabled={isDisabled}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    flex items-center gap-2
                    ${isSelected 
                      ? `${option.color} text-white shadow-md ring-2 ring-offset-2 ring-${option.value}-500` 
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                    }
                    ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    hover:scale-105 transform
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {option.label}
                  {isSelected && <Check className="w-3 h-3 ml-1" />}
                </button>
              );
            })}
          </div>

          {/* Status History Display */}
          {booking.statusUpdateHistory && booking.statusUpdateHistory.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                <Clock className="w-3 h-3" />
                <span className="font-medium">Status History</span>
              </div>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {getStatusHistory().slice().reverse().map((update, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs p-2 bg-white rounded-lg border border-gray-100">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig[update.status]?.badgeColor || 'bg-gray-100 text-gray-800'}`}>
                      {update.label}
                    </span>
                    <span className="text-gray-600 flex-1">{update.note}</span>
                    {update.pickupDate && update.pickupTime && (
                      <span className="text-blue-600 whitespace-nowrap">
                        📅 {update.pickupDate} at {update.pickupTime}
                      </span>
                    )}
                    <span className="text-gray-400 whitespace-nowrap">
                      {new Date(update.date).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Current Status Info */}
          <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
            <span className="font-medium">Current Status:</span>
            <span className={`px-2 py-0.5 rounded-full font-medium ${currentStatusConfig?.badgeColor || 'bg-gray-100 text-gray-800'}`}>
              {currentStatusConfig?.label || booking.status}
            </span>
            {booking.statusUpdateHistory && booking.statusUpdateHistory.length > 0 && (
              <>
                <span>•</span>
                <span>Last updated: {new Date(booking.statusUpdateHistory[booking.statusUpdateHistory.length - 1].date).toLocaleString()}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Status Note Modal */}
      {showStatusNote && pendingStatus && (
        <StatusNoteModal
          status={pendingStatus}
          booking={booking}
          onClose={() => {
            setShowStatusNote(false);
            setPendingStatus(null);
          }}
          onConfirm={handleStatusNoteConfirm}
        />
      )}
    </div>
  );
}


// MAIN COMPONENT

function OrderManagement() {
  const { bookings, setBookings, updateBooking } = useOrders();
  const API_URL = import.meta.env.VITE_API_URL;
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterService, setFilterService] = useState('All');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [ordersError, setOrdersError] = useState('');
  const itemsPerPage = 5;

  const statusLabels = {
    'pickup': 'Pickup',
    'processing': 'Processing',
    'cleaning': 'Cleaning',
    'out_for_delivery': 'Out for Delivery',
    'completed': 'Completed',
    'cancelled': 'Cancelled'
  };

  const stats = {
    total: bookings.length,
    pickup: bookings.filter(b => b.status === 'pickup').length,
    processing: bookings.filter(b => b.status === 'processing').length,
    cleaning: bookings.filter(b => b.status === 'cleaning').length,
    out_for_delivery: bookings.filter(b => b.status === 'out_for_delivery').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    totalRevenue: bookings.reduce((sum, b) => sum + b.totalAmount, 0),
  };

  const uniqueServices = ['All', ...new Set(bookings.map(b => b.service))];

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.customerPhone.includes(searchTerm);
    const matchesStatus = filterStatus === 'All' || (statusLabels[booking.status] === filterStatus);
    const matchesService = filterService === 'All' || booking.service === filterService;
    return matchesSearch && matchesStatus && matchesService;
  });

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus, filterService]);

  useEffect(() => {
    let isMounted = true;

    const fetchOrders = async () => {
      setIsLoadingOrders(true);
      setOrdersError('');

      try {
        const response = await fetch(`${API_URL}/api/orders/all`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to load orders');
        }

        const rawOrders = Array.isArray(data)
          ? data
          : Array.isArray(data.orders)
          ? data.orders
          : [];

        const normalizedOrders = rawOrders.map((order, index) => mapOrderToBooking(order, index));

        if (isMounted) {
          setBookings(normalizedOrders);
        }
      } catch (error) {
        if (isMounted) {
          setOrdersError(error.message || 'Unable to load orders');
        }
      } finally {
        if (isMounted) {
          setIsLoadingOrders(false);
        }
      }
    };

    fetchOrders();

    return () => {
      isMounted = false;
    };
  }, [setBookings]);

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
    setShowDetailView(true);
  };

  if (isLoadingOrders) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto text-gray-600 font-medium">
          Loading orders...
        </div>
      </div>
    );
  }

  if (ordersError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto text-red-600 font-medium">
          {ordersError}
        </div>
      </div>
    );
  }

  const handleBackToList = () => {
    setShowDetailView(false);
    setSelectedBooking(null);
  };

  const handleStatusUpdate = async (bookingId, statusData) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    const history = booking.statusUpdateHistory || [];
    const newHistory = [...history, {
      status: statusData.status,
      date: new Date().toISOString(),
      note: statusData.note || '',
      fromStatus: statusData.fromStatus || booking.status,
      pickupDate: statusData.pickupDate || null,
      pickupTime: statusData.pickupTime || null
    }];

    const updateData = {
      status: statusData.status,
      statusUpdateHistory: newHistory,
      notes: statusData.note ? `${booking.notes || ''} | ${statusData.note}` : booking.notes
    };

    // If paymentStatus is provided, update it
    if (statusData.paymentStatus) {
      updateData.paymentStatus = statusData.paymentStatus;
    }

    // If status is pickup and we have pickup date, update it
    if (statusData.status === 'pickup' && statusData.pickupDate) {
      updateData.pickupDate = statusData.pickupDate;
    }

    updateBooking(bookingId, updateData);

    if (selectedBooking?.id === bookingId) {
      setSelectedBooking({
        ...selectedBooking,
        status: statusData.status,
        statusUpdateHistory: newHistory,
        notes: statusData.note ? `${selectedBooking.notes || ''} | ${statusData.note}` : selectedBooking.notes,
        pickupDate: statusData.pickupDate || selectedBooking.pickupDate,
        paymentStatus: statusData.paymentStatus || selectedBooking.paymentStatus
      });
    }

    if (!booking.mongoId) {
      alert('Mongo order id missing. Status was not saved to the backend.');
      return;
    }

    try {
      // Prepare the payload for the API
      const payload = {
        status: statusData.status,
        note: statusData.note || ''
      };
      
      // Add paymentStatus to payload if it's being updated
      if (statusData.paymentStatus) {
        payload.paymentStatus = statusData.paymentStatus;
      }

      const response = await fetch(`${API_URL}/api/orders/${booking.mongoId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to update order status');
      }
    } catch (error) {
      alert(error.message || 'Failed to update order status');
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      'pickup': { color: 'bg-blue-100 text-blue-800', icon: ShoppingCart, label: 'Pickup' },
      'processing': { color: 'bg-purple-100 text-purple-800', icon: Package, label: 'Processing' },
      'cleaning': { color: 'bg-indigo-100 text-indigo-800', icon: Sparkles, label: 'Cleaning' },
      'out_for_delivery': { color: 'bg-orange-100 text-orange-800', icon: Send, label: 'Out for Delivery' },
      'completed': { color: 'bg-green-100 text-green-800', icon: CheckCheck, label: 'Completed' },
      'cancelled': { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Cancelled' }
    };
    const { color, icon: Icon, label } = config[status] || config['pickup'];
    return (
      <span className={`px-2 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full ${color}`}>
        <Icon className="w-3 h-3" />
        {label}
      </span>
    );
  };

  const getPaymentStatusBadge = (status) => {
    const config = {
      'Paid': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'Pending': { color: 'bg-yellow-100 text-yellow-800', icon: Clock }
    };
    const { color, icon: Icon } = config[status] || config.Pending;
    return (
      <span className={`px-2 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full ${color}`}>
        <Icon className="w-3 h-3" />
        {status}
      </span>
    );
  };

  if (showDetailView && selectedBooking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <BookingDetailView 
            booking={selectedBooking} 
            onBack={handleBackToList}
            onStatusUpdate={handleStatusUpdate}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-blue-600" />
              Order Management
              <span className="text-sm font-normal bg-blue-600 text-white px-3 py-1 rounded-full">
                {stats.total} Total
              </span>
            </h1>
            <p className="text-gray-600 mt-1">Manage all bookings and orders</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-gray-500 hover:shadow-md transition">
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500 hover:shadow-md transition">
            <p className="text-sm text-gray-500">Pickup</p>
            <p className="text-2xl font-bold text-blue-600">{stats.pickup}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-purple-500 hover:shadow-md transition">
            <p className="text-sm text-gray-500">Processing</p>
            <p className="text-2xl font-bold text-purple-600">{stats.processing}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-indigo-500 hover:shadow-md transition">
            <p className="text-sm text-gray-500">Cleaning</p>
            <p className="text-2xl font-bold text-indigo-600">{stats.cleaning}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-orange-500 hover:shadow-md transition">
            <p className="text-sm text-gray-500">Out for Delivery</p>
            <p className="text-2xl font-bold text-orange-600">{stats.out_for_delivery}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500 hover:shadow-md transition">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
          </div>
          {/* <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-red-500 hover:shadow-md transition">
            <p className="text-sm text-gray-500">Cancelled</p>
            <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
          </div> */}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, email, or booking ID..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Pickup">Pickup</option>
              <option value="Processing">Processing</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
            >
              {uniqueServices.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select> 
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Payment</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Date</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedBookings.map((booking) => (
                  <tr 
                    key={booking.id} 
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleBookingClick(booking)}
                  >
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-blue-600">{booking.id}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {booking.customerEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-700">{booking.service}</span>
                      <div className="text-xs text-gray-400">{booking.items} items</div>
                    </td>
                    <td className="px-4 py-3">
                      {getStatusBadge(booking.status)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold text-gray-900">₹{booking.totalAmount}</span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {getPaymentStatusBadge(booking.paymentStatus)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 hidden lg:table-cell">
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleBookingClick(booking)}
                        className="p-1.5 rounded hover:bg-gray-100 text-blue-500 hover:text-blue-700 transition-colors"
                        title="View Details"
                        type="button"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No bookings found matching your filters</p>
            </div>
          )}

          {filteredBookings.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-3">
              <p className="text-sm text-gray-500">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
                {Math.min(currentPage * itemsPerPage, filteredBookings.length)} of {filteredBookings.length} bookings
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
    </div>
  );
}


// EXPORTS - Only export once at the bottom

export default OrderManagement;
export { MOCK_BOOKINGS, useOrders, OrderProvider };