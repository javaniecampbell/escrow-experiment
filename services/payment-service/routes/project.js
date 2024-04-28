const { Tracer } = require('@opentelemetry/api');
const express = require('express');
const { v4 } = require('uuid');
const router = express.Router();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const prisma = require('../utils/prisma');
const logger = require('../utils/logger');
/**
 * Endpoints for Project management
 * @param {Tracer} tracer OpenTelemetry Tracer
 * @returns router
 */
module.exports = ({ tracer }) => {

  router.get('/', async (req, res) => {
    // const { projectName, description, milestones } = req.body;
    const requestId = req.header('x-request-id') || v4();
    logger.info('Retrieving projects', { requestId, path: req.path });
    const span = tracer.startSpan('retrieve_projects', { attributes: { requestId } });
    try {
      // const { projectName, description } = req.body;

      span.addEvent('retrieving_projects', { requestId });
      // Create a new project in the database
      const projects = await prisma.project.findMany({
        include: {
          milestones: true
        }
      });

      span.addEvent('projects_retrieved', { requestId, projects: projects.length });



      const projectsDelta = projects.map(project => {
        return {
          id: project.projectId,
          title: project.projectName,
          description: project.description ?? "",
          balance: 0,
          inEscrow: 0,
          totalPayouts: 0,
          status: "pending", // project.status ?? "pending",
          clientId: "",
          milestones: project.milestones?.map(milestone => {
            return {
              id: milestone.id,
              projectId: milestone.projectId,
              title: milestone.milestoneName,
              description: milestone.description,
              amount: milestone.amount,
              payout: 0,//milestone.paidAmount ?? ,
              balance: Number(milestone.amount) - Number(milestone.paidAmount),
              status: milestone.status,
              date: new Date().toISOString(),
              previewed: false,
              payoutDate: "",
              digitalAssets: []
            };
          })
        };
      }) ?? [];
      logger.info('Projects retrieved', { requestId, projects: projectsDelta });
      span.addEvent('projects_transformed', { requestId, projects: projectsDelta });
      span.end();
      res.status(200).json({ projects: projectsDelta });
    } catch (error) {
      logger.error('Error creating project:', error);
      span.addEvent('error_creating_project', { requestId, error: error.message });
      span.end();
      res.status(500).json({ error: 'Unable to create project' });
    }
  });

  router.post('/create-project', async (req, res) => {
    // const { projectName, description, milestones } = req.body;
    try {
      const { projectName, description } = req.body;

      // Create a new project in the database
      const project = await prisma.project.create({
        data: {
          projectName,
          description,

        },
      });

      res.status(201).send({ message: 'Project created' });
    } catch (error) {
      logger.error('Error creating project:', error);
      res.status(500).json({ error: 'Unable to create project' });
    }

  });

  return router;
};
