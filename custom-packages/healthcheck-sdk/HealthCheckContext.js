const { HealthCheckStrategy } = require("./HealthCheckStrategy");

/**
 * Provides a context for performing health checks using various strategies.
 *
 * The `HealthCheckContext` class manages a collection of health check strategies,
 * allowing you to add, remove, and perform health checks using those strategies.
 *
 * @class HealthCheckContext
 * @property {HealthCheckStrategy[]} strategies - The collection of health check strategies.
 * @method addStrategy - Adds a health check strategy to the context.
 * @method removeStrategy - Removes a health check strategy from the context.
 * @method performHealthCheck - Performs a health check using all the registered strategies.
 * 
 */
class HealthCheckContext {
    /**
     * Constructs a new `HealthCheckContext` instance.
     *
     */
    constructor() {
        this.strategies = [];
    }

    /**
     * Adds a health check strategy to the context.
     *
     * @param {HealthCheckStrategy} strategy - The health check strategy to add.
     */
    addStrategy(strategy) {
        this.strategies.push(strategy);
    }

    /**
     * Removes a health check strategy from the context.
     *
     * @param {HealthCheckStrategy} strategy - The health check strategy to remove.
     */
    removeStrategy(strategy) {
        this.strategies = this.strategies.filter((s) => s !== strategy);
    }

    /**
     * Performs a health check using all the registered strategies.
     *
     * @returns {Promise<{ overallHealthy: boolean, healthData: object }>} - An object containing the overall health status and the health data from all the strategies.
     */
    async performHealthCheck() {
        const results = await Promise.all(
            this.strategies.map((strategy) => strategy.check())
        );
        const overallHealthy = results.every((result) => result.isHealthy);
        // Original: was reducing the results down to a single object rather than accumulating an array

        // Fixed:  by building up an array instead
        const healthData = [];

        results.forEach(result => {
            healthData.push(result.getDetails());
        });


        return { overallHealthy, healthData };
    }

    async performHealthCheckAllSettled() {
        const results = await Promise.allSettled(this.strategies.map((strategy) => strategy.check()));

        const healthyStrategies = results.filter((result) => result.status === 'fulfilled');
        const failedStrategies = results.filter((result) => result.status === 'rejected');

        const overallHealthy = failedStrategies.length === 0;
        const healthData = {
            healthy: healthyStrategies.map((result) => ({
                strategy: result.value.constructor.name,
                details: result.value.details,
            })),
            unhealthy: failedStrategies.map((result) => ({
                strategy: result.reason.constructor.name,
                error: result.reason.message,
            })),
        };

        return { overallHealthy, healthData };
    }
}

module.exports.HealthCheckContext = HealthCheckContext;