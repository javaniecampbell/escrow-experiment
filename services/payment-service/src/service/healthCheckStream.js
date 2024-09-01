const { interval, Observable, of } = require('rxjs');
const { map, concatMap, catchError } = require('rxjs/operators');
// const { performHealthChecks } = require('./healthChecks');
const { HealthCheckContext } = require('@ddaw/healthcheck-sdk');
const {
    CacheHealthCheckStrategy,
    DatabaseHealthCheckStrategy,
    ThirdPartyHealthCheckStrategy
} = require('../healthchecks');
const logger = require('../utils/logger');

// Create a HealthCheckContext instance
const healthCheckContext = new HealthCheckContext();

// Add health check strategies
healthCheckContext.addStrategy(new DatabaseHealthCheckStrategy());
healthCheckContext.addStrategy(new CacheHealthCheckStrategy());
healthCheckContext.addStrategy(new ThirdPartyHealthCheckStrategy());

const healthCheckStream = new Observable((observer) => {
    const intervalSubscription = interval(5000)
        .pipe(
            concatMap(async () => {
                const { overallHealthy, healthData } = await healthCheckContext.performHealthCheckSpec();


                const healthCheck = {
                    uptime: process.uptime(),
                    responseTime: process.hrtime(),
                    message: overallHealthy ? 'OK' : 'Degraded',
                    timestamp: Date.now(),
                };
                const responseData = {
                    status: overallHealthy ? 'pass' : 'fail',
                    version: '1.0.0', // Replace with your API version
                    releaseId: '1.0.0', // Replace with your release ID
                    serviceId: 'payment-service', // Replace with your service ID
                    description: 'Health check for Payment Service API', // Replace with your service description
                    ...healthCheck,
                    checks: [
                        healthData,
                    ],
                };

                return responseData;

            }),
            map((healthCheckData) => {

                const eventType = healthCheckData.status === 'pass' ? 'HEALTHY' : healthCheckData.status === 'fail' ? 'UNHEALTHY' : healthCheckData.status === 'warn' ? 'DEGRADED' : healthCheckData.checks.some(check => check.status === 'fail') ? 'UNHEALTHY' : 'DEGRADED';
                observer.next({ eventType, data: healthCheckData });
            }),
            catchError(async (error) => {
                const { healthData } = await healthCheckContext.performHealthCheckSpec();
                logger.error('An error occurred while performing health checks', error);
                const healthCheck = {
                    uptime: process.uptime(),
                    responseTime: process.hrtime(),
                    message: 'Degraded performance detected',
                    timestamp: Date.now(),
                };
                const responseData = {
                    status: 'fail',
                    version: '1.0.0', // Replace with your API version
                    releaseId: '1.0.0', // Replace with your release ID
                    serviceId: 'payment-service', // Replace with your service ID
                    description: 'Health check for Payment Service API', // Replace with your service description
                    ...healthCheck,
                    checks: [
                        healthData,
                    ],
                };
                return of({ eventType: 'DEGRADED', data: responseData });
            })
        )
        .subscribe();

    return () => intervalSubscription.unsubscribe();
});

module.exports = healthCheckStream;