import { body, param, ValidationChain } from 'express-validator';

// Custom validation for user registration
export const validateUser Registration = (): ValidationChain[] => {
    return [
        body('email')
            .isEmail().withMessage('Must be a valid email address')
            .normalizeEmail(),
        body('password')
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
            .matches(/\d/).withMessage('Password must contain a number')
            .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
            .trim(),
        body('confirmPassword')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords do not match');
                }
                return true;
            })
    ];
};

// Custom validation for project creation
export const validateProjectCreation = (): ValidationChain[] => {
    return [
        body('title')
            .notEmpty().withMessage('Title is required')
            .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
        body('description')
            .notEmpty().withMessage('Description is required')
            .isLength({ max: 1000 }).withMessage('Description cannot exceed 1000 characters'),
        body('fundingGoal')
            .isNumeric().withMessage('Funding goal must be a number')
            .isFloat({ gt: 0 }).withMessage('Funding goal must be greater than 0'),
        body('deadline')
            .isISO8601().withMessage('Deadline must be a valid date')
            .custom(value => {
                if (new Date(value) <= new Date()) {
                    throw new Error('Deadline must be a future date');
                }
                return true;
            })
    ];
};

// Custom validation for project contribution
export const validateProjectContribution = (): ValidationChain[] => {
    return [
        param('id')
            .isMongoId().withMessage('Invalid project ID'),
        body('amount')
            .isNumeric().withMessage('Contribution amount must be a number')
            .isFloat({ gt: 0 }).withMessage('Contribution amount must be greater than 0')
    ];
};
