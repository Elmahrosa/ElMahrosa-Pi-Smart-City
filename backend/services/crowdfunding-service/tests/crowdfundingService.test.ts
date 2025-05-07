import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app'; // Import your Express app
import Project from '../src/models/projectModel';
import User from '../src/models/userModel'; // Assuming you have a User model for authentication

// Mock user data
const mockUser  = {
    email: 'testuser@example.com',
    password: 'Password123',
};

// Mock project data
const mockProject = {
    title: 'Test Project',
    description: 'This is a test project for crowdfunding.',
    fundingGoal: 1000,
    deadline: new Date(Date.now() + 86400000).toISOString(), // 1 day from now
};

beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/elmahrosa-test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // Create a test user
    await User.create(mockUser );
});

afterAll(async () => {
    // Clean up the database and close the connection
    await User.deleteMany({});
    await Project.deleteMany({});
    await mongoose.connection.close();
});

describe('Crowdfunding Service', () => {
    let token: string;

    beforeAll(async () => {
        // Log in the user to get a JWT token
        const response = await request(app)
            .post('/api/auth/login')
            .send({ email: mockUser .email, password: mockUser .password });
        token = response.body.token; // Assuming the token is returned in the response body
    });

    describe('POST /api/projects', () => {
        it('should create a new project', async () => {
            const response = await request(app)
                .post('/api/projects')
                .set('Authorization', `Bearer ${token}`)
                .send(mockProject);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('title', mockProject.title);
            expect(response.body).toHaveProperty('description', mockProject.description);
            expect(response.body).toHaveProperty('fundingGoal', mockProject.fundingGoal);
            expect(response.body).toHaveProperty('currentFunding', 0);
            expect(response.body).toHaveProperty('isActive', true);
        });

        it('should return validation error for missing title', async () => {
            const response = await request(app)
                .post('/api/projects')
                .set('Authorization', `Bearer ${token}`)
                .send({ ...mockProject, title: '' });

            expect(response.status).toBe(400);
            expect(response.body.errors).toContainEqual(expect.objectContaining({
                msg: 'Title is required',
                param: 'title',
            }));
        });
    });

    describe('GET /api/projects/:id', () => {
        let projectId: string;

        beforeAll(async () => {
            const project = await Project.create(mockProject);
            projectId = project._id.toString();
        });

        it('should retrieve a project by ID', async () => {
            const response = await request(app)
                .get(`/api/projects/${projectId}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('title', mockProject.title);
        });

        it('should return 404 for invalid project ID', async () => {
            const response = await request(app)
                .get('/api/projects/invalidId');

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('message', 'Project not found');
        });
    });

    describe('POST /api/projects/:id/contribute', () => {
        let projectId: string;

        beforeAll(async () => {
            const project = await Project.create(mockProject);
            projectId = project._id.toString();
        });

        it('should contribute to a project', async () => {
            const response = await request(app)
                .post(`/api/projects/${projectId}/contribute`)
                .set('Authorization', `Bearer ${token}`)
                .send({ amount: 500 });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('currentFunding', 500);
        });

        it('should return validation error for invalid contribution amount', async () => {
            const response = await request(app)
                .post(`/api/projects/${projectId}/contribute`)
                .set('Authorization', `Bearer ${token}`)
                .send({ amount:
