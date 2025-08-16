import { Router } from 'express';
import * as userController from '../controller/user.controller'
import nodemailer from 'nodemailer';
import otpStore from '../lib/otpStore';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

// Generate and send OTP
router.post('/request-otp', async (req, res) => {
  const { user_email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[user_email] = otp;

  try {
    await transporter.sendMail({
      from: 'tanvi.yeole3@gmail.com',
      to: user_email, 
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`,
    });
    res.json({ success: true, message: 'OTP sent to email' });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

// Verify OTP
router.post('/verify-otp', (req, res) => {
  const { user_email, otp } = req.body;
  if (otpStore[user_email] === otp) {
    // delete otpStore[user_email];
    res.json({ success: true, user: { user_email } });
  } else {
    res.status(400).json({ success: false, message: 'Invalid OTP' });
  }
});

router.post("/login", userController.login)
router.post("/logout", userController.logout)

router.post('/register', userController.createUser);
router.put("/update", userController.updateUser)
router.delete("/delete", userController.deleteUser)
router.get("/profile", userController.getUser)

export default router;