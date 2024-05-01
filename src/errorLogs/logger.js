const winston = require('winston');

// Create a Winston logger instance
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: 'error.log', level: 'error' }) // Log errors to a file
  ],
  format: winston.format.combine(
    winston.format.timestamp(), // Add timestamp to logs
    winston.format.simple()     // Simple log format
  ),
});

module.exports = logger;