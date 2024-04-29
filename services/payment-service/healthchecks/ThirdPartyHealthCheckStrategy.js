const { HealthCheckStrategy } = require('@ddaw/healthcheck-sdk');

class ThirdPartyHealthCheckStrategy extends HealthCheckStrategy {
    async check() {
        // Implement third-party service health check logic
        // ...
    }
}

module.exports.ThirdPartyHealthCheckStrategy = ThirdPartyHealthCheckStrategy;