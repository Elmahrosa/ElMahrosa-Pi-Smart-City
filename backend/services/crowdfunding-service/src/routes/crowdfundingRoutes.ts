import express from 'express';
import { body, param } from 'express-validator';
import { createProject, getProject, contributeToProject, getAllProjects } from '../controllers/crowdfundingController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

// Route to create a new crowdfunding project
router.post(
    '/projects',
    authenticate, // Middleware to check if the user is authenticated
    [
        body('title').notEmpty().withMessage('Title is required').isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
        body('description').notEmpty().withMessage('Description is required').isLength({ max: 1000 }).withMessage('Description cannot exceed 1000 characters'),
        body('fundingGoal').isNumeric().withMessage('Funding goal must be a number').isFloat({ gt: 0 }).withMessage('Funding goal must be greater than 0'),
        body('deadline').isISO8601().withMessage('Deadline must be a valid date').custom(value => {
            if (new Date(value) <= new Date()) {
                throw new Error('Deadline must be a future date');
            }
            return true;
        })
    ],
    createProject
);

// Route to get a specific project by ID
router.get('/projects/:id', 
    param('id').isMongoId().withMessage('Invalid project ID'),
    getProject
);

// Route to contribute to a crowdfunding project
router.post(
    '/projects/:id/contribute',
    authenticate, // Middleware to check if the user is authenticated
    [
        param('id').isMongoId().withMessage('Invalid project ID'),
        body('amount').isNumeric().withMessage('Contribution amount must be a number').isFloat({ gt: 0 }).withMessage('Contribution amount must be greater than 0')
    ],
    contributeToProject
);

// Route to get all crowdfunding projects
router.get('/projects', getAllProjects);

export default router;
