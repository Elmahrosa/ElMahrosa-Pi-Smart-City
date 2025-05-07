import { Router } from 'express';
import AuthController from '../controllers/authController';
import { body } from 'express-validator'; // For validation middleware

const router = Router();

// Registration route
router.post(
    '/register',
    [
        body('email').isEmail().withMessage('Please enter a valid email address.'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
    ],
    AuthController.register
);

// Login route
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Please enter a valid email address.'),
        body('password').notEmpty().withMessage('Password is required.'),
    ],
    AuthController.login
);

// Email verification route
router.get('/verify/:token', AuthController.verifyEmail);

// Password reset request route
router.post(
    '/reset-password',
    [
        body('email').isEmail().withMessage('Please enter a valid email address.'),
    ],
    AuthController.resetPassword
);

// Password reset route
router.post(
    '/reset/:token',
    [
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
    ],
    AuthController.resetPassword
);

export default router;
