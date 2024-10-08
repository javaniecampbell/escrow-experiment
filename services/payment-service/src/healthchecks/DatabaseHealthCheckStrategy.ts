import { HealthCheckStrategy } from '@ddaw/healthcheck-sdk';
import { checkDatabaseConnection } from '../utils/healthchecks';

export class DatabaseHealthCheckStrategy extends HealthCheckStrategy {
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
            if (err instanceof Error) {
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
        }
        return this;
    }
}

// const _DatabaseHealthCheckStrategy = DatabaseHealthCheckStrategy;
// export { _DatabaseHealthCheckStrategy as DatabaseHealthCheckStrategy };