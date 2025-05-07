import UserModel from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import logger from '../utils/logger';

class AuthService {
    public async register(userData: any) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const verificationToken = crypto.randomBytes(32).toString('hex');
        
        const user = new UserModel({
            ...userData,
            password: hashedPassword,
            verificationToken,
            isVerified: false,
        });

        await user.save();
        logger.info(`User  registered: ${user.email}`);
        return user;
    }

    public async login(userData: any) {
        const user = await UserModel.findOne({ email: userData.email });
        if (!user) {
            logger.warn(`Login attempt failed: User not found for email ${userData.email}`);
            throw new Error('Invalid credentials');
        }

        if (!user.isVerified) {
            logger.warn(`Login attempt failed: Email not verified for ${userData.email}`);
            throw new Error('Email not verified');
        }

        const isPasswordValid = await bcrypt.compare(userData.password, user.password);
        if (!isPasswordValid) {
            logger.warn(`Login attempt failed: Invalid password for ${userData.email}`);
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        logger.info(`User  logged in: ${user.email}`);
        return token;
    }

    public async verifyEmail(token: string) {
        const user = await UserModel.findOne({ verificationToken: token });
        if (!user) {
            throw new Error('Invalid verification token');
        }

        user.isVerified = true;
        user.verificationToken = undefined; // Clear the token after verification
        await user.save();
        logger.info(`Email verified for user: ${user.email}`);
        return user;
    }

    public async generateResetToken(email: string) {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new Error('User  not found');
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
        await user.save();
        logger.info(`Password reset token generated for user: ${user.email}`);
        return resetToken;
    }

    public async resetPassword(token: string, newPassword: string) {
        const user = await UserModel.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });
        if (!user) {
            throw new Error('Invalid or expired reset token');
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetToken = undefined; // Clear the reset token
        user.resetTokenExpiry = undefined; // Clear the expiry
        await user.save();
        logger.info(`Password reset for user: ${user.email}`);
    }
}

export default AuthService;
