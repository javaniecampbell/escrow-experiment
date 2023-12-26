const express = require('express');
const router = express.Router();

const prisma = require('../utils/prisma');

router.post('/add-milestone', async (req, res) => {
    const { projectId, milestoneName, amount } = req.body;
    try {
    
        // Create a new milestone associated with the project
        const milestone = await prisma.milestone.create({
          data: {
            milestoneName,
            amount,
            projectId,
          },
        });
    
        res.status(201).json(milestone);
      } catch (error) {
        console.error('Error adding milestone:', error);
        res.status(500).json({ error: 'Unable to add milestone' });
      }
    // res.status(201).send({ message: 'Milestone added' });
});

module.exports = router;
