import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the analytics data
export interface IAnalytics extends Document {
    userId: mongoose.Types.ObjectId; // Reference to the user
    projectId: mongoose.Types.ObjectId; // Reference to the project
    action: 'CREATE' | 'UPDATE' | 'DELETE' | 'VIEW'; // Action performed by the user
    timestamp: Date; // When the action occurred
    metadata?: Record<string, any>; // Additional data related to the action
}

// Create the schema for the analytics data
const analyticsSchema: Schema<IAnalytics> = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User ', // Reference to the User model
        index: true, // Index for faster queries
    },
    projectId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Project', // Reference to the Project model
        index: true, // Index for faster queries
    },
    action: {
        type: String,
        required: true,
        enum: ['CREATE', 'UPDATE', 'DELETE', 'VIEW'], // Define allowed actions
    },
    timestamp: {
        type: Date,
        default: Date.now, // Default to the current date
        index: true, // Index for faster queries
    },
    metadata: {
        type: Object,
        default: {}, // Default to an empty object
    },
});

// Create a method to log an action
analyticsSchema.statics.logAction = async function (
    userId: mongoose.Types.ObjectId,
    projectId: mongoose.Types.ObjectId,
    action: 'CREATE' | 'UPDATE' | 'DELETE' | 'VIEW',
    metadata?: Record<string, any>
): Promise<IAnalytics> {
    const analyticsEntry = new this({
        userId,
        projectId,
        action,
        metadata,
    });
    return await analyticsEntry.save();
};

// Create a method to retrieve analytics by user and project
analyticsSchema.statics.getAnalyticsByUser AndProject = async function (
    userId: mongoose.Types.ObjectId,
    projectId: mongoose.Types.ObjectId,
    limit: number = 100,
    skip: number = 0
): Promise<IAnalytics[]> {
    return await this.find({ userId, projectId })
        .sort({ timestamp: -1 }) // Sort by timestamp in descending order
        .limit(limit) // Limit the number of results
        .skip(skip); // Skip a number of results for pagination
};

// Create a method to retrieve analytics by action type
analyticsSchema.statics.getAnalyticsByAction = async function (
    action: 'CREATE' | 'UPDATE' | 'DELETE' | 'VIEW',
    limit: number = 100,
    skip: number = 0
): Promise<IAnalytics[]> {
    return await this.find({ action })
        .sort({ timestamp: -1 }) // Sort by timestamp in descending order
        .limit(limit) // Limit the number of results
        .skip(skip); // Skip a number of results for pagination
};

// Create the model
const Analytics = mongoose.model<IAnalytics>('Analytics', analyticsSchema);

export default Analytics;
