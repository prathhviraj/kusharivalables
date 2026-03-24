/**
 * @fileoverview Authentication & User Routes.
 * Defines the endpoints for user registration, login (including OAuth),
 * password reset procedures, and wishlist management.
 * 
 * @author Kusharivalables Development Team
 * @copyright Copyright (c) 2026 Kusharivalables. All rights reserved.
 * @module Routes/Auth
 */
const express = require('express');
const router = express.Router();
const {
  register,
  login,
  googleLogin,
  forgotPassword,
  resetPassword,
  getMe,
  getAllUsers,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  updateProfile,
} = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleLogin);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.get('/users', protect, admin, getAllUsers);

// Wishlist
router.post('/wishlist/:productId', protect, addToWishlist);
router.delete('/wishlist/:productId', protect, removeFromWishlist);
router.get('/wishlist', protect, getWishlist);

module.exports = router;
