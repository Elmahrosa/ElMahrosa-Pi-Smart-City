import mongoose, { Document, Schema } from 'mongoose';

// Define the Project interface
export interface IProject extends Document {
    title: string;
    description: string;
    owner: mongoose.Types.ObjectId; // Reference to the User model
    fundingGoal: number;
    currentFunding: number;
    deadline: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    contributors: mongoose.Types.ObjectId[]; // Array of User IDs who contributed
    addContributor(userId: mongoose.Types.ObjectId, amount: number): Promise<void>;
    isFullyFunded(): boolean;
}

// Define the Project schema
const ProjectSchema: Schema = new Schema({
    title: {
        type: String,
        required: [true, 'Project title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Project description is required'],
        trim: true,
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User ' // Reference to the User model
    },
    fundingGoal: {
        type: Number,
        required: [true, 'Funding goal is required'],
        min: [0, 'Funding goal must be a positive number']
    },
    currentFunding: {
        type: Number,
        default: 0,
        min: [0, 'Current funding cannot be negative']
    },
    deadline: {
        type: Date,
        required: [true, 'Project deadline is required'],
        validate: {
            validator: function(value: Date) {
                return value > new Date(); // Deadline must be in the future
            },
            message: 'Deadline must be a future date'
        }
    },
    isActive: {
        type: Boolean,
        default: true
    },
    contributors: [{
        type: mongoose.Types.ObjectId,
        ref: 'User ' // Reference to the User model
    }],
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

// Instance method to add a contributor
ProjectSchema.methods.addContributor = async function(userId: mongoose.Types.ObjectId, amount: number): Promise<void> {
    if (amount <= 0) {
        throw new Error('Contribution amount must be positive');
    }
    this.currentFunding += amount;
    this.contributors.push(userId);
    await this.save();
};

// Instance method to check if the project is fully funded
ProjectSchema.methods.isFullyFunded = function(): boolean {
    return this.currentFunding >= this.fundingGoal;
};

// Create the Project model
const Project = mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
