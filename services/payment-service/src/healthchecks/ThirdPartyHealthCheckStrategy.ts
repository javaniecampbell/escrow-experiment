import { HealthCheckStrategy } from '@ddaw/healthcheck-sdk';
import { initThirdPartyServices } from '../utils/healthchecks';

export class ThirdPartyHealthCheckStrategy extends HealthCheckStrategy {
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
                status: this.getStatus() === true ? 'pass' : 'fail',
                componentId: 'api', // Replace with your component ID
                componentType: 'service',
                observedValue: this.getStatus(), // You can include any relevant observed value
                observedUnit: 'boolean', // Include the observed unit if applicable
                output: this.getStatus() === true ? 'Third-party services are healthy' : 'Third-party services are unhealthy',
                time: new Date().toISOString(),
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
                time: new Date().toISOString(),
            };
        }
        return this;
    }
}

// const _ThirdPartyHealthCheckStrategy = ThirdPartyHealthCheckStrategy;
// export { _ThirdPartyHealthCheckStrategy as ThirdPartyHealthCheckStrategy };