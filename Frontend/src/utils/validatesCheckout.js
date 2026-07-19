 import { getCheckoutData } from "./checkoutStorage";

const validateCheckout = () => {
    const data = getCheckoutData();

    if (!data.items || data.items.length === 0) {
        return { success: false, message: "Please add at least one item." };
    }

    if (!data.address?.name && !data.address?.fullName) {
        return { success: false, message: "Please add address." };
    }

    if (!data.schedule?.date) {
        return { success: false, message: "Please select pickup date." };
    }

    if (!data.schedule?.slot) {
        return { success: false, message: "Please select pickup time." };
    }

    if (!data.payment?.method) {
        return { success: false, message: "Please select payment method." };
    }

    // No card or UPI validation here. Razorpay handles it!
    return { success: true };
}

export default validateCheckout;