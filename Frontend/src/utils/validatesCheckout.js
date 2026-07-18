

import { getCheckoutData } from "./checkoutStorage";

const validateCheckout = () => {

    const data = getCheckoutData();

    if (data.items.length === 0) {
        return {
            success: false,
            message: "Please add at least one item."
        }
    }

    if (!data.address.name) {
        return {
            success: false,
            message: "Please add address."
        }
    }

    if (!data.schedule.date) {

        return {
            success: false,
            message: "Please select pickup date."
        }
    }

    if (!data.schedule.slot) {

        return {
            success: false,
            message: "Please select pickup time."
        }

    }

    if (!data.payment.method) {

        return {
            success: false,
            message: "Please select payment method."
        }

    }

    if (data.payment.method === "card") {

        if (
            !data.payment.cardNumber ||
            !data.payment.cardHolder ||
            !data.payment.expiry ||
            !data.payment.cvv
        ) {

            return {

                success: false,

                message: "Please complete card details."

            }

        }

    }

    if (data.payment.method === "upi") {

        if (!data.payment.upiId) {

            return {

                success: false,

                message: "Please enter UPI ID."

            }

        }

    }

    return {

        success: true

    }

}

export default validateCheckout;