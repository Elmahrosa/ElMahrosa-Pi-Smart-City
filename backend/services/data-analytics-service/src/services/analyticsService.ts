import Analytics, { IAnalytics } from '../models/analyticsModel';
import mongoose from 'mongoose';
import { Logger } from '../utils/logger'; // Assuming you have a logger utility

class AnalyticsService {
    private logger: Logger;

    constructor() {
        this.logger = new Logger(); // Initialize the logger
    }

    /**
     * Logs a user action for a specific project.
     * @param userId - The ID of the user performing the action.
     * @param projectId - The ID of the project related to the action.
     * @param action - The action performed by the user.
     * @param metadata - Additional data related to the action.
     * @returns The created analytics entry.
     */
    public async logAction(
        userId: mongoose.Types.ObjectId,
        projectId: mongoose.Types.ObjectId,
        action: 'CREATE' | 'UPDATE' | 'DELETE' | 'VIEW',
        metadata?: Record<string, any>
    ): Promise<IAnalytics> {
        try {
            const analyticsEntry = await Analytics.logAction(userId, projectId, action, metadata);
            this.logger.info(`Action logged: ${action} for user ${userId} on project ${projectId}`);
            return analyticsEntry;
        } catch (error) {
            this.logger.error(`Error logging action: ${error.message}`);
            throw new Error(`Error logging action: ${error.message}`);
        }
    }

    /**
     * Logs multiple user actions in a batch.
     * @param actions - An array of action objects to log.
     * @returns An array of created analytics entries.
     */
    public async logActionsBatch(actions: {
        userId: mongoose.Types.ObjectId;
        projectId: mongoose.Types.ObjectId;
        action: 'CREATE' | 'UPDATE' | 'DELETE' | 'VIEW';
        metadata?: Record<string, any>;
    }[]): Promise<IAnalytics[]> {
        try {
            const analyticsEntries = await Promise.all(
                actions.map(({ userId, projectId, action, metadata }) =>
                    Analytics.logAction(userId, projectId, action, metadata)
                )
            );
            this.logger.info(`Batch actions logged: ${actions.length} actions`);
            return analyticsEntries;
        } catch (error) {
            this.logger.error(`Error logging batch actions: ${error.message}`);
            throw new Error(`Error logging batch actions: ${error.message}`);
        }
    }

    /**
     * Retrieves analytics entries for a specific user and project.
     * @param userId - The ID of the user.
     * @param projectId - The ID of the project.
     * @param limit - The maximum number of results to return.
     * @param skip - The number of results to skip for pagination.
     * @returns An array of analytics entries.
     */
    public async getAnalyticsByUser AndProject(
        userId: mongoose.Types.ObjectId,
        projectId: mongoose.Types.ObjectId,
        limit: number = 100,
        skip: number = 0
    ): Promise<IAnalytics[]> {
        try {
            const analyticsEntries = await Analytics.getAnalyticsByUser AndProject(userId, projectId, limit, skip);
            this.logger.info(`Retrieved ${analyticsEntries.length} analytics entries for user ${userId} and project ${projectId}`);
            return analyticsEntries;
        } catch (error) {
            this.logger.error(`Error retrieving analytics: ${error.message}`);
            throw new Error(`Error retrieving analytics: ${error.message}`);
        }
    }

    /**
     * Retrieves analytics entries filtered by action type.
     * @param action - The action type to filter by.
     * @param limit - The maximum number of results to return.
     * @param skip - The number of results to skip for pagination.
     * @returns An array of analytics entries.
     */
    public async getAnalyticsByAction(
        action: 'CREATE' | 'UPDATE' | 'DELETE' | 'VIEW',
        limit: number = 100,
        skip: number = 0
    ): Promise<IAnalytics[]> {
        try {
            const analyticsEntries = await Analytics.getAnalyticsByAction(action, limit, skip);
            this.logger.info(`Retrieved ${analyticsEntries.length} analytics entries for action ${action}`);
            return analyticsEntries;
        } catch (error) {
            this.logger.error(`Error retrieving analytics by action: ${error.message}`);
            throw new Error(`Error retrieving analytics by action: ${error.message}`);
        }
    }
}

export default new AnalyticsService();
