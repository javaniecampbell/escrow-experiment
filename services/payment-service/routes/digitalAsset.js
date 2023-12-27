const express = require('express');
const router = express.Router();
const { generateExpiringLink } = require('../service/index')

router.get('/get-asset-link', async (req, res) => {
    try {
        const { assetId } = req.query;
    
        // Step 1: Generate an expiring link for the asset from Azure Storage
        const expiringLink = generateExpiringLink(assetId, 1000 * 60 * 60 * 24);
    
        // Step 2: Return the expiring link as a response
        res.status(200).json({ downloadLink: expiringLink });
      } catch (error) {
        console.error('Error generating asset link:', error);
        res.status(500).json({ error: 'Unable to generate asset link' });
      }
});
module.exports = router;
