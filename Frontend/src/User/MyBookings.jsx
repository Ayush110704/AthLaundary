import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, Truck, Clock, Sparkles, ChevronRight, ArrowLeft, 
  User, Phone, MapPin, Receipt, RotateCw, Headset, 
  Calendar, CreditCard, Download, Tag, Copy, Check
} from 'lucide-react';
import UserLayout from './UserLayout';

const MyOrders = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [activeTab, setActiveTab] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchStatus, setFetchStatus] = useState('idle');
  const [fetchError, setFetchError] = useState('');
  const [orders, setOrders] = useState([]);
  const [viewingAll, setViewingAll] = useState(false);
  const [copiedOrderNo, setCopiedOrderNo] = useState('');
  const ordersSignatureRef = useRef("");
  const copyTimerRef = useRef(null);
  const navigate = useNavigate();


  const handleReorder = (order) => {
    // 1. Map the stored order items back into the format your checkout expects
    const reorderItems = order.items.map(item => ({
        clothType: item.name,
        serviceType: item.category,
        quantity: item.quantity,
        price: item.price
    }));

    // 2. Prepare the checkout data
    const newCheckoutData = {
        items: reorderItems,
        address: order.shippingAddress 
    };

    // 3. Save to localStorage so your Checkout page picks it up
    localStorage.setItem("checkoutData", JSON.stringify(newCheckoutData));

    // 4. Navigate to checkout
    navigate("/checkout");
};

  const handleCopyOrderNo = async (orderNo) => {
    try {
      await navigator.clipboard.writeText(orderNo);
      setCopiedOrderNo(orderNo);

      if (copyTimerRef.current) {
        clearTimeout(copyTimerRef.current);
      }

      copyTimerRef.current = setTimeout(() => {
        setCopiedOrderNo('');
        copyTimerRef.current = null;
      }, 1500);
    } catch (error) {
      console.error("Failed to copy order ID:", error);
    }
  };

  const fetchOrders = async (silent = false) => {
    if (!silent) {
      setIsLoading(true);
      setFetchStatus('loading');
      setFetchError('');
    }

    try {
      const userStr = localStorage.getItem("currentUser");
      if (!userStr) {
        if (!silent) {
          setIsLoading(false);
          setFetchStatus('idle');
        }
        return;
      }

      const currentUser = JSON.parse(userStr);
      const userId = currentUser._id || currentUser.id || currentUser.user?._id;

      if (!userId) {
        if (!silent) {
          setIsLoading(false);
          setFetchStatus('idle');
        }
        return;
      }

      const res = await axios.get(`${API_URL}/api/orders/user/${userId}`);

      const apiOrders = Array.isArray(res.data) ? res.data : [];
      const normalizedOrders = apiOrders.map((order, index) => {
        const sourceItems = Array.isArray(order.items) ? order.items : [];

        return {
          orderNo: order.orderNo || (order._id ? order._id.slice(-8).toUpperCase() : `ORD-${index + 1}`),
          status: order.status || "Pending",
          statusColor: order.statusColor || (
            order.status?.toLowerCase() === 'delivered' 
                ? "bg-green-50 text-green-700 border-green-200" 
                : order.status?.toLowerCase() === 'processing' 
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : "bg-amber-50 text-amber-700 border-amber-200"
          ),
          date: order.date || (order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : "N/A"),
          customer: {
            name: order.customer?.name || order.customerName || "Customer",
            mobile: order.customer?.mobile || order.phone || "N/A"
          },
          shippingAddress: order.address || order.shippingAddress || order.deliveryAddress || "No address provided",
          pickupDate: order.pickupDate || order.scheduledDate || order.pickup_date || 'Not Scheduled',
          timeSlot: order.timeSlot || order.pickupTimeSlot || order.pickup_time || 'N/A',
          deliveryDate: order.deliveryDate || order.delivery_date || 'Not Scheduled',
          deliveryTimeSlot: order.deliveryTimeSlot || order.delivery_time || 'N/A',
          paymentMethod: order.paymentMethod || "COD",
          paymentStatus: order.paymentStatus || "PENDING",
          transactionId: order.transactionId || "N/A",
          items: sourceItems.map((i, itemIndex) => ({
            category: i.category || i.serviceType || "Service",
            id: i.id || i._id || `ITEM-${itemIndex + 1}`,
            name: i.name || i.clothType || "Item",
            quantity: Number(i.quantity || 0),
            price: Number(i.price || 0),
            unitPrice: Number(i.unitPrice ?? (Number(i.quantity || 0) ? Number(i.price || 0) / Number(i.quantity || 1) : Number(i.price || 0))),
            estDelivery: i.estDelivery || "24-48 Hours"
          })),
          summary: {
            subtotal: order.summary?.subtotal ?? order.totalAmount ?? 0,
            deliveryCharges: order.summary?.deliveryCharges ?? order.deliveryCharges ?? 0,
            discount: order.summary?.discount ?? order.discount ?? 0,
            tax: order.summary?.tax ?? order.tax ?? 0,
            grandTotal: order.summary?.grandTotal ?? order.totalAmount ?? 0
          }
        };
      });

      const nextSignature = JSON.stringify(normalizedOrders);
      if (nextSignature !== ordersSignatureRef.current) {
        ordersSignatureRef.current = nextSignature;
        setOrders(normalizedOrders);
        setSelectedOrder((prevSelected) => {
          if (!prevSelected) return prevSelected;
          return normalizedOrders.find((order) => order.orderNo === prevSelected.orderNo) || prevSelected;
        });
      }
      setFetchStatus('success');
    } catch (err) {
      console.error("Error fetching orders:", err);
      if (!silent) {
        setFetchError(err.response?.data?.message || "Unable to fetch bookings right now.");
        setFetchStatus('error');
      }
    } finally {
      if (!silent) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(() => fetchOrders(true), 4000);
    return () => clearInterval(interval);
  }, []);

  // Use the same handleOrderClick, handleBackToList, and JSX render logic 
  // from the code you just pasted in your previous message.
  // The structure above ensures that 'order.summary.grandTotal' 
  // will now exist and be populated correctly!

  // ... (Paste your full UI JSX here, it will now work perfectly)
  const handleOrderClick = (order) => {
  console.log("Selected Order Data:", order); // ADD THIS LINE
  setIsLoading(true);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(() => {
    setSelectedOrder(order);
    setIsLoading(false);
  }, 450);
};

  const handleBackToList = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedOrder(null);
      setIsLoading(false);
    }, 400);
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'All') return true;
    return order.status.toLowerCase() === activeTab.toLowerCase();
  });

  // --- LOADING RENDER WRAPPER ---
  if (isLoading) {
    return (
      <UserLayout> {/* WRAPPED WITH UserLayout */}
        <div className="w-full">
          <div className="w-full max-w-5xl mx-auto p-6 space-y-6 font-sans animate-pulse">
            <div className="h-8 bg-gray-200 rounded-lg w-1/4 mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-40 bg-gray-100 rounded-2xl border border-gray-200"></div>
              ))}
            </div>
          </div>
        </div>
      </UserLayout>
    );
  }

  // --- ORDER DETAILS SUBPAGE ---
  if (selectedOrder) {
    const order = selectedOrder;
    return (
      <UserLayout> {/* WRAPPED WITH UserLayout */}
        <div className="w-full">
          <div className="w-full max-w-5xl mx-auto p-4 md:p-6 space-y-6 font-sans text-gray-800 transition-all duration-300 ease-in-out">
            
            {/* Navigation Breadcrumb */}
            <button 
              onClick={handleBackToList}
              className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition group"
            >
              <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
              Back to Order History
            </button>

            {/* Header Summary Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">{order.orderNo}</h2>
                    <button
                      type="button"
                      onClick={() => handleCopyOrderNo(order.orderNo)}
                      className="inline-flex items-center justify-center rounded-full p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition"
                      aria-label="Copy order ID"
                      title={copiedOrderNo === order.orderNo ? 'Copied!' : 'Copy order ID'}
                    >
                      {copiedOrderNo === order.orderNo ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${order.statusColor}`}>
                    ● {order.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400">Placed on <span className="text-gray-600 font-medium">{order.date}</span></p>
              </div>
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <button className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-600 text-xs font-bold rounded-xl hover:bg-blue-100 transition">
                  <Download size={14} /> Invoice
                </button>
                 <button 
  // Update this line:
  onClick={() => handleReorder(order)} 
  className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 shadow-sm shadow-blue-200 transition"
>
  <RotateCw size={14} /> Reorder
</button>
                <button className="w-full md:w-auto flex items-center justify-center gap-1.5 px-4 py-2 bg-gray-50 text-gray-600 text-xs font-bold rounded-xl border border-gray-200 hover:bg-gray-100 transition">
                  <Headset size={14} /> Support
                </button>
              </div>
            </div>

            {/* Information Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Customer Logistics & Address Metadata */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
                <h4 className="text-xs font-bold text-gray-400 tracking-wider uppercase flex items-center gap-1.5 border-b pb-2">
                  <User size={14} className="text-blue-500" /> Customer & Route Info
                </h4>
                <div className="space-y-2 text-xs">
                  <p className="font-bold text-gray-800 text-sm">{order.customer.name}</p>
                  <p className="text-gray-600 flex items-center gap-1"><Phone size={12} className="text-gray-400" /> {order.customer.mobile}</p>
                  <div className="pt-2 border-t text-gray-500 flex gap-1.5">
                    <MapPin size={14} className="text-blue-500 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{order.shippingAddress}</p>
                  </div>
                </div>
              </div>

              {/* Time Slot Windows */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
                <h4 className="text-xs font-bold text-gray-400 tracking-wider uppercase flex items-center gap-1.5 border-b pb-2">
                  <Calendar size={14} className="text-blue-500" /> Slot Windows
                </h4>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-gray-400 block font-medium">Pickup Window</span>
                    <span className="font-bold text-gray-800 block">{order.pickupDate}</span>
                    <span className="text-gray-500 text-[11px] block bg-gray-50 px-1.5 py-0.5 rounded border">{order.timeSlot}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-gray-400 block font-medium">Delivery Window</span>
                    <span className="font-bold text-gray-800 block">{order.deliveryDate}</span>
                    <span className="text-gray-500 text-[11px] block bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-100">{order.deliveryTimeSlot}</span>
                  </div>
                </div>
              </div>

              {/* Payment Gateways Ledger Summary */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
                <h4 className="text-xs font-bold text-gray-400 tracking-wider uppercase flex items-center gap-1.5 border-b pb-2">
                  <CreditCard size={14} className="text-blue-500" /> Payment Audit
                </h4>
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Method:</span>
                    <span className="font-bold text-gray-800">{order.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Transaction ID:</span>
                    <span className="font-mono text-gray-600 bg-gray-50 px-1 rounded border">{order.transactionId}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-gray-500">Gateway Status:</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                      order.paymentStatus?.toLowerCase() === 'paid' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                    }`}>{order.paymentStatus}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ordered breakdown listings & Final Pricing Structure */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <div className="lg:col-span-2 space-y-3">
                <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase">Item Breakdown</h3>
                {order.items.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4 hover:shadow-md transition">
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                          <Sparkles size={10} /> {item.category}
                        </span>
                        <span className="text-[10px] text-gray-400">ID: {item.id}</span>
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 truncate">{item.name}</h4>
                      <p className="text-xs text-gray-500">{item.quantity} units × ₹{item.unitPrice}/pc</p>
                    </div>
                    <div className="text-right flex flex-col justify-between items-end">
                      <span className="text-sm font-black text-gray-900">₹{item.price}</span>
                      <span className="text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded border flex items-center gap-1"><Clock size={10}/>{item.estDelivery}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Balance Invoicing Panel */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
                <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase flex items-center gap-1.5 border-b pb-2">
                  <Receipt size={14} className="text-blue-500" /> Invoice Breakdown
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-gray-500">
                    <span>Washing & Cleaning Cost</span>
                    <span className="font-semibold text-gray-800">₹{order.summary.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Rider Logistics Fees</span>
                    <span className="font-semibold text-gray-800">₹49</span>
                  </div>
                  {order.summary.discount > 0 && (
                    <div className="flex justify-between text-emerald-600 bg-emerald-50 p-1.5 rounded border border-emerald-100">
                      <span className="flex items-center gap-1"><Tag size={12}/> Campaign Coupon</span>
                      <span className="font-bold">- ₹{order.summary.discount}</span>
                    </div>
                  )}
                   
                  <div className="flex justify-between items-center text-sm font-black text-gray-900 border-t pt-3 mt-2">
                    <span>Grand Total</span>
                    <span className="text-blue-600 text-lg">₹{order.summary.grandTotal}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </UserLayout>
    );
  }

  // --- MAIN RECENT ORDER HISTORY VIEW ---
  return (
    <UserLayout> {/* WRAPPED WITH UserLayout */}
      <div className="w-full">
        <div className="w-full max-w-5xl mx-auto p-4 md:p-6 space-y-6 font-sans text-gray-800 transition-all duration-300 ease-in-out">
          
          {/* Filtering Navigation System */}
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {['All', 'Pending', 'Processing', 'Delivered'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => { setActiveTab(tab); setViewingAll(false); }}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    activeTab === tab 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-sm' 
                      : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {tab === 'All' ? 'All Bookings' : tab}
                </button>
              ))}
            </div>
            <span className="text-xs font-semibold text-gray-400 hidden sm:inline">
              Showing {viewingAll ? filteredOrders.length : Math.min(3, filteredOrders.length)} Orders
            </span>
          </div>

          {/* Grid Dashboard Item Layouts */}
          <div className="space-y-4">
            {filteredOrders.slice(0, viewingAll ? filteredOrders.length : 3).map((order, index) => (
  <div 
    key={`${order.orderNo}-${index}`} // <--- CHANGE THIS LINE HERE
    onClick={() => handleOrderClick(order)}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-blue-200 hover:shadow-md cursor-pointer transition-all duration-200"
              >
                {/* Context Summary Fields */}
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black border ${order.statusColor}`}>
                      ● {order.status}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">Ref: <span className="font-bold text-gray-700">{order.orderNo}</span></span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 truncate">
                    {order.items.map(i => i.name).join(' + ')}
                  </h3>
                  <p className="text-xs text-gray-400">Scheduled: <span className="text-gray-600 font-medium">{order.date}</span></p>
                </div>

                {/* Total Item Count Badge */}
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
                  <span className="text-xs font-bold text-gray-500">Items:</span>
                  <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                    {order.items.reduce((acc, item) => acc + item.quantity, 0)} Pcs
                  </span>
                </div>

                {/* Total Cost Matrix and Primary Event Actions */}
                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t pt-3 md:border-t-0 md:pt-0">
                  <div className="text-left md:text-right">
                    <p className="text-[10px] text-gray-400 tracking-wider uppercase font-medium">Grand Total</p>
                    <p className="text-lg font-black text-blue-600">₹{order.summary.grandTotal}</p>
                  </div>
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-50 group-hover:bg-blue-600 text-gray-700 group-hover:text-white text-xs font-bold rounded-xl transition-all border border-gray-200 group-hover:border-blue-600">
                    View Details <ChevronRight size={14} />
                  </button>
                </div>

              </div>
            ))}

            {fetchStatus === 'success' && filteredOrders.length === 0 && (
              <div className="bg-white border rounded-2xl p-12 text-center text-gray-400 space-y-2">
                <p className="font-semibold">No orders found in this category.</p>
              </div>
            )}

            {fetchStatus === 'error' && !isLoading && (
              <div className="bg-white border rounded-2xl p-12 text-center text-red-500 space-y-2">
                <p className="font-semibold">{fetchError}</p>
              </div>
            )}
          </div>

          {/* Grid Expansion Footer Controller */}
          {filteredOrders.length > 3 && !viewingAll && (
            <div className="text-center pt-2">
              <button 
                onClick={() => setViewingAll(true)}
                className="px-6 py-2.5 bg-white border border-gray-200 hover:border-blue-500 hover:text-blue-600 text-xs font-bold rounded-xl shadow-sm transition"
              >
                View All Orders ({filteredOrders.length})
              </button>
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default MyOrders;
