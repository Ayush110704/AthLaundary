import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Eye, 
  ChevronLeft,
  ChevronRight,
  Mail,
  CheckCircle,
  AlertCircle,
  Clock,
  User,
  ShoppingBag,
  Phone,
  MapPin,
  Calendar,
  CalendarX,
  Download,
  RefreshCw,
  Package,
  Truck,
  Check,
  XCircle,
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  CreditCard,
  Wallet,
  Building,
  Filter,
  DollarSign,
  TrendingUp,
  TrendingDown,
  PieChart,
  FileText,
  Printer,
  Send,
  Ban,
  Users
} from 'lucide-react';
import { useOrders } from './OrderManagement';


// PAYMENT DETAIL VIEW COMPONENT

function PaymentDetailView({ payment, onBack }) {
  const paymentStatusConfig = {
    'Completed': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
    'Pending': { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    'Failed': { color: 'bg-red-100 text-red-800', icon: XCircle }
  };

  const bookingStatusConfig = {
    'Completed': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
    'Active': { color: 'bg-blue-100 text-blue-800', icon: Package },
    'Pending': { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    'Pickup': { color: 'bg-blue-100 text-blue-800', icon: Package },
    'Processing': { color: 'bg-purple-100 text-purple-800', icon: Package },
    'Cleaning': { color: 'bg-indigo-100 text-indigo-800', icon: Package },
    'Out for Delivery': { color: 'bg-orange-100 text-orange-800', icon: Truck }
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

  const StatusIcon = paymentStatusConfig[payment.paymentStatus]?.icon || CheckCircle;
  const BookingIcon = bookingStatusConfig[payment.bookingStatus]?.icon || CheckCircle;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Header with back button */}
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Payment Details</h2>
            <p className="text-sm text-gray-500">#{payment.id}</p>
          </div>
        </div>
      </div>

      {/* Payment Details Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Customer Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Customer Information</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Customer Name</p>
                  <p className="text-sm font-medium text-gray-800">{payment.customerName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-800">{payment.customerEmail}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-medium text-gray-800">{payment.customerPhone}</p>
                </div>
              </div>
            </div>

            {/* Booking Info */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Booking Information</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Booking ID</span>
                  <span className="text-sm font-medium text-blue-600">{payment.bookingId}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Service</span>
                  <span className="text-sm font-medium text-gray-800">{payment.service}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Items</span>
                  <span className="text-sm font-medium text-gray-800">{payment.items} items</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Booking Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${bookingStatusConfig[payment.bookingStatus]?.color || 'bg-gray-100 text-gray-800'}`}>
                    <BookingIcon className="w-3 h-3 inline mr-1" />
                    {payment.bookingStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Payment Details</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Amount</p>
                  <p className="text-xl font-bold text-green-600">₹{payment.amount}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                {getPaymentMethodIcon(payment.paymentMethod)}
                <div>
                  <p className="text-xs text-gray-500">Payment Method</p>
                  <p className="text-sm font-medium text-gray-800">{payment.paymentMethod}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <StatusIcon className="w-5 h-5 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Payment Status</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${paymentStatusConfig[payment.paymentStatus]?.color || 'bg-gray-100 text-gray-800'}`}>
                    {payment.paymentStatus}
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <FileText className="w-5 h-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Transaction ID</p>
                  <p className="text-sm font-mono text-gray-800">{payment.transactionId}</p>
                </div>
              </div>
            </div>

            {/* Payment Date */}
            <div className="mt-4">
              <div className="flex items-center gap-2 text-sm p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-500">Payment Date:</span>
                <span className="font-medium">{new Date(payment.paymentDate).toLocaleString()}</span>
              </div>
            </div>

            {/* Notes */}
            {payment.notes && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-gray-500">Notes</p>
                <p className="text-sm text-gray-700 italic">"{payment.notes}"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


// MAIN COMPONENT
function Payments() {
  const { bookings } = useOrders();
  
  // Helper to extract the proper transaction ID from all possible booking property names
  const extractTransactionId = (booking) => {
    return (
      booking.paymentId ||
      booking.transactionId ||
      booking.razorpayPaymentId ||
      booking.computedTransactionId ||
      booking.razorpay_payment_id ||
      'N/A'
    );
  };

  const generatePaymentsFromBookings = () => {
    return bookings.map((booking, index) => {
      let paymentStatus = 'Pending';
      let notes = '';
      
      if (booking.paymentStatus === 'Paid') {
        paymentStatus = 'Completed';
        notes = 'Payment successful';
      } else if (booking.paymentStatus === 'Pending') {
        paymentStatus = 'Pending';
        notes = 'Awaiting payment';
      }

      const txnId = extractTransactionId(booking);
      
      return {
        id: `PAY${String(index + 1).padStart(3, '0')}`,
        bookingId: booking.id,
        customerName: booking.customerName,
        customerEmail: booking.customerEmail,
        customerPhone: booking.customerPhone,
        amount: booking.totalAmount,
        paymentDate: booking.bookingDate,
        paymentMethod: booking.paymentMethod,
        paymentStatus: paymentStatus,
        transactionId: txnId,
        bookingStatus: booking.status,
        service: booking.service,
        items: booking.items,
        notes: notes
      };
    });
  };
  
  // State
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterMethod, setFilterMethod] = useState('All');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);
  const itemsPerPage = 5;

  // Update payments when bookings change
  useEffect(() => {
    setPayments(generatePaymentsFromBookings());
  }, [bookings]);

  const stats = {
    total: payments.length,
    completed: payments.filter(p => p.paymentStatus === 'Completed').length,
    pending: payments.filter(p => p.paymentStatus === 'Pending').length,
    totalRevenue: payments.filter(p => p.paymentStatus === 'Completed').reduce((sum, p) => sum + p.amount, 0),
  };

  const uniqueMethods = ['All', ...new Set(payments.map(p => p.paymentMethod))];

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          payment.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          payment.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (payment.transactionId && payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'All' || payment.paymentStatus === filterStatus;
    const matchesMethod = filterMethod === 'All' || payment.paymentMethod === filterMethod;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus, filterMethod]);

  const handlePaymentClick = (payment) => {
    setSelectedPayment(payment);
    setShowDetailView(true);
  };

  const handleBackToList = () => {
    setShowDetailView(false);
    setSelectedPayment(null);
  };

  const getPaymentStatusBadge = (status) => {
    const config = {
      'Completed': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'Pending': { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      'Failed': { color: 'bg-red-100 text-red-800', icon: XCircle }
    };
    const { color, icon: Icon } = config[status] || config.Pending;
    return (
      <span className={`px-2 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full ${color}`}>
        <Icon className="w-3 h-3" />
        {status}
      </span>
    );
  };

  const getPaymentMethodIcon = (method) => {
    switch(method) {
      case 'Online':
        return <CreditCard className="w-3 h-3 inline" />;
      case 'COD':
        return <Wallet className="w-3 h-3 inline" />;
      case 'Card':
        return <CreditCard className="w-3 h-3 inline" />;
      case 'UPI':
        return <Building className="w-3 h-3 inline" />;
      default:
        return <Wallet className="w-3 h-3 inline" />;
    }
  };

  if (showDetailView && selectedPayment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <PaymentDetailView 
            payment={selectedPayment} 
            onBack={handleBackToList}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-blue-600" />
              Payment Management
              <span className="text-sm font-normal bg-blue-600 text-white px-3 py-1 rounded-full">
                {stats.total} Total
              </span>
            </h1>
            <p className="text-gray-600 mt-1">Manage all payments and transactions</p>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500 hover:shadow-md transition">
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500 hover:shadow-md transition">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-yellow-500 hover:shadow-md transition">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-purple-500 hover:shadow-md transition">
            <p className="text-sm text-gray-500">Revenue</p>
            <p className="text-2xl font-bold text-purple-600">₹{stats.totalRevenue}</p>
          </div>
        </div>

        {/* TOOLBAR */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by customer, payment ID, booking ID, or transaction ID..."
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
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option> 
              <option value="Failed">Failed</option>
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
            >
              {uniqueMethods.map(method => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Date</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedPayments.map((payment) => (
                  <tr 
                    key={payment.id} 
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handlePaymentClick(payment)}
                  >
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-blue-600">{payment.id}</span>
                      {payment.transactionId && payment.transactionId !== 'N/A' && (
                        <div className="text-xs text-gray-400 font-mono">{payment.transactionId}</div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{payment.customerName}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {payment.customerEmail}
                          </div>
                          <div className="text-xs text-gray-400">
                            Booking: {payment.bookingId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-bold text-green-600">₹{payment.amount}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-700 flex items-center gap-1">
                        {getPaymentMethodIcon(payment.paymentMethod)}
                        {payment.paymentMethod}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {getPaymentStatusBadge(payment.paymentStatus)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 hidden lg:table-cell">
                      {new Date(payment.paymentDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handlePaymentClick(payment)}
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

          {filteredPayments.length === 0 && (
            <div className="text-center py-12">
              <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No payments found matching your filters</p>
            </div>
          )}

          {filteredPayments.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-3">
              <p className="text-sm text-gray-500">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
                {Math.min(currentPage * itemsPerPage, filteredPayments.length)} of {filteredPayments.length} payments
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
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page, index, array) => {
                  const isFirstPage = page === 1;
                  const isLastPage = page === totalPages;
                  const isCurrentPage = page === currentPage;
                  const isNearCurrent = Math.abs(page - currentPage) <= 1;
                  
                  if (isFirstPage || isLastPage || isCurrentPage || isNearCurrent) {
                    return (
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
                    );
                  }
                  
                  const prevPage = array[index - 1];
                  const nextPage = array[index + 1];
                  const showEllipsis = 
                    (prevPage && prevPage < currentPage - 1 && page === currentPage - 2) ||
                    (nextPage && nextPage > currentPage + 1 && page === currentPage + 2);
                  
                  if (showEllipsis) {
                    return (
                      <span key={`ellipsis-${page}`} className="px-2 py-1 text-gray-400">
                        …
                      </span>
                    );
                  }
                  
                  return null;
                })}
                
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

export default Payments;