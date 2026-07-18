import express from 'express';
 import { 
    registerUser, 
    loginUser, 
    updateUserProfile, 
    googleLogin, 
    forgotPassword, 
    resetPassword, 
    getUserProfile,
    completeGoogleSignup // ADD THIS IMPORT
} from '../controllers/authcontroller.js';
const router = express.Router();

// AUTHENTICATION ROUTES
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/update-profile', updateUserProfile);

// GOOGLE AUTH
router.post('/google', googleLogin);
router.post('/complete-google-signup', completeGoogleSignup); // ADD THIS ROUTE

// PASSWORD RESET ROUTES
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/profile/:id', getUserProfile);
export default router;