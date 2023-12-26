const express = require('express');
const router = express.Router();



router.post('/add-milestone', async (req, res) => {
    const { projectId, milestoneName, amount } = req.body;
    // Logic to add milestone to a project
    res.status(201).send({ message: 'Milestone added' });
});

module.exports = router;
