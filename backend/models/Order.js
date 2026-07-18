 import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    pickupDate: { type: String },      // Add this
    pickupTimeSlot: { type: String },  // Add this
    deliveryDate: { type: String },    // Add this
    deliveryTimeSlot: { type: String },
    items: [
        {
            serviceType: String,
            clothType: String,
            quantity: Number,
            price: Number,
            instructions: String
        }
    ],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
    status: { type: String, default: 'Pending' },
    statusUpdateHistory: [
        {
            status: String,
            fromStatus: String,
            note: String,
            date: Date
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
