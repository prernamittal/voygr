const express = require('express');
const router = express.Router();
const Place = require('../models/placeModel');

// Create a new place
router.post('/', async (req, res) => {
    try {
        const place = new Place(req.body);
        await place.save();
        res.status(201).json(place);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all places
router.get('/', async (req, res) => {
    try {
        const places = await Place.find();
        res.status(200).json(places);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific place by ID
router.get('/:id', async (req, res) => {
    try {
        const place = await Place.findById(req.params.id);
        if (!place) return res.status(404).json({ message: 'Place not found' });
        res.status(200).json(place);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a place by ID
router.put('/:id', async (req, res) => {
    try {
        const place = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!place) return res.status(404).json({ message: 'Place not found' });
        res.status(200).json(place);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a place by ID
router.delete('/:id', async (req, res) => {
    try {
        const place = await Place.findByIdAndDelete(req.params.id);
        if (!place) return res.status(404).json({ message: 'Place not found' });
        res.status(200).json({ message: 'Place deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
