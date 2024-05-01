const { interval, Observable } = require('rxjs');
const { map, concatMap } = require('rxjs/operators');
// const { performHealthChecks } = require('./healthChecks');
const { HealthCheckContext } = require('@ddaw/healthcheck-sdk');
const {
    CacheHealthCheckStrategy,
    DatabaseHealthCheckStrategy,
    ThirdPartyHealthCheckStrategy
} = require('../healthchecks');

// Create a HealthCheckContext instance
const healthCheckContext = new HealthCheckContext();

// Add health check strategies
healthCheckContext.addStrategy(new DatabaseHealthCheckStrategy());
healthCheckContext.addStrategy(new CacheHealthCheckStrategy());
healthCheckContext.addStrategy(new ThirdPartyHealthCheckStrategy());

const healthCheckStream = new Observable((observer) => {
    const intervalSubscription = interval(5000)
        .pipe(
            concatMap(() => healthCheckContext.performHealthCheck()),
            map((healthCheckData) => observer.next(healthCheckData)),
            // catchError((error) => observer.error(error))
        )
        .subscribe({
            next: null,
            error: observer.error(error)
        });

    return () => intervalSubscription.unsubscribe();
});

module.exports = healthCheckStream;