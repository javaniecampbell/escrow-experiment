const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const logFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
);

const transports = [
    new winston.transports.Console({
        format: winston.format.simple(),
        level: 'debug',
    }),
    new DailyRotateFile({
        filename: 'logs/api-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        format: logFormat,
        level: 'info',
    }),
];

const logger = winston.createLogger({
    level: 'info',
    format: logFormat,
    transports,
});

module.exports = logger;