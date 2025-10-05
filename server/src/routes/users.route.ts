import { Router } from 'express';
import * as userController from '../controller/user.controller';
import nodemailer from 'nodemailer';
import otpStore from '../lib/otpStore';
import dotenv from 'dotenv';
import { db } from '../lib/db';
import passport from "passport";
import "../auth/google"; // Import the strategy
import { generateToken } from "../auth/google";

dotenv.config();

const router = Router();
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
// Google OAuth routes
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    try {
      // Generate JWT token for the authenticated user
      const token = generateToken(req.user);

      // Redirect to frontend with token
      const frontendURL = process.env.FRONTEND_URL;
      res.redirect(`${frontendURL}/auth/callback?token=${token}`);
    } catch (error) {
      console.error("Authentication error:", error);
      res.redirect("/login?error=authentication_failed");
    }
  }
);

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

  try {
    // Check if user exists
    const user = await db.user.findUnique({ where: { user_email } });
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'user_not_found',
        details: 'No account found with this email. Please register first.' 
      });
    }
    
    // Check if user is registered via Google
    if (user.auth_provider === 'google') {
      return res.status(400).json({ 
        success: false, 
        message: "google_account",
        details: "This email is linked to a Google account. Please sign in with Google." 
      });
    }
    
    // User exists with regular account, send OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[user_email] = otp;

    await transporter.sendMail({
      from: process.env.GOOGLE_EMAIL,
      to: user_email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`,
    });
    
    res.json({ success: true, message: 'OTP sent to email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

//GENERATE OTP FOR LOGIN AND FORGET PASSWORD
router.post('/register-request-otp', async (req, res) => {
  const { user_email } = req.body;
  
  try {
    // Check if email already exists in database
    const existingUser = await db.user.findUnique({ 
      where: { user_email } 
    });
    
    if (existingUser) {
      // If user exists and is registered via Google
      if (existingUser.auth_provider === 'google') {
        return res.status(400).json({ 
          success: false, 
          message: "google_account",
          details: "This email is already registered with Google. Please sign in with Google."
        });
      }
      
      // If user exists with regular account
      return res.status(409).json({ 
        success: false, 
        message: "email_exists", 
        details: "An account with this email already exists. Please sign in instead."
      });
    }
    
    // Email doesn't exist, proceed with OTP generation and sending
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[user_email] = otp;
    
    await transporter.sendMail({
      from: process.env.GOOGLE_EMAIL,
      to: user_email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`,
    });
    
    res.json({ success: true, message: 'OTP sent to email' });
  } catch (error) {
    console.error(error);
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
router.get("/me", userController.getUserFromDB)
router.post("/reset-password", userController.resetPassword)
// In your router file
export default router;