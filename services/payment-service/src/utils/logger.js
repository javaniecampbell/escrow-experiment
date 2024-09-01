import { format as _format, transports as _transports, createLogger } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const logFormat = _format.combine(
    _format.timestamp(),
    _format.json()
);

const transports = [
    new _transports.Console({
        format: _format.simple(),
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

const logger = createLogger({
    level: 'info',
    format: logFormat,
    transports,
});

export default logger;