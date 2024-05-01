const { HealthCheckStrategy } = require('@ddaw/healthcheck-sdk');
const { checkDatabaseConnection } = require('../utils/healthchecks');

class DatabaseHealthCheckStrategy extends HealthCheckStrategy {
    constructor() {
        super();
        this.componentName = 'database';
        this.measurementName = 'availability';
    }
    /**
     * Run the health check and return the instance for chaining
     * @returns {Promise<HealthCheckStrategy>} The health check instance
     */
    async check() {
        try {
            // Check the database connection status
            this.isHealthy = await checkDatabaseConnection();
            this.details = {
                status: 'pass',
                componentId: 'database', // Replace with your component ID
                componentType: 'datastore',
                observedValue: this.getStatus(), // You can include any relevant observed value
                observedUnit: 'boolean', // Include the observed unit if applicable
                output: 'Database connection is healthy',
                time: new Date().toISOString(),
            };
        } catch (err) {
            this.isHealthy = false;
            this.details = {
                status: 'fail',
                componentId: 'database', // Replace with your component ID
                componentType: 'datastore',
                observedValue: this.getStatus(), // You can include any relevant observed value
                observedUnit: 'boolean', // Include the observed unit if applicable
                output: err.message,
                time: new Date().toISOString(),
            };
        }
        return this;
    }
}

module.exports.DatabaseHealthCheckStrategy = DatabaseHealthCheckStrategy;