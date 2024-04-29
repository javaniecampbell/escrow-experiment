/**
 * Base class for health check strategies
 * Implement the check method in subclasses to perform the health check
 * @abstract @class
 * @method check - Perform the health check
 * 
 */
class HealthCheckStrategy {
    async check() {
        throw new Error('check method must be implemented');
    }
}

module.exports.HealthCheckStrategy = HealthCheckStrategy;
