 import express from 'express';
// Import BOTH functions
import { getAllOrders, getUserOrders, createOrder, trackOrder, updateOrderStatus } from '../controllers/orderController.js'; 

const router = express.Router();

// Route for creating an order (This fixes your 404 error)
router.post('/', createOrder); 

// Route for tracking an order
router.get('/track', trackOrder);

// Route for getting all orders for admin dashboard
router.get('/all', getAllOrders);

// Route for updating order status
router.patch('/:id/status', updateOrderStatus);

// Route for getting user orders
router.get('/user/:userId', getUserOrders); 

export default router;
