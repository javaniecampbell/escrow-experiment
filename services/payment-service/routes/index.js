const { Tracer } = require('@opentelemetry/api');
const express = require('express');
const router = express.Router();
const os = require('os');
const logger = require('../utils/logger');

const { checkDatabaseConnection, checkCacheStatus, DatabaseHealthCheck, CacheHealthCheck } = require('../utils/healthchecks');
/**
 * Endpoints for Health checks
 * @param {Tracer} tracer OpenTelemetry Tracer
 * @returns router
 */
module.exports = ({ tracer }) => {
  const headers = [
    { 'Cache-Control': 'no-cache, no-store, must-revalidate' },
    { 'Pragma': 'no-cache' },
    { 'Expires': '0' }
  ];
  /* GET home page. */
  router.get('/', function (req, res, next) {
    // calculates the heap memory used vs maximum
    headers.forEach((header) => {
      res.set(header);
    });
    const memoryUsed = process.memoryUsage().heapUsed;
    const maxMemory = process.memoryUsage().heapTotal;
    const healthCheck = {
      uptime: process.uptime(),
      responseTime: process.hrtime(),
      message: 'OK',
      timestamp: Date.now(),
    };

    res.json(200, {
      ...healthCheck,
      status: 'ok',
      checks: [

        {
          name: 'memory',
          status: memoryUsed / maxMemory > 0.8 ? 'fail' : 'pass',
          used: memoryUsed,
          max: maxMemory,
          percentage: ((memoryUsed / maxMemory) * 100).toFixed(2),
        },
        {
          name: 'cpu',
          status: os.loadavg()[0] / os.cpus().length > 0.8 ? 'fail' : 'pass',
          value: os.loadavg()[0] / os.cpus().length,
          loadavg: os.loadavg(),
          cpus: os.cpus(),
        },
        {
          name: 'uptime',
          status: process.uptime() > 0 ? 'pass' : 'fail',
          value: process.uptime(),
        },
      ],
    });
  });
  /* GET home page. */
  router.get('/liveliness', function (req, res, next) {
    headers.forEach((header) => {
      res.set(header);
    });
    res.json(200, {
      status: 'ok'
    });
  });
  /* GET home page. */
  router.get('/readiness', async function (req, res, next) {
    headers.forEach((header) => {
      res.set(header);
    });
    try {
      // Check if the application is ready to receive traffic
      // (e.g., database connection, cache, external dependencies)
      const dbConnection = await checkDatabaseConnection();
      const cacheStatus = await checkCacheStatus();

      if (dbConnection && cacheStatus) {
        res.json(200, {
          status: 'pass',
          message: 'Application is ready'
        });
      } else {
        res.status(503).json({
          status: 'fail',
          message: 'Application not ready'
        });
      }
    } catch (err) {
      res.status(503).json({
        status: 'fail',
        message: 'Application not ready', error: err.message
      });
    }

  });
  router.get('/startup', function (req, res, next) {
    headers.forEach((header) => {
      res.set(header);
    });
    // Check if the application has started successfully
    // (e.g., all required resources are available)
    res.json(200, {
      status: 'ok'
    });
  });

  /* GET home page. */
  router.get('/v2', async function (req, res, next) {
    // calculates the heap memory used vs maximum
    headers.forEach((header) => {
      res.set(header);
    });

    try {
      const healthChecks = [
        new DatabaseHealthCheck(),
        new CacheHealthCheck(),
        // new ThirdPartyHealthCheck(),
        // Add any other health checks
      ];

      const results = await Promise.all(healthChecks.map((check) => check.check()));

      const overallHealthy = results.every((result) => result.getStatus());
      const healthData = results.reduce(
        (acc, result) => ({
          ...acc,
          ...result.getDetails(),
        }),
        {}
      );

      const healthCheck = {
        uptime: process.uptime(),
        responseTime: process.hrtime(),
        message: overallHealthy ? 'OK' : 'Degraded',
        timestamp: Date.now(),
      };
      const responseData = {
        ...healthCheck,
        status: overallHealthy ? 'pass' : 'fail',
        checks: [
          healthData,
        ],
      };
      if (overallHealthy) {
        res.status(200).json(responseData);
      } else {
        res.status(503).json(responseData);
      }
    } catch (err) {
      logger.error('Health check failed', err);
      res.status(503).json({ message: 'Health check failed' });
    }

  });

  return router;

};
