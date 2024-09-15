const express = require('express');
const router = express.Router();
const Place = require('../models/placeModel');

// Cost Function
const calculateCost = (place, userPreferences) => {
    let cost = 0;

    // Budget - the closer to the user's budget, the better
    const budgetDiff = Math.abs(place.averageCost - userPreferences.budget);
    cost += budgetDiff;

    // Interests - compare category (which is a string) with interests (array)
    let interestScore = userPreferences.interests && userPreferences.interests.length > 0
        ? (userPreferences.interests.includes(place.category) ? 0 : 10)
        : 0;
    cost += interestScore;

    // Activities - more matching activities decrease the cost
    if (userPreferences.activities && userPreferences.activities.length > 0) {
        const matchingActivities = userPreferences.activities.filter(activity => place.activities.includes(activity)).length;
        const activityScore = userPreferences.activities.length - matchingActivities;
        cost += activityScore * 5;
    }

    // Preferred Month - check if the preferred months overlap with the trip duration
    const tripMonths = getMonthsBetween(userPreferences.startDate, userPreferences.endDate);
    const preferredMonthOverlap = place.preferredMonths.some(month => tripMonths.includes(month));
    if (!preferredMonthOverlap) {
        cost += 20;
    }

    // Hotels - find a hotel within the user's budget
    const suitableHotel = place.hotels.find(hotel => hotel.costPerNight <= userPreferences.budget);
    if (!suitableHotel) {
        cost += 30;  // Add cost if no suitable hotel is found
    }

    return cost;
};

// Utility function to get all months between two dates
const getMonthsBetween = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const months = [];
    let current = start;

    while (current <= end) {
        months.push(current.toLocaleString('default', { month: 'long' }));
        current.setMonth(current.getMonth() + 1);
    }

    return months;
};

// Generate itinerary based on user preferences and rank places
router.post('/generate', async (req, res) => {
    try {
        const { budget, interests, activities, startDate, endDate, tags } = req.body;

        if (!budget || !interests || !startDate || !endDate) {
            return res.status(400).json({ message: 'Please provide all necessary details.' });
        }

        // Build query to find relevant places
        const query = {
            averageCost: { $lte: budget },
            category: { $in: interests }
        };

        if (activities) query.activities = { $in: activities };
        if (tags) query.tags = { $in: tags };

        const places = await Place.find(query);

        if (places.length === 0) {
            return res.status(404).json({ message: 'No places found matching your preferences.' });
        }

        // Calculate cost for each place and suggest hotels
        const rankedPlaces = places.map(place => {
            const cost = calculateCost(place, { budget, interests, activities, preferredMonth: startDate });
            const recommendedHotel = place.hotels.find(hotel => hotel.costPerNight <= budget) || null;
            return { ...place.toObject(), cost, recommendedHotel };
        });

        // Sort places by cost
        rankedPlaces.sort((a, b) => a.cost - b.cost);

        res.status(200).json(rankedPlaces);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
