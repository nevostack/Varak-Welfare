// middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    user?: { userId: string; email: string; phone: string };
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            userId: string;
            email: string;
            phone: string;
        };

        req.user = decoded; // now available in any route
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};
