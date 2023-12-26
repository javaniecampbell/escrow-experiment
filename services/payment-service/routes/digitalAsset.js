const express = require('express');
const router = express.Router();
const { generateExpiringLink } = require('../service/index')

router.get('/get-asset-link', async (req, res) => {
    const { assetId } = req.query;
    // Logic to generate expiring link from Azure Storage
    res.status(200).send({ downloadLink: expiringLink });
});
module.exports = router;
