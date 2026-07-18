import mongoose from 'mongoose';

const PlanSchema = new mongoose.Schema({
    name: { type: String, required: true },       // e.g. "Monthly", "Quarterly"
    duration: { type: String, required: true },   // e.g. "1 Month", "3 Months"
    price: { type: Number, required: true },      // e.g. 299, 799
    discountText: { type: String },               // e.g. "40% OFF", "Save ₹150"
    features: [{ type: String }],                 // Array of string features
    popular: { type: Boolean, default: false }     // Is it the "Most Popular" plan?
}, { timestamps: true });

const Plan = mongoose.model('Plan', PlanSchema);
export default Plan;
