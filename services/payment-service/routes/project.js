const { Tracer } = require('@opentelemetry/api');
const express = require('express');
const router = express.Router();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const prisma = require('../utils/prisma');
/**
 * Endpoints for Project management
 * @param {Tracer} tracer OpenTelemetry Tracer
 * @returns router
 */
module.exports = ({ tracer }) => {

  router.get('/', async (req, res) => {
    // const { projectName, description, milestones } = req.body;
    try {
      // const { projectName, description } = req.body;

      // Create a new project in the database
      const projects = await prisma.project.findMany({
        include: {
          milestones: true
        }
      });

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

      res.status(200).json({ projects: projectsDelta });
    } catch (error) {
      console.error('Error creating project:', error);
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
      console.error('Error creating project:', error);
      res.status(500).json({ error: 'Unable to create project' });
    }

  });

  return router;
};
