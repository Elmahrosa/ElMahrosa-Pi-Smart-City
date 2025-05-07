import Transaction, { ITransaction } from '../models/transactionModel';
import Project from '../models/projectModel';
import { Types } from 'mongoose';
import { Logger } from '../utils/logger'; // Assuming you have a logger utility

// Create a new transaction
export const createTransaction = async (projectId: string, userId: string, amount: number): Promise<ITransaction> => {
    // Validate input types
    if (!Types.ObjectId.isValid(projectId) || !Types.ObjectId.isValid(userId)) {
        Logger.error('Invalid project ID or user ID');
        throw new Error('Invalid project ID or user ID');
    }

    // Check if the project exists
    const project = await Project.findById(projectId);
    if (!project) {
        Logger.error(`Project not found: ${projectId}`);
        throw new Error('Project not found');
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
    Logger.info(`Transaction created: ${transaction._id} for project ${projectId} by user ${userId}`);

    // Update the project's current funding
    project.currentFunding += amount;
    await project.save();
    Logger.info(`Project funding updated: ${projectId}, new funding: ${project.currentFunding}`);

    return transaction;
};

// Get a transaction by ID
export const getTransactionById = async (id: string): Promise<ITransaction | null> => {
    const transaction = await Transaction.findById(id);
    if (!transaction) {
        Logger.error(`Transaction not found: ${id}`);
        throw new Error('Transaction not found');
    }
    Logger.info(`Transaction retrieved: ${id}`);
    return transaction;
};

// Get all transactions for a specific project
export const getTransactionsByProjectId = async (projectId: string): Promise<ITransaction[]> => {
    const transactions = await Transaction.find({ projectId });
    Logger.info(`Transactions retrieved for project: ${projectId}, count: ${transactions.length}`);
    return transactions;
};

// Get all transactions for a specific user
export const getTransactionsByUser Id = async (userId: string): Promise<ITransaction[]> => {
    const transactions = await Transaction.find({ userId });
    Logger.info(`Transactions retrieved for user: ${userId}, count: ${transactions.length}`);
    return transactions;
};
