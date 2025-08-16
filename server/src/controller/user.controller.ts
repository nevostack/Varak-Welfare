import { db } from "../lib/db";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { CreateUserInput, UpdateUserInput, LoginInput } from "../types";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import otpStore from "../lib/otpStore";

dotenv.config();

// Register User
export const createUser = async (req: Request, res: Response) => {
    const { user_name, user_email, user_password, user_mobile }: CreateUserInput = req.body;

    try {
        // Basic validation
        if (!user_name || !user_email || !user_password || !user_mobile) {
            return res.status(400).json({
                status: 400,
                message: "All fields are required",
            });
        }

        // Check if email already exists
        const emailExist = await db.user.findUnique({
            where: { user_email },
        });

        if (emailExist) {
            return res.status(409).json({
                status: 409,
                message: "Email already exists",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(user_password, 10);

        // Save new user
        const userSaved = await db.user.create({
            data: {
                user_name,
                user_email,
                user_password: hashedPassword,
                user_mobile,
            },
        });

        return res.status(201).json({
            status: 201,
            message: "User created successfully",
            data: {
                id: userSaved.user_id,
                user_name: userSaved.user_name,
                user_email: userSaved.user_email,
                user_mobile: userSaved.user_mobile,
            }, // Do not send password
        });

    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            status: 500,
            message: "An internal server error occurred",
        });
    }
};

// Get User By ID
export const getUser = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
            authHeader
        })
    }

    try {
        const token = authHeader.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
        res.status(200).json({
            status: true,
            message: "User Found",
            data : decoded
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: error,
            message: "Error Finding User"
        })
    }
}

// Delete User
export const deleteUser = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        // Decode JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

        // Check if user exists
        const userExists = await db.user.findUnique({
            where: { user_id: decoded.userId }
        });

        if (!userExists) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Delete user
        await db.user.delete({
            where: { user_id: decoded.userId }
        });

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });

    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
            error
        });
    }
};


// Update User
export const updateUser = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

        const userExists = await db.user.findUnique({
            where: { user_id: decoded.userId }
        });

        if (!userExists) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const updatedUser = await db.user.update({
            where: { user_id: decoded.userId },
            data: req.body
        });

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser
        });

    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
            error
        });
    }
};


// Login User
export const login = async (req: Request, res: Response) => {
    const { user_email, user_mobile, user_password, otp } = req.body;

    try {
        // Find user by email or mobile
        const user = await db.user.findFirst({
            where: {
                OR: [
                    { user_email },
                    { user_mobile }
                ]
            }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        // If password is provided, check password
        if (user_password) {
            const isMatch = await bcrypt.compare(user_password, user.user_password);
            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid Password"
                });
            }
        }
        // If OTP is provided, check OTP from otpStore
        else if (otp) {
            const identifier = user_email || user_mobile;
            if (!identifier || otpStore[identifier] !== otp) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid OTP"
                });
            }
            // OTP is valid, remove it from store
            delete otpStore[identifier];
        }
        // If neither password nor OTP, reject
        else {
            return res.status(400).json({
                success: false,
                message: "Password or OTP required"
            });
        }

        // Generate JWT
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }

        const token = jwt.sign(
            { userId: user.user_id, email: user.user_email, phone: user.user_mobile },
            secret,
        );

        res.status(200).json({
            success: true,
            message: "Login Successful",
            jwt: token,
            user: {
                user_id: user.user_id,
                user_name: user.user_name,
                user_email: user.user_email,
                user_mobile: user.user_mobile,
            }
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Cannot Login User"
        });
    }
}

// Logout User
export const logout = async(req: Request, res: Response)=>{
    const authToken = req.headers.authorization
    if(!authToken || !authToken.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }

    try {
        res.status(200).json({
            success: true,
            message: "Logout Successful"
        })
    } catch(error: any) {
        res.status(500).json({
            success: false,
            message: "Cannot Logout User"
        })
    }
}

export const requestOTP = async (emailOrMobile: string) => {
  return fetch('/user/request-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ emailOrMobile }),
  }).then(res => res.json());
};

export const verifyOTP = async (emailOrMobile: string, otp: string) => {
  return fetch('/user/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ emailOrMobile, otp }),
  }).then(res => res.json());
};
