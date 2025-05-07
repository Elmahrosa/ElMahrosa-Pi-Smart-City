import ProjectModel from '../models/projectModel';
import UserModel from '../models/userModel';
import logger from '../utils/logger';

class CrowdfundingService {
    public async createProject(userId: string, projectData: any) {
        // Validate user role
        const user = await UserModel.findById(userId);
        if (!user || user.role !== 'admin') {
            throw new Error('Unauthorized: Only admins can create projects.');
        }

        // Validate project data
        this.validateProjectData(projectData);

        const project = new ProjectModel({
            ...projectData,
            creator: userId,
            contributions: [],
            status: 'active', // Default status
            createdAt: new Date(),
        });

        await project.save();
        logger.info(`Project created: ${project.title} by user: ${user.email}`);
        return project;
    }

    public async getProjects() {
        const projects = await ProjectModel.find().populate('creator', 'email');
        logger.info(`Retrieved ${projects.length} projects`);
        return projects;
    }

    public async contributeToProject(userId: string, projectId: string, amount: number) {
        const project = await ProjectModel.findById(projectId);
        if (!project) {
            throw new Error('Project not found');
        }

        if (project.status !== 'active') {
            throw new Error('Cannot contribute to a project that is not active');
        }

        // Update project contributions
        project.contributions.push({ user: userId, amount });
        project.amountRaised += amount;

        // Check if the project goal has been reached
        if (project.amountRaised >= project.goal) {
            project.status = 'funded'; // Update status if goal is reached
        }

        await project.save();
        logger.info(`User  ${userId} contributed ${amount} to project: ${project.title}`);
        return { projectId, amount, totalRaised: project.amountRaised };
    }

    public async updateProjectStatus(userId: string, projectId: string, status: string) {
        const project = await ProjectModel.findById(projectId);
        if (!project) {
            throw new Error('Project not found');
        }

        // Validate user role
        const user = await UserModel.findById(userId);
        if (!user || user.role !== 'admin') {
            throw new Error('Unauthorized: Only admins can update project status.');
        }

        project.status = status;
        await project.save();
        logger.info(`Project ID: ${projectId} status updated to: ${status}`);
        return project;
    }

    private validateProjectData(projectData: any) {
        if (!projectData.title || !projectData.description || !projectData.goal) {
            throw new Error('Title, description, and goal are required fields.');
        }
        if (projectData.goal <= 0) {
            throw new Error('Goal must be a positive number.');
        }
    }
}

export default CrowdfundingService;
