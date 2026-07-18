import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    inquiryType: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['new', 'in-progress', 'resolved'], default: 'new' }
}, { timestamps: true });

const Contact = mongoose.model('Contact', ContactSchema);
export default Contact;
