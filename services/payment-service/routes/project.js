const express = require('express');
const router = express.Router();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-project', async (req, res) => {
    const { projectName, description, milestones } = req.body;
    // Logic to insert project into the database
    res.status(201).send({ message: 'Project created' });
});

module.exports = router;
