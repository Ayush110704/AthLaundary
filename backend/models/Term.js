import mongoose from 'mongoose';

const TermSchema = new mongoose.Schema({
    keyId: { type: Number, required: true, unique: true }, // e.g. 1, 2, 3
    iconName: { type: String, required: true }, // e.g. "FiEdit3", "FiFileText", "FiDollarSign", "FiShield", "FaLeaf"
    title: { type: String, required: true },
    content: { type: String, required: true }
}, { timestamps: true });

const Term = mongoose.model('Term', TermSchema);
export default Term;
