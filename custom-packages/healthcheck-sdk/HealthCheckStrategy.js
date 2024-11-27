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
        this.componentName = '';
        this.measurementName = '';
    }
    async check() {
        return this;
    }
    getStatus() {
        return this.isHealthy;
    }

    getDetails() {
        return this.details;
    }
}

module.exports.HealthCheckStrategy = HealthCheckStrategy;
