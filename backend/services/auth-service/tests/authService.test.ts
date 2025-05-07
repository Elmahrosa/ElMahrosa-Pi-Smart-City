import request from 'supertest';
import app from '../app'; // Import your Express app
import UserModel from '../models/userModel';
import AuthService from '../services/authService';
import mongoose from 'mongoose';

describe('AuthService', () => {
    beforeAll(async () => {
        // Connect to the test database
        await mongoose.connect(process.env.TEST_MONGODB_URI || 'mongodb://localhost:27017/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        // Clean up and close the database connection
        await UserModel.deleteMany({});
        await mongoose.connection.close();
    });

    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'testuser@example.com',
                password: 'password123',
            });

        expect(response.status).toBe(201);
        expect(response.body.email).toBe('testuser@example.com');
        expect(response.body.isVerified).toBe(false);
    });

    it('should not register a user with an existing email', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({
                email: 'testuser@example.com',
                password: 'password123',
            });

        const response = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'testuser@example.com',
                password: 'password123',
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Email already in use');
    });

    it('should log in a user', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                password: 'password123',
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('should not log in with invalid credentials', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                password: 'wrongpassword',
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid credentials');
    });

    it('should verify email', async () => {
        const user = await UserModel.findOne({ email: 'testuser@example.com' });
        const response = await request(app)
            .get(`/api/auth/verify/${user.verificationToken}`);

        expect(response.status).toBe(200);
        expect(response.body.email).toBe('testuser@example.com');
        expect(response.body.isVerified).toBe(true);
    });

    it('should request a password reset', async () => {
        const response = await request(app)
            .post('/api/auth/reset-password')
            .send({
                email: 'testuser@example.com',
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Password reset token sent');
    });

    it('should reset the password', async () => {
        const user = await UserModel.findOne({ email: 'testuser@example.com' });
        const resetToken = user.resetToken; // Assume this is set during the reset password request

        const response = await request(app)
            .post(`/api/auth/reset/${resetToken}`)
            .send({
                password: 'newpassword123',
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Password reset successfully');
    });
});
