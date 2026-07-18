import Term from '../models/Term.js';

// Seed default Terms & Conditions if they don't exist
const seedDefaultTerms = async () => {
    const defaultTerms = [
        {
            keyId: 1,
            iconName: "FiEdit3",
            title: "Agreement to Terms",
            content: "By accessing or using Athenura professional cleaning services, you agree to be bound by these Terms and Conditions. These terms constitute a legally binding agreement between you and Athenura regarding your use of our platform and services."
        },
        {
            keyId: 2,
            iconName: "FiFileText",
            title: "Service Provision",
            content: "We provide laundry, dry cleaning, ironing, pickup and delivery services. Service availability may vary depending on location and operational requirements."
        },
        {
            keyId: 3,
            iconName: "FiDollarSign",
            title: "Pricing & Payments",
            content: "All prices are displayed before order confirmation. Payments must be completed before order processing. Additional charges may apply for special garment handling."
        },
        {
            keyId: 4,
            iconName: "FiShield",
            title: "Liability & Insurance",
            content: "We take reasonable care of all garments. However, Athenura shall not be liable for damage caused by pre-existing garment defects or inaccurate care instructions."
        },
        {
            keyId: 5,
            iconName: "FaLeaf",
            title: "Eco-Wash Commitment",
            content: "We use eco-friendly detergents and sustainable cleaning methods whenever possible."
        }
    ];

    try {
        const count = await Term.countDocuments();
        if (count === 0) {
            console.log('Seeding default Terms & Conditions into MongoDB...');
            await Term.insertMany(defaultTerms);
            console.log('Default Terms & Conditions seeded successfully!');
        }
    } catch (error) {
        console.error('Error seeding Terms & Conditions:', error);
    }
};

// GET ALL TERMS & CONDITIONS
export const getTerms = async (req, res) => {
    try {
        await seedDefaultTerms();
        const terms = await Term.find({}).sort({ keyId: 1 });
        res.status(200).json({ success: true, data: terms });
    } catch (error) {
        console.error('Error fetching Terms & Conditions:', error);
        res.status(500).json({ success: false, message: 'Server error fetching terms' });
    }
};
