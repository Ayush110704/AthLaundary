import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UserLayout from '../User/UserLayout';  

import {
  FaTruckMoving,
  FaPhoneAlt,
  FaComments,
  FaClock,
  FaMapMarkerAlt,
  FaShoppingCart,
  FaBoxOpen,
  FaSoap,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";

const baseProgressSteps = [
  {
    title: "Pickup",
    icon: <FaShoppingCart />,
  },
  {
    title: "Processing",
    icon: <FaBoxOpen />,
  },
  {
    title: "Cleaning",
    icon: <FaSoap />,
  },
  {
    title: "Out for Delivery",
    icon: <FaTruck />,
  },
  {
    title: "Completed",
    icon: <FaCheckCircle />,
  },
];

const statusOrder = [
  "pickup",
  "processing",
  "cleaning",
  "out_for_delivery",
  "completed",
];

const normalizeStatus = (status = "") =>
  String(status).trim().toLowerCase().replace(/\s+/g, "_");

const getProgressSteps = (status) => {
  const normalized = normalizeStatus(status);

  if (normalized === "cancelled") {
    return baseProgressSteps.map((step) => ({
      ...step,
      status: "pending",
    }));
  }

  const currentIndex = Math.max(
    0,
    statusOrder.indexOf(normalized) >= 0
      ? statusOrder.indexOf(normalized)
      : 0
  );

  return baseProgressSteps.map((step, index) => ({
    ...step,
    status:
      index < currentIndex
        ? "completed"
        : index === currentIndex
        ? "current"
        : "pending",
  }));
};

const Tracking1 = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [mobile, setMobile] = useState("");
  const [orderId, setOrderId] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [trackingQuery, setTrackingQuery] = useState(null);
  const pollingRef = useRef(null);

  const progressSteps = getProgressSteps(trackingOrder?.status);

  const getStatusLabel = (status) => {
    const labels = {
      pickup: "Pickup",
      processing: "Processing",
      cleaning: "Cleaning",
      out_for_delivery: "Out For Delivery",
      completed: "Completed",
      cancelled: "Cancelled",
    };

    return labels[normalizeStatus(status)] || "Processing";
  };

  const getStatusDescription = (status) => {
    const descriptions = {
      pickup: "Your order has been received and is waiting to be collected.",
      processing: "Your laundry is currently being processed at our facility.",
      cleaning: "Your items are under active cleaning and care.",
      out_for_delivery: "Your order is on the way to your location.",
      completed: "Your order has been delivered successfully.",
      cancelled: "This order has been cancelled.",
    };

    return descriptions[normalizeStatus(status)] || "Your order status has been updated.";
  };

  const getEtaLabel = (status) => {
    const etaMap = {
      pickup: "Pickup Pending",
      processing: "24-48 Hours",
      cleaning: "24-48 Hours",
      out_for_delivery: "12 Minutes",
      completed: "Delivered",
      cancelled: "Not Available",
    };

    return etaMap[normalizeStatus(status)] || "24-48 Hours";
  };

  const getDeliveryTimeLabel = (order) => {
    if (!order) return "Not Scheduled";
    if (normalizeStatus(order.status) === "completed") return "Completed";
    if (normalizeStatus(order.status) === "cancelled") return "Cancelled";
    if (order.deliveryDate) return new Date(order.deliveryDate).toLocaleString();
    return "In Progress";
  };

  const fetchTrackedOrder = async (query, { silent = false } = {}) => {
    if (!query?.orderId || !query?.phone) {
      throw new Error("Order ID and Mobile Number are required");
    }

    if (!silent) {
      setLoading(true);
    }

    try {
      const response = await fetch(
  `${API_URL}/api/orders/track?orderId=${encodeURIComponent(query.orderId)}&phone=${encodeURIComponent(query.phone)}`
);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid Order ID or Mobile Number");
      }

      return data.order;
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async () => {
    let newErrors = {};

    if (!mobile) {
      newErrors.mobile = "Mobile Number is required";
    } else if (!/^[0-9]{10}$/.test(mobile)) {
      newErrors.mobile = "Enter valid 10 digit Mobile Number";
    }

    if (!orderId) {
      newErrors.orderId = "Order ID is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setTrackingQuery(null);
      setTrackingOrder(null);
      setShowTracking(false);

      try {
        const order = await fetchTrackedOrder({ orderId: orderId.trim(), phone: mobile.trim() });
        setTrackingOrder(order);
        setTrackingQuery({ orderId: orderId.trim(), phone: mobile.trim() });
        setShowTracking(true);
        setErrors({});
      } catch (error) {
        setTrackingOrder(null);
        setShowTracking(false);
        setErrors({
          orderId: error.message || "Invalid Order ID or Mobile Number",
        });
      }
    }
  };

  useEffect(() => {
    if (!trackingQuery) return undefined;

    let cancelled = false;

    const poll = async () => {
      try {
        const order = await fetchTrackedOrder(trackingQuery, { silent: true });
        if (!cancelled) {
          setTrackingOrder(order);
          setShowTracking(true);
        }
      } catch (error) {
        if (!cancelled) {
          setErrors((prev) => ({
            ...prev,
            orderId: error.message || "Invalid Order ID or Mobile Number",
          }));
        }
      }
    };

    poll();
    pollingRef.current = setInterval(poll, 10000);

    return () => {
      cancelled = true;
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
  }, [trackingQuery]);

  return (
    <UserLayout> {/* WRAPPED WITH UserLayout */}
      <div className="w-full">
        <div className="bg-[#f8fbff] min-h-screen">

          {/* HERO SECTION  */}

          <section className="relative overflow-hidden bg-gradient-to-br from-[#eaf4ff] via-white to-[#dbeafe] mt-15">

            <div className="absolute -top-24 -left-20 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl"></div>

            <div className="absolute -bottom-24 right-0 w-80 h-80 bg-cyan-300/20 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">

              <div className="grid lg:grid-cols-2 gap-14 items-center">

                <motion.div
                  initial={{ opacity: 0, x: -80 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: .8 }}
                >

                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: .2 }}
                   className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
                  >

                    Track Your

                    <br />

                    <span className="bg-gradient-to-r from-[#0f3d7a] to-[#2563eb] bg-clip-text text-transparent">

                      Laundry

                    </span>

                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: .5 }}
                    className="mt-6 text-base sm:text-lg text-gray-600 leading-7 sm:leading-8 max-w-xl"
                  >

                    Stay updated with every stage of your laundry order —
                    from pickup to delivery.

                  </motion.p>

                </motion.div>

                {/* RIGHT */}

                <motion.div
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                  }}
              className="hidden lg:flex justify-center"
                >

                  <div className="relative">

                    <div className="w-96 h-96 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 shadow-2xl flex items-center justify-center">

                      <FaTruckMoving
                        size={150}
                        className="text-[#2563eb]"
                      />

                    </div>

                    <motion.div
                      animate={{
                        y: [0, -8, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                      }}
                      className="absolute -top-5 right-0 bg-white px-5 py-3 rounded-2xl shadow-lg"
                    >

                      🚚 Live Tracking

                    </motion.div>

                    <motion.div
                      animate={{
                        x: [0, 8, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                      }}
                      className="absolute bottom-10 -left-5 bg-white px-5 py-3 rounded-2xl shadow-lg"
                    >

                      ⏱ ETA 12 mins

                    </motion.div>

                  </div>

                </motion.div>

              </div>

            </div>

          </section>

          {/* TRACKING FORM */}

          <div className="max-w-7xl mx-auto px-5 -mt-14 relative z-20 mt-20 mb-20">

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-5 sm:p-8 lg:p-10"
            >

              <h2 className="text-3xl font-bold text-center text-[#0f3d7a]">

                Track Order

              </h2>

              <p className="text-center text-gray-500 mt-3">

                Enter your registered Mobile Number and Order ID

              </p>

              <div className="mt-10">

                <div className="grid grid-cols-1 lg:grid-cols-[2fr_2fr_1.2fr] gap-5 items-start">

                  {/* Mobile */}

                  <div>

                    <label className="font-semibold text-gray-700 block mb-2">

                      Mobile Number

                    </label>

                    <input
                      type="text"
                      maxLength={10}
                      value={mobile}
                      onChange={(e)=>
                        setMobile(
                          e.target.value.replace(/\D/g,"")
                        )
                      }
                      placeholder=""
                      className="w-full h-16 px-5 rounded-2xl border border-gray-300 outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-blue-100 transition"
                    />

                    {errors.mobile && (

                      <p className="text-red-500 text-sm mt-2">

                        {errors.mobile}

                      </p>

                    )}

                  </div>

                  {/* Order ID */}

                  <div>

                    <label className="font-semibold text-gray-700 block mb-2">

                      Order ID

                    </label>

                    <input
                      type="text"
                      value={orderId}
                      onChange={(e)=>
                        setOrderId(
                          e.target.value.toUpperCase()
                        )
                      }
                      placeholder=""
                      className="w-full h-16 px-5 rounded-2xl border border-gray-300 outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-blue-100 transition"
                    />

                    {errors.orderId && (

                      <p className="text-red-500 text-sm mt-2">

                        {errors.orderId}

                      </p>

                    )}

                  </div>

                  {/* Button */}

                  <div className="lg:pt-8">

                    <motion.button

                      whileHover={{
                        scale:1.03
                      }}

                      whileTap={{
                        scale:.97
                      }}

                      onClick={handleSubmit}

                      className="w-full h-16 rounded-2xl bg-gradient-to-r from-[#0f3d7a] to-[#2563eb] text-white font-semibold shadow-lg"

                    >

                      {loading ? "Tracking..." : "Track Order"}

                    </motion.button>

                  </div>

                </div>

              </div>

            </motion.div>

          </div>

          {/* TRACKING DASHBOARD */}

          <AnimatePresence>

            {showTracking && (

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto px-5 py-12"
              >

                <div className="relative overflow-hidden rounded-[30px] bg-gradient-to-r from-[#0f3d7a] via-[#1d4ed8] to-[#2563eb] shadow-2xl text-center">

                  <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

                  <div className="absolute -bottom-24 -left-20 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl"></div>

                  <div className="relative grid gap-8 p-5 sm:p-8 lg:p-10">

                    <div>

                      <span className="bg-white/20 text-white px-5 py-2 rounded-full font-medium">

                        ORDER #{trackingOrder?.orderId || orderId || "N/A"}

                      </span>

                      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-6">

                        {getStatusLabel(trackingOrder?.status)}

                      </h1>

                      <p className="text-blue-100 mt-5 text-lg leading-8">

                        {getStatusDescription(trackingOrder?.status)}

                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">

                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5">

                          <FaClock className="text-white text-2xl"/>

                          <p className="text-blue-100 mt-3">

                            Estimated Arrival

                          </p>

                          <h2 className="text-white text-2xl font-bold mt-2">

                            {getEtaLabel(trackingOrder?.status)}

                          </h2>

                        </div>

                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5">

                          <FaMapMarkerAlt className="text-white text-2xl"/>

                          <p className="text-blue-100 mt-3">

                            Delivery Time

                          </p>

                          <h2 className="text-white text-2xl font-bold mt-2">

                            {getDeliveryTimeLabel(trackingOrder)}

                          </h2>

                        </div>

                      </div>

                      <div className="mt-10">

                        <div className="flex justify-between text-white mb-3">

                          <span>Order Progress</span>

                          <span>
                            {Math.round(
                              ((progressSteps.findIndex((step) => step.status === "current") + 1) /
                                progressSteps.length) *
                                100
                            )}%
                          </span>

                        </div>

                        <div className="w-full h-3 rounded-full bg-white/20 overflow-hidden">

                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.round(((progressSteps.findIndex((step) => step.status === "current") + 1) / progressSteps.length) * 100)}%` }}
                            transition={{ duration: 1.5 }}
                            className="h-full bg-green-400 rounded-full"
                          />

                        </div>

                      </div>

                    </div>

                  

                  </div>

                </div>

              </motion.div>

            )}

          </AnimatePresence>

          {/* ORDER PROGRESS  */}

          {showTracking && (

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-7xl mx-auto px-5 pb-10"
            >

              <div className="bg-white rounded-3xl shadow-xl p-8">

                <div className="flex justify-between items-center mb-10">

                  <h2 className="text-3xl font-bold text-[#0f3d7a]">
                    Order Progress
                  </h2>

                  <div className="flex items-center gap-2">

                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>

                    <span className="text-green-600 font-medium">

                      Live Tracking

                    </span>

                  </div>

                </div>

                <div className="relative">

                 <div className="hidden sm:block absolute left-0 right-0 top-6 h-1 bg-gray-300 rounded-full"></div>

                  <div
                     className="hidden sm:block absolute left-0 top-6 h-1 bg-green-500 rounded-full"

                    style={{
                      width: `${
                        ((progressSteps.findIndex(
                          (step) => step.status === "current"
                        ) + 1) /
                          progressSteps.length) *
                        100
                      }%`,
                    }}
                  ></div>

                  <div className="hidden sm:grid grid-cols-5 relative">

                    {progressSteps.map((step, index) => (

                      <div
                        key={index}
                        className="flex flex-col items-center"
                      >

                        

                        <motion.div

                          animate={
                            step.status === "current"
                              ? {
                                  scale: [1, 1.15, 1],
                                }
                              : {}
                          }

                          transition={{
                            repeat: Infinity,
                            duration: 1.2,
                          }}

                          className={`w-14 h-14 rounded-full flex items-center justify-center z-10

                          ${
                            step.status === "completed"

                              ? "bg-green-500 text-white"

                              : step.status === "current"

                              ? "bg-blue-600 text-white shadow-xl"

                              : "bg-gray-200 text-gray-500"

                          }

                          `}
                        >

                          {step.icon}

                        </motion.div>

                        <h3

                          className={`mt-5 font-semibold text-center

                          ${
                            step.status === "completed"

                              ? "text-gray-900"

                              : step.status === "current"

                              ? "text-blue-600"

                              : "text-gray-500"

                          }

                          `}

                        >

                          {step.title}

                        </h3>

                        <p

                          className={`text-sm mt-2

                          ${
                            step.status === "completed"

                              ? "text-green-600"

                              : step.status === "current"

                              ? "text-blue-600"

                              : "text-gray-500"

                          }

                          `}

                        >

                          {step.status === "completed" && "Completed"}

                          {step.status === "current" && "In Progress"}

                          {step.status === "pending" && "Pending"}

                        </p>







                        

                      </div>

                    ))}

                  </div>





                  {/* Mobile Vertical Timeline */}
<div className="flex flex-col gap-6 sm:hidden mt-6">
  {progressSteps.map((step, index) => (
    <div key={index} className="flex items-start gap-4 relative">

      {index !== progressSteps.length - 1 && (
        <div
          className={`absolute left-5 top-10 w-1 h-16 ${
            step.status === "completed" || step.status === "current"
              ? "bg-green-500"
              : "bg-gray-300"
          }`}
        />
      )}

      <motion.div
        animate={
          step.status === "current"
            ? { scale: [1, 1.15, 1] }
            : {}
        }
        transition={{
          repeat: Infinity,
          duration: 1.2,
        }}
        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10
          ${
            step.status === "completed"
              ? "bg-green-500 text-white"
              : step.status === "current"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-gray-200 text-gray-500"
          }`}
      >
        {step.icon}
      </motion.div>

      <div className="pb-8">
        <h3
          className={`font-semibold ${
            step.status === "completed"
              ? "text-gray-900"
              : step.status === "current"
              ? "text-blue-600"
              : "text-gray-500"
          }`}
        >
          {step.title}
        </h3>

        <p
          className={`text-sm mt-1 ${
            step.status === "completed"
              ? "text-green-600"
              : step.status === "current"
              ? "text-blue-600"
              : "text-gray-500"
          }`}
        >
          {step.status === "completed" && "Completed"}
          {step.status === "current" && "In Progress"}
          {step.status === "pending" && "Pending"}
        </p>
      </div>

    </div>
  ))}
</div>

                </div>

              </div>

            </motion.div>




          )}


          

          {/* ACTION BUTTONS  */}

          <div className="flex flex-wrap justify-center gap-6 mt-10 mb-10">

            <button
              onClick={() => {
                window.location.href = "/";
              }}
              className="px-10 py-4 rounded-xl border border-[#2563eb] text-[#2563eb] font-semibold hover:bg-blue-50 transition"
            >
              Back To Home
            </button>

          </div>

        </div>
      </div>
    </UserLayout>
  );
};

export default Tracking1;