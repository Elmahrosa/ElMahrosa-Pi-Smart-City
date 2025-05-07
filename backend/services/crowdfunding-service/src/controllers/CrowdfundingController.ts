import { Request, Response } from 'express';
import { CrowdfundingService } from '../services/crowdfundingService';
import logger from '../utils/logger';

class CrowdfundingController {
    private crowdfundingService: CrowdfundingService;

    constructor() {
        this.crowdfundingService = new CrowdfundingService();
    }

    public async createProject(req: Request, res: Response): Promise<void> {
        try {
            const projectData = req.body;
            // Validate project data
            this.validateProjectData(projectData);
            const project = await this.crowdfundingService.createProject(projectData);
            logger.info(`Project created: ${project.title}`);
            res.status(201).json(project);
        } catch (error) {
            logger.error(`Error creating project: ${error.message}`);
            res.status(400).json({ message: error.message });
        }
    }

    public async getProjects(req: Request, res: Response): Promise<void> {
        try {
            const projects = await this.crowdfundingService.getProjects();
            logger.info(`Retrieved ${projects.length} projects`);
            res.status(200).json(projects);
        } catch (error) {
            logger.error(`Error retrieving projects: ${error.message}`);
            res.status(500).json({ message: error.message });
        }
    }

    public async contributeToProject(req: Request, res: Response): Promise<void> {
        try {
            const { projectId, amount } = req.body;
            const contribution = await this.crowdfundingService.contributeToProject(projectId, amount);
            logger.info(`User  contributed ${amount} to project ID: ${projectId}`);
            res.status(200).json(contribution);
        } catch (error) {
            logger.error(`Error contributing to project: ${error.message}`);
            res.status(400).json({ message: error.message });
        }
    }

    public async updateProjectStatus(req: Request, res: Response): Promise<void> {
        try {
            const { projectId, status } = req.body;
            const updatedProject = await this.crowdfundingService.updateProjectStatus(projectId, status);
            logger.info(`Project ID: ${projectId} status updated to: ${status}`);
            res.status(200).json(updatedProject);
        } catch (error) {
            logger.error(`Error updating project status: ${error.message}`);
            res.status(400).json({ message: error.message });
        }
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

export default new CrowdfundingController();
