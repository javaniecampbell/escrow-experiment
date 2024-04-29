const { HealthCheckStrategy } = require('@ddaw/healthcheck-sdk');
const { initThirdPartyServices } = require('../utils/healthchecks');

class ThirdPartyHealthCheckStrategy extends HealthCheckStrategy {
    constructor() {
        super();
        this.componentName = 'api';
        this.measurementName = 'health';
      }
    /**
     * Run the health check and return the instance for chaining
     * @returns {Promise<HealthCheckStrategy>} The health check instance
     */
    async check() {
        // check third-party service health
        try {
            this.isHealthy = await initThirdPartyServices();
            this.details = {
                status: 'pass',
                componentId: 'api', // Replace with your component ID
                componentType: 'service',
                observedValue: this.getStatus(), // You can include any relevant observed value
                observedUnit: 'boolean', // Include the observed unit if applicable
            };
        } catch (err) {
            this.isHealthy = false;
            this.details = {
                status: 'fail',
                componentId: 'api', // Replace with your component ID
                componentType: 'service',
                observedValue: this.getStatus(), // You can include any relevant observed value
                observedUnit: 'boolean', // Include the observed unit if applicable
                output: err.message,
            };
        }
        return this;
    }
}

module.exports.ThirdPartyHealthCheckStrategy = ThirdPartyHealthCheckStrategy;