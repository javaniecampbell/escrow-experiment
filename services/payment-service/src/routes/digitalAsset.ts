import { Tracer } from '@opentelemetry/api';
import { Router } from 'express';
const router = Router();
import { generateExpiringLink } from '../services/index';
import { info, error as _error } from '../utils/logger';
import { v4 } from 'uuid';

/**
 * Endponts for Digital Assets management
 * @param {Tracer} tracer OpenTelemetry Tracer
 * @returns router
 */
export default ({ tracer }) => {

  router.get('/get-asset-link', async (req, res) => {
    const requestId = req.header('x-request-id') || v4();
    info('Received asset preview request', { requestId, path: req.path });
    const span = tracer.startSpan('generate_asset_link', { attributes: { requestId } });
    try {
      const { assetId } = req.query;
      // Step 1: Generate an expiring link for the asset from Azure Storage
      const expiringLink = generateExpiringLink(assetId as string, 1000 * 60 * 60 * 24);
      span.addEvent('preview_link_generated', { requestId, assetId, expiringLink });

      span.end();
      // Step 2: Return the expiring link as a response
      res.status(200).json({ downloadLink: expiringLink });
    } catch (error) {
      _error('Error generating asset link:', error);
      span.addError('Error generating asset link', { error: error.message });
      span.end();
      res.status(500).json({ error: 'Unable to generate asset link' });
    }
  });
  return router;
};
