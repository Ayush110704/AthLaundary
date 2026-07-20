import axios from 'axios';
 import React ,{useState}from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import validateCheckout from '../utils/validatesCheckout';
import saveOrder from '../utils/saveOrder';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const OrderSummary = ({ Step, checkoutData }) => {
    const [isConfirm,setIsConfirm] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const items = checkoutData.items || [];
    const deliveryFee = 49;

    // Calculate totals safely
    const subtotal = items.reduce((total, item) => {
        return total + (Number(item.price || 0) * Number(item.quantity || 0));
    }, 0);

    const grandTotal = subtotal + deliveryFee;



 const handleConfirm = async () => {

    if(isConfirm)return;
    const result = validateCheckout();
    if (!result.success) {
        Swal.fire("Error", result.message, "error");
        return;
    }
 setIsConfirm(true);
    // 2. Prepare the payload to match your MongoDB Schema
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const selectedAddress = checkoutData.address || {};
    const formattedAddress = [
        selectedAddress.addressLine1 || selectedAddress.address,
        selectedAddress.watermark,
        selectedAddress.city,
        selectedAddress.state,
        selectedAddress.pincode
    ].filter(Boolean).join(", ");
    
    const orderData = {
        userId: currentUser?._id || currentUser?.id || currentUser?.user?._id || "guest",
        customerName: `${currentUser?.FirstName || ""} ${currentUser?.LastName || ""}`,
        email: currentUser?.Email || currentUser?.email || "",
        phone: selectedAddress?.phone || currentUser?.phone || currentUser?.number || "",
        items: checkoutData.items,
        totalAmount: grandTotal,
        address: formattedAddress || selectedAddress?.address || "",
        paymentMethod: checkoutData.payment?.method || "cod",

        deliveryDate: checkoutData.schedule?.deliveryDate || "",
    deliveryTimeSlot: checkoutData.schedule?.deliveryTimeSlot || "",
    pickupDate: checkoutData.schedule?.date || "", // Optional: if you need this too
    pickupTimeSlot: checkoutData.schedule?.slot || ""
    }; 

    try {
        // 3. Send to backend
        const response = await axios.post(`${API_URL}/api/orders`, orderData);
        
        const swalResult = await Swal.fire({
            icon: "success",
            title: "Booking Successful!",
            text: response.data?.message || "Your booking has been submitted to our database.",
            confirmButtonText: "Continue",
            confirmButtonColor: "#06b6d4",
        });

        if (swalResult.isConfirmed) {
            localStorage.removeItem("checkoutData"); // Clear the local storage
            navigate("/user-orders");
        }
    } catch (error) {
        setIsConfirm(false);
        Swal.fire("Error", error.response?.data?.message || "Could not save order. Please try again.", "error");
        console.error(error);
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
                            disabled={isConfirm}
                            className={`w-full flex justify-center items-center gap-2 rounded-xl bg-blue-900 py-3 text-white font-semibold hover:bg-blue-800 transition
                             ${isConfirm ?  "bg-gray-400 cursor-not-allowed": "bg-blue-900 hover:bg-blue-800"}`} >
                            {isConfirm ? "Processing..." :
                            checkoutData.payment?.method === "cod" 
                            ? "Confirm Booking" : "Proceed to Pay"}
                          { !isConfirm && <ArrowRight size={18} />}
                        </button>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default OrderSummary;