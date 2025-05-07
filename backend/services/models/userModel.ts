import User, { IUser } from './models/userModel';

// Create a new user
const createUser  = async (username: string, email: string, password: string) => {
    const user = new User({ username, email, password });
    await user.save();
    return user;
};

// Authenticate user
const authenticateUser  = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
        throw new Error('Invalid credentials');
    }
    const token = user.generateAuthToken();
    return { user, token };
};
