class HealthCheck {
    constructor() {
        this.isHealthy = true;
        this.details = {};
    }

    async check() {
        // Base implementation does nothing
        // Subclasses should override this method
    }

    getStatus() {
        return this.isHealthy;
    }

    getDetails() {
        return this.details;
    }
}

module.exports = HealthCheck;
module.exports.__default = HealthCheck;