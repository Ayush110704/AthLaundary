import dotenv from 'dotenv';

// Load environment variables before importing modules that may use them
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import paymentRoutes from './routes/paymentRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import addressRoutes from './routes/addressRoutes.js';
import planRoutes from './routes/planRoutes.js';
import termRoutes from './routes/termRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();

// ================================
// MIDDLEWARE
// ================================

app.use(cors());
app.use(express.json());

// ================================
// HEALTH CHECK
// ================================

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'LaundryHub API is running successfully 🚀'
    });
});

// ================================
// DATABASE CONNECTION
// ================================

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('❌ MONGO_URI is not set');
    process.exit(1);
}

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('🚀 MongoDB Connected successfully!');
    })
    .catch((error) => {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    });

// ================================
// API ROUTES
// ================================

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/terms', termRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);

// ================================
// 404 HANDLER
// ================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
});

// ================================
// ERROR HANDLER
// ================================

app.use((err, req, res, next) => {
    console.error('❌ Server Error:', err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

// ================================
// START SERVER
// ================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});