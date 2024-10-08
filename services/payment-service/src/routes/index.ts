import { Tracer } from '@opentelemetry/api';
import { Router } from 'express';
const router = Router();
import { loadavg as _loadavg, cpus as _cpus } from 'os';
import { HealthCheckContext } from '@ddaw/healthcheck-sdk';
import logger from '../utils/logger';

import { checkDatabaseConnection, checkCacheStatus, DatabaseHealthCheck, CacheHealthCheck } from '../utils/healthchecks';

import { CacheHealthCheckStrategy, DatabaseHealthCheckStrategy, ThirdPartyHealthCheckStrategy } from '../healthchecks';

import healthCheckStream from '../services/healthCheckStream';
const { subscribe } = healthCheckStream;
/**
 * Endpoints for Health checks
 * @param {Tracer} tracer OpenTelemetry Tracer
 * @returns router
 */
export default ({ tracer }: { tracer: Tracer }) => {
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
          status: _loadavg()[0] / _cpus().length > 0.8 ? 'fail' : 'pass',
          value: _loadavg()[0] / _cpus().length,
          loadavg: _loadavg(),
          cpus: _cpus(),
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

  router.get('/v2/fix', async function (req, res, next) {
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
      // The main problem is on this line:
      // This is overwriting the healthData object on each iteration, so it will only contain the last result.
      // const healthData = results.reduce(
      //   (acc, result) => ({
      //     ...acc,
      //     ...result.getDetails(),
      //   }),
      //   {}
      // );

      // To fix it, you need to change it to properly accumulate the results in an array:
      const healthData = [];

      results.forEach(result => {
        healthData.push(result.getDetails());
      });


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

  /* GET General health check route v3 */

  router.get('/v3', async function (req, res, next) {
    // calculates the heap memory used vs maximum
    headers.forEach((header) => {
      res.set(header);
    });
    // Create a HealthCheckContext instance
    const healthCheckContext = new HealthCheckContext();

    // Add health check strategies
    healthCheckContext.addStrategy(new DatabaseHealthCheckStrategy());
    healthCheckContext.addStrategy(new CacheHealthCheckStrategy());
    // healthCheckContext.addStrategy(new ThirdPartyHealthCheckStrategy());


    try {

      const { overallHealthy, healthData } = await healthCheckContext.performHealthCheck();


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

  /* GET General health check route v3 */

  router.get('/v3/settled', async function (req, res, next) {
    // calculates the heap memory used vs maximum
    headers.forEach((header) => {
      res.set(header);
    });
    // Create a HealthCheckContext instance
    const healthCheckContext = new HealthCheckContext();

    // Add health check strategies
    healthCheckContext.addStrategy(new DatabaseHealthCheckStrategy());
    healthCheckContext.addStrategy(new CacheHealthCheckStrategy());
    healthCheckContext.addStrategy(new ThirdPartyHealthCheckStrategy());


    try {

      const { overallHealthy, healthData } = await healthCheckContext.performHealthCheckAllSettled();


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
  router.get('/v3/spec', async function (req, res, next) {
    // calculates the heap memory used vs maximum
    headers.forEach((header) => {
      res.set(header);
    });
    // Create a HealthCheckContext instance
    const healthCheckContext = new HealthCheckContext();

    // Add health check strategies
    healthCheckContext.addStrategy(new DatabaseHealthCheckStrategy());
    healthCheckContext.addStrategy(new CacheHealthCheckStrategy());
    healthCheckContext.addStrategy(new ThirdPartyHealthCheckStrategy());


    try {

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
      if (overallHealthy) {
        res.status(200).json(responseData);
      } else {
        res.status(503).json(responseData);
      }
    } catch (err) {
      logger.error('Health check failed', err);
      res.status(503).json({ status: 'fail', message: 'Health check failed' });
    }

  });

  router.get('/v3/spec/stream', async function (req, res, next) {
    // calculates the heap memory used vs maximum
    // res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Connection', 'keep-alive');
    headers.forEach((header) => {
      res.set(header);
    });

    const healthCheckSubscription = subscribe({
      next: ({ eventType, data }) => {

        res.write(`event: ${eventType}\ndata: ${JSON.stringify(data)}\n\n`);
      },
      error: (error) => {
        res.status(500);
        logger.error('Health check failed', error);
        res.write(`event: error\ndata: ${JSON.stringify({ error: 'Health check failed' })}\n\n`);
        res.end();
      },
      complete: () => {
        res.end();
      }
    });

    req.on('close', () => {
      healthCheckSubscription.unsubscribe();
    });

    // } catch (err) {
    //   res.status(503).json({ status: 'fail', message: 'Health check failed' });
    // }

  });


  return router;

};
