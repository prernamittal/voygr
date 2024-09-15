const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,  // Adventure, Relaxation, Culture, etc.
  },
  location: {
    city: String,
    country: String,
  },
  description: String,
  averageCost: Number,  // The average cost for visiting this place
  activities: {
    type: [String],  // List of activities available at this place
  },
  preferredMonths: {
    type: [String],  // List of best months to visit (e.g., ['March', 'April'])
  },
  tags: {
    type: [String],  // Optional: Tags for additional description (e.g., "beach", "historic")
  },
  hotels: [{
    name: String,
    costPerNight: Number,
    rating: Number,  // Rating out of 5
  }]
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
