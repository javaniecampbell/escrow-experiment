const { HealthCheckStrategy } = require('@ddaw/healthcheck-sdk');
const { initThirdPartyServices } = require('../utils/healthchecks');

class ThirdPartyHealthCheckStrategy extends HealthCheckStrategy {
    /**
     * Run the health check and return the instance for chaining
     * @returns {Promise<HealthCheckStrategy>} The health check instance
     */
    async check() {
        // check third-party service health
        try {
            this.isHealthy = await initThirdPartyServices();
            this.details = { message: 'Third-party services are healthy' };
        } catch (err) {
            this.isHealthy = false;
            this.details = { error: err.message };
        }
        return this;
    }
}

module.exports.ThirdPartyHealthCheckStrategy = ThirdPartyHealthCheckStrategy;