import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
    userEmail: { type: String, required: true, lowercase: true, trim: true },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    addressLine1: { type: String, required: true },
    watermark: { type: String }, // Landmark
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    isDefault: { type: Boolean, default: false }
}, { timestamps: true });

const Address = mongoose.model('Address', AddressSchema);
export default Address;
