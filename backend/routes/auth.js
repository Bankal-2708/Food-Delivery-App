const express = require('express');
const router = express.Router();
const User = require('../models/User');
const crypto = require('crypto');
 
 
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // it generate a temporary token
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // it direclty return token to frntend for testing 
    res.json({ message: 'Email verified', resetToken: token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
 