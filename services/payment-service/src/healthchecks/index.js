const { DatabaseHealthCheckStrategy } = require('./DatabaseHealthCheckStrategy');
const { CacheHealthCheckStrategy } = require('./CacheHealthCheckStrategy');
const { ThirdPartyHealthCheckStrategy } = require('./ThirdPartyHealthCheckStrategy');

module.exports = {
    DatabaseHealthCheckStrategy,
    CacheHealthCheckStrategy,
    ThirdPartyHealthCheckStrategy,
};