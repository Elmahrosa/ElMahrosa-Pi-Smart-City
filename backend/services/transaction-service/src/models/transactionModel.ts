import mongoose, { Document, Schema } from 'mongoose';

// Define the Transaction interface
export interface ITransaction extends Document {
    projectId: mongoose.Types.ObjectId; // Reference to the associated project
    userId: mongoose.Types.ObjectId; // Reference to the user making the transaction
    amount: number; // Amount contributed
    createdAt: Date; // Timestamp of when the transaction was created
}

// Create the Transaction schema
const transactionSchema: Schema = new Schema({
    projectId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Project ID is required'], // Validation for required field
        ref: 'Project', // Reference to the Project model
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'User  ID is required'], // Validation for required field
        ref: 'User ', // Reference to the User model
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'], // Validation for required field
        min: [0, 'Amount must be a positive number'], // Validation for positive amounts
    },
    createdAt: {
        type: Date,
        default: Date.now, // Default to the current date
    },
});

// Pre-save hook to log transaction creation
transactionSchema.pre<ITransaction>('save', function (next) {
    console.log(`Creating transaction for project ${this.projectId} by user ${this.userId} with amount ${this.amount}`);
    next();
});

// Create the Transaction model
const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);

export default Transaction;
