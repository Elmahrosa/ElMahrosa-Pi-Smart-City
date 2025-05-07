import mongoose, { Document, Schema } from 'mongoose';

interface IContribution {
    user: mongoose.Types.ObjectId;
    amount: number;
}

interface IUser extends Document {
    email: string;
    password: string;
    role: 'user' | 'admin'; // Define user roles
    isVerified: boolean;
    verificationToken?: string;
    resetToken?: string;
    resetTokenExpiry?: Date;
    contributions: IContribution[]; // Track contributions made by the user
}

const ContributionSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User ', required: true },
    amount: { type: Number, required: true },
});

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
    contributions: [ContributionSchema], // Array of contributions
}, { timestamps: true });

const UserModel = mongoose.model<IUser >('User ', UserSchema);

export default UserModel;
