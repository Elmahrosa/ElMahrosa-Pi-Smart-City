import winston from 'winston';

// Create a logger instance
const logger = winston.createLogger({
    level: 'info', // Default log level
    format: winston.format.combine(
        winston.format.timestamp(), // Add timestamp to logs
        winston.format.json() // Log in JSON format
    ),
    transports: [
        new winston.transports.Console(), // Log to console
        new winston.transports.File({ filename: 'error.log', level: 'error' }), // Log errors to a file
        new winston.transports.File({ filename: 'combined.log' }) // Log all messages to a file
    ],
});

// Function to log unhandled exceptions
logger.exceptions.handle(
    new winston.transports.File({ filename: 'exceptions.log' }) // Log unhandled exceptions to a file
);

// Function to log unhandled rejections
logger.rejections.handle(
    new winston.transports.File({ filename: 'rejections.log' }) // Log unhandled rejections to a file
);

// Export the logger
export default logger;
