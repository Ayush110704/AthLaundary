import Plan from '../models/Plan.js';

// Seed initial subscription plans if they don't exist
const seedDefaultPlans = async () => {
    const defaultPlans = [
        {
            name: "Monthly",
            duration: "1 Month",
            price: 299,
            discountText: "40% OFF",
            features: [
                "15 Clothes / Month",
                "Free Pickup & Delivery",
                "Wash & Fold Service",
                "48-Hour Delivery",
                "Basic Support"
            ],
            popular: false
        },
        {
            name: "Quarterly",
            duration: "3 Months",
            price: 799,
            discountText: "Save ₹150",
            features: [
                "50 Clothes / 3 Months",
                "Priority Pickup",
                "Wash, Fold & Iron",
                "Express Delivery",
                "Premium Support"
            ],
            popular: true
        },
        {
            name: "Half Yearly",
            duration: "6 Months",
            price: 1499,
            discountText: "Save ₹400",
            features: [
                "120 Clothes",
                "Dry Cleaning Included",
                "Priority Delivery",
                "Free Alterations",
                "Dedicated Support"
            ],
            popular: false
        },
        {
            name: "Yearly",
            duration: "12 Months",
            price: 2799,
            discountText: "Save ₹1200",
            features: [
                "Unlimited Laundry",
                "Free Pickup & Delivery",
                "Steam Ironing Included",
                "Same Day Service",
                "Dedicated Manager"
            ],
            popular: false
        }
    ];

    try {
        const count = await Plan.countDocuments();
        if (count === 0) {
            console.log('Seeding default subscription plans into MongoDB...');
            await Plan.insertMany(defaultPlans);
            console.log('Default subscription plans seeded successfully!');
        }
    } catch (error) {
        console.error('Error seeding subscription plans:', error);
    }
};

// GET ALL SUBSCRIPTION PLANS
export const getPlans = async (req, res) => {
    try {
        await seedDefaultPlans();
        const plans = await Plan.find({});
        res.status(200).json({ success: true, data: plans });
    } catch (error) {
        console.error('Error fetching subscription plans:', error);
        res.status(500).json({ success: false, message: 'Server error fetching plans' });
    }
};
