import express from 'express';
import { registerAdmin, loginAdmin, getUsers, updateUser, deleteUser } from '../controllers/adminController.js';
import { verifyAdminToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// Protected — only a logged-in admin (valid JWT) can manage users
router.get('/users', verifyAdminToken, getUsers);
router.put('/users/:id', verifyAdminToken, updateUser);
router.delete('/users/:id', verifyAdminToken, deleteUser);

export default router;