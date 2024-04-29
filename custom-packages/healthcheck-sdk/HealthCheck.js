/**
 * Base class for health checks
 * Implement the check method in subclasses to perform the health check
 * and set the isHealthy and details properties accordingly
 * @abstract @class
 * @property {boolean} isHealthy - The health check status
 * @property {object} details - Additional details about the health check
 * @method check - Perform the health check
 * @method getStatus - Get the health check status
 * @method getDetails - Get the health check details
 * @example
 * class DatabaseHealthCheck extends HealthCheck {
 *   async check() {
 *     try {
 *        // Check the database connection status
 *          this.isHealthy = await checkDatabaseConnection();
 *          this.details = { message: 'Database connection successful' };
 *      }
 *      catch (err) {
 *          this.isHealthy = false;
 *          this.details = { error: err.message };
 *      }
 *      return this;
 *    }
 * }
 * @example
 * const healthCheck = new DatabaseHealthCheck();
 * await healthCheck.check();
 * console.log(healthCheck.getStatus()); // true
 * console.log(healthCheck.getDetails()); // { message: 'Database connection successful' }
 * 
 */
class HealthCheck {
    constructor() {
        this.isHealthy = true;
        this.details = {};
    }

    async check() {
        // Base implementation does nothing
        // Subclasses should override this method
    }

    getStatus() {
        return this.isHealthy;
    }

    getDetails() {
        return this.details;
    }
}

module.exports.HealthCheck = HealthCheck;