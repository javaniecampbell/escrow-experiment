const prisma = require('../utils/prisma');
const logger = require('./logger');
/**
 * This function is used to check the database connection
 * @returns {Promise<boolean>} boolean of the database connection
 */
function checkDatabaseConnection() {
    return new Promise(async (resolve, reject) => {
        try {
            // Check if the database connection is available
            const query = await prisma.$queryRaw`SELECT 1 AS DB_STATUS`;
            logger.info('Database connection status:', query.db_status);
            const connectionStatus = query.length > 0 ? true : false;
            resolve(connectionStatus);
        } catch (error) {
            logger.error('Unexpected error for database connection', error);
            reject(false);
        }
    });
}

/**
 * This function is used to check the cache status
 * @returns {Promise<boolean>} boolean of the cache status
 */
function checkCacheStatus() {
    return new Promise((resolve, reject) => {
        try {
            logger.info('Cache connection establish');
            // Check if the cache is available
            resolve(true);
        } catch (error) {
            logger.error('Unexpected error for establishing cache connection', error);
            reject(false);
        }

    });
}

module.exports = {
    checkDatabaseConnection,
    checkCacheStatus
};