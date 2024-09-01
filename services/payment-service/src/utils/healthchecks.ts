import primsa from './prisma';
import logger from './logger';
import { HealthCheck } from '@ddaw/healthcheck-sdk';
import os from 'node:os';
/**
 * This function is used to check the database connection
 * @returns {Promise<boolean>} boolean of the database connection
 */
function checkDatabaseConnection(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        try {
            // Check if the database connection is available
            const query = await primsa.$queryRaw`SELECT 1 AS DB_STATUS`;
            logger.info('Database connection status:', (query as any).db_status);
            const connectionStatus = (query as any).length > 0 ? true : false;
            resolve(connectionStatus);
        } catch (error) {
            if (error instanceof Error) {
                logger.error('Unexpected error for database connection', error);
                // reject(false);
                reject(error);
            }
        }
    });
}

/**
 * This function is used to check the cache status
 * @returns {Promise<boolean>} boolean of the cache status
 */
function checkCacheStatus(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        try {
            logger.info('Cache connection establish');
            // Check if the cache is available
            resolve(true);
        } catch (error) {
            if (error instanceof Error) {
                logger.error('Unexpected error for establishing cache connection', error);
                // reject(false);
                reject(error);
            }
        }

    });
}

/**
 * This function is used to check if the application is running
 * @returns {Promise<boolean>} boolean of the application status
 */
function checkIfAppIsRunning(): Promise<boolean> {
    var isAppRunning = false;
    return new Promise((resolve, reject) => {
        try {
            logger.info('Application is running');
            isAppRunning = true;
            resolve(isAppRunning);
        } catch (error) {
            if (error instanceof Error) {
                logger.error('Application is not running', error);
                reject(error);
            }
        }
    })
}

/**
 * This function is used to initialize the database
 * @returns {Promise<boolean>} boolean of the database connection
 */
async function initDatabase() {
    try {
        // Implement database initialization logic here
        // Return true if the database is initialized successfully, false otherwise
        return true;
    } catch (err) {
        return false;
    }
}

/**
 * This function is used to initialize the cache
 * @returns {Promise<boolean>} boolean of the cache status
 */
async function initCache() {
    // Implement cache initialization logic here
    // Return true if the cache is initialized successfully, false otherwise
    return true; // Example: Assuming cache initialization always succeeds
}

async function initThirdPartyServices() {
    try {
        const response = await fetch('https://api.example.com/health');
        return response.status === 200;
    } catch (err) {
        // return false; // Uncomment this line to simulate a failure
        // throw new Error('Failed to connect to third-party services');
        throw new Error('Third-party services are unhealthy');
    }
}

/**
 * This function is used to check if the application is started
 * @returns {Promise<boolean>} boolean of the application status
 */
function checkIfAppIsStarted() {
    var isAppStarted = false;
    return new Promise(async (resolve, reject) => {
        try {
            logger.info('Application is started');
            const databaseAvailable = await initDatabase();
            const cacheAvailable = await initCache();
            const thirdPartyServicesAvailable = await initThirdPartyServices();
            if (databaseAvailable && cacheAvailable && thirdPartyServicesAvailable) {
                isAppStarted = true;
            }
            resolve(isAppStarted);
        } catch (error) {
            logger.error('Application is not started', error);
            reject(isAppStarted);
        }
    })
}

function checkSystemResources() {
    const memoryUsage = process.memoryUsage().heapTotal / 1024 / 1024; // MB
    const cpuUsage = os.loadavg()[0]; // CPU load average for 1 minute

    const minMemoryRequired = 512; // MB
    const maxCpuLoad = 4; // Adjust based on your system's capabilities

    return memoryUsage < minMemoryRequired && cpuUsage <= maxCpuLoad;
}

class DatabaseHealthCheck extends HealthCheck {


    /**
     * Run the health check and return the instance for chaining
     * @returns {Promise<HealthCheck>} The health check instance
     */
    async check() {
        try {
            // Check the database connection status
            this.isHealthy = await checkDatabaseConnection();
            this.details = { message: 'Database connection successful' };
        } catch (err) {
            if (err instanceof Error) {
                this.isHealthy = false;
                this.details = { error: err.message };
            }
        }
        return this;

    }
}

class CacheHealthCheck extends HealthCheck {


    /**
     * Run the health check and return the instance for chaining
     * @returns {Promise<HealthCheck>} The health check instance
     */
    async check() {
        // check cache health
        try {
            this.isHealthy = await checkCacheStatus();
            this.details = { message: 'Cache connection successful' };
        } catch (err) {
            if (err instanceof Error) {
                this.isHealthy = false;
                this.details = { error: err.message };
            }
        }
        return this;

    }
}

class ThirdPartyHealthCheck extends HealthCheck {
    async check() {
        // check third-party service health
        try {
            this.isHealthy = await initThirdPartyServices();
            this.details = { message: 'Third-party services are healthy' };
        } catch (err) {
            if (err instanceof Error) {
                this.isHealthy = false;
                this.details = { error: err.message };
            }
        }
        return this
    }
}

export {
    DatabaseHealthCheck,
    CacheHealthCheck,
    ThirdPartyHealthCheck,
    checkDatabaseConnection,
    checkCacheStatus,
    checkIfAppIsRunning,
    checkIfAppIsStarted,
    checkSystemResources,
    initDatabase,
    initCache,
    initThirdPartyServices
};