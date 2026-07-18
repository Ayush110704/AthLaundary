import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // e.g. "SRV001"
    name: { type: String, required: true },             // e.g. "Laundry"
    category: { type: String, required: true },         // e.g. "Clothes"
    price: { type: Number, required: true },            // e.g. 120
    duration: { type: String, required: true },         // e.g. "24 Hours"
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    description: { type: String },
    createdDate: { type: String },
    totalOrders: { type: Number, default: 0 },
    completedOrders: { type: Number, default: 0 },
    cancelledOrders: { type: Number, default: 0 },
    totalEarnings: { type: Number, default: 0 },
    items: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true }
        }
    ]
}, { timestamps: true });

const Service = mongoose.model('Service', ServiceSchema);
export default Service;
