import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: false }, // Changed to false
    phone: { type: String, required: false },    // Changed to false
    address: { type: String, default: 'Not specified' },
    dob: { type: String, default: '' },
    role: { type: String, default: 'customer' }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
export default User;