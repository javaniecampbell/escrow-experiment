const { Tracer } = require('@opentelemetry/api');
const express = require('express');
const router = express.Router();
const os = require('os');
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
  router.get('/_health', function (req, res, next) {
    // calculates the heap memory used vs maximum
    headers.forEach((header) => {
      res.set(header);
    });
    const memoryUsed = process.memoryUsage().heapUsed;
    const maxMemory = process.memoryUsage().heapTotal;


    res.json(200, {
      status: 'ok'
    });
  });
  /* GET home page. */
  router.get('/_health/live', function (req, res, next) {
    headers.forEach((header) => {
      res.set(header);
    });
    res.json(200, {
      status: 'ok'
    });
  });
  /* GET home page. */
  router.get('/_health/ready', function (req, res, next) {
    headers.forEach((header) => {
      res.set(header);
    });
    res.json(200, {
      status: 'ok'
    });
  });

  return router;

};
