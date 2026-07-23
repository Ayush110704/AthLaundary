


import nodemailer from 'nodemailer';
import axios from 'axios';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js'; // Added .js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// REGISTER USER
 // REGISTER USER
export const registerUser = async (req, res) => {
    try {
        // Updated: Added firstName, lastName, and address to match your form
        const { firstName, lastName, email, password, phone, address } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: 'User already exists with this email' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Updated: Mapping these fields to your database model
        user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            address: address || 'Not specified' // Fallback if no address provided
        });

        await user.save();

        res.status(201).json({
            success: true,
            message: 'User registered successfully!'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error during registration' });
    }
};

// LOGIN USER
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'your_fallback_jwt_secret_key',
            { expiresIn: '1d' }
        );

        // LOGIN USER - Corrected response
res.status(200).json({
    success: true,
    token,
    user: {
        id: user._id,
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || '',
        address: user.address || 'Not specified',
        dob: user.dob || '',
        createdAt: user.createdAt
    }
}); 

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error during login' });
    }
};

// UPDATE USER PROFILE
 // UPDATE USER PROFILE - Corrected logic
 export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user?.id || req.body.userId;
        const { firstName, lastName, phone, email, address, dob } = req.body;

        const updateData = {};
        if (firstName) updateData.firstName = firstName;
        if (lastName) updateData.lastName = lastName;
        if (phone) updateData.phone = phone;
        if (email) updateData.email = email;
        if (address) updateData.address = address;
        if (dob) updateData.dob = dob;

        const updatedUser = await User.findByIdAndUpdate(userId, { $set: updateData }, { new: true });
        
        res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};






// Replace these with your actual strings from Google Cloud Consol

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error("Forgot password error: EMAIL_USER or EMAIL_PASS is missing in environment variables");
            return res.status(500).json({ success: false, message: "Email service is not configured on server" });
        }

        const user = await User.findOne({ email: email.trim() });
        if (!user) return res.status(404).json({ success: false, message: "User not found with this email address" });

        // Generate a reset token valid for 15 minutes
        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

        const clientUrl = process.env.CLIENT_URL || req.headers.origin || 'https://ath-laundary.vercel.app';
        const resetUrl = `${clientUrl.replace(/\/+$/, '')}/reset-password/${resetToken}`;

        const senderEmail = process.env.EMAIL_USER ? process.env.EMAIL_USER.trim() : "athlaundry@gmail.com";
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                <h2 style="color: #1e3a8a;">Reset Your Password</h2>
                <p>You requested a password reset for your AthLaundry account.</p>
                <p>Click the button below to set a new password. This link is valid for 15 minutes:</p>
                <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #1e3a8a; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 15px 0;">Reset Password</a>
                <p style="color: #666; font-size: 12px;">If you didn't request this, you can safely ignore this email.</p>
            </div>
        `;

        // If BREVO_API_KEY is present, send via Brevo HTTP API (Port 443 - HTTPS)
        if (process.env.BREVO_API_KEY) {
            console.log("Sending email via Brevo HTTP API...");
            await axios.post(
                'https://api.brevo.com/v3/smtp/email',
                {
                    sender: { name: "AthLaundry", email: senderEmail },
                    to: [{ email: user.email }],
                    subject: 'Password Reset - AthLaundry',
                    htmlContent: htmlContent
                },
                {
                    headers: {
                        'api-key': process.env.BREVO_API_KEY.trim(),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );
            return res.status(200).json({ success: true, message: "Reset link sent to email via Brevo" });
        }

        // Fallback to Nodemailer if BREVO_API_KEY is not set
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error("Forgot password error: Neither BREVO_API_KEY nor EMAIL_USER/EMAIL_PASS configured");
            return res.status(500).json({ success: false, message: "Email service is not configured on server" });
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: { 
                user: process.env.EMAIL_USER.trim(), 
                pass: process.env.EMAIL_PASS.trim() 
            },
            family: 4
        });

        const mailOptions = {
            from: `"AthLaundry" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: 'Password Reset - AthLaundry',
            text: `Click here to reset your password: ${resetUrl}`,
            html: htmlContent
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Reset link sent to email" });
    } catch (error) {
        console.error("Forgot password error:", error.response?.data || error.message);
        const errMsg = error.response?.data?.message || error.message || "Error sending email";
        res.status(500).json({ success: false, message: errMsg });
    }
};


