import { Request, Response } from 'express';
import Transaction from '../models/transactionModel';
import Project from '../models/projectModel';
import { validationResult } from 'express-validator';

// Create a new transaction
export const createTransaction = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { projectId, userId, amount } = req.body;

    try {
        // Find the project to ensure it exists
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Create a new transaction
        const transaction = new Transaction({
            projectId,
            userId,
            amount,
            createdAt: new Date(),
        });

        // Save the transaction to the database
        await transaction.save();

        // Update the project's funding
        project.currentFunding += amount;
        await project.save();

        return res.status(201).json(transaction);
    } catch (error) {
        console.error('Error creating transaction:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Get transaction details by ID
export const getTransactionById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const transaction = await Transaction.findById(id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        return res.status(200).json(transaction);
    } catch (error) {
        console.error('Error retrieving transaction:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Get all transactions for a specific project
export const getTransactionsByProjectId = async (req: Request, res: Response) => {
    const { projectId } = req.params;

    try {
        const transactions = await Transaction.find({ projectId });
        return res.status(200).json(transactions);
    } catch (error) {
        console.error('Error retrieving transactions:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Get all transactions for a specific user
export const getTransactionsByUser Id = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const transactions = await Transaction.find({ userId });
        return res.status(200).json(transactions);
    } catch (error) {
        console.error('Error retrieving user transactions:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
