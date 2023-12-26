const express = require('express');
const router = express.Router();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const prisma = require('../utils/prisma');

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
    
        res.status(201).json(project);
      } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Unable to create project' });
      }
    res.status(201).send({ message: 'Project created' });
});

module.exports = router;
