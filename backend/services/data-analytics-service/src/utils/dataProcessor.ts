import mongoose from 'mongoose';
import { Logger } from './logger'; // Assuming you have a logger utility

/**
 * Utility class for processing analytics data.
 */
class DataProcessor {
    private logger: Logger;

    constructor() {
        this.logger = new Logger(); // Initialize the logger
    }

    /**
     * Validates if the provided user ID and project ID are valid MongoDB ObjectIDs.
     * @param userId - The user ID to validate.
     * @param projectId - The project ID to validate.
     * @returns True if both IDs are valid, otherwise false.
     */
    public validateIds(userId: string, projectId: string): boolean {
        const isValid = mongoose.Types.ObjectId.isValid(userId) && mongoose.Types.ObjectId.isValid(projectId);
        if (!isValid) {
            this.logger.warn(`Invalid IDs: userId=${userId}, projectId=${projectId}`);
        }
        return isValid;
    }

    /**
     * Transforms metadata by ensuring all keys are in camelCase.
     * @param metadata - The metadata object to transform.
     * @returns A new object with camelCase keys.
     */
    public transformMetadata(metadata: Record<string, any>): Record<string, any> {
        const transformed: Record<string, any> = {};
        for (const key in metadata) {
            if (metadata.hasOwnProperty(key)) {
                const camelCaseKey = this.toCamelCase(key);
                transformed[camelCaseKey] = metadata[key];
            }
        }
        this.logger.info(`Transformed metadata: ${JSON.stringify(transformed)}`);
        return transformed;
    }

    /**
     * Converts a string to camelCase.
     * @param str - The string to convert.
     * @returns The camelCase version of the string.
     */
    private toCamelCase(str: string): string {
        return str
            .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
                index === 0 ? match.toLowerCase() : match.toUpperCase()
            )
            .replace(/\s+/g, '');
    }

    /**
     * Aggregates analytics data by action type.
     * @param analyticsData - An array of analytics entries.
     * @returns An object with action types as keys and counts as values.
     */
    public aggregateByAction(analyticsData: { action: string }[]): Record<string, number> {
        const aggregated = analyticsData.reduce((acc, entry) => {
            acc[entry.action] = (acc[entry.action] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        this.logger.info(`Aggregated data by action: ${JSON.stringify(aggregated)}`);
        return aggregated;
    }

    /**
     * Filters analytics data by a specific date range.
     * @param analyticsData - An array of analytics entries.
     * @param startDate - The start date for filtering.
     * @param endDate - The end date for filtering.
     * @returns An array of filtered analytics entries.
     */
    public filterByDateRange(
        analyticsData: { timestamp: Date }[],
        startDate: Date,
        endDate: Date
    ): { timestamp: Date }[] {
        const filteredData = analyticsData.filter(entry => entry.timestamp >= startDate && entry.timestamp <= endDate);
        this.logger.info(`Filtered data by date range: ${filteredData.length} entries found`);
        return filteredData;
    }

    /**
     * Normalizes analytics data by ensuring consistent formats.
     * @param analyticsData - An array of analytics entries.
     * @returns An array of normalized analytics entries.
     */
    public normalizeData(analyticsData: { action: string; timestamp: Date; metadata?: Record<string, any> }[]): { action: string; timestamp: Date; metadata: Record<string, any> }[] {
        return analyticsData.map(entry => ({
            action: entry.action,
            timestamp: entry.timestamp,
            metadata: entry.metadata || {}, // Ensure metadata is always an object
        }));
    }
}

export default new DataProcessor();
