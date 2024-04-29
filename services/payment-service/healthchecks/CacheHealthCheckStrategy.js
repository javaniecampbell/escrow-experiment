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
            this.details = { message: 'Cache connection successful' };
        } catch (err) {
            this.isHealthy = false;
            this.details = { error: err.message };
        }
        return this;
    }
}

module.exports.CacheHealthCheckStrategy = CacheHealthCheckStrategy;