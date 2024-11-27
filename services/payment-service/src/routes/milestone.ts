import { Tracer } from '@opentelemetry/api';
import { Router } from 'express';
const router = Router();
import { info, error as _error } from '../utils/logger';
import { v4 } from 'uuid';
import { milestone as _milestone } from '../utils/prisma';
/**
 * Endpoints for Milestone management
 * @param {Tracer} tracer 
 * @returns router
 */
export default ({ tracer }: { tracer: Tracer }) => {

  router.post('/add-milestone', async (req, res) => {
    const requestId = request.header('x-request-id') || v4();
    info('Adding milestone', { requestId, path: req.path });
    const span = tracer.startSpan('add_milestone', { attributes: { requestId } });
    const { projectId, milestoneName, amount } = req.body;
    span.addEvent('extracting_request_details', { projectId, milestoneName, amount });
    try {
      span.addEvent('creating_milestone');
      // Create a new milestone associated with the project
      const milestone = await _milestone.create({
        data: {
          milestoneName,
          amount,
          projectId,
        },
      });

      span.addEvent('milestone_created', { milestone });
      info('Milestone added', { requestId, milestone });
      span.end();
      res.status(201).json(milestone);
    } catch (error) {
      _error('Error adding milestone:', error);
      span.end();
      res.status(500).json({ error: 'Unable to add milestone' });
    }
    // res.status(201).send({ message: 'Milestone added' });
  });

  return router;
};
