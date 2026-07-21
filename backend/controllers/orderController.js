import Order from '../models/Order.js'; // Adjust the path to your Order model

const generateOrderId = () => {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    return `ATH${randomDigits}`;
};

 export const createOrder = async (req, res) => {
    try {
        const {
            userId,
            customerName,
            email,
            phone,
            address,
            items,
            totalAmount,
            paymentMethod,
            status,
            pickupDate,
            pickupTimeSlot,
            deliveryDate,
            deliveryTimeSlot,
            paymentId
        } = req.body;

        // UPDATED: Added these fields to the validation check
        if (!userId || !customerName || !email || !phone || !address || !Array.isArray(items) || !items.length || totalAmount === undefined || !paymentMethod || !pickupDate || !pickupTimeSlot || !deliveryDate || !deliveryTimeSlot) {
            return res.status(400).json({
                success: false,
                message: 'Missing required order fields: check if Date and Time slots are selected.'
            });
        }

        let orderId = generateOrderId();
        while (await Order.findOne({ orderId })) {
            orderId = generateOrderId();
        }

        let computedPaymentStatus = 'Pending';
        let computedTransactionId = null;

        if (paymentMethod === 'upi' || paymentMethod === 'card') {
            computedPaymentStatus = 'Paid';
            computedTransactionId = (paymentId && paymentId.trim() !== '') 
                ? paymentId 
                : `TXN${Date.now()}${Math.floor(Math.random() * 10000)}`;
        }

        console.log("Pre-Save Order Debug:", { paymentMethod, paymentId, computedTransactionId, computedPaymentStatus });

        const order = await Order.create({
            orderId,
            userId,
            customerName,
            email,
            phone,
            address,
            items,
            totalAmount,
            paymentMethod,
            paymentStatus: computedPaymentStatus,
            transactionId: computedTransactionId,
            status: status || 'Pending',
            // 2. Add these to the creation object:
            pickupDate,
            pickupTimeSlot,
            deliveryDate,
            deliveryTimeSlot
        });
        return res.status(201).json({
            success: true,
            message: 'Order created successfully',
            orderId,
            order
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message || 'Server error while creating order'
        });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, note, paymentStatus } = req.body;

        if (!status) {
            return res.status(400).json({
                success: false,
                message: 'Status is required'
            });
        }

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        const previousStatus = order.status;
        order.statusUpdateHistory = [
            ...(order.statusUpdateHistory || []),
            {
                fromStatus: previousStatus,
                status,
                note: note || '',
                date: new Date()
            }
        ];
        order.status = status;
        if (paymentStatus) {
            order.paymentStatus = paymentStatus;
        }

        await order.save();

        return res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Server error while updating order status'
        });
    }
};

export const trackOrder = async (req, res) => {
    try {
        const { orderId, phone, mobile } = req.query;
        const mobileNumber = phone || mobile;

        if (!orderId || !mobileNumber) {
            return res.status(400).json({
                success: false,
                message: 'Order ID and Mobile Number are required'
            });
        }

        const order = await Order.findOne({
            orderId: { $regex: `^${orderId}$`, $options: 'i' },
            phone: mobileNumber
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Invalid Order ID or Mobile Number'
            });
        }

        return res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Server error while tracking order'
        });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const query = {};
        if (req.query.status) {
            query.status = req.query.status;
        }

        const orders = await Order.find(query).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Server error while fetching orders'
        });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId: userId }).sort({ createdAt: -1 });

        // Map the database fields to the structure your UI expects
        const formattedOrders = orders.map(order => ({
            orderNo: order.orderId || order._id, // Prefer human-readable order ID, fallback to Mongo ID
            status: order.status,
            date: new Date(order.createdAt).toLocaleDateString(),
            pickupDate: order.pickupDate,
            pickupTimeSlot: order.pickupTimeSlot,
            deliveryDate: order.deliveryDate,
            deliveryTimeSlot: order.deliveryTimeSlot,
            customer: { name: order.customerName, mobile: order.phone },
            address: order.address,
            paymentStatus: order.paymentStatus || 'Pending',
            paymentMethod: order.paymentMethod,
            items: order.items.map(item => ({
                name: item.clothType,
                category: item.serviceType,
                quantity: item.quantity,
                price: item.price
            })), 
            summary: {
                grandTotal: order.totalAmount,
                subtotal: order.totalAmount // Simplify for now
            },
            statusColor: order.status === 'Pending' ? 'bg-yellow-100' : 'bg-green-100'
        }));

        res.status(200).json(formattedOrders);
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};
