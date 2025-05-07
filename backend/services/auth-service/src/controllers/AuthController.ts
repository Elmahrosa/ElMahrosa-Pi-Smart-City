import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import nodemailer from 'nodemailer';
import logger from '../utils/logger';

class AuthController {
    private authService: AuthService;
    private rateLimiter: RateLimiterMemory;

    constructor() {
        this.authService = new AuthService();
        this.rateLimiter = new RateLimiterMemory({
            points: 5, // 5 requests
            duration: 60, // per 60 seconds
        });
    }

    public async register(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.authService.register(req.body);
            await this.sendVerificationEmail(user.email, user.verificationToken);
            res.status(201).json({ message: 'Registration successful! Please verify your email.' });
        } catch (error) {
            logger.error(`Registration error: ${error.message}`);
            res.status(400).json({ message: error.message });
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        try {
            await this.rateLimiter.consume(req.ip); // Rate limiting
            const token = await this.authService.login(req.body);
            res.status(200).json({ token });
        } catch (error) {
            if (error instanceof Error) {
                logger.error(`Login error: ${error.message}`);
                res.status(401).json({ message: error.message });
            } else {
                res.status(429).json({ message: 'Too many requests, please try again later.' });
            }
        }
    }

    public async verifyEmail(req: Request, res: Response): Promise<void> {
        try {
            const { token } = req.params;
            const user = await this.authService.verifyEmail(token);
            res.status(200).json({ message: 'Email verified successfully!', user });
        } catch (error) {
            logger.error(`Email verification error: ${error.message}`);
            res.status(400).json({ message: error.message });
        }
    }

    public async resetPassword(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.body;
            const resetToken = await this.authService.generateResetToken(email);
            await this.sendResetEmail(email, resetToken);
            res.status(200).json({ message: 'Password reset email sent!' });
        } catch (error) {
            logger.error(`Password reset error: ${error.message}`);
            res.status(400).json({ message: error.message });
        }
    }

    private async sendVerificationEmail(email: string, token: string): Promise<void> {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Email Verification',
            text: `Please verify your email by clicking the link: ${process.env.BASE_URL}/verify/${token}`,
        };

        await transporter.sendMail(mailOptions);
    }

    private async sendResetEmail(email: string, token: string): Promise<void> {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset',
            text: `Reset your password by clicking the link: ${process.env.BASE_URL}/reset/${token}`,
        };

        await transporter.sendMail(mailOptions);
    }
}

export default new AuthController();
