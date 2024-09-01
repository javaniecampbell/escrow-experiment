import { HealthCheckStrategy } from '@ddaw/healthcheck-sdk';
import { checkCacheStatus } from '../utils/healthchecks';
export class CacheHealthCheckStrategy extends HealthCheckStrategy {
    /**
     * Run the health check and return the instance for chaining
     * @returns {Promise<HealthCheckStrategy>} The health check instance
     */
    constructor() {
        super();
        this.componentName = 'cache';
        this.measurementName = 'availability';
    }
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
                output: 'Cache is healthy',
                time: new Date().toISOString(),
            };
        } catch (err) {
            if (err instanceof Error) {
                this.isHealthy = false;
                this.details = {
                    status: 'fail',
                    componentId: 'cache', // Replace with your component ID
                    componentType: 'datastore',
                    observedValue: this.getStatus(), // You can include any relevant observed value
                    observedUnit: 'boolean', // Include the observed unit if applicable
                    output: err.message,
                    time: new Date().toISOString(),
                };
            }
        }
        return this;
    }
}

// const _CacheHealthCheckStrategy = CacheHealthCheckStrategy;
// export { _CacheHealthCheckStrategy as CacheHealthCheckStrategy };