const { HealthCheckStrategy } = require('@ddaw/healthcheck-sdk');
const { checkDatabaseConnection } = require('../utils/healthchecks');

class DatabaseHealthCheckStrategy extends HealthCheckStrategy {
    /**
     * Run the health check and return the instance for chaining
     * @returns {Promise<HealthCheckStrategy>} The health check instance
     */
    async check() {
        try {
            // Check the database connection status
            this.isHealthy = await checkDatabaseConnection();
            this.details = { message: 'Database connection successful' };
        } catch (err) {
            this.isHealthy = false;
            this.details = { error: err.message };
        }
        return this;
    }
}

module.exports.DatabaseHealthCheckStrategy = DatabaseHealthCheckStrategy;