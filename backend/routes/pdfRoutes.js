const express = require('express');
const router = express.Router();
const { generatePDF } = require('../pdfGenerator');

// Route to generate PDF
router.post('/generate-pdf', async (req, res) => {
    try {
        const { places, userPreferences } = req.body;

        // Validate input data
        if (!places || !userPreferences) {
            return res.status(400).json({ error: 'Missing data' });
        }

        const pdfBuffer = await generatePDF(places, userPreferences);

        // Send PDF to the client
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=itinerary.pdf');
        res.send(pdfBuffer);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
