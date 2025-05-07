import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel';
import logger from '../utils/logger';

// Middleware to authenticate JWT tokens
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to the request object
        next();
    } catch (error) {
        logger.error(`Authentication error: ${error.message}`);
        res.status(400).json({ message: 'Invalid token.' });
    }
};

// Middleware to authorize user roles
export const authorize = (roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user?.id; // Get user ID from the request object
        if (!userId) {
            return res.status(403).json({ message: 'Access denied. User not found.' });
        }

        const user = await UserModel.findById(userId);
        if (!user || !roles.includes(user.role)) {
            return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }

        next();
    };
};
