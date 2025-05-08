import mongoose from 'mongoose';
import AnalyticsService from '../src/services/analyticsService';
import Analytics from '../src/models/analyticsModel';

jest.mock('../src/models/analyticsModel'); // Mock the Analytics model

describe('AnalyticsService', () => {
    const userId = new mongoose.Types.ObjectId();
    const projectId = new mongoose.Types.ObjectId();
    const action = 'CREATE';
    const metadata = { info: 'test' };

    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    describe('logAction', () => {
        it('should log an action successfully', async () => {
            const mockEntry = { userId, projectId, action, timestamp: new Date(), metadata };
            (Analytics.logAction as jest.Mock).mockResolvedValue(mockEntry);

            const result = await AnalyticsService.logAction(userId, projectId, action, metadata);

            expect(result).toEqual(mockEntry);
            expect(Analytics.logAction).toHaveBeenCalledWith(userId, projectId, action, metadata);
        });

        it('should throw an error if logging fails', async () => {
            (Analytics.logAction as jest.Mock).mockRejectedValue(new Error('Database error'));

            await expect(AnalyticsService.logAction(userId, projectId, action, metadata)).rejects.toThrow('Error logging action: Database error');
        });
    });

    describe('getAnalyticsByUser AndProject', () => {
        it('should retrieve analytics entries successfully', async () => {
            const mockEntries = [{ userId, projectId, action, timestamp: new Date(), metadata }];
            (Analytics.getAnalyticsByUser AndProject as jest.Mock).mockResolvedValue(mockEntries);

            const result = await AnalyticsService.getAnalyticsByUser AndProject(userId, projectId);

            expect(result).toEqual(mockEntries);
            expect(Analytics.getAnalyticsByUser AndProject).toHaveBeenCalledWith(userId, projectId, 100, 0);
        });

        it('should throw an error if retrieval fails', async () => {
            (Analytics.getAnalyticsByUser AndProject as jest.Mock).mockRejectedValue(new Error('Database error'));

            await expect(AnalyticsService.getAnalyticsByUser AndProject(userId, projectId)).rejects.toThrow('Error retrieving analytics: Database error');
        });
    });

    describe('getAnalyticsByAction', () => {
        it('should retrieve analytics entries by action successfully', async () => {
            const mockEntries = [{ userId, projectId, action, timestamp: new Date(), metadata }];
            (Analytics.getAnalyticsByAction as jest.Mock).mockResolvedValue(mockEntries);

            const result = await AnalyticsService.getAnalyticsByAction(action);

            expect(result).toEqual(mockEntries);
            expect(Analytics.getAnalyticsByAction).toHaveBeenCalledWith(action, 100, 0);
        });

        it('should throw an error if retrieval by action fails', async () => {
            (Analytics.getAnalyticsByAction as jest.Mock).mockRejectedValue(new Error('Database error'));

            await expect(AnalyticsService.getAnalyticsByAction(action)).rejects.toThrow('Error retrieving analytics by action: Database error');
        });
    });
});
