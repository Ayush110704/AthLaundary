
 import axios from 'axios';
 import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import validateCheckout from '../utils/validatesCheckout';
import saveOrder from '../utils/saveOrder';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const OrderSummary = ({ Step, checkoutData }) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const items = checkoutData.items || [];
    const deliveryFee = 49;

    // Calculate totals safely
    const subtotal = items.reduce((total, item) => {
        return total + (Number(item.price || 0) * Number(item.quantity || 0));
    }, 0);

    const grandTotal = subtotal + deliveryFee;

const IS_DEV_MODE = true;
 const handleConfirm = async () => {
    const result = validateCheckout();
    if (!result.success) {
        Swal.fire("Error", result.message, "error");
        return;
    }

    // 1. Define orderData FIRST so it's available everywhere
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const orderData = {
        userId: currentUser?._id || currentUser?.id || "guest",
        customerName: `${currentUser?.FirstName || ""} ${currentUser?.LastName || ""}`.trim(),
        email: currentUser?.Email || currentUser?.email || "",
        phone: checkoutData.address?.phone || currentUser?.phone || "",
        address: [checkoutData.address?.addressLine1, checkoutData.address?.city, checkoutData.address?.pincode].filter(Boolean).join(", "),
        items: checkoutData.items,
        totalAmount: grandTotal,
        paymentMethod: checkoutData.payment?.method || "cod",
        pickupDate: checkoutData.schedule?.date,
        pickupTimeSlot: checkoutData.schedule?.slot,
        deliveryDate: checkoutData.schedule?.deliveryDate,
        deliveryTimeSlot: checkoutData.schedule?.deliveryTimeSlot
    };

    // 2. NOW you can use it in the dev mode check
    const IS_DEV_MODE = false;
    if (IS_DEV_MODE) {
        console.log("Running in DEV MODE - Skipping Razorpay");
        saveOrderToDb(orderData); // This will now work
        return;
    }

    // 3. Rest of your payment logic
    if (checkoutData.payment?.method === "cod") {
        saveOrderToDb(orderData);
    } else {
        try {
            const { data: order } = await axios.post(`${API_URL}/api/payment/create-order`, { 
                amount: Math.round(grandTotal) 
            });

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: "INR",
                name: "Athenura",
                order_id: order.id,
                handler: async function (response) {
                    saveOrderToDb({ ...orderData, paymentId: response.razorpay_payment_id });
                },
                prefill: {
                    name: orderData.customerName,
                    email: orderData.email,
                    contact: orderData.phone,
                },
                remember_customer: false,
            };
            const razor = new window.Razorpay(options);
            razor.open();
        } catch (err) {
            console.error("Payment error:", err.response?.data || err);
            Swal.fire("Error", "Payment initiation failed. Please try again.", "error");
        }
    }
};

  const saveOrderToDb = async (finalData) => {
    try {
      const response = await axios.post(`${API_URL}/api/orders`, finalData);
      Swal.fire("Success", "Booking Successful!", "success");
      localStorage.removeItem("checkoutData");
      navigate("/user-orders");
    } catch (error) {
      Swal.fire("Error", "Could not save order", "error");
    }
  };

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24 h-fit"
        >
            <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="w-full rounded-2xl bg-white border border-gray-200 shadow-xl overflow-hidden"
            >
                <div className="flex items-center gap-3 border-b px-5 py-4 bg-blue-50">
                    <ShoppingBag className="h-5 w-5 text-blue-700" />
                    <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
                </div>

                <div className="space-y-3 p-5">
                    {items.map((item, index) => (
                        <div key={index} className="flex justify-between">
                            <div>
                                <h3 className="font-semibold">{item.clothType}</h3>
                                <p className="text-sm text-gray-500">{item.quantity} × ₹{item.price}</p>
                            </div>
                            <span className="font-semibold text-blue-900">
                                ₹{(Number(item.price || 0) * Number(item.quantity || 0)).toFixed(2)}
                            </span>
                        </div>
                    ))}

                    <div className="flex justify-between border-t pt-2">
                        <span className="text-gray-600">Delivery Fee</span>
                        <span className="font-semibold text-blue-900">₹{deliveryFee.toFixed(2)}</span>
                    </div>

                    {/* Total */}
                    <div className="rounded-xl bg-blue-50 p-5 mt-4">
                        <div className="flex justify-between items-center">
                            <p className="text-lg uppercase font-semibold text-gray-500">Total</p>
                            <h3 className="text-3xl font-bold text-blue-900">₹{grandTotal.toFixed(2)}</h3>
                        </div>
                    </div>

                    {Step === 4 && (
                        <button
                            onClick={handleConfirm}
                            className="w-full flex justify-center items-center gap-2 rounded-xl bg-blue-900 py-3 text-white font-semibold hover:bg-blue-800 transition"
                        >
                            {checkoutData.payment?.method === "cod" ? "Confirm Booking" : "Proceed to Pay"}
                            <ArrowRight size={18} />
                        </button>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default OrderSummary;
