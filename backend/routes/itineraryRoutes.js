const express = require('express');
const router = express.Router();
const Place = require('../models/placeModel');

// Updated Cost Function
const calculateCost = (place, userPreferences) => {
    let cost = 0;

    // Normalize Budget Difference: The further from the user's budget, the higher the penalty
    const budgetDiff = Math.abs(place.averageCost - userPreferences.budget);
    const normalizedBudgetDiff = budgetDiff / userPreferences.budget;  // Normalized as percentage difference
    cost += normalizedBudgetDiff * 100;  // Adjust this multiplier based on how important budget is

    // Interests - if category matches, no penalty; otherwise, add a small penalty
    let interestScore = userPreferences.interests && userPreferences.interests.length > 0
        ? (userPreferences.interests.includes(place.category) ? 0 : 20)  // Increased penalty for no match
        : 0;
    cost += interestScore;

    // Activities - missing activities should add a smaller, proportional penalty
    if (userPreferences.activities && userPreferences.activities.length > 0) {
        const matchingActivities = userPreferences.activities.filter(activity => place.activities.includes(activity)).length;
        const activityScore = (userPreferences.activities.length - matchingActivities) / userPreferences.activities.length;
        cost += activityScore * 50;  // Weight it less compared to budget
    }

    // Preferred Month - check overlap of trip months and preferred months
    const tripMonths = getMonthsBetween(userPreferences.startDate, userPreferences.endDate);
    const preferredMonthOverlap = place.preferredMonths.some(month => tripMonths.includes(month));
    if (!preferredMonthOverlap) {
        cost += 20;  // Adjust based on how critical timing is
    }

    // Hotels - find a hotel within the user's budget or impose a normalized penalty
    const cheapestHotel = place.hotels.reduce((cheapest, hotel) => {
        return (hotel.costPerNight < cheapest.costPerNight) ? hotel : cheapest;
    }, place.hotels[0]);

    const hotelBudgetDiff = cheapestHotel ? Math.abs(cheapestHotel.costPerNight - userPreferences.budget) : Infinity;
    const normalizedHotelDiff = hotelBudgetDiff / userPreferences.budget;
    cost += normalizedHotelDiff * 80;  // Hotel penalty weighted

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

// Updated Query Logic to Remove Budget Hard Cutoff
router.post('/generate', async (req, res) => {
    try {
        const { budget, interests, activities, startDate, endDate, tags } = req.body;

        if (!budget || !interests || !startDate || !endDate) {
            return res.status(400).json({ message: 'Please provide all necessary details.' });
        }

        // Query: Select places with wider budget range
        const query = {
            averageCost: { $gte: budget * 0.5, $lte: budget * 1.5 },  // Fetch places within 50% range of budget
            category: { $in: interests }
        };

        if (activities && activities.length > 0) query.activities = { $in: activities };
        if (tags) query.tags = { $in: tags };

        const places = await Place.find(query);

        if (places.length === 0) {
            return res.status(404).json({ message: 'No places found matching your preferences.' });
        }

        // Rank places by cost
        const rankedPlaces = places.map(place => {
            const cost = calculateCost(place, { budget, interests, activities, startDate, endDate });
            const recommendedHotel = place.hotels.find(hotel => hotel.costPerNight <= budget) || null;
            return { ...place.toObject(), cost, recommendedHotel };
        });

        rankedPlaces.sort((a, b) => a.cost - b.cost);

        res.status(200).json(rankedPlaces);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;
