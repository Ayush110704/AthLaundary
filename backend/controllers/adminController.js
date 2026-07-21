 import Admin from '../models/Admin.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const ADMIN_REGISTRATION_KEY = process.env.ADMIN_REGISTRATION_KEY;

// ADMIN REGISTRATION
export const registerAdmin = async (req, res) => {
    try {
        if (!ADMIN_REGISTRATION_KEY) {
            console.error('ADMIN_REGISTRATION_KEY is not set in your .env file');
            return res.status(500).json({ success: false, message: 'Server misconfiguration: admin registration key is not set' });
        }

        const { name, email, password, adminKey } = req.body;

        if (adminKey !== ADMIN_REGISTRATION_KEY) {
            return res.status(401).json({ success: false, message: 'Invalid Admin Authorization Key!' });
        }

        let admin = await Admin.findOne({ email });
        if (admin) {
            return res.status(400).json({ success: false, message: 'Admin account already exists with this email' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        admin = new Admin({ name, email, password: hashedPassword });
        await admin.save();

        res.status(201).json({ success: true, message: 'Admin account created successfully!' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ADMIN LOGIN
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ success: false, message: 'Invalid Admin Credentials' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid Admin Credentials' });
        }

        const token = jwt.sign(
            { id: admin._id, role: 'admin' }, 
            process.env.JWT_SECRET || 'secret', 
            { expiresIn: '1d' }
        );

        res.status(200).json({
            success: true,
            token,
            admin: {
                id: admin._id,
                fullName: admin.name, // Added so frontend dashboard reads the name correctly
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET ALL CUSTOMER USERS
export const getUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'customer' }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// UPDATE USER DETAILS
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, address, status, closedDate } = req.body;

        const updateData = {};
        if (name !== undefined) {
            updateData.name = name;
            const parts = name.trim().split(/\s+/);
            updateData.firstName = parts[0] || '';
            updateData.lastName = parts.slice(1).join(' ') || '';
        }
        if (email !== undefined) updateData.email = email;
        if (phone !== undefined) updateData.phone = phone;
        if (address !== undefined) updateData.address = address;
        if (status !== undefined) updateData.status = status;
        if (closedDate !== undefined) updateData.closedDate = closedDate;

        const updatedUser = await User.findByIdAndUpdate(id, { $set: updateData }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// DELETE USER
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'User deleted successfully!' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};