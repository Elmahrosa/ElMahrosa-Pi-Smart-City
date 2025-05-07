import express from 'express';
import { body, param } from 'express-validator';
import {
    createTransaction,
    getTransactionById,
    getTransactionsByProjectId,
    getTransactionsByUser Id, // Fixed typo in import
} from '../controllers/transactionController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

// Validation middleware for creating a transaction
const transactionValidation = [
    body('projectId')
        .isMongoId()
        .withMessage('Invalid project ID'),
    body('userId')
        .isMongoId()
        .withMessage('Invalid user ID'),
    body('amount')
        .isFloat({ gt: 0 })
        .withMessage('Amount must be a positive number'),
];

// Route to create a new transaction
router.post('/', authenticate, transactionValidation, createTransaction);

// Route to get a transaction by ID
router.get('/:id', 
    param('id')
        .isMongoId()
        .withMessage('Invalid transaction ID'), 
    getTransactionById
);

// Route to get all transactions for a specific project
router.get('/project/:projectId', 
    param('projectId')
        .isMongoId()
        .withMessage('Invalid project ID'), 
    getTransactionsByProjectId
);

// Route to get all transactions for a specific user
router.get('/user/:userId', 
    param('userId')
        .isMongoId()
        .withMessage('Invalid user ID'), 
    getTransactionsByUser Id // Fixed typo in function call
);

export default router;
