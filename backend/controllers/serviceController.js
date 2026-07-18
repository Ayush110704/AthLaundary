import Service from '../models/Service.js';

// Seed default services into MongoDB if none exist
const seedDefaultServices = async () => {
    const defaultServices = [
        {
            id: "SRV001",
            name: "Laundry",
            category: "Laundry",
            price: 120,
            duration: "24 Hours",
            status: "Active",
            description: "Professional wash, dry and fold service for everyday clothes.",
            createdDate: "2026-06-20",
            totalOrders: 420,
            completedOrders: 398,
            cancelledOrders: 22,
            totalEarnings: 47760,
            items: [
                { name: "Tshirt", price: 80 },
                { name: "Jeans", price: 120 },
                { name: "Shirt", price: 100 },
                { name: "Bed Sheet", price: 150 },
                { name: "Shorts", price: 60 }
            ]
        },
        {
            id: "SRV002",
            name: "Dry Cleaning",
            category: "Dry Cleaning",
            price: 250,
            duration: "48 Hours",
            status: "Active",
            description: "Premium dry cleaning for delicate garments.",
            createdDate: "2026-06-19",
            totalOrders: 185,
            completedOrders: 175,
            cancelledOrders: 10,
            totalEarnings: 43750,
            items: [
                { name: "Suit (2-piece)", price: 450 },
                { name: "Silk Saree", price: 500 },
                { name: "Woolen Blazer", price: 300 },
                { name: "Leather Jacket", price: 600 },
                { name: "Coat", price: 350 }
            ]
        },
        {
            id: "SRV003",
            name: "Ironing",
            category: "Ironing",
            price: 80,
            duration: "12 Hours",
            status: "Active",
            description: "Steam ironing for wrinkle free clothes.",
            createdDate: "2026-06-18",
            totalOrders: 310,
            completedOrders: 296,
            cancelledOrders: 14,
            totalEarnings: 23680,
            items: [
                { name: "Shirt", price: 30 },
                { name: "Jeans", price: 30 },
                { name: "Saree", price: 80 },
                { name: "Kurta", price: 40 },
                { name: "Suit", price: 50 }
            ]
        },
        {
            id: "SRV004",
            name: "Carpet Cleaning",
            category: "Carpet Cleaning",
            price: 650,
            duration: "72 Hours",
            status: "Active",
            description: "Deep carpet cleaning with stain removal.",
            createdDate: "2026-06-17",
            totalOrders: 92,
            completedOrders: 86,
            cancelledOrders: 6,
            totalEarnings: 55900,
            items: [
                { name: "Small Rug", price: 250 },
                { name: "Medium Carpet", price: 450 },
                { name: "Large Carpet", price: 650 },
                { name: "Persian Rug", price: 900 },
                { name: "Doormat", price: 100 }
            ]
        },
        {
            id: "SRV005",
            name: "Curtain Cleaning",
            category: "Curtain Cleaning",
            price: 550,
            duration: "48 Hours",
            status: "Inactive",
            description: "Dust removal and deep cleaning for curtains.",
            createdDate: "2026-06-16",
            totalOrders: 78,
            completedOrders: 70,
            cancelledOrders: 8,
            totalEarnings: 38500,
            items: [
                { name: "Single Panel Curtain", price: 150 },
                { name: "Double Panel Curtain", price: 280 },
                { name: "Velvet Curtain", price: 350 },
                { name: "Blackout Curtain", price: 200 },
                { name: "Sheer Curtain", price: 120 }
            ]
        },
        {
            id: "SRV006",
            name: "Shoe Cleaning",
            category: "Shoe Cleaning",
            price: 300,
            duration: "24 Hours",
            status: "Active",
            description: "Premium shoe cleaning and polishing.",
            createdDate: "2026-06-15",
            totalOrders: 145,
            completedOrders: 136,
            cancelledOrders: 9,
            totalEarnings: 40800,
            items: [
                { name: "Sneakers", price: 150 },
                { name: "Leather Shoes", price: 200 },
                { name: "Sports Shoes", price: 180 },
                { name: "Suede Boots", price: 350 },
                { name: "Sandals/Heels", price: 150 }
            ]
        }
    ];

    try {
        const count = await Service.countDocuments();
        if (count === 0) {
            console.log('Seeding default services into MongoDB...');
            await Service.insertMany(defaultServices);
            console.log('Default services seeded successfully!');
        } else {
            // Check if any existing service does not have the items field
            const servicesWithoutItems = await Service.find({ items: { $exists: false } });
            if (servicesWithoutItems.length > 0) {
                console.log('Migrating services to add items field...');
                for (const s of defaultServices) {
                    await Service.updateOne({ id: s.id }, { $set: { items: s.items } });
                }
                console.log('Migration completed successfully!');
            }
            // Migrate legacy categories to match service name
            const oldCategoryServices = await Service.find({ 
                id: { $in: ["SRV001", "SRV002", "SRV003", "SRV004", "SRV005", "SRV006"] },
                category: { $in: ["Clothes", "Premium", "Home Care", "Accessories"] }
            });
            if (oldCategoryServices.length > 0) {
                console.log('Updating legacy service categories to match service names...');
                for (const s of defaultServices) {
                    await Service.updateOne({ id: s.id }, { $set: { category: s.category } });
                }
                console.log('Category update migration completed successfully!');
            }
        }
    } catch (error) {
        console.error('Error seeding services:', error);
    }
};

