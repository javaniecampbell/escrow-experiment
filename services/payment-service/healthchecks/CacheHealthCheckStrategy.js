const { HealthCheckStrategy } = require('@ddaw/healthcheck-sdk');
const { checkCacheStatus } = require('../utils/healthchecks');
class CacheHealthCheckStrategy extends HealthCheckStrategy {
    /**
     * Run the health check and return the instance for chaining
     * @returns {Promise<HealthCheckStrategy>} The health check instance
     */
    async check() {
        // check cache health
        try {
            this.isHealthy = await checkCacheStatus();
            this.details = {
                status: 'pass',
                componentId: 'cache', // Replace with your component ID
                componentType: 'datastore',
                observedValue: this.getStatus(), // You can include any relevant observed value
                observedUnit: 'boolean', // Include the observed unit if applicable
            };
        } catch (err) {
            this.isHealthy = false;
            this.details = {
                status: 'fail',
                componentId: 'cache', // Replace with your component ID
                componentType: 'datastore',
                observedValue: this.getStatus(), // You can include any relevant observed value
                observedUnit: 'boolean', // Include the observed unit if applicable
                output: err.message,
            };
        }
        return this;
    }
}

module.exports.CacheHealthCheckStrategy = CacheHealthCheckStrategy;