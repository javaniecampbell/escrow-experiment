const { Tracer } = require('@opentelemetry/api');
const express = require('express');
const router = express.Router();
const { generateExpiringLink } = require('../service/index')
const logger = require('../utils/logger');
const { v4 } = require('uuid');

/**
 * Endponts for Digital Assets management
 * @param {Tracer} tracer OpenTelemetry Tracer
 * @returns router
 */
module.exports = ({ tracer }) => {

  router.get('/get-asset-link', async (req, res) => {
    const requestId = req.header('x-request-id') || v4();
    logger.info('Received asset preview request', { requestId, path: req.path });
    const span = tracer.startSpan('generate_asset_link', { attributes: { requestId } });
    try {
      const { assetId } = req.query;
      // Step 1: Generate an expiring link for the asset from Azure Storage
      const expiringLink = generateExpiringLink(assetId, 1000 * 60 * 60 * 24);
      span.addEvent('preview_link_generated', { requestId, assetId, expiringLink });

      span.end();
      // Step 2: Return the expiring link as a response
      res.status(200).json({ downloadLink: expiringLink });
    } catch (error) {
      logger.error('Error generating asset link:', error);
      span.addError('Error generating asset link', { error: error.message });
      span.end();
      res.status(500).json({ error: 'Unable to generate asset link' });
    }
  });
  return router;
};
