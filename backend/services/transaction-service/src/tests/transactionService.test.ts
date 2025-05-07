import mongoose from 'mongoose';
import { createTransaction, getTransactionById, getTransactionsByProjectId, getTransactionsByUser Id } from '../services/transactionService';
import Transaction from '../models/transactionModel';
import Project from '../models/projectModel';

const mockProjectId = new mongoose.Types.ObjectId();
const mockUser Id = new mongoose.Types.ObjectId();

beforeAll(async () => {
    // Connect to the in-memory MongoDB instance
    await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
    
    // Create a mock project for testing
    await Project.create({
        _id: mockProjectId,
        name: 'Test Project',
        currentFunding: 0,
    });
});

afterAll(async () => {
    // Clean up and close the database connection
    await Transaction.deleteMany({});
    await Project.deleteMany({});
    await mongoose.connection.close();
});

describe('Transaction Service', () => {
    it('should create a new transaction', async () => {
        const amount = 100;

        const transaction = await createTransaction(mockProjectId.toString(), mockUser Id.toString(), amount);

        expect(transaction).toHaveProperty('_id');
        expect(transaction.amount).toBe(amount);
        expect(transaction.projectId.toString()).toBe(mockProjectId.toString());
        expect(transaction.userId.toString()).toBe(mockUser Id.toString());

        const updatedProject = await Project.findById(mockProjectId);
        expect(updatedProject.currentFunding).toBe(amount);
    });

    it('should retrieve a transaction by ID', async () => {
        const amount = 50;
        const transaction = await createTransaction(mockProjectId.toString(), mockUser Id.toString(), amount);

        const retrievedTransaction = await getTransactionById(transaction._id.toString());
        expect(retrievedTransaction).toEqual(expect.objectContaining({
            _id: transaction._id,
            amount: amount,
            projectId: mockProjectId,
            userId: mockUser Id,
        }));
    });

    it('should retrieve all transactions for a specific project', async () => {
        const amount1 = 150;
        const amount2 = 200;

        await createTransaction(mockProjectId.toString(), mockUser Id.toString(), amount1);
        await createTransaction(mockProjectId.toString(), mockUser Id.toString(), amount2);

        const transactions = await getTransactionsByProjectId(mockProjectId.toString());
        expect(transactions.length).toBe(2);
    });

    it('should retrieve all transactions for a specific user', async () => {
        const amount1 = 75;
        const amount2 = 125;

        await createTransaction(mockProjectId.toString(), mockUser Id.toString(), amount1);
        await createTransaction(mockProjectId.toString(), new mongoose.Types.ObjectId().toString(), amount2); // Different user

        const userTransactions = await getTransactionsByUser Id(mockUser Id.toString());
        expect(userTransactions.length).toBe(1);
        expect(userTransactions[0].amount).toBe(amount1);
    });

    it('should throw an error when trying to retrieve a non-existent transaction', async () => {
        await expect(getTransactionById(new mongoose.Types.ObjectId().toString())).rejects.toThrow('Transaction not found');
    });
});