// GET ALL SERVICES
export const getServices = async (req, res) => {
    try {
        await seedDefaultServices();
        const services = await Service.find({}).sort({ id: 1 });
        res.status(200).json({ success: true, data: services });
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ success: false, message: 'Server error fetching services' });
    }
};

// CREATE SERVICE
export const createService = async (req, res) => {
    try {
        const { id, name, category, price, duration, status, description } = req.body;
        
        // Generate an ID if not provided (e.g. SRV + timestamp or sequential)
        let finalId = id;
        if (!finalId) {
            const count = await Service.countDocuments();
            finalId = `SRV${String(count + 1).padStart(3, '0')}`;
        }

        const newService = new Service({
            id: finalId,
            name: name || category, // Fallback name to category if not provided
            category,
            price: Number(price),
            duration,
            status: status || 'Active',
            description,
            items: req.body.items || [],
            createdDate: new Date().toISOString().split('T')[0]
        });

        await newService.save();
        res.status(201).json({ success: true, data: newService });
    } catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({ success: false, message: 'Server error creating service' });
    }
};

// UPDATE SERVICE
export const updateService = async (req, res) => {
    try {
        const { id } = req.params; // Can be MongoDB ObjectId or custom id
        const updateData = req.body;

        if (updateData.price) {
            updateData.price = Number(updateData.price);
        }

        let updatedService;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            // MongoDB ObjectId
            updatedService = await Service.findByIdAndUpdate(id, updateData, { returnDocument: 'after', runValidators: true });
        } else {
            // Custom ID e.g., "SRV001"
            updatedService = await Service.findOneAndUpdate({ id }, updateData, { returnDocument: 'after', runValidators: true });
        }

        if (!updatedService) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }

        res.status(200).json({ success: true, data: updatedService });
    } catch (error) {
        console.error('Error updating service:', error);
        res.status(500).json({ success: false, message: 'Server error updating service' });
    }
};

// DELETE SERVICE
export const deleteService = async (req, res) => {
    try {
        const { id } = req.params;

        let deletedService;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            deletedService = await Service.findByIdAndDelete(id);
        } else {
            deletedService = await Service.findOneAndDelete({ id });
        }

        if (!deletedService) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }

        res.status(200).json({ success: true, message: 'Service deleted successfully' });
    } catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).json({ success: false, message: 'Server error deleting service' });
    }
};
