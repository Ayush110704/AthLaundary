import Razorpay from 'razorpay';
import dotenv from 'dotenv';
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Ensure these are in your .env
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

 export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    
    // Debugging: Log what the backend receives
    console.log("Received amount for payment:", amount);

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: "Invalid amount provided" });
    }

    const options = {
      amount: Math.round(amount * 100), // Ensure it is an integer
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Razorpay Error:", error); // This will show in your terminal
    res.status(500).json({ error: "Failed to create order" });
  }
};