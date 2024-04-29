/**
 * Base class for health check strategies
 * Implement the check method in subclasses to perform the health check
 * @abstract @class
 * @method check - Perform the health check
 * 
 */
class HealthCheckStrategy {
    constructor() {
        if (this.constructor === HealthCheckStrategy) {
            throw new Error('Cannot instantiate abstract class');
        }
        this.isHealthy = true;
        this.details = {};
    }
    async check() {
        throw new Error('check method must be implemented');
    }
    getStatus() {
        return this.isHealthy;
    }

    getDetails() {
        return this.details;
    }
}

module.exports.HealthCheckStrategy = HealthCheckStrategy;