// 2. RESET PASSWORD
export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        if (!token || !newPassword) {
            return res.status(400).json({ success: false, message: "Token and new password are required" });
        }
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        
        // Update user
        await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });
        
        res.status(200).json({ success: true, message: "Password updated successfully!" });
    } catch (error) {
        console.error("Reset password error:", error);
        res.status(400).json({ success: false, message: error.message || "Invalid or expired token." });
    }
};


// GET USER PROFILE BY ID
export const getUserProfile = async (req, res) => {
    try {
        // Assuming you have auth middleware that adds req.user
        const userId = req.user?.id || req.params.id; 
        const user = await User.findById(userId).select('-password');
        
        if (!user) return res.status(404).json({ message: "User not found" });
        
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId: userId }).sort({ createdAt: -1 });

        // If no orders are found, return empty array instead of failing
        if (!orders || orders.length === 0) {
            return res.status(200).json([]);
        }

        const formattedOrders = orders.map(order => ({
            orderNo: order._id ? order._id.toString() : "N/A",
            status: order.status || "Pending",
            date: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A",
            customer: { name: order.customerName || "N/A", mobile: order.phone || "N/A" },
            items: (order.items || []).map(item => ({
                name: item.clothType || "Item",
                category: item.serviceType || "Service",
                quantity: item.quantity || 0,
                price: item.price || 0
            })),
            summary: {
                grandTotal: order.totalAmount || 0,
                subtotal: order.totalAmount || 0
            },
            statusColor: order.status === 'Pending' ? 'bg-yellow-100' : 'bg-green-100'
        }));

        res.status(200).json(formattedOrders);
    } catch (error) {
        console.error("Order Fetch Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


 export const googleLogin = async (req, res) => {
    try {
        const { token } = req.body;
        const ticket = await client.verifyIdToken({ 
            idToken: token, 
            audience: process.env.GOOGLE_CLIENT_ID 
        });
        const payload = ticket.getPayload();
        
        // 1. Ensure clean, lowercase email for lookup
        const email = payload.email.toLowerCase().trim();
        console.log("Searching database for:", email); // Check this in your terminal!

        let user = await User.findOne({ email: email });

        if (user) {
            console.log("User found, logging in...");
            const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            return res.status(200).json({ success: true, user, token: jwtToken });
        } else {
            console.log("User NOT found, triggering registration...");
            return res.status(202).json({ 
                success: false, 
                requiresPhone: true, 
                email: email, 
                firstName: payload.given_name, 
                lastName: payload.family_name 
            });
        }
    } catch (error) {
        console.error("Google Auth Error:", error);
        return res.status(401).json({ success: false, message: "Google Auth Failed" });
    }
};

// 2. COMPLETE GOOGLE SIGNUP
 // 2. COMPLETE GOOGLE SIGNUP
export const completeGoogleSignup = async (req, res) => {
    const { email, firstName, lastName, phone } = req.body;
    try {
        // Adding a default password or handling it as per your schema requirements
        const newUser = new User({ 
            email, 
            firstName, 
            lastName, 
            phone,
            password: await bcrypt.hash(Math.random().toString(36), 10) // Random secure string
        });
        
        await newUser.save();
        
        const jwtToken = jwt.sign(
            { id: newUser._id, role: newUser.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );
        
        res.status(201).json({ 
            success: true, 
            user: {
                id: newUser._id,
                _id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                phone: newUser.phone,
                address: newUser.address || 'Not specified'
            }, 
            token: jwtToken 
        });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(400).json({ success: false, message: "Failed to create user" });
    }
};