const { Tracer } = require('@opentelemetry/api');
const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const { v4 } = require('uuid');
const prisma = require('../utils/prisma');
/**
 * Endpoints for Milestone management
 * @param {Tracer} tracer 
 * @returns router
 */
module.exports = ({ tracer }) => {

  router.post('/add-milestone', async (req, res) => {
    const requestId = request.header('x-request-id') || v4();
    logger.info('Adding milestone', { requestId, path: req.path });
    const span = tracer.startSpan('add_milestone', { attributes: { requestId } });
    const { projectId, milestoneName, amount } = req.body;
    span.addEvent('extracting_request_details', { projectId, milestoneName, amount });
    try {
      span.addEvent('creating_milestone');
      // Create a new milestone associated with the project
      const milestone = await prisma.milestone.create({
        data: {
          milestoneName,
          amount,
          projectId,
        },
      });

      span.addEvent('milestone_created', { milestone });
      logger.info('Milestone added', { requestId, milestone });
      span.end();
      res.status(201).json(milestone);
    } catch (error) {
      logger.error('Error adding milestone:', error);
      span.end();
      res.status(500).json({ error: 'Unable to add milestone' });
    }
    // res.status(201).send({ message: 'Milestone added' });
  });

  return router;
};
